import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "../Input";

describe("Input", () => {
  it("should render input with placeholder", () => {
    render(<Input placeholder="Enter text" />);

    // Check visual outcome: input is rendered with placeholder
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("should show error state", () => {
    render(<Input placeholder="Enter text" error="This field is required" />);

    // Check visual outcome: input has error styling
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toHaveClass("border-red-500");
  });
});
