import { useUsersListFilters } from "./useUsersListFilters";
import { usePagination } from "@/hooks/usePagination";
import { useUsersListControls } from "./useUsersListControls";
import { useUsersListQuery } from "./useUsersListQuery";

/**
 * Hook for users list filtering, sorting, and pagination using json-server
 *
 * This hook orchestrates smaller, focused hooks:
 * - useUsersListFilters: Manages persistent filter state
 * - usePagination: Manages local pagination state
 * - useUsersListControls: Handles all control functions with proper memoization
 * - useUsersListQuery: Fetches and processes data
 */
export function useUsersList() {
  // Manage filter state (persistent)
  const filters = useUsersListFilters();

  // Manage pagination state (local)
  const pagination = usePagination();

  // Combine all filter and pagination state
  const combinedFilters = {
    ...filters,
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  };

  // Fetch and process data
  const queryResult = useUsersListQuery(combinedFilters);

  // Handle all controls with proper memoization
  const controls = useUsersListControls(combinedFilters, filters, pagination);

  return {
    // Data
    users: queryResult.users,
    totalCount: queryResult.totalCount,
    totalPages: queryResult.totalPages,

    // Loading states
    isLoading: queryResult.isLoading,
    isFetching: queryResult.isFetching,
    error: queryResult.error,

    // Current filters
    filters: combinedFilters,

    // Controls
    setSearchQuery: controls.setSearchQuery,
    setSelectedRole: controls.setSelectedRole,
    setSelectedStatus: controls.setSelectedStatus,
    setSort: controls.setSort,
    setCurrentPage: pagination.setCurrentPage,
    clearFilters: controls.clearFilters,
  };
}
