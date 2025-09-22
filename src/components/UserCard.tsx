import { useState, useCallback } from "react";
import type { User } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { EditUserModal, DeleteUserModal } from "@/components/UserModals";
import { safeFormatDistanceToNow } from "@/utils/format";
import { Pencil, Trash2, MoreVertical } from "lucide-react";

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  const [showActions, setShowActions] = useState(false);

  const handleToggleActions = useCallback(() => {
    setShowActions((prev) => !prev);
  }, []);

  const handleCloseActions = useCallback(() => {
    setShowActions(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "moderator":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card variant="elevated" hover className="relative">
      {/* Header with avatar and actions */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            src={user.avatar}
            alt={user.name}
            name={user.name}
            size="lg"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Actions dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleActions}
            className="p-2"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>

          {showActions && (
            <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-[140px] overflow-hidden">
              <EditUserModal user={user}>
                <button
                  onClick={handleCloseActions}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-200 group"
                >
                  <Pencil className="h-4 w-4 mr-3 transition-transform duration-200 group-hover:scale-110" />
                  Edit
                </button>
              </EditUserModal>
              <DeleteUserModal user={user}>
                <button
                  onClick={handleCloseActions}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all duration-200 group"
                >
                  <Trash2 className="h-4 w-4 mr-3 transition-transform duration-200 group-hover:scale-110" />
                  Delete
                </button>
              </DeleteUserModal>
            </div>
          )}
        </div>
      </div>

      {/* Status and Role badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
            user.role,
          )}`}
        >
          {user.role}
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            user.status,
          )}`}
        >
          {user.status}
        </span>
      </div>

      {/* Created date */}
      <div className="mt-3 text-sm text-gray-500">
        Created {safeFormatDistanceToNow(user.createdAt, { addSuffix: true })}
      </div>

      {/* Swipe actions for mobile */}
      <div className="absolute inset-0 flex items-center justify-end bg-red-500 opacity-0 hover:opacity-10 transition-opacity pointer-events-none">
        <div className="flex items-center space-x-2 pr-4">
          <DeleteUserModal user={user}>
            <Button
              variant="destructive"
              size="sm"
              className="pointer-events-auto rounded-lg hover:scale-105 transition-transform duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </DeleteUserModal>
        </div>
      </div>
    </Card>
  );
}

export { UserCard };
