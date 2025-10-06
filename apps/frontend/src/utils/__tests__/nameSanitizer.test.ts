import { describe, it, expect } from "vitest";
import { sanitizeName } from "../../features/users/utils/sanitizeName";

describe("sanitizeName", () => {
  it("should capitalize first letter of each word", () => {
    expect(sanitizeName("john doe")).toBe("John Doe");
    expect(sanitizeName("MARY JANE SMITH")).toBe("Mary Jane Smith");
    expect(sanitizeName("alice bob charlie")).toBe("Alice Bob Charlie");
  });

  it("should handle single words", () => {
    expect(sanitizeName("john")).toBe("John");
    expect(sanitizeName("MARY")).toBe("Mary");
    expect(sanitizeName("alice")).toBe("Alice");
  });

  it("should trim extra whitespace", () => {
    expect(sanitizeName("  john doe  ")).toBe("John Doe");
    expect(sanitizeName("  alice   bob  ")).toBe("Alice Bob");
    expect(sanitizeName("\t\n  john  \t\n")).toBe("John");
  });

  it("should handle multiple spaces between words", () => {
    expect(sanitizeName("john    doe")).toBe("John Doe");
    expect(sanitizeName("alice\t\tbob")).toBe("Alice Bob");
    expect(sanitizeName("mary\n\njane")).toBe("Mary Jane");
  });

  it("should handle empty and invalid inputs", () => {
    expect(sanitizeName("")).toBe("");
    expect(sanitizeName("   ")).toBe("");
    expect(sanitizeName("\t\n")).toBe("");
    expect(sanitizeName(null as unknown as string)).toBe("");
    expect(sanitizeName(undefined as unknown as string)).toBe("");
  });

  it("should handle names with special characters", () => {
    expect(sanitizeName("mary-jane")).toBe("Mary-jane");
    expect(sanitizeName("o'connor")).toBe("O'connor");
    expect(sanitizeName("jean-luc")).toBe("Jean-luc");
  });

  it("should handle mixed case correctly", () => {
    expect(sanitizeName("jOhN dOe")).toBe("John Doe");
    expect(sanitizeName("MaRy JaNe")).toBe("Mary Jane");
    expect(sanitizeName("ALICE bob CHARLIE")).toBe("Alice Bob Charlie");
  });
});
