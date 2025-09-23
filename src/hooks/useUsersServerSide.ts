import { useState, useMemo, useCallback } from "react";
import {
  useUsersQueryWithParamsAndTotal,
  type UserQueryParams,
} from "./queries";
import { useUserPreferencesStore } from "@/stores/userPreferencesStore";
import type { SortOrder } from "@/types";

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
  // Use Zustand store for persistent filters
  const {
    searchQuery: storeSearchQuery,
    selectedRole: storeSelectedRole,
    selectedStatus: storeSelectedStatus,
    sortField: storeSortField,
    sortOrder: storeSortOrder,
    setSearchQuery: setStoreSearchQuery,
    setSelectedRole: setStoreSelectedRole,
    setSelectedStatus: setStoreSelectedStatus,
    setSort: setStoreSort,
    clearFilters: clearStoreFilters,
  } = useUserPreferencesStore();

  // Local state for pagination (not persisted)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Combine store filters with local pagination state
  const filters = {
    searchQuery: storeSearchQuery,
    selectedRole: storeSelectedRole,
    selectedStatus: storeSelectedStatus,
    sortField: storeSortField,
    sortOrder: storeSortOrder,
    currentPage,
    pageSize,
  };

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

  // Action functions - use Zustand store actions directly
  const setSearchQuery = useCallback(
    (searchQuery: string) => {
      setStoreSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page when searching
    },
    [setStoreSearchQuery],
  );

  const setSelectedRole = useCallback(
    (selectedRole: string) => {
      setStoreSelectedRole(selectedRole);
      setCurrentPage(1); // Reset to first page when filtering
    },
    [setStoreSelectedRole],
  );

  const setSelectedStatus = useCallback(
    (selectedStatus: string) => {
      setStoreSelectedStatus(selectedStatus);
      setCurrentPage(1); // Reset to first page when filtering
    },
    [setStoreSelectedStatus],
  );

  const setSort = useCallback(
    (sortField: string, sortOrder?: SortOrder) => {
      const currentSort = storeSortField;
      const currentOrder = storeSortOrder;

      // If same field, toggle order; otherwise set new field with asc order
      const newOrder =
        sortOrder ||
        (currentSort === sortField && currentOrder === "asc" ? "desc" : "asc");

      setStoreSort(sortField, newOrder);
      setCurrentPage(1); // Reset to first page when sorting
    },
    [storeSortField, storeSortOrder, setStoreSort],
  );

  const setCurrentPageLocal = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    // Page size is not persisted, just a local UI preference
    // This function is kept for compatibility but doesn't do anything
    console.log("Page size change not persisted:", pageSize);
  }, []);

  const clearFilters = useCallback(() => {
    clearStoreFilters();
    setCurrentPage(1); // Reset to first page when clearing filters
  }, [clearStoreFilters]);

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
    setCurrentPage: setCurrentPageLocal,
    setPageSize,
    clearFilters,
    refetch,
  };
}
