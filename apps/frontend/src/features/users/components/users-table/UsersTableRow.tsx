import type { User } from "@/types";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Avatar } from "@/components/ui/Avatar";
import {
  EditUserModal,
  DeleteUserModal,
} from "@/features/users/components/user-modals";
import { formatRelativeTime } from "@/utils/date";
import {
  getStatusBadgeClasses,
  getRoleBadgeClasses,
} from "@/features/users/utils/badges";
import { Edit, Trash2 } from "lucide-react";

type UsersTableRowProps = {
  user: User;
};

export function UsersTableRow({ user }: UsersTableRowProps) {
  return (
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
          <span className="font-medium text-foreground">{user.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{user.email}</TableCell>
      <TableCell>
        <span className={`${getRoleBadgeClasses(user.role)} capitalize`}>
          {user.role}
        </span>
      </TableCell>
      <TableCell>
        <span className={getStatusBadgeClasses(user.status)}>
          {user.status}
        </span>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {user.lastLogin ? formatRelativeTime(user.lastLogin) : "Never"}
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
  );
}
