import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Users, DollarSign } from "lucide-react";
import { MetricCard } from "../MetricCard";

// Mock framer-motion completely - just return regular divs
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      whileHover,
      whileTap,
      initial,
      animate,
      transition,
      ...props
    }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any) => <div {...props}>{children}</div>,
  },
}));

// Mock the AnimatedValue component to just show the value
vi.mock("../AnimatedValue", () => ({
  AnimatedValue: ({ value }: { value: number }) => (
    <span>{value.toLocaleString()}</span>
  ),
}));

// Mock the AnimatedIcon component
vi.mock("../AnimatedIcon", () => ({
  AnimatedIcon: ({
    icon: Icon,
    className,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    className: string;
  }) => (
    <div className={className}>
      <Icon />
    </div>
  ),
}));

describe("MetricCard", () => {
  const defaultProps = {
    title: "Total Users",
    value: 1234,
    change: 12.5,
    changeType: "increase" as const,
    icon: Users,
  };

  it("should render with correct title", () => {
    render(<MetricCard {...defaultProps} />);

    expect(screen.getByText("Total Users")).toBeInTheDocument();
  });

  it("should render with correct value", () => {
    render(<MetricCard {...defaultProps} />);

    expect(screen.getByText("1,234")).toBeInTheDocument();
  });

  it("should render with different props", () => {
    render(
      <MetricCard
        title="Revenue"
        value={56789}
        change={-5.2}
        changeType="decrease"
        icon={DollarSign}
      />,
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("56,789")).toBeInTheDocument();
  });

  it("should render with zero value", () => {
    render(<MetricCard {...defaultProps} value={0} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render with negative value", () => {
    render(<MetricCard {...defaultProps} value={-100} />);

    expect(screen.getByText("-100")).toBeInTheDocument();
  });
});
