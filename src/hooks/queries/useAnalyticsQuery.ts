import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import type { Analytics } from "@/types";
import { queryKeys } from "./types";

// Custom hook for fetching analytics data
export function useAnalyticsQuery() {
  return useQuery({
    queryKey: queryKeys.analytics,
    queryFn: async (): Promise<Analytics> => {
      return await api.get<Analytics>("/analytics");
    },
  });
}
