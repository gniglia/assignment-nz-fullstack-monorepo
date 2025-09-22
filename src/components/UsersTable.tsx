import React, { useState, useCallback } from "react";
import { useUsersIntegration } from "@/hooks/use-users-integration";
import { useDebounce } from "@/hooks/use-debounce";
import type { User } from "@/types/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/select";
import Pagination from "@/components/ui/pagination";
import UserCard from "@/components/UserCard";
import { EditUserModal, DeleteUserModal } from "@/components/UserModals";
import { formatDistanceToNow } from "date-fns";
import {
  Edit,
  Trash2,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

type UsersTableProps = {
  currentPage?: number;
  onPageChange?: (page: number) => void; // eslint-disable-line no-unused-vars
  totalPages?: number;
};

// Filter options
const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "moderator", label: "Moderator" },
];

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

function UsersTable({
  currentPage = 1,
  onPageChange,
  totalPages = 1,
}: UsersTableProps) {
  // Get all data and actions from the integration hook
  const {
    users,
    totalCount,
    isLoading,
    error,
    filters,
    setSearchQuery: setStoreSearchQuery,
    setSelectedRole,
    setSelectedStatus,
    setSort,
    setCurrentPage,
    clearFilters,
    refetch,
  } = useUsersIntegration();

  // Local search state for debouncing
  const [localSearchQuery, setLocalSearchQuery] = useState(filters.searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Track if search is in progress (local query differs from debounced)
  const isSearching = localSearchQuery !== debouncedSearchQuery;

  // Sync debounced search to store
  React.useEffect(() => {
    setStoreSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setStoreSearchQuery]);

  // Sync current page to store
  React.useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  const handleSaveUser = (userData: Partial<User>) => {
    // Placeholder for save functionality
    console.log("Saving user:", userData);
    // In a real app, you would call an API here
  };

  const handleConfirmDelete = () => {
    // Placeholder for delete functionality
    console.log("Deleting user");
    // In a real app, you would call an API here
  };

  // Handle sorting
  const handleSort = useCallback(
    (field: string) => {
      setSort(field);
    },
    [setSort],
  );

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    clearFilters();
    setLocalSearchQuery("");
  }, [clearFilters]);

  // Get sort icon for table headers
  const getSortIcon = (field: string) => {
    if (filters.sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return filters.sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  // Only show full loading screen for initial load, not for filter changes
  if (isLoading && !users) {
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
          <Button onClick={() => refetch()} className="mt-4">
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Users ({totalCount})</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleClearFilters} variant="outline" size="sm">
            Clear Filters
          </Button>
          <Button onClick={() => refetch()} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Input */}
        <div className="relative">
          {isSearching ? (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          )}
          <Input
            type="text"
            placeholder="Search users by name or email..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Filter by Role
            </label>
            <Select
              options={roleOptions}
              value={filters.selectedRole}
              onValueChange={setSelectedRole}
              placeholder="All Roles"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Filter by Status
            </label>
            <Select
              options={statusOptions}
              value={filters.selectedStatus}
              onValueChange={setSelectedStatus}
              placeholder="All Statuses"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      {users && users.length > 0 ? (
        <div className="hidden md:block rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Name {getSortIcon("name")}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("email")}
                    className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Email {getSortIcon("email")}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("role")}
                    className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Role {getSortIcon("role")}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("status")}
                    className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Status {getSortIcon("status")}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Created {getSortIcon("createdAt")}
                  </button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-700">{user.email}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDistanceToNow(new Date(user.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <EditUserModal user={user} onSave={handleSaveUser}>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </EditUserModal>
                      <DeleteUserModal
                        user={user}
                        onConfirm={handleConfirmDelete}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteUserModal>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* No Results Message - Only when no users found */
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">
            {filters.searchQuery ||
            filters.selectedRole !== "all" ||
            filters.selectedStatus !== "all"
              ? "No users match your filters"
              : "No users found"}
          </p>
        </div>
      )}

      {/* Mobile Card View */}
      {users && users.length > 0 && (
        <div className="md:hidden space-y-4">
          {users.map((user: User) => (
            <UserCard
              key={user.id}
              user={user}
              onSave={handleSaveUser}
              onConfirmDelete={handleConfirmDelete}
            />
          ))}
        </div>
      )}

      {onPageChange && totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => {})}
          />
        </div>
      )}
    </Card>
  );
}

export default UsersTable;
