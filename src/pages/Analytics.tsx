import { useState } from "react";
import { LineChart, BarChart, PieChart, AreaChart } from "@/components/charts";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { EmptyDataState } from "@/components/ui/EmptyState";
import { ChartsSkeleton } from "@/components/ui/SkeletonLoader";
import { Alert, AlertDescription } from "@/components/ui/Alert";
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

// Analytics header component to avoid repetition
function AnalyticsHeader() {
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Analytics
      </h1>
      <p className="mt-2 text-sm sm:text-base text-gray-600">
        View detailed analytics and performance metrics.
      </p>
    </div>
  );
}

export default function Analytics() {
  const { data: analyticsData, isLoading, error } = useAnalytics();
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <AnalyticsHeader />
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load analytics data: {(error as Error).message}
          </AlertDescription>
        </Alert>
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
    <div className="p-4 sm:p-6">
      <AnalyticsHeader />

      {/* Date Range Picker and Export Controls */}
      <div className="mb-6 sm:mb-8">
        <DateRangePicker
          onDateRangeChange={handleDateRangeChange}
          onExport={handleExport}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {isLoading ? (
          <ChartsSkeleton />
        ) : analyticsData && analyticsData.length > 0 ? (
          <>
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
          </>
        ) : (
          <EmptyDataState
            title="No analytics data available"
            description="There's no analytics data to display at the moment. Please try refreshing the page."
          />
        )}
      </div>
    </div>
  );
}
