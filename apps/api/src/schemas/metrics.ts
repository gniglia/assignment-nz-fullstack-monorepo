import { z } from "zod";

// Base metric data (without id and timestamps)
const BaseMetricSchema = z.object({
  title: z.string().min(1, "Title is required"),
  value: z.number(),
  change: z.number(),
  changeType: z.enum(["increase", "decrease"]),
  icon: z.string().min(1, "Icon is required"),
});

// Full metric with id and timestamps (from database)
export const MetricSchema = BaseMetricSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input schemas
export const CreateMetricSchema = BaseMetricSchema;
export const UpdateMetricSchema = BaseMetricSchema.partial();

// Type exports
export type CreateMetricInput = z.infer<typeof CreateMetricSchema>;
export type UpdateMetricInput = z.infer<typeof UpdateMetricSchema>;
export type MetricDto = z.infer<typeof MetricSchema>;