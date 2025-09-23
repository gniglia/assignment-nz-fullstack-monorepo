import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { queryKeys } from "./types";
import type { Metric } from "@/types";

// Custom hook for fetching metrics data
export function useMetricsQuery() {
  return useQuery({
    queryKey: queryKeys.metrics,
    queryFn: async (): Promise<Metric[]> => {
      return await api.get<Metric[]>("/metrics");
    },
  });
}
