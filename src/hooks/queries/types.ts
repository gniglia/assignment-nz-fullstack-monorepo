// Types for sorting
export type SortOrder = "asc" | "desc";

// Query Keys - centralized for consistency
export const queryKeys = {
  users: ["users"],
  analytics: ["analytics"],
  metrics: ["metrics"],
} as const;

// Types for user query parameters using camelCase
export type UserQueryParams = {
  page?: number; // page number (1-based)
  limit?: number; // items per page
  sort?: string; // sort field (use - prefix for desc, e.g., "-name")
  order?: SortOrder; // sort order (alternative to - prefix)
  search?: string; // search query (will search name and email)
  role?: string; // filter by role
  status?: string; // filter by status
};
