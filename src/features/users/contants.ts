// User-related filter and form options

export const ROLE_OPTIONS = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
  { value: "moderator", label: "Moderator" },
];

export const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

// Filter options (includes "all" for filtering)
export const ROLE_FILTER_OPTIONS = [
  { value: "all", label: "All Roles" },
  ...ROLE_OPTIONS,
];

export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  ...STATUS_OPTIONS,
];

// Sort options for table
export const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "name", label: "Name ↑" },
  { value: "-name", label: "Name ↓" },
  { value: "email", label: "Email ↑" },
  { value: "-email", label: "Email ↓" },
  { value: "createdAt", label: "Created Date ↑" },
  { value: "-createdAt", label: "Created Date ↓" },
  { value: "lastLogin", label: "Last Login ↑" },
  { value: "-lastLogin", label: "Last Login ↓" },
];
