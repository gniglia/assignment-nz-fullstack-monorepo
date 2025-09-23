import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from "../Alert";

describe("Alert", () => {
  it("should render alert with message", () => {
    render(<Alert>This is an alert message</Alert>);

    // Check visual outcome: alert message is displayed
    expect(screen.getByText("This is an alert message")).toBeInTheDocument();
  });

  it("should show different variants", () => {
    const { rerender } = render(<Alert variant="default">Default alert</Alert>);
    expect(screen.getByText("Default alert")).toBeInTheDocument();

    rerender(<Alert variant="destructive">Error alert</Alert>);
    expect(screen.getByText("Error alert")).toBeInTheDocument();
  });
});
