import { useCallback } from "react";
import type { SortOrder } from "@/hooks/queries/types";

type UserListFilters = {
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
  sortField: string;
  sortOrder: string;
};

type FilterActions = {
  setSearchQuery: (query: string) => void;
  setSelectedRole: (role: string) => void;
  setSelectedStatus: (status: string) => void;
  setSort: (field: string, order: SortOrder) => void;
  clearFilters: () => void;
};

type PaginationControls = {
  goToFirstPage: () => void;
};

/**
 * Hook for managing user list controls with proper memoization
 * Combines filter actions with pagination reset logic
 */
export function useUsersListControls(
  filters: UserListFilters,
  filterActions: FilterActions,
  paginationControls: PaginationControls,
) {
  const { setSearchQuery: setStoreSearchQuery } = filterActions;
  const { setSelectedRole: setStoreSelectedRole } = filterActions;
  const { setSelectedStatus: setStoreSelectedStatus } = filterActions;
  const { setSort: setStoreSort } = filterActions;
  const { clearFilters: clearStoreFilters } = filterActions;
  const { goToFirstPage } = paginationControls;

  const setSearchQuery = useCallback(
    (searchQuery: string) => {
      setStoreSearchQuery(searchQuery);
      goToFirstPage(); // Reset to first page when searching
    },
    [setStoreSearchQuery, goToFirstPage],
  );

  const setSelectedRole = useCallback(
    (selectedRole: string) => {
      setStoreSelectedRole(selectedRole);
      goToFirstPage(); // Reset to first page when filtering
    },
    [setStoreSelectedRole, goToFirstPage],
  );

  const setSelectedStatus = useCallback(
    (selectedStatus: string) => {
      setStoreSelectedStatus(selectedStatus);
      goToFirstPage(); // Reset to first page when filtering
    },
    [setStoreSelectedStatus, goToFirstPage],
  );

  const setSort = useCallback(
    (sortField: string, sortOrder?: SortOrder) => {
      const currentSort = filters.sortField;
      const currentOrder = filters.sortOrder;

      // If same field, toggle order; otherwise set new field with asc order
      const newOrder =
        sortOrder ||
        (currentSort === sortField && currentOrder === "asc" ? "desc" : "asc");

      setStoreSort(sortField, newOrder);
      goToFirstPage(); // Reset to first page when sorting
    },
    [filters.sortField, filters.sortOrder, setStoreSort, goToFirstPage],
  );

  const clearFilters = useCallback(() => {
    clearStoreFilters();
    goToFirstPage(); // Reset to first page when clearing filters
  }, [clearStoreFilters, goToFirstPage]);

  return {
    setSearchQuery,
    setSelectedRole,
    setSelectedStatus,
    setSort,
    clearFilters,
  };
}
