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
import { motion, AnimatePresence } from "framer-motion";
import {
  staggerContainer,
  fadeInUp,
  chartContainerVariants,
} from "@/lib/animations";
import { BarChart3, TrendingUp, Activity } from "lucide-react";

type DateRange = {
  startDate: string;
  endDate: string;
};

// Analytics header component with animations
function AnalyticsHeader() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight drop-shadow-lg pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Analytics
      </motion.h1>

      <motion.p
        className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        Dive deep into your data with interactive charts, comprehensive metrics,
        and real-time insights to drive informed decisions
      </motion.p>

      {/* Animated icons */}
      <motion.div
        className="flex items-center gap-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span>Interactive Charts</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <TrendingUp className="w-4 h-4 text-teal-600" />
          <span>Performance Metrics</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Activity className="w-4 h-4 text-cyan-600" />
          <span>Real-time Data</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Analytics() {
  const { data: analyticsData, isLoading, error } = useAnalytics();
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());

  if (error) {
    return (
      <motion.div
        className="p-4 sm:p-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <AnalyticsHeader />
        <motion.div variants={fadeInUp}>
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load analytics data: {(error as Error).message}
            </AlertDescription>
          </Alert>
        </motion.div>
      </motion.div>
    );
  }

  // Filter data based on selected date range
  const filteredData = filterDataByDateRange(analyticsData || [], dateRange);

  // Use the same base data for all charts to ensure consistency
  const baseData = filteredData.length > 0 ? filteredData : analyticsData || [];

  // Transform analytics data for pie chart representation
  // Group data by value ranges to create meaningful segments
  const pieChartData = (() => {
    if (baseData.length === 0) return [];

    const sortedData = [...baseData].sort((a, b) => b.value - a.value);
    const total = baseData.reduce((sum, item) => sum + item.value, 0);

    // Create segments based on data distribution
    const highValue = sortedData.filter((item) => item.value >= total * 0.3);
    const mediumValue = sortedData.filter(
      (item) => item.value >= total * 0.15 && item.value < total * 0.3,
    );
    const lowValue = sortedData.filter((item) => item.value < total * 0.15);

    return [
      {
        name: "High Activity",
        value: highValue.reduce((sum, item) => sum + item.value, 0),
        color: "#3b82f6",
      },
      {
        name: "Medium Activity",
        value: mediumValue.reduce((sum, item) => sum + item.value, 0),
        color: "#10b981",
      },
      {
        name: "Low Activity",
        value: lowValue.reduce((sum, item) => sum + item.value, 0),
        color: "#f59e0b",
      },
    ].filter((segment) => segment.value > 0);
  })();

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
    <motion.div
      className="p-4 sm:p-6 space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <AnalyticsHeader />

      {/* Date Range Picker and Export Controls */}
      <motion.div className="mb-8" variants={fadeInUp}>
        <DateRangePicker
          onDateRangeChange={handleDateRangeChange}
          onExport={handleExport}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Charts Section Header */}
      <motion.div className="mb-8" variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Analytics Data Visualization
        </h2>
        <p className="text-muted-foreground">
          Explore your data through different chart representations and
          interactive insights
        </p>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6"
        variants={chartContainerVariants}
        initial="hidden"
        animate="visible"
        key="charts-container"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <ChartsSkeleton key="skeleton" />
          ) : analyticsData && analyticsData.length > 0 ? (
            <div key="charts" className="contents">
              {/* Top Left - Analytics Data Line Chart */}
              <motion.div
                variants={chartContainerVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <LineChart
                  data={baseData}
                  title="Line View"
                  isLoading={isLoading}
                  color="#3b82f6"
                />
              </motion.div>

              {/* Top Right - Analytics Data Bar Chart */}
              <motion.div
                variants={chartContainerVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <BarChart
                  data={baseData}
                  title="Bar View"
                  isLoading={isLoading}
                  color="#10b981"
                />
              </motion.div>

              {/* Bottom Left - Analytics Data Distribution Pie Chart */}
              <motion.div
                variants={chartContainerVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <PieChart
                  data={pieChartData}
                  title="Distribution View"
                  isLoading={isLoading}
                />
              </motion.div>

              {/* Bottom Right - Analytics Data Area Chart */}
              <motion.div
                variants={chartContainerVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <AreaChart
                  data={baseData}
                  title="Area View"
                  isLoading={isLoading}
                  color="#8b5cf6"
                />
              </motion.div>
            </div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="col-span-full"
            >
              <EmptyDataState
                title="No analytics data available"
                description="There's no analytics data to display at the moment. Please try refreshing the page."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
