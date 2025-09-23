/**
 * Shared chart styling constants and utilities
 */

export const chartTooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  color: "hsl(var(--card-foreground))",
};

export const chartTooltipLabelStyle = {
  color: "hsl(var(--foreground))",
  fontWeight: "500",
};

export const chartAxisStyle = {
  stroke: "hsl(var(--muted-foreground))",
  fontSize: 12,
};

export const chartGridStyle = {
  strokeDasharray: "3 3",
  stroke: "hsl(var(--border))",
};

export const chartMargin = {
  top: 10,
  right: 20,
  left: 10,
  bottom: 10,
};
