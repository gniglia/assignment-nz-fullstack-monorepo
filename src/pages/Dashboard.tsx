import { useMetrics } from "@/hooks/use-api";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/MetricCard";
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";

// Icon mapping for metrics
const iconMap = {
  users: Users,
  "dollar-sign": DollarSign,
  activity: Activity,
  "trending-up": TrendingUp,
};

export default function Dashboard() {
  const { data: metricsData, isLoading, error } = useMetrics();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <div className="text-center text-red-600">
            <p>Failed to load dashboard data: {(error as Error).message}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🚀 Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your React Query powered dashboard!
        </p>
      </div>

      {metricsData && Array.isArray(metricsData) ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData.map((metric) => {
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
            })}
          </div>

          {/* Recent Activity - Placeholder for now */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    Dashboard metrics loaded successfully
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-6">
          <div className="text-center text-gray-500">
            <p>No dashboard data available</p>
          </div>
        </Card>
      )}
    </div>
  );
}
