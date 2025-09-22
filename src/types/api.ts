// User related types
export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "pending";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
};

export type CreateUserData = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserData = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt">
>;

// Analytics related types
export type Analytics = {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowth: number;
};

// Analytics chart data type for line charts
export type AnalyticsChartData = Array<{
  id: string;
  label: string;
  value: number;
  date: string;
}>;

// Error response type
export type ApiError = {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
};
