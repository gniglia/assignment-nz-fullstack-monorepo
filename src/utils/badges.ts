/**
 * Utility functions for consistent badge styling across components
 */

export function getStatusColor(status: string): string {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-success/15 dark:text-success dark:border dark:border-success/30";
    case "inactive":
      return "bg-red-100 text-red-800 dark:bg-error/15 dark:text-error dark:border dark:border-error/30";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-warning/15 dark:text-warning dark:border dark:border-warning/30";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground";
  }
}

export function getRoleColor(role: string): string {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800 dark:bg-primary/15 dark:text-primary dark:border dark:border-primary/30";
    case "moderator":
      return "bg-blue-100 text-blue-800 dark:bg-primary/15 dark:text-primary dark:border dark:border-primary/30";
    case "user":
      return "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground";
  }
}

export function getStatusBadgeClasses(status: string): string {
  return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`;
}

export function getRoleBadgeClasses(role: string): string {
  return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`;
}
