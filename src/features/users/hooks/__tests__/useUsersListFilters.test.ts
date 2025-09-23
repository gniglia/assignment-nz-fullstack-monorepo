import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUsersListFilters } from "../useUsersListFilters";

vi.mock("@/stores/userPreferencesStore", () => ({
  useUserPreferencesStore: vi.fn(() => ({
    searchQuery: "john",
    selectedRole: "admin",
    selectedStatus: "active",
    sortField: "email",
    sortOrder: "desc",
    setSearchQuery: vi.fn(),
    setSelectedRole: vi.fn(),
    setSelectedStatus: vi.fn(),
    setSort: vi.fn(),
    clearFilters: vi.fn(),
  })),
}));

describe("useUsersListFilters", () => {
  const mockStore = {
    searchQuery: "john",
    selectedRole: "admin",
    selectedStatus: "active",
    sortField: "email",
    sortOrder: "desc",
    setSearchQuery: vi.fn(),
    setSelectedRole: vi.fn(),
    setSelectedStatus: vi.fn(),
    setSort: vi.fn(),
    clearFilters: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const { useUserPreferencesStore } = await import("@/stores/userPreferencesStore");
    const mockUseUserPreferencesStore = vi.mocked(useUserPreferencesStore);
    mockUseUserPreferencesStore.mockReturnValue(mockStore);
  });

  it("should return filter values and call store actions", () => {
    const { result } = renderHook(() => useUsersListFilters());

    expect(result.current.searchQuery).toBe("john");
    expect(result.current.selectedRole).toBe("admin");

    act(() => {
      result.current.setSearchQuery("test");
      result.current.clearFilters();
    });

    expect(mockStore.setSearchQuery).toHaveBeenCalledWith("test");
    expect(mockStore.clearFilters).toHaveBeenCalled();
  });
});
