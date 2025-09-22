import { useMetrics } from "@/hooks/useApi";
import { EmptyDataState } from "@/components/ui/EmptyState";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { MetricCard } from "@/components/MetricCard";
import { AnalyticsOverview } from "@/components/AnalyticsOverview";
import { RecentActivity } from "@/components/RecentActivity";
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";
import { MetricCardsSkeleton } from "@/components/ui/SkeletonLoader";

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
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        🚀 Dashboard
      </h1>
      <p className="mt-2 text-sm sm:text-base text-gray-600">
        Welcome to your React Query powered dashboard!
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { data: metricsData, isLoading, error } = useMetrics();

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <DashboardHeader />
        <div className="mt-6">
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
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <DashboardHeader />

      {/* Metric Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
      </div>

      {/* Analytics Overview and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <AnalyticsOverview />
        <RecentActivity />
      </div>
    </div>
  );
}
