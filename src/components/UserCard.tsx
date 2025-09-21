import { useState } from "react";
import type { User } from "@/types/api";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatDistanceToNow } from "date-fns";
import { Edit, Trash2, MoreVertical } from "lucide-react";

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void; // eslint-disable-line no-unused-vars
  onDelete: (user: User) => void; // eslint-disable-line no-unused-vars
};

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const [showActions, setShowActions] = useState(false);

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
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-medium text-gray-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
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
            onClick={() => setShowActions(!showActions)}
            className="p-2"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>

          {showActions && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
              <button
                onClick={() => {
                  onEdit(user);
                  setShowActions(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(user);
                  setShowActions(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
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
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(user)}
            className="pointer-events-auto"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default UserCard;
