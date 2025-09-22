import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { useAnalytics } from "@/hooks/useApi";
import { Alert, AlertDescription } from "@/components/ui/Alert";

export function AnalyticsOverview() {
  const { data: analyticsData, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Analytics Overview
        </h2>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Analytics Overview
        </h2>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load analytics data: {(error as Error).message}
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (
    !analyticsData ||
    !Array.isArray(analyticsData) ||
    analyticsData.length === 0
  ) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Analytics Overview
        </h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No analytics data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Analytics Overview
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="label"
              className="text-sm"
              tick={{ fontSize: 12 }}
            />
            <YAxis className="text-sm" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#374151", fontWeight: "500" }}
              formatter={(value: number) => [value.toLocaleString(), "Value"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
