import { formatDistanceToNow } from "date-fns";

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

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
