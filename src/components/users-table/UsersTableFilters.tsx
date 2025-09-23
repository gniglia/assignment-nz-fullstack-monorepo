import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Search, ArrowUpDown } from "lucide-react";
import {
  ROLE_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  SORT_OPTIONS,
} from "@/constants/userOptions";

type UsersTableFiltersProps = {
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
  sortField: string;
  sortOrder: "asc" | "desc";
  isLoading: boolean;
  isFetching: boolean;
  onSearchChange: (query: string) => void;
  onRoleChange: (role: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (field: string, order: "asc" | "desc") => void;
};

export function UsersTableFilters({
  searchQuery,
  selectedRole,
  selectedStatus,
  sortField,
  sortOrder,
  isLoading,
  isFetching,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onSortChange,
}: UsersTableFiltersProps) {
  // Local search state for debouncing
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Sync debounced search to parent
  React.useEffect(() => {
    onSearchChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearchChange]);

  // Sync local search state when parent searchQuery changes (e.g., when clearing filters)
  React.useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  // Handle sort change from dropdown
  const handleSortChange = (sortValue: string) => {
    if (sortValue === "") {
      // Reset to default (no sorting)
      onSortChange("", "asc");
    } else {
      // Parse the sort value to extract field and order
      const isDescending = sortValue.startsWith("-");
      const field = isDescending ? sortValue.substring(1) : sortValue;
      const order = isDescending ? "desc" : "asc";
      onSortChange(field, order);
    }
  };

  const currentSortValue = sortField
    ? sortOrder === "desc"
      ? `-${sortField}`
      : sortField
    : "";

  return (
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
            options={ROLE_FILTER_OPTIONS}
            onValueChange={onRoleChange}
            disabled={isLoading || isFetching}
            value={selectedRole}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Filter by Status
          </label>
          <Select
            options={STATUS_FILTER_OPTIONS}
            onValueChange={onStatusChange}
            disabled={isLoading || isFetching}
            value={selectedStatus}
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
            options={SORT_OPTIONS}
            onValueChange={handleSortChange}
            disabled={isLoading || isFetching}
            value={currentSortValue}
          />
        </div>
      </div>
    </div>
  );
}
