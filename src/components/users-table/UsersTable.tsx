import { useUsersList } from "@/hooks/useUsersList";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { UsersTableHeader } from "./UsersTableHeader";
import { UsersTableFilters } from "./UsersTableFilters";
import { UsersTableContent } from "./UsersTableContent";

function UsersTable() {
  // Get all data and actions from the hook
  const {
    users,
    totalCount,
    totalPages,
    isLoading,
    isFetching,
    error,
    filters,
    setSearchQuery,
    setSelectedRole,
    setSelectedStatus,
    setSort,
    setCurrentPage,
    clearFilters,
  } = useUsersList();

  // Handle clear filters
  const handleClearFilters = () => {
    clearFilters();
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
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load users: {(error as Error).message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card variant="elevated" className="p-4 sm:p-6">
      <UsersTableHeader
        totalCount={totalCount}
        isLoading={isLoading}
        isFetching={isFetching}
        onClearFilters={handleClearFilters}
      />

      <UsersTableFilters
        searchQuery={filters.searchQuery}
        selectedRole={filters.selectedRole}
        selectedStatus={filters.selectedStatus}
        sortField={filters.sortField}
        sortOrder={filters.sortOrder}
        isLoading={isLoading}
        isFetching={isFetching}
        onSearchChange={setSearchQuery}
        onRoleChange={setSelectedRole}
        onStatusChange={setSelectedStatus}
        onSortChange={setSort}
      />

      <UsersTableContent
        users={users}
        isFetching={isFetching}
        searchQuery={filters.searchQuery}
        selectedRole={filters.selectedRole}
        selectedStatus={filters.selectedStatus}
      />

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
