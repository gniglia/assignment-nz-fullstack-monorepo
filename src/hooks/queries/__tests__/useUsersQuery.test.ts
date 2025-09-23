import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  useUsersQueryWithParamsAndTotal,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../useUsersQuery";
import { mockUsers, createQueryWrapper } from "@/test/test-utils";
import type { User, CreateUserData, UpdateUserData } from "@/types";

// Mock the API
vi.mock("@/utils/api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("useUsersQuery hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useUsersQueryWithParamsAndTotal", () => {
    it("should fetch users with total count", async () => {
      const { api } = await import("@/utils/api");
      const mockApi = vi.mocked(api);

      const mockHeaders = new Headers();
      mockHeaders.set("X-Total-Count", "2");

      mockApi.get.mockResolvedValue({
        data: mockUsers,
        headers: mockHeaders,
      });

      const { result } = renderHook(
        () => useUsersQueryWithParamsAndTotal({ page: 1, limit: 10 }),
        { wrapper: createQueryWrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual({
        users: mockUsers,
        totalCount: 2,
      });
      expect(mockApi.get).toHaveBeenCalledWith("/users?_page=1&_limit=10");
    });

    it("should handle API errors", async () => {
      const { api } = await import("@/utils/api");
      const mockApi = vi.mocked(api);
      mockApi.get.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useUsersQueryWithParamsAndTotal(), {
        wrapper: createQueryWrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });

    it("should show loading state initially", async () => {
      const { api } = await import("@/utils/api");
      const mockApi = vi.mocked(api);
      mockApi.get.mockImplementation(
        () => new Promise<{ data: unknown; headers: Headers }>(() => {}),
      ); // Never resolves

      const { result } = renderHook(() => useUsersQueryWithParamsAndTotal(), {
        wrapper: createQueryWrapper,
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("useCreateUserMutation", () => {
    it("should create user successfully", async () => {
      const { api } = await import("@/utils/api");
      const mockApi = vi.mocked(api);
      const newUser: CreateUserData = {
        name: "New User",
        email: "new@example.com",
        role: "user",
        status: "active",
        createdAt: "2024-01-03T00:00:00.000Z",
      };

      const createdUser: User = {
        id: "3",
        ...newUser,
        avatar: "https://example.com/avatar3.jpg",
        createdAt: "2024-01-03T00:00:00.000Z",
        updatedAt: "2024-01-03T00:00:00.000Z",
      };

      mockApi.post.mockResolvedValue({
        data: createdUser,
        headers: new Headers(),
      });

      const { result } = renderHook(() => useCreateUserMutation(), {
        wrapper: createQueryWrapper,
      });

      let mutationResult: User;

      await waitFor(async () => {
        mutationResult = await result.current.mutateAsync(newUser);
      });

      expect(mutationResult!).toEqual(createdUser);
      expect(mockApi.post).toHaveBeenCalledWith("/users", newUser);
    });

    it("should handle creation errors", async () => {
      const { api } = await import("@/utils/api");
      const mockApi = vi.mocked(api);
      mockApi.post.mockRejectedValue(new Error("Creation failed"));

      const { result } = renderHook(() => useCreateUserMutation(), {
        wrapper: createQueryWrapper,
      });

      await waitFor(async () => {
        try {
          await result.current.mutateAsync({
            name: "Test",
            email: "test@example.com",
            role: "user",
            status: "active",
            createdAt: "2024-01-03T00:00:00.000Z",
          });
        } catch (error) {
          expect(error).toBeDefined();
        }
      });
    });
  });

  describe("useUpdateUserMutation", () => {
    it("should update user successfully", async () => {
      const { api } = await import("@/utils/api");
      const mockApi = vi.mocked(api);
      const updateData: UpdateUserData = {
        id: "1",
        name: "Updated Name",
        email: "updated@example.com",
      };

      const updatedUser: User = {
        ...mockUsers[0],
        ...updateData,
        role: "admin" as const,
        status: "active" as const,
      };

      mockApi.put.mockResolvedValue({
        data: updatedUser,
        headers: new Headers(),
      });

      const { result } = renderHook(() => useUpdateUserMutation(), {
        wrapper: createQueryWrapper,
      });

      let mutationResult: User;

      await waitFor(async () => {
        mutationResult = await result.current.mutateAsync(updateData);
      });

      expect(mutationResult!).toEqual(updatedUser);
      expect(mockApi.put).toHaveBeenCalledWith("/users/1", {
        name: "Updated Name",
        email: "updated@example.com",
      });
    });
  });

  describe("useDeleteUserMutation", () => {
    it("should delete user successfully", async () => {
      const { api } = await import("@/utils/api");
      const mockApi = vi.mocked(api);
      mockApi.delete.mockResolvedValue({
        data: null,
        headers: new Headers(),
      });

      const { result } = renderHook(() => useDeleteUserMutation(), {
        wrapper: createQueryWrapper,
      });

      let mutationResult: string;

      await waitFor(async () => {
        mutationResult = await result.current.mutateAsync("1");
      });

      expect(mutationResult!).toBe("1");
      expect(mockApi.delete).toHaveBeenCalledWith("/users/1");
    });
  });
});
