import React from "react";
import toast from "react-hot-toast";
import type { User } from "@/types";
import { useUpdateUserMutation } from "@/hooks/queries";
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
import { Form } from "@/components/ui/Form";
import { UserFormFields } from "./UserFormFields";
import { useUserForm } from "./useUserForm";
import { motion } from "framer-motion";
import { Edit3 } from "lucide-react";
import { sanitizeName } from "@/features/users/utils/sanitizeName";
import type { UserFormData } from "@/features/users/formSchema";

type EditUserModalProps = {
  user: User;
  children: React.ReactNode;
  onClose?: () => void;
};

export function EditUserModal({ user, children, onClose }: EditUserModalProps) {
  const updateUserMutation = useUpdateUserMutation();
  const {
    form,
    isValidating,
    isOpen,
    validateEmailUniqueness,
    handleOpenChange,
  } = useUserForm(user);

  const onSubmit = async (data: UserFormData) => {
    // Sanitize the name before validation and update
    const sanitizedName = sanitizeName(data.name);

    // Validate email uniqueness if it has changed
    if (data.email !== user.email) {
      const isUnique = await validateEmailUniqueness(data.email);
      if (!isUnique) return;
    }

    // Only send fields that the API expects
    const updateData = {
      ...data, // Form data (name, email, role, status)
      name: sanitizedName, // Use sanitized name
    };

    // Close modal immediately after optimistic update
    handleOpenChange(false);
    onClose?.();

    // Perform the mutation (optimistic update happens in onMutate)
    updateUserMutation.mutate({ id: user.id, ...updateData }, {
      onSuccess: () => {
        toast.success("User updated successfully!");
      },
      onError: () => {
        toast.error("Failed to save user changes. Please try again.");
      },
    });
  };

  const isSubmitting = updateUserMutation.isPending;
  const isFormDisabled = isSubmitting || isValidating;

  const handleDialogOpenChange = (open: boolean) => {
    handleOpenChange(open);
    if (!open) {
      onClose?.();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shadow-xl">
        <DialogHeader>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <Edit3 className="w-5 h-5 text-blue-600" />
            </div>
            <DialogTitle>Edit User</DialogTitle>
          </motion.div>
          <DialogDescription>
            Make changes to the user profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <UserFormFields form={form} isFormDisabled={isFormDisabled} />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isFormDisabled}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isFormDisabled}>
                {isValidating
                  ? "Validating..."
                  : isSubmitting
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
