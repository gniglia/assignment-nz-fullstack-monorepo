import React, { useState } from "react";
import { useUsersServerSide } from "@/hooks/useUsersServerSide";
import { useDebounce } from "@uidotdev/usehooks";
import type { User } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Pagination } from "@/components/ui/Pagination";
import { Avatar } from "@/components/ui/Avatar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { UserCard } from "@/components/UserCard";
import {
  EditUserModal,
  DeleteUserModal,
  AddUserModal,
} from "@/components/user-modals";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Search, ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { formatRelativeTime } from "@/utils/format";
import { getStatusBadgeClasses, getRoleBadgeClasses } from "@/utils/badges";

// No props needed - all state is managed internally

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

const sortOptions = [
  { value: "", label: "Default" },
  { value: "name", label: "Name ↑" },
  { value: "-name", label: "Name ↓" },
  { value: "email", label: "Email ↑" },
  { value: "-email", label: "Email ↓" },
  { value: "createdAt", label: "Created Date ↑" },
  { value: "-createdAt", label: "Created Date ↓" },
  { value: "lastLogin", label: "Last Login ↑" },
  { value: "-lastLogin", label: "Last Login ↓" },
];

function UsersTable() {
  // Get all data and actions from the client-side hook
  const {
    users,
    totalCount,
    totalPages,
    isLoading,
    isFetching,
    error,
    filters,
    setSearchQuery: setStoreSearchQuery,
    setSelectedRole,
    setSelectedStatus,
    setSort,
    setCurrentPage,
    clearFilters,
    refetch,
  } = useUsersServerSide();

  // Local search state for debouncing
  const [localSearchQuery, setLocalSearchQuery] = useState(filters.searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Sync debounced search to store
  React.useEffect(() => {
    setStoreSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setStoreSearchQuery]);

  // No need to sync current page - it's managed internally

  // Handle clear filters
  const handleClearFilters = () => {
    clearFilters();
    setLocalSearchQuery("");
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  // Handle sort change from dropdown
  const handleSortChange = (sortValue: string) => {
    if (sortValue === "") {
      // Reset to default (no sorting)
      setSort("", "asc");
    } else {
      // Parse the sort value to extract field and order
      const isDescending = sortValue.startsWith("-");
      const field = isDescending ? sortValue.substring(1) : sortValue;
      const order = isDescending ? "desc" : "asc";
      setSort(field, order);
    }
  };

  // Only show full loading screen for initial load, not for filter changes
  if (isLoading && !users) {
    return (
      <Card variant="elevated" className="p-6">
        <LoadingSpinner size="lg" text="Loading users..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="elevated" className="p-6">
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Failed to load users: {(error as Error).message}
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-8 gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Users ({totalCount})
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <AddUserModal>
            <Button
              variant="primary"
              size="sm"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading || isFetching}
            >
              Add User
            </Button>
          </AddUserModal>
          <Button
            onClick={handleClearFilters}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            disabled={isLoading || isFetching}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-4 sm:mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search users by name or email..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className="pl-10"
            disabled={isLoading || isFetching}
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Filter by Role
            </label>
            <Select
              options={roleOptions}
              onValueChange={setSelectedRole}
              disabled={isLoading || isFetching}
              value={filters.selectedRole}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Filter by Status
            </label>
            <Select
              options={statusOptions}
              onValueChange={setSelectedStatus}
              disabled={isLoading || isFetching}
              value={filters.selectedStatus}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                Sort by
              </div>
            </label>
            <Select
              options={sortOptions}
              onValueChange={handleSortChange}
              disabled={isLoading || isFetching}
              value={
                filters.sortField
                  ? filters.sortOrder === "desc"
                    ? `-${filters.sortField}`
                    : filters.sortField
                  : ""
              }
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      {isFetching ? (
        /* Loading spinner during filtering/sorting */
        <div className="hidden md:block">
          <LoadingSpinner size="md" text="Loading users..." className="py-12" />
        </div>
      ) : users && users.length > 0 ? (
        <div className="hidden md:block rounded-md border border-border/80 dark:border-border/60 shadow-sm dark:shadow-2xl dark:shadow-black/30">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-border dark:border-border/60">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: User) => (
                <TableRow
                  key={user.id}
                  className="border-b border-border/30 dark:border-border/40 hover:bg-muted/30 dark:hover:bg-muted/20 dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all duration-200"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        name={user.name}
                        size="md"
                      />
                      <span className="font-medium text-foreground">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`${getRoleBadgeClasses(user.role)} capitalize`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={getStatusBadgeClasses(user.status)}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.lastLogin
                      ? formatRelativeTime(user.lastLogin)
                      : "Never"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <EditUserModal user={user}>
                        <button
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-md transition-all duration-200 hover:scale-105 dark:hover:shadow-md dark:hover:shadow-blue-500/20"
                          title="Edit user"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </EditUserModal>
                      <DeleteUserModal user={user}>
                        <button
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-md transition-all duration-200 hover:scale-105 dark:hover:shadow-md dark:hover:shadow-red-500/20"
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </DeleteUserModal>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* No Results Message - Only when no users found and not loading */
        <div className="text-center text-muted-foreground py-12">
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
      {isFetching ? (
        /* Loading spinner during filtering/sorting - Mobile */
        <div className="md:hidden">
          <div className="text-center py-12">
            <LoadingSpinner size="md" text="Loading users..." />
          </div>
        </div>
      ) : users && users.length > 0 ? (
        <div className="md:hidden space-y-4">
          {users.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : null}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={filters.currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </Card>
  );
}

export { UsersTable };
