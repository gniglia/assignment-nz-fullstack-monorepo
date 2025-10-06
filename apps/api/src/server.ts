/* eslint-disable no-console */
import { buildApp } from "@/app";

async function start() {
  try {
    const server = await buildApp();

    const port = parseInt(process.env.PORT || "3001", 10);
    const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

    await server.listen({ port, host });

    console.log(`🚀 Server running on http://${host}:${port}`);
    console.log(`📊 Metrics API available at http://${host}:${port}/api/metrics`);
    console.log(`❤️  Health check at http://${host}:${port}/health`);
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

start();