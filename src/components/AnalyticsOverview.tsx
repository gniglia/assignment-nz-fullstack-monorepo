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
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { chartContainerVariants } from "@/lib/animations";
import { TrendingUp } from "lucide-react";
import { useState, useMemo } from "react";

export function AnalyticsOverview() {
  const { data: analyticsData, isLoading, error } = useAnalytics();
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  // Memoize expensive calculations at the top level
  const { totalValue, avgValue, maxValue, trend } = useMemo(() => {
    if (!analyticsData || analyticsData.length === 0) {
      return { totalValue: 0, avgValue: 0, maxValue: 0, trend: 0 };
    }

    const total = analyticsData.reduce((sum, item) => sum + item.value, 0);
    const avg = total / analyticsData.length;
    const max = Math.max(...analyticsData.map((item) => item.value));
    const trendValue =
      analyticsData.length > 1
        ? ((analyticsData[analyticsData.length - 1].value -
            analyticsData[0].value) /
            analyticsData[0].value) *
          100
        : 0;

    return {
      totalValue: total,
      avgValue: avg,
      maxValue: max,
      trend: trendValue,
    };
  }, [analyticsData]);

  return (
    <motion.div
      variants={chartContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card variant="elevated" className="p-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center h-64"
              >
                <LoadingSpinner size="md" />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive">
                  <AlertDescription>
                    Failed to load analytics data: {(error as Error).message}
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : !analyticsData ||
              !Array.isArray(analyticsData) ||
              analyticsData.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center h-64 text-muted-foreground"
              >
                <p>No analytics data available</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Use pre-calculated metrics for micro-interactions */}
                {(() => {
                  return (
                    <>
                      <motion.div
                        className="flex items-center justify-between mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.h2
                          className="text-lg font-medium text-foreground flex items-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          Analytics Overview
                        </motion.h2>

                        <motion.div
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span
                            className={
                              trend >= 0 ? "text-green-600" : "text-red-600"
                            }
                          >
                            {trend >= 0 ? "+" : ""}
                            {trend.toFixed(1)}%
                          </span>
                        </motion.div>
                      </motion.div>

                      {/* Quick metrics row */}
                      <motion.div
                        className="grid grid-cols-3 gap-4 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.div
                          className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                          whileHover={{
                            scale: 1.05,
                          }}
                          transition={{ duration: 0.2 }}
                          onHoverStart={() => setHoveredMetric("total")}
                          onHoverEnd={() => setHoveredMetric(null)}
                        >
                          <div className="text-sm md:text-lg font-bold text-blue-600 dark:text-blue-400">
                            {totalValue.toLocaleString()}
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            Total
                          </div>
                        </motion.div>

                        <motion.div
                          className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                          whileHover={{
                            scale: 1.05,
                          }}
                          transition={{ duration: 0.2 }}
                          onHoverStart={() => setHoveredMetric("average")}
                          onHoverEnd={() => setHoveredMetric(null)}
                        >
                          <div className="text-sm md:text-lg font-bold text-green-600 dark:text-green-400">
                            {avgValue.toLocaleString()}
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                            Average
                          </div>
                        </motion.div>

                        <motion.div
                          className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800"
                          whileHover={{
                            scale: 1.05,
                          }}
                          transition={{ duration: 0.2 }}
                          onHoverStart={() => setHoveredMetric("peak")}
                          onHoverEnd={() => setHoveredMetric(null)}
                        >
                          <div className="text-sm md:text-lg font-bold text-purple-600 dark:text-purple-400">
                            {maxValue.toLocaleString()}
                          </div>
                          <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                            Peak
                          </div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="h-48"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={analyticsData}
                            margin={{
                              top: 10,
                              right: 20,
                              left: 10,
                              bottom: 10,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              className="opacity-30"
                              stroke="hsl(var(--border))"
                            />
                            <XAxis
                              dataKey="label"
                              className="text-sm"
                              tick={{
                                fontSize: 12,
                                fill: "hsl(var(--muted-foreground))",
                              }}
                              axisLine={{ stroke: "hsl(var(--border))" }}
                            />
                            <YAxis
                              className="text-sm"
                              tick={{
                                fontSize: 12,
                                fill: "hsl(var(--muted-foreground))",
                              }}
                              axisLine={{ stroke: "hsl(var(--border))" }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "12px",
                                boxShadow:
                                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                color: "hsl(var(--card-foreground))",
                              }}
                              labelStyle={{
                                color: "hsl(var(--foreground))",
                                fontWeight: "500",
                              }}
                              formatter={(value: number) => [
                                value.toLocaleString(),
                                "Value",
                              ]}
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#3b82f6"
                              strokeWidth={hoveredMetric ? 3 : 2}
                              dot={{
                                fill: "#3b82f6",
                                strokeWidth: 2,
                                r: hoveredMetric ? 5 : 4,
                                style: { transition: "all 0.2s ease" },
                              }}
                              activeDot={{
                                r: 8,
                                stroke: "#3b82f6",
                                strokeWidth: 2,
                                fill: "white",
                                style: {
                                  filter:
                                    "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))",
                                },
                              }}
                              style={{ transition: "all 0.2s ease" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </motion.div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </motion.div>
  );
}
