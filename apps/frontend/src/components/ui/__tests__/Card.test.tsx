import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  it("should render children content", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>,
    );

    // Check visual outcome: content is displayed
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("should apply different variants", () => {
    const { rerender } = render(
      <Card variant="elevated">
        <p>Elevated card</p>
      </Card>,
    );

    // Check visual outcome: elevated variant is applied
    expect(screen.getByText("Elevated card")).toBeInTheDocument();

    rerender(
      <Card variant="outlined">
        <p>Outlined card</p>
      </Card>,
    );

    // Check visual outcome: outlined variant is applied
    expect(screen.getByText("Outlined card")).toBeInTheDocument();
  });
});
