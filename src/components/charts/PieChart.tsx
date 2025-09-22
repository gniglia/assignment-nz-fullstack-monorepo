import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";

type PieChartData = {
  name: string;
  value: number;
  color?: string;
};

type PieChartProps = {
  data: PieChartData[];
  title?: string;
  isLoading?: boolean;
  error?: Error | null;
};

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export function PieChart({
  data,
  title,
  isLoading = false,
  error = null,
}: PieChartProps) {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartWrapper
      title={title}
      isLoading={isLoading}
      error={error}
      isEmpty={isEmpty}
      emptyMessage="No pie chart data available"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
