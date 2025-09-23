import type { UserQueryParams } from "./types";

// Functional helper to build query string from params
export const buildQueryString = (params: UserQueryParams): string => {
  const searchParams = new URLSearchParams();

  // Add pagination params (convert to json-server format)
  if (params.page) searchParams.set("_page", params.page.toString());
  if (params.limit) searchParams.set("_limit", params.limit.toString());

  // Add sorting params (convert to json-server format)
  if (params.sort) {
    const isDescending = params.sort.startsWith("-");
    const sortField = isDescending ? params.sort.substring(1) : params.sort;
    const sortOrder = isDescending ? "desc" : "asc";

    searchParams.set("_sort", sortField);
    searchParams.set("_order", sortOrder);
  }

  // Add filtering params
  if (params.role && params.role !== "all")
    searchParams.set("role", params.role);
  if (params.status && params.status !== "all")
    searchParams.set("status", params.status);

  // Add search params (json-server supports q for general search)
  if (params.search) searchParams.set("q", params.search);

  return searchParams.toString();
};

// Functional helper to build endpoint URL
export const buildEndpoint = (params: UserQueryParams): string => {
  const queryString = buildQueryString(params);
  return queryString ? `/users?${queryString}` : "/users";
};
