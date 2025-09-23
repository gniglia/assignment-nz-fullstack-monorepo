/**
 * Utility functions for consistent badge styling across components
 */

const STATUS_COLORS = {
  active:
    "bg-green-100 text-green-800 dark:bg-success/15 dark:text-success dark:border dark:border-success/30",
  inactive:
    "bg-red-100 text-red-800 dark:bg-error/15 dark:text-error dark:border dark:border-error/30",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-warning/15 dark:text-warning dark:border dark:border-warning/30",
} as const;

const ROLE_COLORS = {
  admin:
    "bg-purple-100 text-purple-800 dark:bg-primary/15 dark:text-primary dark:border dark:border-primary/30",
  moderator:
    "bg-blue-100 text-blue-800 dark:bg-primary/15 dark:text-primary dark:border dark:border-primary/30",
  user: "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
} as const;

const DEFAULT_COLOR =
  "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground";

export function getStatusColor(status: string): string {
  return STATUS_COLORS[status as keyof typeof STATUS_COLORS] ?? DEFAULT_COLOR;
}

export function getRoleColor(role: string): string {
  return ROLE_COLORS[role as keyof typeof ROLE_COLORS] ?? DEFAULT_COLOR;
}

export function getStatusBadgeClasses(status: string): string {
  return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
    status,
  )}`;
}

export function getRoleBadgeClasses(role: string): string {
  return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
    role,
  )}`;
}
