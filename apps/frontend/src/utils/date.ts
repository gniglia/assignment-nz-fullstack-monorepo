import { formatDistanceToNow } from "date-fns";

export function formatRelativeTime(dateString: string): string {
  return safeFormatDistanceToNow(dateString, { addSuffix: true });
}

/**
 * Safely formats a date string using date-fns formatDistanceToNow
 * Returns a fallback string if the date is invalid
 */
export function safeFormatDistanceToNow(
  dateString: string,
  options?: { addSuffix?: boolean },
): string {
  try {
    // Check if the date string is valid
    if (!dateString || dateString.trim() === "") {
      return "Unknown date";
    }

    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return formatDistanceToNow(date, options);
  } catch (error) {
    console.warn("Error formatting date:", error, "Date string:", dateString);
    return "Unknown date";
  }
}
