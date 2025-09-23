import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { queryKeys } from "./types";

// Custom hook for fetching metrics data
export function useMetrics() {
  return useQuery({
    queryKey: queryKeys.metrics,
    queryFn: async () => {
      const response = await api.get("/metrics");
      return response;
    },
  });
}
