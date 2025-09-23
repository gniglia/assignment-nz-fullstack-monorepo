import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SortOrder } from "@/types";

type UserPreferencesState = {
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
  sortField: string;
  sortOrder: SortOrder;
  setSearchQuery: (query: string) => void;
  setSelectedRole: (role: string) => void;
  setSelectedStatus: (status: string) => void;
  setSort: (field: string, order: SortOrder) => void;
  clearFilters: () => void;
};

const defaultValues = {
  searchQuery: "",
  selectedRole: "all",
  selectedStatus: "all",
  sortField: "",
  sortOrder: "asc" as SortOrder,
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      // State
      ...defaultValues,

      // Actions
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedRole: (selectedRole) => set({ selectedRole }),
      setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
      setSort: (sortField, sortOrder) => set({ sortField, sortOrder }),
      clearFilters: () => set(defaultValues),
    }),
    {
      name: "user-preferences-storage",
      partialize: (state) => ({
        searchQuery: state.searchQuery,
        selectedRole: state.selectedRole,
        selectedStatus: state.selectedStatus,
        sortField: state.sortField,
        sortOrder: state.sortOrder,
      }),
    },
  ),
);
