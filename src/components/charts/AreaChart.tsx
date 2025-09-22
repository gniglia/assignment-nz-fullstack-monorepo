import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";
import type { AnalyticsChartData } from "@/types/api";

type AreaChartProps = {
  data: AnalyticsChartData;
  title?: string;
  dataKey?: string;
  color?: string;
  isLoading?: boolean;
  error?: Error | null;
};

export function AreaChart({
  data,
  title,
  dataKey = "value",
  color = "#8b5cf6",
  isLoading = false,
  error = null,
}: AreaChartProps) {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartWrapper
      title={title}
      isLoading={isLoading}
      error={error}
      isEmpty={isEmpty}
      emptyMessage="No area chart data available"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
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
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={color}
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
