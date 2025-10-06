import { Button } from "@/components/ui/Button";
import { AddUserModal } from "@/features/users/components/user-modals";

type UsersTableHeaderProps = {
  totalCount: number;
  isLoading: boolean;
  isFetching: boolean;
  onClearFilters: () => void;
};

export function UsersTableHeader({
  totalCount,
  isLoading,
  isFetching,
  onClearFilters,
}: UsersTableHeaderProps) {
  return (
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
          onClick={onClearFilters}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          disabled={isLoading || isFetching}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
