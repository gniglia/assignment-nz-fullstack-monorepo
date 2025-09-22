import { Card } from "@/components/ui/Card";
import { useUsersQuery } from "@/hooks/use-api";
import { formatDistanceToNow } from "date-fns";

type ActivityItemProps = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
};

function ActivityItem({
  name,
  avatar,
  lastLogin,
  createdAt,
}: ActivityItemProps) {
  const getActivityText = (lastLogin?: string) => {
    if (lastLogin) {
      return "Last logged in";
    }
    return "Account created";
  };

  const getTimestamp = (lastLogin?: string, createdAt: string) => {
    const date = lastLogin ? new Date(lastLogin) : new Date(createdAt);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getActivityIcon = (lastLogin?: string) => {
    return lastLogin ? "🟢" : "👤";
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
          <span className="text-sm">{getActivityIcon(lastLogin)}</span>
        </div>
        <p className="text-xs text-gray-500 truncate">
          {getActivityText(lastLogin, createdAt)}{" "}
          {getTimestamp(lastLogin, createdAt)}
        </p>
      </div>
    </div>
  );
}

export function RecentActivity() {
  const { data: users, isLoading, error } = useUsersQuery();

  if (isLoading) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg animate-pulse"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="text-center text-red-600">
          <p>Failed to load recent activity: {(error as Error).message}</p>
        </div>
      </Card>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="text-center text-gray-500">
          <p>No recent activity available</p>
        </div>
      </Card>
    );
  }

  // Sort users by most recent activity (lastLogin or createdAt)
  const sortedUsers = [...users].sort((a, b) => {
    const aDate = a.lastLogin ? new Date(a.lastLogin) : new Date(a.createdAt);
    const bDate = b.lastLogin ? new Date(b.lastLogin) : new Date(b.createdAt);
    return bDate.getTime() - aDate.getTime();
  });

  // Take the 5 most recent activities
  const recentActivities = sortedUsers.slice(0, 5);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Recent Activity
      </h2>
      <div className="space-y-3">
        {recentActivities.map((user) => (
          <ActivityItem
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            avatar={user.avatar}
            lastLogin={user.lastLogin}
            createdAt={user.createdAt}
          />
        ))}
      </div>
    </Card>
  );
}
