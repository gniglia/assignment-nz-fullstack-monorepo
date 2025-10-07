import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import type { User, UpdateUserData, CreateUserData } from "@/types";
import type { UserQueryParams } from "./types";
import {
  buildEndpoint,
  userQueryKeys,
  optimisticUserUpdates,
  userQueryManager,
} from "./utils";

// Custom hook for fetching users with client-side filtering, sorting, and pagination
export function useUsersQueryWithParams(params: UserQueryParams = {}) {
  return useQuery({
    queryKey: userQueryKeys.filtered(params),
    queryFn: async (): Promise<User[]> => {
      const endpoint = buildEndpoint(params);
      const response = await api.get<User[]>(endpoint);
      return response.data;
    },
  });
}

// Enhanced hook that returns both users and total count from json-server headers
export function useUsersQueryWithParamsAndTotal(params: UserQueryParams = {}) {
  return useQuery({
    queryKey: userQueryKeys.filteredWithTotal(params),
    queryFn: async (): Promise<{ users: User[]; totalCount: number }> => {
      const endpoint = buildEndpoint(params);

      const { data: users, headers } = await api.get<User[]>(endpoint);

      // Extract total count from json-server headers
      const totalCount = parseInt(headers.get("X-Total-Count") || "0", 10);

      return { users, totalCount };
    },
  });
}

// Shared types for optimistic updates
type OptimisticContext = {
  previousUsers?: User[];
  previousUsersWithTotal?: { users: User[]; totalCount: number };
};

// Helper function to get previous data for rollback
function getPreviousData(
  queryClient: ReturnType<typeof useQueryClient>,
): OptimisticContext {
  return {
    previousUsers: queryClient.getQueryData<User[]>(userQueryKeys.all),
    previousUsersWithTotal: queryClient.getQueryData<{
      users: User[];
      totalCount: number;
    }>(userQueryKeys.filteredWithTotal({})),
  };
}

// Helper function to rollback optimistic updates
function rollbackOptimisticUpdates(
  queryClient: ReturnType<typeof useQueryClient>,
  context: OptimisticContext,
) {
  if (context.previousUsers) {
    queryClient.setQueryData(userQueryKeys.all, context.previousUsers);
  }
  if (context.previousUsersWithTotal) {
    queryClient.setQueryData(
      userQueryKeys.filteredWithTotal({}),
      context.previousUsersWithTotal,
    );
  }
}

// Optimistic Update User Mutation
export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...userData }: UpdateUserData): Promise<User> => {
      const response = await api.patch<User>(`/users/${id}`, userData);
      return response.data;
    },
    onMutate: async (updatedUserData): Promise<OptimisticContext> => {
      await userQueryManager.cancelAllQueries(queryClient);
      const context = getPreviousData(queryClient);

      // Update all user queries optimistically
      const updateUserInList = (users: User[]) =>
        users.map((user) =>
          user.id === updatedUserData.id
            ? {
                ...user,
                ...updatedUserData,
                updatedAt: new Date().toISOString(),
              }
            : user,
        );

      queryClient.setQueryData<User[]>(userQueryKeys.all, (old) =>
        old ? updateUserInList(old) : old,
      );

      queryClient.setQueriesData<User[]>(
        { queryKey: userQueryKeys.filtered({}) },
        (old) => (old ? updateUserInList(old) : old),
      );

      queryClient.setQueriesData<{ users: User[]; totalCount: number }>(
        { queryKey: userQueryKeys.filteredWithTotal({}) },
        (old) =>
          old
            ? {
                ...old,
                users: updateUserInList(old.users),
              }
            : old,
      );

      return context;
    },
    onError: (err, _updatedUserData, context) => {
      if (context) rollbackOptimisticUpdates(queryClient, context);
      console.error("Update user error:", err);
    },
    onSettled: () => {
      // Update mutation settled - invalidating queries for background refresh
      userQueryManager.invalidateAllQueries(queryClient);
    },
  });
}

// Optimistic Create User Mutation
export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserData): Promise<User> => {
      const response = await api.post<User>("/users", userData);
      return response.data;
    },
    onMutate: async (newUserData): Promise<OptimisticContext> => {
      await userQueryManager.cancelAllQueries(queryClient);
      const context = getPreviousData(queryClient);

      // Create optimistic user with temporary ID
      const optimisticUser: User = {
        ...newUserData,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Update all user queries optimistically using utility function
      queryClient.setQueryData<User[]>(userQueryKeys.all, (old) =>
        old
          ? optimisticUserUpdates.addUser(old, optimisticUser)
          : [optimisticUser],
      );

      queryClient.setQueriesData<User[]>(
        { queryKey: userQueryKeys.filtered({}) },
        (old) =>
          old
            ? optimisticUserUpdates.addUser(old, optimisticUser)
            : [optimisticUser],
      );

      queryClient.setQueriesData<{ users: User[]; totalCount: number }>(
        { queryKey: userQueryKeys.filteredWithTotal({}) },
        (old) =>
          old
            ? {
                users: optimisticUserUpdates.addUser(old.users, optimisticUser),
                totalCount: old.totalCount + 1,
              }
            : { users: [optimisticUser], totalCount: 1 },
      );

      return context;
    },
    onError: (err, _newUserData, context) => {
      if (context) rollbackOptimisticUpdates(queryClient, context);
      console.error("Create user error:", err);
    },
    onSettled: () => {
      // Create mutation settled - invalidating queries for background refresh
      userQueryManager.invalidateAllQueries(queryClient);
    },
  });
}

// Optimistic Delete User Mutation
export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<string> => {
      await api.delete(`/users/${id}`);
      return id;
    },
    onMutate: async (userId): Promise<OptimisticContext> => {
      await userQueryManager.cancelAllQueries(queryClient);
      const context = getPreviousData(queryClient);

      // Update all user queries optimistically using utility function
      queryClient.setQueryData<User[]>(userQueryKeys.all, (old) =>
        old ? optimisticUserUpdates.removeUser(old, userId) : old,
      );

      queryClient.setQueriesData<User[]>(
        { queryKey: userQueryKeys.filtered({}) },
        (old) => (old ? optimisticUserUpdates.removeUser(old, userId) : old),
      );

      queryClient.setQueriesData<{ users: User[]; totalCount: number }>(
        { queryKey: userQueryKeys.filteredWithTotal({}) },
        (old) =>
          old
            ? {
                users: optimisticUserUpdates.removeUser(old.users, userId),
                totalCount: Math.max(0, old.totalCount - 1),
              }
            : old,
      );

      return context;
    },
    onError: (err, _userId, context) => {
      if (context) rollbackOptimisticUpdates(queryClient, context);
      console.error("Delete user error:", err);
    },
    onSettled: () => {
      // Delete mutation settled - invalidating queries for background refresh
      userQueryManager.invalidateAllQueries(queryClient);
    },
  });
}
