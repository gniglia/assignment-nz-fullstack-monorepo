import React from "react";
import toast from "react-hot-toast";
import type { User } from "@/types";
import { useDeleteUserMutation } from "@/hooks/queries";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Trash2, AlertTriangle } from "lucide-react";

type DeleteUserModalProps = {
  user: User;
  children: React.ReactNode;
  onClose?: () => void;
};

export function DeleteUserModal({
  user,
  children,
  onClose,
}: DeleteUserModalProps) {
  const deleteUserMutation = useDeleteUserMutation();

  const handleConfirm = () => {
    // Close modal immediately after optimistic update
    onClose?.();

    // Perform the mutation (optimistic update happens in onMutate)
    deleteUserMutation.mutate(user.id, {
      onSuccess: () => {
        toast.success("User deleted successfully!");
      },
      onError: () => {
        toast.error("Failed to delete user. Please try again.");
      },
    });
  };

  const isDeleting = deleteUserMutation.isPending;

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      onClose?.();
    }
  };

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shadow-xl">
        <DialogHeader>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-2 bg-red-50 dark:bg-red-950 rounded-lg">
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle>Delete User</DialogTitle>
          </motion.div>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove their data from our servers.
          </DialogDescription>
        </DialogHeader>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-100">
                Warning: This action is permanent
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Are you sure you want to delete <strong>{user.name}</strong>?
                This will permanently remove their account and all associated
                data.
              </p>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete User"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
