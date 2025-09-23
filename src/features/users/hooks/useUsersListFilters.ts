import { useUserPreferencesStore } from "@/stores/userPreferencesStore";

/**
 * Hook for managing user filter state using Zustand store
 * Handles persistent filter state (search, role, status, sorting)
 */
export function useUsersListFilters() {
  const {
    searchQuery,
    selectedRole,
    selectedStatus,
    sortField,
    sortOrder,
    setSearchQuery: setStoreSearchQuery,
    setSelectedRole: setStoreSelectedRole,
    setSelectedStatus: setStoreSelectedStatus,
    setSort: setStoreSort,
    clearFilters: clearStoreFilters,
  } = useUserPreferencesStore();

  return {
    // Current filter values
    searchQuery,
    selectedRole,
    selectedStatus,
    sortField,
    sortOrder,

    // Actions
    setSearchQuery: setStoreSearchQuery,
    setSelectedRole: setStoreSelectedRole,
    setSelectedStatus: setStoreSelectedStatus,
    setSort: setStoreSort,
    clearFilters: clearStoreFilters,
  };
}
