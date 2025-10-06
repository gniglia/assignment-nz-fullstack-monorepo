// Metric related types
export type Metric = {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease";
  icon: string;
};

// Analytics chart data type for line charts
export type Analytics = Array<{
  id: string;
  label: string;
  value: number;
  date: string;
}>;

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

export type CreateUserData = Omit<User, "id" | "updatedAt" | "lastLogin">;
export type UpdateUserData = Partial<Omit<User, "updatedAt" | "lastLogin">>;
