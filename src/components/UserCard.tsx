import React, { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import type { User } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { EditUserModal, DeleteUserModal } from "@/components/user-modals";
import { safeFormatDistanceToNow } from "@/utils/format";
import { getStatusBadgeClasses, getRoleBadgeClasses } from "@/utils/badges";
import { Pencil, Trash2, MoreVertical } from "lucide-react";

type UserCardProps = {
  user: User;
};

const UserCard = React.memo(function UserCard({ user }: UserCardProps) {
  const [showActions, setShowActions] = useState(false);

  const handleToggleActions = () => {
    setShowActions((prev) => !prev);
  };

  const dropdownRef = useClickAway<HTMLDivElement>((event) => {
    const target = event.target as Element;

    // Don't close if clicking on modal content
    if (target && target.closest('[role="dialog"]')) {
      return;
    }

    // Don't close if clicking on modal overlay/portal
    if (target && target.closest("[data-radix-popper-content-wrapper]")) {
      return;
    }

    setShowActions(false);
  });

  return (
    <Card variant="elevated" className="relative">
      {/* Header with avatar and actions */}
      <div className="relative flex items-start">
        <div className="flex items-center space-x-3 pr-12">
          <Avatar
            src={user.avatar}
            alt={user.name}
            name={user.name}
            size="lg"
          />
          <div>
            <h3 className="font-semibold text-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Actions dropdown - absolutely positioned */}
        <div className="absolute right-0 top-0" ref={dropdownRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleActions}
            className="p-2"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>

          {showActions && (
            <div className="absolute right-0 top-8 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[140px] overflow-hidden">
              <EditUserModal user={user}>
                <button className="flex items-center w-full px-4 py-3 text-sm text-foreground hover:bg-accent transition-all duration-200 group">
                  <Pencil className="h-4 w-4 mr-3 transition-transform duration-200 group-hover:scale-110" />
                  Edit
                </button>
              </EditUserModal>
              <DeleteUserModal user={user}>
                <button className="flex items-center w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-all duration-200 group">
                  <Trash2 className="h-4 w-4 mr-3 transition-transform duration-200 group-hover:scale-110" />
                  Delete
                </button>
              </DeleteUserModal>
            </div>
          )}
        </div>
      </div>

      {/* Status and Role badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className={getRoleBadgeClasses(user.role)}>{user.role}</span>
        <span className={getStatusBadgeClasses(user.status)}>
          {user.status}
        </span>
      </div>

      {/* Created date */}
      <div className="mt-3 text-sm text-muted-foreground">
        Created {safeFormatDistanceToNow(user.createdAt, { addSuffix: true })}
      </div>
    </Card>
  );
});

export { UserCard };
