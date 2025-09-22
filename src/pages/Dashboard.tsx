import { useMetrics } from "@/hooks/useApi";
import { EmptyDataState } from "@/components/ui/EmptyState";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { MetricCard } from "@/components/metric-card";
import { AnalyticsOverview } from "@/components/AnalyticsOverview";
import { RecentActivity } from "@/components/RecentActivity";
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";
import { MetricCardsSkeleton } from "@/components/ui/SkeletonLoader";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, fadeInBottom } from "@/lib/animations";

// Icon mapping for metrics
const iconMap = {
  users: Users,
  "dollar-sign": DollarSign,
  activity: Activity,
  "trending-up": TrendingUp,
};

// Dashboard header component to avoid repetition
function DashboardHeader() {
  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight drop-shadow-lg pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Dashboard
      </motion.h1>

      <motion.p
        className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        Monitor your data, track performance, and stay ahead of the curve with
        real-time insights
      </motion.p>
    </motion.div>
  );
}

export default function Dashboard() {
  const { data: metricsData, isLoading, error } = useMetrics();

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <DashboardHeader />
        <div className="mt-8">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load dashboard data: {(error as Error).message}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-4 sm:p-6 space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <DashboardHeader />

      {/* Metric Cards Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch"
        variants={fadeInUp}
      >
        {isLoading ? (
          // Show 4 skeleton cards
          <MetricCardsSkeleton count={4} />
        ) : metricsData && Array.isArray(metricsData) ? (
          metricsData.map((metric) => {
            const IconComponent =
              iconMap[metric.icon as keyof typeof iconMap] || Users;
            return (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                change={Math.abs(metric.change)}
                changeType={metric.changeType}
                icon={IconComponent}
              />
            );
          })
        ) : (
          <div className="col-span-full">
            <EmptyDataState
              title="No dashboard data available"
              description="There's no data to display at the moment. Please try refreshing the page."
            />
          </div>
        )}
      </motion.div>

      {/* Analytics Overview and Recent Activity */}
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6"
        variants={fadeInBottom}
      >
        <AnalyticsOverview />
        <RecentActivity />
      </motion.div>
    </motion.div>
  );
}
