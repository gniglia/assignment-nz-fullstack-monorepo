import { create } from "zustand";
import type { User } from "@/types/api";

// Filter and sort state
type FilterState = {
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
  sortField: string;
  sortOrder: "asc" | "desc";
  currentPage: number;
  pageSize: number;
};

// Store state
type UsersState = {
  // Raw users data from API
  users: User[];
  // Filter/sort state
  filters: FilterState;
  // Computed filtered/sorted users
  filteredUsers: User[];
  // Paginated users
  paginatedUsers: User[];
  // Total count of filtered users
  totalFilteredCount: number;
};

// Store actions
/* eslint-disable no-unused-vars */
type UsersActions = {
  // Data management
  setUsers: (users: User[]) => void;

  // Filter actions
  setSearchQuery: (query: string) => void;
  setSelectedRole: (role: string) => void;
  setSelectedStatus: (status: string) => void;

  // Sort actions
  setSort: (field: string, order?: "asc" | "desc") => void;

  // Pagination actions
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;

  // Utility actions
  clearFilters: () => void;
  resetToFirstPage: () => void;

  // Internal update methods
  updateFilteredUsers: () => void;
  updatePaginatedUsers: () => void;
};
/* eslint-enable no-unused-vars */

// Initial state
const initialFilters: FilterState = {
  searchQuery: "",
  selectedRole: "all",
  selectedStatus: "all",
  sortField: "",
  sortOrder: "asc",
  currentPage: 1,
  pageSize: 10,
};

const initialState: UsersState = {
  users: [],
  filters: initialFilters,
  filteredUsers: [],
  paginatedUsers: [],
  totalFilteredCount: 0,
};

// Helper functions
const applySearchFilter = (users: User[], searchQuery: string): User[] => {
  if (!searchQuery.trim()) return users;

  const searchTerm = searchQuery.toLowerCase().trim();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm),
  );
};

const applyRoleFilter = (users: User[], role: string): User[] => {
  if (role === "all") return users;
  return users.filter((user) => user.role === role);
};

const applyStatusFilter = (users: User[], status: string): User[] => {
  if (status === "all") return users;
  return users.filter((user) => user.status === status);
};

const applySorting = (
  users: User[],
  sortField: string,
  sortOrder: "asc" | "desc",
): User[] => {
  if (!sortField) return users;

  return [...users].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "email":
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      case "role":
        aValue = a.role;
        bValue = b.role;
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
        break;
      case "createdAt":
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};

const applyPagination = (
  users: User[],
  page: number,
  pageSize: number,
): User[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return users.slice(startIndex, endIndex);
};

// Main store
export const useUsersStore = create<UsersState & UsersActions>((set, get) => ({
  ...initialState,

  // Data management
  setUsers: (users: User[]) => {
    set({ users });
    // Recompute filtered users when raw data changes
    get().updateFilteredUsers();
  },

  // Filter actions
  setSearchQuery: (searchQuery: string) => {
    set((state) => ({
      filters: { ...state.filters, searchQuery, currentPage: 1 },
    }));
    get().updateFilteredUsers();
  },

  setSelectedRole: (selectedRole: string) => {
    set((state) => ({
      filters: { ...state.filters, selectedRole, currentPage: 1 },
    }));
    get().updateFilteredUsers();
  },

  setSelectedStatus: (selectedStatus: string) => {
    set((state) => ({
      filters: { ...state.filters, selectedStatus, currentPage: 1 },
    }));
    get().updateFilteredUsers();
  },

  // Sort actions
  setSort: (sortField: string, sortOrder?: "asc" | "desc") => {
    set((state) => {
      const currentSort = state.filters.sortField;
      const currentOrder = state.filters.sortOrder;

      // If same field, toggle order; otherwise set new field with asc order
      const newOrder =
        sortOrder ||
        (currentSort === sortField && currentOrder === "asc" ? "desc" : "asc");

      return {
        filters: {
          ...state.filters,
          sortField,
          sortOrder: newOrder,
          currentPage: 1,
        },
      };
    });
    get().updateFilteredUsers();
  },

  // Pagination actions
  setCurrentPage: (currentPage: number) => {
    set((state) => ({
      filters: { ...state.filters, currentPage },
    }));
    get().updatePaginatedUsers();
  },

  setPageSize: (pageSize: number) => {
    set((state) => ({
      filters: { ...state.filters, pageSize, currentPage: 1 },
    }));
    get().updateFilteredUsers();
  },

  // Utility actions
  clearFilters: () => {
    set({ filters: initialFilters });
    get().updateFilteredUsers();
  },

  resetToFirstPage: () => {
    set((state) => ({
      filters: { ...state.filters, currentPage: 1 },
    }));
    get().updatePaginatedUsers();
  },

  // Internal update methods
  updateFilteredUsers: () => {
    const { users, filters } = get();

    let filtered = applySearchFilter(users, filters.searchQuery);
    filtered = applyRoleFilter(filtered, filters.selectedRole);
    filtered = applyStatusFilter(filtered, filters.selectedStatus);
    filtered = applySorting(filtered, filters.sortField, filters.sortOrder);

    const paginated = applyPagination(
      filtered,
      filters.currentPage,
      filters.pageSize,
    );

    set({
      filteredUsers: filtered,
      paginatedUsers: paginated,
      totalFilteredCount: filtered.length,
    });
  },

  updatePaginatedUsers: () => {
    const { filteredUsers, filters } = get();
    const paginated = applyPagination(
      filteredUsers,
      filters.currentPage,
      filters.pageSize,
    );

    set({ paginatedUsers: paginated });
  },
}));
