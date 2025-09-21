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
  topPages: Array<{
    page: string;
    views: number;
    uniqueViews: number;
  }>;
  trafficSources: Array<{
    source: string;
    visits: number;
    percentage: number;
  }>;
};

// Analytics chart data type for line charts
export type AnalyticsChartData = Array<{
  id: string;
  label: string;
  value: number;
  date: string;
}>;

// Dashboard related types
export type DashboardData = {
  summary: {
    totalUsers: number;
    totalRevenue: number;
    totalOrders: number;
    conversionRate: number;
  };
  recentActivity: Array<{
    id: string;
    type: "user_registration" | "order" | "login" | "page_view";
    description: string;
    timestamp: string;
    userId?: string;
  }>;
  charts: {
    userGrowth: Array<{
      date: string;
      users: number;
    }>;
    revenue: Array<{
      date: string;
      revenue: number;
    }>;
  };
};

// API Response wrapper type
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

// Error response type
export type ApiError = {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
};
