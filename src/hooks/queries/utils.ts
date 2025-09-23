import type { UserQueryParams } from "./types";
import type { User } from "@/types";
import type { QueryClient } from "@tanstack/react-query";

// Query Keys - centralized for consistency and reusability
export const userQueryKeys = {
  all: ["users"],
  filtered: (params: UserQueryParams = {}) => [
    ...userQueryKeys.all,
    "filtered",
    params,
  ],
  filteredWithTotal: (params: UserQueryParams = {}) => [
    ...userQueryKeys.all,
    "filtered-with-total",
    params,
  ],
} as const;

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

  return searchParams.toString();
};

// Functional helper to build endpoint URL
export const buildEndpoint = (params: UserQueryParams): string => {
  const queryString = buildQueryString(params);
  return queryString ? `/users?${queryString}` : "/users";
};

// Optimistic update utilities for user mutations
export const optimisticUserUpdates = {
  updateUser: (users: User[], updatedUser: User): User[] =>
    users.map((user) =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
    ),

  addUser: (users: User[], newUser: User): User[] => [newUser, ...users],

  removeUser: (users: User[], userId: string): User[] =>
    users.filter((user) => user.id !== userId),
};

// Query management utilities
export const userQueryManager = {
  // Get all possible user query key patterns for cancellation/invalidation
  getAllQueryKeyPatterns: () => [
    userQueryKeys.all,
    userQueryKeys.filtered({}), // base pattern for filtered queries
    userQueryKeys.filteredWithTotal({}), // base pattern for filtered-with-total queries
  ],

  // Cancel all user-related queries
  cancelAllQueries: async (queryClient: QueryClient) => {
    const queryKeyPatterns = userQueryManager.getAllQueryKeyPatterns();
    await Promise.all(
      queryKeyPatterns.map((key) =>
        queryClient.cancelQueries({ queryKey: key }),
      ),
    );
  },

  // Invalidate all user-related queries
  invalidateAllQueries: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
  },
};
