import Fastify from "fastify";
import cors from "@fastify/cors";
import env from "@fastify/env";
import { PrismaClient } from "@prisma/client";
import { makeMetricsRepo } from "@/repos/metrics-repo";
import { metricsRoutes } from "@/routes/metrics";
import type { MetricsDeps } from "@/usecases/metrics";

// Environment schema
const envSchema = {
  type: "object",
  required: ["DATABASE_URL", "PORT"],
  properties: {
    DATABASE_URL: { type: "string" },
    PORT: { type: "string", default: "3001" },
    NODE_ENV: { type: "string", default: "development" },
  },
};

// Extend Fastify instance with dependencies
declare module "fastify" {
  interface FastifyInstance {
    deps: MetricsDeps;
  }
}

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
    },
  });

  // Register environment variables
  await app.register(env, {
    schema: envSchema,
    dotenv: true,
  });

  // Register CORS
  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  // Initialize Prisma
  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Wire up dependencies
  app.decorate("deps", {
    metrics: makeMetricsRepo(prisma),
  });

  // Health check route
  app.get("/health", async (request, reply) => {
    return reply.send({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  });

  // Register routes
  await app.register(metricsRoutes, { prefix: "/api/metrics" });

  // Graceful shutdown
  app.addHook("onClose", async () => {
    await prisma.$disconnect();
  });

  return app;
}