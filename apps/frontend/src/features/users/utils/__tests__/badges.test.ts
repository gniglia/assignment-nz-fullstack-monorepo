import { describe, it, expect } from "vitest";
import {
  getStatusColor,
  getRoleColor,
  getStatusBadgeClasses,
  getRoleBadgeClasses,
} from "../badges";

describe("badges utility functions", () => {
  describe("getStatusColor", () => {
    it("should return correct color for active status", () => {
      const result = getStatusColor("active");
      expect(result).toContain("bg-green-100 text-green-800");
      expect(result).toContain("dark:bg-success/15 dark:text-success");
    });

    it("should return correct color for inactive status", () => {
      const result = getStatusColor("inactive");
      expect(result).toContain("bg-red-100 text-red-800");
      expect(result).toContain("dark:bg-error/15 dark:text-error");
    });

    it("should return correct color for pending status", () => {
      const result = getStatusColor("pending");
      expect(result).toContain("bg-yellow-100 text-yellow-800");
      expect(result).toContain("dark:bg-warning/15 dark:text-warning");
    });

    it("should return default color for unknown status", () => {
      const result = getStatusColor("unknown");
      expect(result).toBe(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });

    it("should return default color for empty string", () => {
      const result = getStatusColor("");
      expect(result).toBe(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });

    it("should be case sensitive", () => {
      const result = getStatusColor("Active");
      expect(result).toBe(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });
  });

  describe("getRoleColor", () => {
    it("should return correct color for admin role", () => {
      const result = getRoleColor("admin");
      expect(result).toContain("bg-purple-100 text-purple-800");
      expect(result).toContain("dark:bg-primary/15 dark:text-primary");
    });

    it("should return correct color for moderator role", () => {
      const result = getRoleColor("moderator");
      expect(result).toContain("bg-blue-100 text-blue-800");
      expect(result).toContain("dark:bg-primary/15 dark:text-primary");
    });

    it("should return correct color for user role", () => {
      const result = getRoleColor("user");
      expect(result).toBe(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });

    it("should return default color for unknown role", () => {
      const result = getRoleColor("unknown");
      expect(result).toBe(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });

    it("should return default color for empty string", () => {
      const result = getRoleColor("");
      expect(result).toBe(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });

    it("should be case sensitive", () => {
      const result = getRoleColor("Admin");
      expect(result).toBe(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });
  });

  describe("getStatusBadgeClasses", () => {
    it("should return complete badge classes for active status", () => {
      const result = getStatusBadgeClasses("active");

      // Should include base badge classes
      expect(result).toContain(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      );

      // Should include status-specific colors
      expect(result).toContain("bg-green-100 text-green-800");
      expect(result).toContain("dark:bg-success/15 dark:text-success");
    });

    it("should return complete badge classes for inactive status", () => {
      const result = getStatusBadgeClasses("inactive");

      expect(result).toContain(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      );
      expect(result).toContain("bg-red-100 text-red-800");
      expect(result).toContain("dark:bg-error/15 dark:text-error");
    });

    it("should return complete badge classes for pending status", () => {
      const result = getStatusBadgeClasses("pending");

      expect(result).toContain(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      );
      expect(result).toContain("bg-yellow-100 text-yellow-800");
      expect(result).toContain("dark:bg-warning/15 dark:text-warning");
    });

    it("should return default badge classes for unknown status", () => {
      const result = getStatusBadgeClasses("unknown");

      expect(result).toContain(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      );
      expect(result).toContain(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });

    it("should always include base badge styling", () => {
      const statuses = ["active", "inactive", "pending", "unknown", ""];

      statuses.forEach((status) => {
        const result = getStatusBadgeClasses(status);
        expect(result).toContain("inline-flex");
        expect(result).toContain("items-center");
        expect(result).toContain("px-2.5");
        expect(result).toContain("py-0.5");
        expect(result).toContain("rounded-full");
        expect(result).toContain("text-xs");
        expect(result).toContain("font-medium");
      });
    });
  });

  describe("getRoleBadgeClasses", () => {
    it("should return complete badge classes for admin role", () => {
      const result = getRoleBadgeClasses("admin");

      expect(result).toContain(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      );
      expect(result).toContain("bg-purple-100 text-purple-800");
      expect(result).toContain("dark:bg-primary/15 dark:text-primary");
    });

    it("should return complete badge classes for moderator role", () => {
      const result = getRoleBadgeClasses("moderator");

      expect(result).toContain(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      );
      expect(result).toContain("bg-blue-100 text-blue-800");
      expect(result).toContain("dark:bg-primary/15 dark:text-primary");
    });

    it("should return complete badge classes for user role", () => {
      const result = getRoleBadgeClasses("user");

      expect(result).toContain(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      );
      expect(result).toContain(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });

    it("should return default badge classes for unknown role", () => {
      const result = getRoleBadgeClasses("unknown");

      expect(result).toContain(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      );
      expect(result).toContain(
        "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
      );
    });

    it("should always include base badge styling", () => {
      const roles = ["admin", "moderator", "user", "unknown", ""];

      roles.forEach((role) => {
        const result = getRoleBadgeClasses(role);
        expect(result).toContain("inline-flex");
        expect(result).toContain("items-center");
        expect(result).toContain("px-2.5");
        expect(result).toContain("py-0.5");
        expect(result).toContain("rounded-full");
        expect(result).toContain("text-xs");
        expect(result).toContain("font-medium");
      });
    });
  });

  describe("integration tests", () => {
    it("should handle all valid status values", () => {
      const validStatuses = ["active", "inactive", "pending"];

      validStatuses.forEach((status) => {
        const color = getStatusColor(status);
        const badgeClasses = getStatusBadgeClasses(status);

        expect(color).not.toBe(
          "bg-gray-100 text-gray-800 dark:bg-muted dark:text-muted-foreground",
        );
        expect(badgeClasses).toContain(color);
      });
    });

    it("should handle all valid role values", () => {
      const validRoles = ["admin", "moderator", "user"];

      validRoles.forEach((role) => {
        const color = getRoleColor(role);
        const badgeClasses = getRoleBadgeClasses(role);

        expect(badgeClasses).toContain(color);
      });
    });

    it("should be consistent between color and badge class functions", () => {
      const testValues = [
        {
          type: "status",
          values: ["active", "inactive", "pending", "unknown"],
        },
        { type: "role", values: ["admin", "moderator", "user", "unknown"] },
      ];

      testValues.forEach(({ type, values }) => {
        values.forEach((value) => {
          const color =
            type === "status" ? getStatusColor(value) : getRoleColor(value);
          const badgeClasses =
            type === "status"
              ? getStatusBadgeClasses(value)
              : getRoleBadgeClasses(value);

          expect(badgeClasses).toContain(color);
        });
      });
    });
  });
});
