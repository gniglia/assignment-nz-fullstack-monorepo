import { useState, useMemo, useCallback } from "react";
import {
  useUsersQueryWithParamsAndTotal,
  type UserQueryParams,
} from "./useApi";

/**
 * Hook for client-side filtering, sorting, and pagination using json-server
 *
 * This hook:
 * 1. Manages filter/sort/pagination state locally
 * 2. Uses React Query to fetch data with client-side parameters
 * 3. Returns the filtered/sorted/paginated users from the client
 *
 * Benefits:
 * - Client handles all filtering, sorting, and pagination
 * - Responsive interactions for smaller datasets
 * - Simpler client-side code
 * - Leverages json-server's built-in query capabilities
 */
export function useUsersServerSide() {
  // Local state for filters, sorting, and pagination
  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedRole: "all",
    selectedStatus: "all",
    sortField: "",
    sortOrder: "asc" as "asc" | "desc",
    currentPage: 1,
    pageSize: 10,
  });

  // Build query parameters for the API
  const queryParams: UserQueryParams = useMemo(() => {
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
  }, [
    filters.currentPage,
    filters.pageSize,
    filters.searchQuery,
    filters.selectedRole,
    filters.selectedStatus,
    filters.sortField,
    filters.sortOrder,
  ]);

  // Fetch data with client-side parameters and total count from headers
  const {
    data: result,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useUsersQueryWithParamsAndTotal(queryParams);

  // Extract users and total count from the result
  const users = result?.users || [];
  const totalCount = result?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / filters.pageSize);

  // Action functions - memoized to prevent infinite re-renders
  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery, currentPage: 1 }));
  }, []);

  const setSelectedRole = useCallback((selectedRole: string) => {
    setFilters((prev) => ({ ...prev, selectedRole, currentPage: 1 }));
  }, []);

  const setSelectedStatus = useCallback((selectedStatus: string) => {
    setFilters((prev) => ({ ...prev, selectedStatus, currentPage: 1 }));
  }, []);

  const setSort = useCallback(
    (sortField: string, sortOrder?: "asc" | "desc") => {
      setFilters((prev) => {
        const currentSort = prev.sortField;
        const currentOrder = prev.sortOrder;

        // If same field, toggle order; otherwise set new field with asc order
        const newOrder =
          sortOrder ||
          (currentSort === sortField && currentOrder === "asc"
            ? "desc"
            : "asc");

        return {
          ...prev,
          sortField,
          sortOrder: newOrder,
          currentPage: 1,
        };
      });
    },
    [],
  );

  const setCurrentPage = useCallback((currentPage: number) => {
    setFilters((prev) => ({ ...prev, currentPage }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setFilters((prev) => ({ ...prev, pageSize, currentPage: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      selectedRole: "all",
      selectedStatus: "all",
      sortField: "",
      sortOrder: "asc",
      currentPage: 1,
      pageSize: 10,
    });
  }, []);

  return {
    // Data
    users,
    totalCount,
    totalPages,

    // Loading states
    isLoading,
    isFetching,
    error,

    // Current filters
    filters,

    // Actions
    setSearchQuery,
    setSelectedRole,
    setSelectedStatus,
    setSort,
    setCurrentPage,
    setPageSize,
    clearFilters,
    refetch,
  };
}
