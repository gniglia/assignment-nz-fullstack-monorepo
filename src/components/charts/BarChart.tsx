import React from "react";
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
import {
  chartTooltipStyle,
  chartAxisStyle,
  chartGridStyle,
  chartMargin,
} from "./chartStyles";
import type { AnalyticsChartData } from "@/types/api";

type BarChartProps = {
  data: AnalyticsChartData;
  title?: string;
  dataKey?: string;
  color?: string;
  isLoading?: boolean;
  error?: Error | null;
};

export const BarChart = React.memo(function BarChart({
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
        <RechartsBarChart data={data} margin={chartMargin}>
          <CartesianGrid {...chartGridStyle} />
          <XAxis dataKey="label" {...chartAxisStyle} />
          <YAxis {...chartAxisStyle} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
});
