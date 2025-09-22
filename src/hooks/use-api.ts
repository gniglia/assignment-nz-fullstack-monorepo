import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import type {
  User,
  CreateUserData,
  UpdateUserData,
  AnalyticsChartData,
  DashboardData,
} from "@/types/api";

// Query Keys - centralized for consistency
export const queryKeys = {
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
  analytics: ["analytics"] as const,
  dashboard: ["dashboard"] as const,
} as const;

// Types for user query parameters
export type UserQueryParams = {
  page?: number;
  limit?: number;
  q?: string; // search query
  role?: string; // filter by role
  status?: string; // filter by status
  _sort?: string; // sort field
  _order?: "asc" | "desc"; // sort order
};

// Custom hook for fetching all users (base data)
export function useUsersQuery() {
  return useQuery({
    queryKey: [...queryKeys.users, "all"],
    queryFn: async (): Promise<User[]> => {
      return await api.get<User[]>("/users");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    // You can add refetchInterval here for future use:
    // refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Custom hook for fetching a single user
export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: async (): Promise<User> => {
      const response = await api.get<User>(`/users/${id}`);
      return response;
    },
    enabled: !!id, // Only run query if id exists
  });
}

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

// Custom hook for fetching dashboard data
export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: async (): Promise<DashboardData> => {
      const response = await api.get<DashboardData>("/dashboard");
      return response;
    },
  });
}

// Custom hook for fetching metrics data
export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const response = await api.get("/metrics");
      return response;
    },
  });
}

// Custom hook for creating a user
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserData): Promise<User> => {
      const response = await api.post<User>("/users", userData);
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

// Custom hook for updating a user
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...userData
    }: { id: string } & UpdateUserData): Promise<User> => {
      const response = await api.put<User>(`/users/${id}`, userData);
      return response;
    },
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(queryKeys.user(variables.id), data);
      // Invalidate users list to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

// Custom hook for deleting a user
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<string> => {
      await api.delete(`/users/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      // Remove the user from cache
      queryClient.removeQueries({ queryKey: queryKeys.user(deletedId) });
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}
