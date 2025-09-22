import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { useUsersQuery } from "@/hooks/useApi";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { formatDistanceToNow } from "date-fns";

type ActivityItemProps = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};

function ActivityItem({
  name,
  avatar,
  createdAt,
  updatedAt,
}: ActivityItemProps) {
  const getActivityText = (isRecentUpdate: boolean) => {
    if (isRecentUpdate) {
      return "Recently updated";
    }
    return "Account created";
  };

  const getTimestamp = (
    isRecentUpdate: boolean,
    createdAt: string,
    updatedAt: string,
  ) => {
    const date = isRecentUpdate ? new Date(updatedAt) : new Date(createdAt);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getActivityIcon = (isRecentUpdate: boolean) => {
    return isRecentUpdate ? "🟢" : "👤";
  };

  const isRecentUpdate = new Date(updatedAt) > new Date(createdAt);

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0">
        <Avatar src={avatar} alt={`${name}'s avatar`} name={name} size="md" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
          <span className="text-sm">{getActivityIcon(isRecentUpdate)}</span>
        </div>
        <p className="text-xs text-gray-500 truncate">
          {getActivityText(isRecentUpdate)}{" "}
          {getTimestamp(isRecentUpdate, createdAt, updatedAt)}
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
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load recent activity: {(error as Error).message}
          </AlertDescription>
        </Alert>
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

  // Sort users by most recent activity (updatedAt or createdAt)
  const sortedUsers = [...users].sort((a, b) => {
    const aDate =
      new Date(a.updatedAt) > new Date(a.createdAt)
        ? new Date(a.updatedAt)
        : new Date(a.createdAt);
    const bDate =
      new Date(b.updatedAt) > new Date(b.createdAt)
        ? new Date(b.updatedAt)
        : new Date(b.createdAt);
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
            createdAt={user.createdAt}
            updatedAt={user.updatedAt}
          />
        ))}
      </div>
    </Card>
  );
}
