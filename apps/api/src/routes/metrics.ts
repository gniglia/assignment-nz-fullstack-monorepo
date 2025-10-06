import type { FastifyPluginAsync } from "fastify";
import { CreateMetricInput, UpdateMetricInput } from "@/schemas/metrics";
import { getAllMetrics, getMetricById, createMetric, updateMetric, deleteMetric } from "@/usecases/metrics";

export const metricsRoutes: FastifyPluginAsync = async (app) => {
  // GET /metrics - Get all metrics
  app.get("/", async (request, reply) => {
    const result = await getAllMetrics(app.deps);

    if (!result.ok) {
      app.log.error(result.error);
      return reply.status(500).send({ error: "Internal server error" });
    }

    return reply.send(result.value);
  });

  // GET /metrics/:id - Get metric by ID
  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const { id } = request.params;
    const result = await getMetricById(app.deps, id);

    if (!result.ok) {
      if (result.error.message === "Metric not found") {
        return reply.status(404).send({ error: result.error.message });
      }

      app.log.error(result.error);
      return reply.status(500).send({ error: "Internal server error" });
    }

    return reply.send(result.value);
  });

  // POST /metrics - Create new metric
  app.post<{ Body: CreateMetricInput }>("/", async (request, reply) => {
    const result = await createMetric(app.deps, request.body);

    if (!result.ok) {
      app.log.error(result.error);
      return reply.status(500).send({ error: "Internal server error" });
    }

    return reply.status(201).send(result.value);
  });

  // PUT /metrics/:id - Update metric
  app.put<{
    Params: { id: string };
    Body: UpdateMetricInput
  }>("/:id", async (request, reply) => {
    const { id } = request.params;
    const result = await updateMetric(app.deps, id, request.body);

    if (!result.ok) {
      if (result.error.message === "Metric not found") {
        return reply.status(404).send({ error: result.error.message });
      }

      app.log.error(result.error);
      return reply.status(500).send({ error: "Internal server error" });
    }

    return reply.send(result.value);
  });

  // DELETE /metrics/:id - Delete metric
  app.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const { id } = request.params;
    const result = await deleteMetric(app.deps, id);

    if (!result.ok) {
      if (result.error.message === "Metric not found") {
        return reply.status(404).send({ error: result.error.message });
      }

      app.log.error(result.error);
      return reply.status(500).send({ error: "Internal server error" });
    }

    return reply.status(204).send();
  });
};