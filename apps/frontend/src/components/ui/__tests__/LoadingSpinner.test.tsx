import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("should display spinner without text by default", () => {
    render(<LoadingSpinner />);

    // Check visual outcome: spinner is visible but no text
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should display custom text when provided", () => {
    render(<LoadingSpinner text="Fetching data..." />);

    // Check visual outcome: custom text is shown
    expect(screen.getByText("Fetching data...")).toBeInTheDocument();
  });
});
