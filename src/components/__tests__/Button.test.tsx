import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders button with text", () => {
    const { getByRole } = render(<Button>Click me</Button>);
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    const { getByRole } = render(<Button>Primary</Button>);
    const button = getByRole("button");
    expect(button).toHaveClass("bg-primary-600");
  });

  it("applies secondary variant styles when specified", () => {
    const { getByRole } = render(
      <Button variant="secondary">Secondary</Button>,
    );
    const button = getByRole("button");
    expect(button).toHaveClass("bg-gray-600");
  });

  it("disables button when loading", () => {
    const { getByRole } = render(<Button loading>Loading</Button>);
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it("shows loading spinner when loading", () => {
    const { getByRole } = render(<Button loading>Loading</Button>);
    const button = getByRole("button");
    expect(button).toContainHTML("svg");
  });
});
