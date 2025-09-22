import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "@/components/ui/Avatar";

describe("Avatar", () => {
  it("renders avatar with image when src is provided", () => {
    const { getByAltText } = render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="Test User"
        name="Test User"
      />,
    );

    const img = getByAltText("Test User");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("renders initials when no src is provided", () => {
    const { getByText } = render(<Avatar alt="Test User" name="Test User" />);

    expect(getByText("T")).toBeInTheDocument();
  });

  it("renders initials when image fails to load", () => {
    const { getByAltText, getByText } = render(
      <Avatar
        src="https://example.com/broken.jpg"
        alt="Test User"
        name="Test User"
      />,
    );

    const img = getByAltText("Test User");

    // Simulate image load error
    fireEvent.error(img);

    // Should show initials after error
    expect(getByText("T")).toBeInTheDocument();
  });

  it("applies correct size classes", () => {
    const { container } = render(
      <Avatar alt="Test User" name="Test User" size="sm" />,
    );

    const avatarDiv = container.firstChild as HTMLElement;
    expect(avatarDiv).toHaveClass("w-6", "h-6", "text-xs");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Avatar alt="Test User" name="Test User" className="custom-class" />,
    );

    const avatarDiv = container.firstChild as HTMLElement;
    expect(avatarDiv).toHaveClass("custom-class");
  });

  it("handles names with multiple words correctly", () => {
    const { getByText } = render(<Avatar alt="John Doe" name="John Doe" />);

    expect(getByText("J")).toBeInTheDocument();
  });

  it("handles empty names gracefully", () => {
    const { getByText } = render(<Avatar alt="User" name="" />);

    expect(getByText("?")).toBeInTheDocument();
  });
});
