import { describe, it, expect } from "vitest";
import { buildQueryParams } from "../queryParamsBuilder";

describe("buildQueryParams", () => {
  const baseFilters = {
    searchQuery: "",
    selectedRole: "all",
    selectedStatus: "all",
    sortField: "",
    sortOrder: "asc",
    currentPage: 1,
    pageSize: 10,
  };

  it("should build basic query params with pagination", () => {
    const result = buildQueryParams(baseFilters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
    });
  });

  it("should include search query when provided and meets minimum length", () => {
    const filters = {
      ...baseFilters,
      searchQuery: "john",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
      search: "john",
    });
  });

  it("should not include search query when too short", () => {
    const filters = {
      ...baseFilters,
      searchQuery: "jo",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
    });
    expect(result.search).toBeUndefined();
  });

  it("should trim search query before checking length", () => {
    const filters = {
      ...baseFilters,
      searchQuery: "  john  ",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
      search: "john",
    });
  });

  it("should not include search query when empty or whitespace", () => {
    const testCases = [
      { searchQuery: "" },
      { searchQuery: "   " },
      { searchQuery: "\t\n" },
    ];

    testCases.forEach(({ searchQuery }) => {
      const filters = {
        ...baseFilters,
        searchQuery,
      };

      const result = buildQueryParams(filters);

      expect(result).toEqual({
        page: 1,
        limit: 10,
      });
      expect(result.search).toBeUndefined();
    });
  });

  it("should include role filter when not 'all'", () => {
    const filters = {
      ...baseFilters,
      selectedRole: "admin",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
      role: "admin",
    });
  });

  it("should not include role filter when 'all'", () => {
    const filters = {
      ...baseFilters,
      selectedRole: "all",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
    });
    expect(result.role).toBeUndefined();
  });

  it("should include status filter when not 'all'", () => {
    const filters = {
      ...baseFilters,
      selectedStatus: "active",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
      status: "active",
    });
  });

  it("should not include status filter when 'all'", () => {
    const filters = {
      ...baseFilters,
      selectedStatus: "all",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
    });
    expect(result.status).toBeUndefined();
  });

  it("should include sort field for ascending order", () => {
    const filters = {
      ...baseFilters,
      sortField: "email",
      sortOrder: "asc",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
      sort: "email",
    });
  });

  it("should include sort field with prefix for descending order", () => {
    const filters = {
      ...baseFilters,
      sortField: "createdAt",
      sortOrder: "desc",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
      sort: "-createdAt",
    });
  });

  it("should not include sort when sortField is empty", () => {
    const filters = {
      ...baseFilters,
      sortField: "",
      sortOrder: "asc",
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 1,
      limit: 10,
    });
    expect(result.sort).toBeUndefined();
  });

  it("should handle all filters combined", () => {
    const filters = {
      searchQuery: "john doe",
      selectedRole: "admin",
      selectedStatus: "active",
      sortField: "createdAt",
      sortOrder: "desc",
      currentPage: 3,
      pageSize: 20,
    };

    const result = buildQueryParams(filters);

    expect(result).toEqual({
      page: 3,
      limit: 20,
      search: "john doe",
      role: "admin",
      status: "active",
      sort: "-createdAt",
    });
  });

  it("should handle different page sizes", () => {
    const testCases = [5, 10, 25, 50, 100];

    testCases.forEach((pageSize) => {
      const filters = {
        ...baseFilters,
        pageSize,
      };

      const result = buildQueryParams(filters);

      expect(result.limit).toBe(pageSize);
    });
  });

  it("should handle different page numbers", () => {
    const testCases = [1, 2, 5, 10, 100];

    testCases.forEach((page) => {
      const filters = {
        ...baseFilters,
        currentPage: page,
      };

      const result = buildQueryParams(filters);

      expect(result.page).toBe(page);
    });
  });

  it("should handle different sort fields", () => {
    const testCases = [
      "name",
      "email",
      "role",
      "status",
      "createdAt",
      "updatedAt",
    ];

    testCases.forEach((sortField) => {
      const filters = {
        ...baseFilters,
        sortField,
        sortOrder: "asc",
      };

      const result = buildQueryParams(filters);

      expect(result.sort).toBe(sortField);
    });
  });

  it("should handle different roles", () => {
    const testCases = ["admin", "moderator", "user"];

    testCases.forEach((role) => {
      const filters = {
        ...baseFilters,
        selectedRole: role,
      };

      const result = buildQueryParams(filters);

      expect(result.role).toBe(role);
    });
  });

  it("should handle different statuses", () => {
    const testCases = ["active", "inactive", "pending"];

    testCases.forEach((status) => {
      const filters = {
        ...baseFilters,
        selectedStatus: status,
      };

      const result = buildQueryParams(filters);

      expect(result.status).toBe(status);
    });
  });

  it("should handle edge case with minimum search length", () => {
    const testCases = [
      { searchQuery: "ab", expected: undefined }, // Too short
      { searchQuery: "abc", expected: "abc" }, // Exactly minimum
      { searchQuery: "abcd", expected: "abcd" }, // Above minimum
    ];

    testCases.forEach(({ searchQuery, expected }) => {
      const filters = {
        ...baseFilters,
        searchQuery,
      };

      const result = buildQueryParams(filters);

      if (expected === undefined) {
        expect(result.search).toBeUndefined();
      } else {
        expect(result.search).toBe(expected);
      }
    });
  });

  it("should preserve exact search query text after trimming", () => {
    const testCases = [
      { input: "  john doe  ", expected: "john doe" },
      { input: "alice\tbob", expected: "alice\tbob" },
      { input: "  test@example.com  ", expected: "test@example.com" },
    ];

    testCases.forEach(({ input, expected }) => {
      const filters = {
        ...baseFilters,
        searchQuery: input,
      };

      const result = buildQueryParams(filters);

      expect(result.search).toBe(expected);
    });
  });

  it("should return a new object each time", () => {
    const filters1 = { ...baseFilters };
    const filters2 = { ...baseFilters };

    const result1 = buildQueryParams(filters1);
    const result2 = buildQueryParams(filters2);

    expect(result1).toEqual(result2);
    expect(result1).not.toBe(result2); // Different object references
  });
});
