import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";
import type { AnalyticsChartData } from "@/types/api";

type BarChartProps = {
  data: AnalyticsChartData;
  title?: string;
  dataKey?: string;
  color?: string;
  isLoading?: boolean;
  error?: Error | null;
};

export function BarChart({
  data,
  title,
  dataKey = "value",
  color = "#10b981",
  isLoading = false,
  error = null,
}: BarChartProps) {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartWrapper
      title={title}
      isLoading={isLoading}
      error={error}
      isEmpty={isEmpty}
      emptyMessage="No bar chart data available"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="label"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
