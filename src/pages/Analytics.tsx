import { useState } from "react";
import { LineChart, BarChart, PieChart, AreaChart } from "@/components/charts";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useAnalytics } from "@/hooks/useApi";
import {
  filterDataByDateRange,
  exportToCSV,
  exportToJSON,
  getDefaultDateRange,
} from "@/utils/analytics";

type DateRange = {
  startDate: string;
  endDate: string;
};

export default function Analytics() {
  const { data: analyticsData, isLoading, error } = useAnalytics();
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">
            View detailed analytics and performance metrics.
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">
            Failed to load analytics data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Filter data based on selected date range
  const filteredData = filterDataByDateRange(analyticsData || [], dateRange);

  // Transform the filtered data for different chart types
  const baseData = filteredData.length > 0 ? filteredData : analyticsData || [];

  // For revenue chart, multiply values by 30 to simulate revenue
  const revenueData = baseData.map((item) => ({
    ...item,
    value: item.value * 30,
  }));

  // For pie chart, create user roles distribution from the data
  const userRolesData = [
    { name: "Admin", value: 15, color: "#3b82f6" },
    { name: "Moderator", value: 25, color: "#10b981" },
    {
      name: "User",
      value: Math.max(
        100,
        baseData.reduce((sum, item) => sum + item.value, 0) - 40,
      ),
      color: "#f59e0b",
    },
  ];

  // For area chart, use the same data but with different styling
  const areaData = baseData;

  // Handle date range changes
  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
  };

  // Handle export functionality
  const handleExport = (format: "csv" | "json") => {
    if (format === "csv") {
      exportToCSV(
        baseData,
        `analytics-${dateRange.startDate}-to-${dateRange.endDate}`,
      );
    } else {
      exportToJSON(
        baseData,
        `analytics-${dateRange.startDate}-to-${dateRange.endDate}`,
      );
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">
          View detailed analytics and performance metrics.
        </p>
      </div>

      {/* Date Range Picker and Export Controls */}
      <DateRangePicker
        onDateRangeChange={handleDateRangeChange}
        onExport={handleExport}
        isLoading={isLoading}
      />

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Left - User Growth Line Chart */}
        <LineChart
          data={baseData}
          title="User Growth"
          isLoading={isLoading}
          color="#3b82f6"
        />

        {/* Top Right - Revenue Bar Chart */}
        <BarChart
          data={revenueData}
          title="Monthly Revenue"
          isLoading={isLoading}
          color="#10b981"
        />

        {/* Bottom Left - User Roles Pie Chart */}
        <PieChart
          data={userRolesData}
          title="User Roles Distribution"
          isLoading={isLoading}
        />

        {/* Bottom Right - Traffic Sources Area Chart */}
        <AreaChart
          data={areaData}
          title="Traffic Sources"
          isLoading={isLoading}
          color="#8b5cf6"
        />
      </div>
    </div>
  );
}
