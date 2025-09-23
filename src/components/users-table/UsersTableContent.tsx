import type { User } from "@/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { UserCard } from "@/components/UserCard";
import { UsersTableRow } from "./UsersTableRow";

type UsersTableContentProps = {
  users: User[] | undefined;
  isFetching: boolean;
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
};

export function UsersTableContent({
  users,
  isFetching,
  searchQuery,
  selectedRole,
  selectedStatus,
}: UsersTableContentProps) {
  const hasActiveFilters =
    searchQuery || selectedRole !== "all" || selectedStatus !== "all";

  const noResultsMessage = hasActiveFilters
    ? "No users match your filters"
    : "No users found";

  // Desktop Table View
  const renderDesktopView = () => {
    if (isFetching) {
      return (
        <div className="hidden md:block">
          <LoadingSpinner size="md" text="Loading users..." className="py-12" />
        </div>
      );
    }

    if (users && users.length > 0) {
      return (
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
                <UsersTableRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </div>
      );
    }

    return (
      <div className="text-center text-muted-foreground py-12">
        <p className="text-lg">{noResultsMessage}</p>
      </div>
    );
  };

  // Mobile Card View
  const renderMobileView = () => {
    if (isFetching) {
      return (
        <div className="md:hidden">
          <div className="text-center py-12">
            <LoadingSpinner size="md" text="Loading users..." />
          </div>
        </div>
      );
    }

    if (users && users.length > 0) {
      return (
        <div className="md:hidden space-y-4">
          {users.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {renderDesktopView()}
      {renderMobileView()}
    </>
  );
}
