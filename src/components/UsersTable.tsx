import React, { useState, useCallback } from "react";
import { useUsersServerSide } from "@/hooks/useUsersServerSide";
import { useDebounce } from "@/hooks/useDebounce";
import type { User } from "@/types/api";
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
import { EditUserModal, DeleteUserModal } from "@/components/UserModals";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Search, ArrowUpDown } from "lucide-react";

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
  // Get all data and actions from the server-side hook
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
  const handleClearFilters = useCallback(() => {
    clearFilters();
    setLocalSearchQuery("");
  }, [clearFilters]);

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchQuery(e.target.value);
    },
    [],
  );

  // Handle sort change from dropdown
  const handleSortChange = useCallback(
    (sortValue: string) => {
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
    },
    [setSort],
  );

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
        <div className="relative">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Filter by Role
            </label>
            <Select
              options={roleOptions}
              onValueChange={setSelectedRole}
              placeholder="All Roles"
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
              placeholder="All Statuses"
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
              placeholder="Default"
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
        <div className="hidden md:block rounded-md border">
          <LoadingSpinner size="md" text="Loading users..." className="py-12" />
        </div>
      ) : users && users.length > 0 ? (
        <div className="hidden md:block rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      name={user.name}
                      size="md"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
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
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <EditUserModal user={user}>
                        <Button
                          variant="link"
                          size="sm"
                          className="px-0 py-0 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200"
                        >
                          EDIT
                        </Button>
                      </EditUserModal>
                      <DeleteUserModal user={user}>
                        <Button
                          variant="link"
                          size="sm"
                          className="px-0 py-0 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-200"
                        >
                          DELETE
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
