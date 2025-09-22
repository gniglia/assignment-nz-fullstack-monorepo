const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// Functional error creator
const createApiError = (message: string, status: number): Error => {
  const error = new Error(message);
  error.name = "ApiError";
  (error as any).status = status;
  return error;
};

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    // Add a 300ms delay to prevent flickering during quick operations
    const [response] = await Promise.all([
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      }),
      new Promise((resolve) => setTimeout(resolve, 500)),
    ]);

    if (!response.ok) {
      throw createApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
      );
    }

    return await response.json();
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
  put: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: "DELETE",
    }),
};

// User-specific API functions
export const userApi = {
  // Check if name is unique (excluding current user for edit operations)
  checkNameUnique: async (
    name: string,
    excludeUserId?: string,
  ): Promise<boolean> => {
    try {
      const endpoint = excludeUserId
        ? `/users?name=${encodeURIComponent(name)}&id_ne=${excludeUserId}`
        : `/users?name=${encodeURIComponent(name)}`;

      const users = await api.get<Array<{ id: string; name: string }>>(
        endpoint,
      );
      return users.length === 0;
    } catch (error) {
      // If API call fails, assume name is unique to avoid blocking user
      console.warn("Failed to check name uniqueness:", error);
      return true;
    }
  },
};
