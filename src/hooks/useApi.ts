import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import type { User, UpdateUserData, AnalyticsChartData } from "@/types/api";

// Query Keys - centralized for consistency
export const queryKeys = {
  users: ["users"] as const,
  analytics: ["analytics"] as const,
  metrics: ["metrics"] as const,
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

// Functional helper to build query string from params
const buildQueryString = (params: UserQueryParams): string => {
  const searchParams = new URLSearchParams();

  // Add pagination params (convert to json-server format)
  if (params.page) searchParams.set("_page", params.page.toString());
  if (params.limit) searchParams.set("_limit", params.limit.toString());

  // Add sorting params (convert to json-server format)
  if (params.sort) {
    const isDescending = params.sort.startsWith("-");
    const sortField = isDescending ? params.sort.substring(1) : params.sort;
    const sortOrder = isDescending ? "desc" : "asc";

    searchParams.set("_sort", sortField);
    searchParams.set("_order", sortOrder);
  }

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

// Custom hook for fetching users with client-side filtering, sorting, and pagination
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

// Enhanced hook that returns both users and total count from json-server headers
export function useUsersQueryWithParamsAndTotal(params: UserQueryParams = {}) {
  return useQuery({
    queryKey: [...queryKeys.users, "filtered-with-total", params],
    queryFn: async (): Promise<{ users: User[]; totalCount: number }> => {
      const endpoint = buildEndpoint(params);

      const { data: users, headers } = await api.getWithHeaders<User[]>(
        endpoint,
      );

      // Extract total count from json-server headers
      const totalCount = parseInt(headers.get("X-Total-Count") || "0", 10);

      return { users, totalCount };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
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
    onSuccess: () => {
      // Invalidate users list to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

// Custom hook for creating a user
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      userData: Omit<User, "id" | "createdAt" | "updatedAt" | "lastLogin">,
    ): Promise<User> => {
      const response = await api.post<User>("/users", userData);
      return response;
    },
    onSuccess: () => {
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
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}
