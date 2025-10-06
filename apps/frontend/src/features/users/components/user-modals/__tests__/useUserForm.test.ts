import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUserForm } from "../useUserForm";
import type { User } from "@/types";

vi.mock("react-hot-toast", () => ({
  default: { error: vi.fn() },
}));

vi.mock("@/utils/api", () => ({
  userApi: { checkEmailUnique: vi.fn() },
}));

const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin",
  status: "active",
  avatar: "https://example.com/avatar.jpg",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

describe("useUserForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useUserForm());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.form.getValues()).toEqual({
      name: "",
      email: "",
      role: "user",
      status: "active",
    });
  });

  it("should initialize with user data for edit mode", () => {
    const { result } = renderHook(() => useUserForm(mockUser));

    expect(result.current.form.getValues()).toEqual({
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      status: "active",
    });
  });

  it("should handle modal open/close and form reset", () => {
    const { result } = renderHook(() => useUserForm(mockUser));

    act(() => {
      result.current.form.setValue("name", "Modified");
    });

    act(() => {
      result.current.handleOpenChange(true);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleOpenChange(false);
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.form.getValues().name).toBe("John Doe");
  });

  it("should validate email uniqueness", async () => {
    const { userApi } = await import("@/utils/api");
    const mockCheckEmailUnique = vi.mocked(userApi.checkEmailUnique);
    mockCheckEmailUnique.mockResolvedValue(true);

    const { result } = renderHook(() => useUserForm());

    let validationResult: boolean;

    await act(async () => {
      validationResult = await result.current.validateEmailUniqueness(
        "test@example.com",
      );
    });

    expect(validationResult!).toBe(true);
    expect(mockCheckEmailUnique).toHaveBeenCalledWith(
      "test@example.com",
      undefined,
    );
  });
});
