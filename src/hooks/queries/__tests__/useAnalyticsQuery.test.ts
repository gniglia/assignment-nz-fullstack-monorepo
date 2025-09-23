import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAnalyticsQuery } from "../useAnalyticsQuery";
import { mockAnalyticsData, createQueryWrapper } from "@/test/test-utils";

// Mock the API
vi.mock("@/utils/api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("useAnalyticsQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch analytics data successfully", async () => {
    const { api } = await import("@/utils/api");
    const mockApi = vi.mocked(api);

    mockApi.get.mockResolvedValue({
      data: mockAnalyticsData,
      headers: new Headers(),
    });

    const { result } = renderHook(() => useAnalyticsQuery(), {
      wrapper: createQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockAnalyticsData);
    expect(mockApi.get).toHaveBeenCalledWith("/analytics");
  });

  it("should handle API errors", async () => {
    const { api } = await import("@/utils/api");
    const mockApi = vi.mocked(api);
    mockApi.get.mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useAnalyticsQuery(), {
      wrapper: createQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
