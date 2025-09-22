import { useState, useCallback } from "react";
import type { User } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { EditUserModal, DeleteUserModal } from "@/components/UserModals";
import { formatDistanceToNow } from "date-fns";
import { Edit, Trash2, MoreVertical } from "lucide-react";

type UserCardProps = {
  user: User;
  onSave: (userData: Partial<User>) => void; // eslint-disable-line no-unused-vars
  onConfirmDelete: () => void;
};

function UserCard({ user, onSave, onConfirmDelete }: UserCardProps) {
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
    <Card className="relative">
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
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
              <EditUserModal user={user} onSave={onSave}>
                <button
                  onClick={handleCloseActions}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
              </EditUserModal>
              <DeleteUserModal user={user} onConfirm={onConfirmDelete}>
                <button
                  onClick={handleCloseActions}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
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
        Created{" "}
        {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
      </div>

      {/* Swipe actions for mobile */}
      <div className="absolute inset-0 flex items-center justify-end bg-red-500 opacity-0 hover:opacity-10 transition-opacity pointer-events-none">
        <div className="flex items-center space-x-2 pr-4">
          <DeleteUserModal user={user} onConfirm={onConfirmDelete}>
            <Button
              variant="destructive"
              size="sm"
              className="pointer-events-auto"
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
