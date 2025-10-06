import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds that data remains fresh
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Time in milliseconds that data remains in cache
      gcTime: 1000 * 60 * 30, // 30 minutes
      // Refetch on window focus in development
      refetchOnWindowFocus: false,
      // Retry failed requests
      retry: false,
    },
  },
});
