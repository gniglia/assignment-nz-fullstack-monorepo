import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePagination } from "../usePagination";

describe("usePagination", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(10);
  });

  it("should update current page and reset to first page", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setCurrentPage(3);
    });

    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.goToFirstPage();
    });

    expect(result.current.currentPage).toBe(1);
  });
});
