import type { PrismaClient } from "@prisma/client";
import type { CreateMetricInput, UpdateMetricInput } from "@/schemas/metrics";

export function makeMetricsRepo(prisma: PrismaClient) {
  return {
    async findAll() {
      return prisma.metric.findMany({
        orderBy: { createdAt: "desc" },
      });
    },

    async findById(id: string) {
      return prisma.metric.findUnique({
        where: { id },
      });
    },

    async create(data: CreateMetricInput) {
      return prisma.metric.create({
        data,
      });
    },

    async update(id: string, data: UpdateMetricInput) {
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      );

      return prisma.metric.update({
        where: { id },
        data: cleanData,
      });
    },

    async delete(id: string) {
      return prisma.metric.delete({
        where: { id },
      });
    },

    async exists(id: string) {
      const count = await prisma.metric.count({
        where: { id },
      });
      return count > 0;
    },
  };
}

export type MetricsRepo = ReturnType<typeof makeMetricsRepo>;