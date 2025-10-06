import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUsersList } from "../useUsersList";
import { createQueryWrapper } from "@/test/test-utils";

// Mock all the dependencies
vi.mock("../useUsersListFilters", () => ({
  useUsersListFilters: vi.fn(() => ({
    searchQuery: "",
    selectedRole: "all",
    selectedStatus: "all",
    sortField: "",
    sortOrder: "asc",
    currentPage: 1,
    pageSize: 10,
    setSearchQuery: vi.fn(),
    setSelectedRole: vi.fn(),
    setSelectedStatus: vi.fn(),
    setSort: vi.fn(),
    clearFilters: vi.fn(),
  })),
}));

vi.mock("../../hooks/usePagination", () => ({
  usePagination: vi.fn(() => ({
    currentPage: 1,
    pageSize: 10,
    setCurrentPage: vi.fn(),
    setPageSize: vi.fn(),
    goToFirstPage: vi.fn(),
    goToLastPage: vi.fn(),
    goToNextPage: vi.fn(),
    goToPreviousPage: vi.fn(),
  })),
}));

vi.mock("./useUsersListControls", () => ({
  useUsersListControls: vi.fn(() => ({
    handlePageChange: vi.fn(),
    handlePageSizeChange: vi.fn(),
    handleSortChange: vi.fn(),
  })),
}));

vi.mock("../../../hooks/queries", () => ({
  useUsersQueryWithParamsAndTotal: vi.fn(() => ({
    data: { users: [], totalCount: 0 },
    isLoading: false,
    isFetching: false,
    error: null,
  })),
}));

vi.mock("../../../hooks/queries/queryParamsBuilder", () => ({
  buildQueryParams: vi.fn(() => ({})),
}));

describe("useUsersList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return users list data and controls", () => {
    const { result } = renderHook(() => useUsersList(), {
      wrapper: createQueryWrapper,
    });

    expect(result.current).toHaveProperty("users");
    expect(result.current).toHaveProperty("totalCount");
    expect(result.current).toHaveProperty("isLoading");
    expect(result.current).toHaveProperty("error");
    expect(result.current).toHaveProperty("setSearchQuery");
    expect(result.current).toHaveProperty("setSelectedRole");
    expect(result.current).toHaveProperty("setCurrentPage");
    expect(result.current).toHaveProperty("clearFilters");
  });

  it("should return empty users array by default", () => {
    const { result } = renderHook(() => useUsersList(), {
      wrapper: createQueryWrapper,
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  it("should return loading state", () => {
    const { result } = renderHook(() => useUsersList(), {
      wrapper: createQueryWrapper,
    });

    // Check that loading states are returned (they may be true or false depending on the actual implementation)
    expect(typeof result.current.isLoading).toBe("boolean");
    expect(typeof result.current.isFetching).toBe("boolean");
  });
});
