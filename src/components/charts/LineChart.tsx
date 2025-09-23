import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
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
import type { Analytics } from "@/types";

type LineChartProps = {
  data: Analytics;
  title?: string;
  dataKey?: string;
  color?: string;
  isLoading?: boolean;
  error?: Error | null;
};

export const LineChart = React.memo(function LineChart({
  data,
  title,
  dataKey = "value",
  color = "#3b82f6",
  isLoading = false,
  error = null,
}: LineChartProps) {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartWrapper
      title={title}
      isLoading={isLoading}
      error={error}
      isEmpty={isEmpty}
      emptyMessage="No line chart data available"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={chartMargin}>
          <CartesianGrid {...chartGridStyle} />
          <XAxis dataKey="label" {...chartAxisStyle} />
          <YAxis {...chartAxisStyle} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
});
