const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// Utility function for adding delays
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Functional error creator
interface ApiError extends Error {
  status: number;
}

const createApiError = (message: string, status: number): Error => {
  const error = new Error(message);
  error.name = "ApiError";
  (error as ApiError).status = status;
  return error;
};

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<{ data: T; headers: Headers }> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    // Add a 5 second delay to test loading states
    await wait(500);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw createApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
      );
    }

    const data = await response.json();
    return { data, headers: response.headers };
  } catch (error) {
    if (error instanceof Error && error.name === "ApiError") {
      throw error;
    }
    throw createApiError("Network error occurred", 0);
  }
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  patch: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }),
};

// User-specific API functions
export const userApi = {
  // Check if email is unique (excluding current user for edit operations)
  checkEmailUnique: async (
    email: string,
    excludeUserId?: string,
  ): Promise<boolean> => {
    try {
      const endpoint = excludeUserId
        ? `/users?email=${encodeURIComponent(email)}&id_ne=${excludeUserId}`
        : `/users?email=${encodeURIComponent(email)}`;

      const users = await api.get<Array<{ id: string; email: string }>>(
        endpoint,
      );
      return users.data.length === 0;
    } catch (error) {
      // If API call fails, assume email is unique to avoid blocking user
      console.warn("Failed to check email uniqueness:", error);
      return true;
    }
  },
};
