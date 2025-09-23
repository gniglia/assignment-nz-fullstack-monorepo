import { useMemo } from "react";
import { useUsersQueryWithParamsAndTotal } from "../../../hooks/queries";
import { buildQueryParams } from "../../../hooks/queries/queryParamsBuilder";

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
 * Hook for fetching and processing user list data
 * Handles query parameter building and data transformation
 */
export function useUsersListData(filters: UserListFilters) {
  // Build query parameters with proper memoization
  const queryParams = useMemo(() => {
    return buildQueryParams(filters);
  }, [filters]);

  // Fetch data with client-side parameters and total count from headers
  const {
    data: result,
    isLoading,
    error,
    isFetching,
  } = useUsersQueryWithParamsAndTotal(queryParams);

  // Extract and compute derived data
  const users = result?.users || [];
  const totalCount = result?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / filters.pageSize);

  return {
    users,
    totalCount,
    totalPages,
    isLoading,
    isFetching,
    error,
  };
}
