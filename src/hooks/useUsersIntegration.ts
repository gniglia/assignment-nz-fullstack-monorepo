import { useEffect } from "react";
import { useUsersQuery } from "./useApi";
import { useUsersStore } from "@/stores/usersStore";

/**
 * Integration hook that connects React Query (server state) with Zustand (client state)
 *
 * This hook:
 * 1. Fetches users data via React Query
 * 2. Syncs the data to Zustand store
 * 3. Returns the current filtered/sorted/paginated users from Zustand
 *
 * Benefits:
 * - React Query handles server state (caching, refetching, etc.)
 * - Zustand handles client state (filtering, sorting, pagination)
 * - Clean separation of concerns
 * - Easy to add refetch intervals in the future
 */
export function useUsersIntegration() {
  // React Query for server state
  const {
    data: serverUsers,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useUsersQuery();

  // Zustand for client state
  const {
    paginatedUsers,
    totalFilteredCount,
    filters,
    setUsers,
    setSearchQuery,
    setSelectedRole,
    setSelectedStatus,
    setSort,
    setCurrentPage,
    clearFilters,
  } = useUsersStore();

  // Sync server data to Zustand store
  useEffect(() => {
    if (serverUsers) {
      setUsers(serverUsers);
    }
  }, [serverUsers, setUsers]);

  // Reset filters when component unmounts (navigation away)
  useEffect(() => {
    return () => {
      // Cleanup: reset filters when leaving the page
      clearFilters();
    };
  }, [clearFilters]);

  // Return everything the component needs
  return {
    // Data
    users: paginatedUsers,
    totalCount: totalFilteredCount,

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
    clearFilters,
    refetch,
  };
}
