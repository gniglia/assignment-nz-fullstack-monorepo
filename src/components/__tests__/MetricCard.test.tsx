import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MetricCard } from "@/components/metric-card/MetricCard";
import { Users, TrendingUp } from "lucide-react";

describe("MetricCard", () => {
  it("renders metric card with correct title and value", () => {
    render(
      <MetricCard
        title="Total Users"
        value={1240}
        change={12.5}
        changeType="increase"
        icon={Users}
      />,
    );

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("1,240")).toBeInTheDocument();
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
  });

  it("renders increase change with green color", () => {
    render(
      <MetricCard
        title="Revenue"
        value={24500}
        change={8.7}
        changeType="increase"
        icon={TrendingUp}
      />,
    );

    const changeElement = screen.getByText("+8.7%");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement).toHaveClass("text-green-600");
  });

  it("renders decrease change with red color", () => {
    render(
      <MetricCard
        title="Active Sessions"
        value={89}
        change={3.2}
        changeType="decrease"
        icon={Users}
      />,
    );

    const changeElement = screen.getByText("3.2%");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement).toHaveClass("text-red-600");
  });

  it("renders icon correctly", () => {
    const { container } = render(
      <MetricCard
        title="Test Metric"
        value={100}
        change={5}
        changeType="increase"
        icon={Users}
      />,
    );

    // Check if the SVG icon is rendered
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass("lucide", "lucide-users");
  });

  it("formats large numbers with commas", () => {
    render(
      <MetricCard
        title="Large Number"
        value={1234567}
        change={10}
        changeType="increase"
        icon={Users}
      />,
    );

    expect(screen.getByText("1,234,567")).toBeInTheDocument();
  });

  it("handles decimal values correctly", () => {
    render(
      <MetricCard
        title="Conversion Rate"
        value={3.24}
        change={2.1}
        changeType="increase"
        icon={TrendingUp}
      />,
    );

    expect(screen.getByText("3.24")).toBeInTheDocument();
    expect(screen.getByText("+2.1%")).toBeInTheDocument();
  });

  it("applies correct CSS classes for styling", () => {
    const { container } = render(
      <MetricCard
        title="Test"
        value={100}
        change={5}
        changeType="increase"
        icon={Users}
      />,
    );

    // Check if the card has the expected structure
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass(
      "bg-white",
      "rounded-lg",
      "shadow-sm",
      "border",
      "border-gray-200",
      "p-6",
    );
  });
});
