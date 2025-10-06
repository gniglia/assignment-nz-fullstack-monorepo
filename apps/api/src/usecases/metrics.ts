import { err, ok, type Result } from "@/lib/result";
import type { MetricsRepo } from "@/repos/metrics-repo";
import { MetricSchema, type CreateMetricInput, type UpdateMetricInput, type MetricDto } from "@/schemas/metrics";

export type MetricsDeps = {
  metrics: MetricsRepo;
};

export async function getAllMetrics(deps: MetricsDeps): Promise<Result<MetricDto[]>> {
  try {
    const metrics = await deps.metrics.findAll();
    const validatedMetrics = metrics.map(metric => MetricSchema.safeParse(metric));

    const invalidMetrics = validatedMetrics.filter(result => !result.success);
    if (invalidMetrics.length > 0) {
      return err(new Error("Some metrics failed validation"));
    }

    const validMetrics = validatedMetrics
      .filter((result): result is { success: true; data: MetricDto } => result.success)
      .map(result => result.data);

    return ok(validMetrics);
  } catch (error) {
    return err(error instanceof Error ? error : new Error("Failed to fetch metrics"));
  }
}

export async function getMetricById(deps: MetricsDeps, id: string): Promise<Result<MetricDto>> {
  try {
    const metric = await deps.metrics.findById(id);

    if (!metric) {
      return err(new Error("Metric not found"));
    }

    const validated = MetricSchema.safeParse(metric);
    if (!validated.success) {
      return err(new Error("Metric validation failed"));
    }

    return ok(validated.data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error("Failed to fetch metric"));
  }
}

export async function createMetric(deps: MetricsDeps, input: CreateMetricInput): Promise<Result<MetricDto>> {
  try {
    const created = await deps.metrics.create(input);

    const validated = MetricSchema.safeParse(created);
    if (!validated.success) {
      return err(new Error("Created metric validation failed"));
    }

    return ok(validated.data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error("Failed to create metric"));
  }
}

export async function updateMetric(deps: MetricsDeps, id: string, input: UpdateMetricInput): Promise<Result<MetricDto>> {
  try {
    const exists = await deps.metrics.exists(id);
    if (!exists) {
      return err(new Error("Metric not found"));
    }

    const updated = await deps.metrics.update(id, input);

    const validated = MetricSchema.safeParse(updated);
    if (!validated.success) {
      return err(new Error("Updated metric validation failed"));
    }

    return ok(validated.data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error("Failed to update metric"));
  }
}

export async function deleteMetric(deps: MetricsDeps, id: string): Promise<Result<void>> {
  try {
    const exists = await deps.metrics.exists(id);
    if (!exists) {
      return err(new Error("Metric not found"));
    }

    await deps.metrics.delete(id);
    return ok(undefined);
  } catch (error) {
    return err(error instanceof Error ? error : new Error("Failed to delete metric"));
  }
}