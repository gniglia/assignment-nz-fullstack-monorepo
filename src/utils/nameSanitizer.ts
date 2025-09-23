/**
 * Sanitizes a name by capitalizing the first letter of each word
 * and trimming extra whitespace
 *
 * @param name - The name to sanitize
 * @returns The sanitized name with proper capitalization
 *
 * @example
 * sanitizeName("john doe") // "John Doe"
 * sanitizeName("MARY JANE SMITH") // "Mary Jane Smith"
 * sanitizeName("  alice   bob  ") // "Alice Bob"
 */
export function sanitizeName(name: string): string {
  if (!name || typeof name !== "string") {
    return "";
  }

  return name
    .trim() // Remove leading/trailing whitespace
    .split(/\s+/) // Split on one or more whitespace characters
    .filter((word) => word.length > 0) // Remove empty strings
    .map((word) => {
      // Capitalize first letter, lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" "); // Join with single spaces
}
