import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatRelativeTime, safeFormatDistanceToNow } from "../date";

describe("date utility functions", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("safeFormatDistanceToNow", () => {
    it("should return 'Unknown date' for empty string", () => {
      const result = safeFormatDistanceToNow("");
      expect(result).toBe("Unknown date");
    });

    it("should return 'Invalid date' for invalid date string", () => {
      const result = safeFormatDistanceToNow("invalid-date");
      expect(result).toBe("Invalid date");
    });

    it("should return formatted date for valid input", () => {
      const result = safeFormatDistanceToNow("2024-01-01T00:00:00.000Z");
      // Should return a formatted string (exact format depends on current date)
      expect(typeof result).toBe("string");
      expect(result).not.toBe("Unknown date");
      expect(result).not.toBe("Invalid date");
    });
  });

  describe("formatRelativeTime", () => {
    it("should return formatted relative time", () => {
      const result = formatRelativeTime("2024-01-01T00:00:00.000Z");
      expect(typeof result).toBe("string");
      expect(result).not.toBe("Unknown date");
    });

    it("should handle invalid dates", () => {
      const result = formatRelativeTime("invalid-date");
      expect(result).toBe("Invalid date");
    });
  });
});
