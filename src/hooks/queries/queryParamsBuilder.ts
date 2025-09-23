import type { UserQueryParams } from "./types";

type UserListFilters = {
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
  sortField: string;
  sortOrder: string;
  currentPage: number;
  pageSize: number;
};

/**
 * Builds query parameters for user API calls based on filter state
 * @param filters - Current filter state
 * @returns Query parameters object for the API
 */
export function buildQueryParams(filters: UserListFilters): UserQueryParams {
  const params: UserQueryParams = {};

  // Add pagination params (always include for consistent pagination)
  params.page = filters.currentPage;
  params.limit = filters.pageSize;

  // Add search query (minimum 3 characters)
  if (filters.searchQuery.trim() && filters.searchQuery.trim().length >= 3) {
    params.search = filters.searchQuery.trim();
  }

  // Add role filter
  if (filters.selectedRole !== "all") {
    params.role = filters.selectedRole;
  }

  // Add status filter
  if (filters.selectedStatus !== "all") {
    params.status = filters.selectedStatus;
  }

  // Add sorting
  if (filters.sortField) {
    params.sort =
      filters.sortOrder === "desc"
        ? `-${filters.sortField}`
        : filters.sortField;
  }

  return params;
}
