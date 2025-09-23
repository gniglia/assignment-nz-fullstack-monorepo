import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import type { AnalyticsChartData } from "@/types/api";
import { queryKeys } from "./types";

// Custom hook for fetching analytics data
export function useAnalytics() {
  return useQuery({
    queryKey: queryKeys.analytics,
    queryFn: async (): Promise<AnalyticsChartData> => {
      const response = await api.get<AnalyticsChartData>("/analytics");
      return response;
    },
    // Refetch every 30 seconds for real-time data
    refetchInterval: 30000,
  });
}
