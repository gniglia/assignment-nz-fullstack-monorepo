import { useCallback } from "react";
import type { SortOrder } from "./queries/types";

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

type PaginationActions = {
  resetToFirstPage: () => void;
};

/**
 * Hook for managing user list actions
 * Combines filter actions with pagination reset logic
 */
export function useUsersListActions(
  filters: UserListFilters,
  filterActions: FilterActions,
  paginationActions: PaginationActions,
) {
  const { setSearchQuery: setStoreSearchQuery } = filterActions;
  const { setSelectedRole: setStoreSelectedRole } = filterActions;
  const { setSelectedStatus: setStoreSelectedStatus } = filterActions;
  const { setSort: setStoreSort } = filterActions;
  const { clearFilters: clearStoreFilters } = filterActions;
  const { resetToFirstPage } = paginationActions;

  const setSearchQuery = useCallback(
    (searchQuery: string) => {
      setStoreSearchQuery(searchQuery);
      resetToFirstPage(); // Reset to first page when searching
    },
    [setStoreSearchQuery, resetToFirstPage],
  );

  const setSelectedRole = useCallback(
    (selectedRole: string) => {
      setStoreSelectedRole(selectedRole);
      resetToFirstPage(); // Reset to first page when filtering
    },
    [setStoreSelectedRole, resetToFirstPage],
  );

  const setSelectedStatus = useCallback(
    (selectedStatus: string) => {
      setStoreSelectedStatus(selectedStatus);
      resetToFirstPage(); // Reset to first page when filtering
    },
    [setStoreSelectedStatus, resetToFirstPage],
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
      resetToFirstPage(); // Reset to first page when sorting
    },
    [filters.sortField, filters.sortOrder, setStoreSort, resetToFirstPage],
  );

  const clearFilters = useCallback(() => {
    clearStoreFilters();
    resetToFirstPage(); // Reset to first page when clearing filters
  }, [clearStoreFilters, resetToFirstPage]);

  return {
    setSearchQuery,
    setSelectedRole,
    setSelectedStatus,
    setSort,
    clearFilters,
  };
}
