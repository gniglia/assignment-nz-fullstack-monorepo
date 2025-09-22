import { useState } from "react";
import { useUsersQuery, useDeleteUser, queryKeys } from "@/hooks/use-api";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/api";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

function UserList() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch users using React Query
  const { data: users, isLoading, error, refetch } = useUsersQuery();

  // Delete user mutation
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUserMutation.mutateAsync(userId);
      // Optionally show a success message
      console.log("User deleted successfully");
    } catch (error) {
      // Handle error (you might want to show a toast notification)
      console.error("Failed to delete user:", error);
    }
  };

  const handleRefresh = () => {
    // Manually refetch users
    refetch();
  };

  const handleInvalidateCache = () => {
    // Invalidate all user-related queries
    queryClient.invalidateQueries({ queryKey: queryKeys.users });
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          <p>Failed to load users: {(error as Error).message}</p>
          <Button onClick={handleRefresh} className="mt-4">
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users ({users?.length || 0})</h2>
        <div className="space-x-2">
          <Button onClick={handleRefresh} variant="outline">
            Refresh
          </Button>
          <Button onClick={handleInvalidateCache} variant="outline">
            Invalidate Cache
          </Button>
        </div>
      </div>

      {users && users.length > 0 ? (
        <div className="space-y-4">
          {users.map((user: User) => (
            <div
              key={user.id}
              className={`p-4 border rounded-lg transition-colors ${
                selectedUserId === user.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {user.role}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() =>
                      setSelectedUserId(
                        selectedUserId === user.id ? null : user.id,
                      )
                    }
                    variant="outline"
                    size="sm"
                  >
                    {selectedUserId === user.id
                      ? "Hide Details"
                      : "Show Details"}
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="destructive"
                    size="sm"
                    disabled={deleteUserMutation.isPending}
                  >
                    {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>

              {selectedUserId === user.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm">
                    <strong>ID:</strong> {user.id}
                  </p>
                  <p className="text-sm">
                    <strong>Updated:</strong>{" "}
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                  {user.avatar && (
                    <p className="text-sm">
                      <strong>Avatar:</strong> {user.avatar}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p>No users found</p>
        </div>
      )}
    </Card>
  );
}

export default UserList;
