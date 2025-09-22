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

// Types for user query parameters using camelCase
export type UserQueryParams = {
  page?: number; // page number (1-based)
  limit?: number; // items per page
  sort?: string; // sort field (use - prefix for desc, e.g., "-name")
  order?: "asc" | "desc"; // sort order (alternative to - prefix)
  search?: string; // search query (will search name and email)
  role?: string; // filter by role
  status?: string; // filter by status
  nameLike?: string; // search in name field
  emailLike?: string; // search in email field
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

// Functional helper to build query string from params
const buildQueryString = (params: UserQueryParams): string => {
  const searchParams = new URLSearchParams();

  // Add pagination params (convert to json-server format)
  if (params.page) searchParams.set("_page", params.page.toString());
  if (params.limit) searchParams.set("_limit", params.limit.toString());

  // Add sorting params (convert to json-server format)
  if (params.sort) {
    const sortField = params.sort.startsWith("-") ? params.sort : params.sort;
    searchParams.set("_sort", sortField);
  }
  if (params.order) searchParams.set("_order", params.order);

  // Add filtering params
  if (params.role && params.role !== "all")
    searchParams.set("role", params.role);
  if (params.status && params.status !== "all")
    searchParams.set("status", params.status);

  // Add search params (json-server supports q for general search)
  if (params.search) searchParams.set("q", params.search);
  if (params.nameLike) searchParams.set("name_like", params.nameLike);
  if (params.emailLike) searchParams.set("email_like", params.emailLike);

  return searchParams.toString();
};

// Functional helper to build endpoint URL
const buildEndpoint = (params: UserQueryParams): string => {
  const queryString = buildQueryString(params);
  return queryString ? `/users?${queryString}` : "/users";
};

// Custom hook for fetching users with server-side filtering, sorting, and pagination
export function useUsersQueryWithParams(params: UserQueryParams = {}) {
  return useQuery({
    queryKey: [...queryKeys.users, "filtered", params],
    queryFn: async (): Promise<User[]> => {
      const endpoint = buildEndpoint(params);
      return await api.get<User[]>(endpoint);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
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
