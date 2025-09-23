import React from "react";
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
import {
  chartTooltipStyle,
  chartAxisStyle,
  chartGridStyle,
  chartMargin,
} from "./chartStyles";
import type { AnalyticsChartData } from "@/types/api";

type AreaChartProps = {
  data: AnalyticsChartData;
  title?: string;
  dataKey?: string;
  color?: string;
  isLoading?: boolean;
  error?: Error | null;
};

export const AreaChart = React.memo(function AreaChart({
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
        <RechartsAreaChart data={data} margin={chartMargin}>
          <CartesianGrid {...chartGridStyle} />
          <XAxis dataKey="label" {...chartAxisStyle} />
          <YAxis {...chartAxisStyle} />
          <Tooltip contentStyle={chartTooltipStyle} />
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
});
