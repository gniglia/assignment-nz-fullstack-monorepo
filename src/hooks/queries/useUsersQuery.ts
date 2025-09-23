import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import type { User, UpdateUserData } from "@/types/api";
import { queryKeys, type UserQueryParams } from "./types";
import { buildEndpoint } from "./utils";

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
