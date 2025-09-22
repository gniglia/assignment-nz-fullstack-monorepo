import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { useUsersQueryWithParams } from "@/hooks/useApi";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { safeFormatDistanceToNow } from "@/utils/format";
import { motion } from "framer-motion";
import {
  fadeInRight,
  listItemVariants,
  staggerContainer,
} from "@/lib/animations";

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
      return "Updated";
    }
    return "Account created";
  };

  const getTimestamp = (
    isRecentUpdate: boolean,
    createdAt: string,
    updatedAt: string,
  ) => {
    const dateString = isRecentUpdate ? updatedAt : createdAt;
    return safeFormatDistanceToNow(dateString, { addSuffix: true });
  };

  const isRecentUpdate = new Date(updatedAt) > new Date(createdAt);

  return (
    <motion.div
      className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
      variants={listItemVariants}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        className="flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Avatar src={avatar} alt={`${name}'s avatar`} name={name} size="md" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {getActivityText(isRecentUpdate)}{" "}
          {getTimestamp(isRecentUpdate, createdAt, updatedAt)}
        </p>
      </div>
    </motion.div>
  );
}

export function RecentActivity() {
  // Fetch users sorted by updatedAt descending to get most recent activity first
  const {
    data: users,
    isLoading,
    error,
  } = useUsersQueryWithParams({
    sort: "updatedAt",
    order: "desc",
    limit: 5, // Only fetch the 5 most recent activities
  });

  if (isLoading) {
    return (
      <Card variant="elevated" className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-muted rounded-lg animate-pulse"
            >
              <div className="w-8 h-8 bg-muted-foreground/20 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="elevated" className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
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
      <Card variant="elevated" className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="text-center text-muted-foreground">
          <p>No recent activity available</p>
        </div>
      </Card>
    );
  }

  // Users are already sorted by updatedAt descending from the server
  const recentActivities = users || [];

  return (
    <motion.div variants={fadeInRight} initial="hidden" animate="visible">
      <Card variant="elevated" className="p-6">
        <motion.h2
          className="text-xl font-semibold text-foreground mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Recent Activity
        </motion.h2>
        <motion.div
          className="space-y-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
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
        </motion.div>
      </Card>
    </motion.div>
  );
}
