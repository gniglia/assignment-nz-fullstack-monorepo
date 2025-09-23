import React from "react";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "@/hooks/queries";
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
import { Plus } from "lucide-react";
import type { UserFormData } from "@/lib/validations/user";

type AddUserModalProps = {
  children: React.ReactNode;
};

export function AddUserModal({ children }: AddUserModalProps) {
  const createUserMutation = useCreateUserMutation();
  const {
    form,
    isValidating,
    isOpen,
    validateNameUniqueness,
    handleOpenChange,
    resetForm,
  } = useUserForm();

  const onSubmit = async (data: UserFormData) => {
    try {
      // Validate name uniqueness
      const isUnique = await validateNameUniqueness(data.name);
      if (!isUnique) return;

      // Create user data with required fields
      const userData = {
        ...data,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}&size=150`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await createUserMutation.mutateAsync(userData);
      toast.success("User created successfully!");
      handleOpenChange(false);
      resetForm();
    } catch (error) {
      // Check if it's a network error
      const isNetworkError =
        error instanceof Error && error.message.includes("Network");

      if (isNetworkError) {
        toast.error(
          "Connection issue. Please check your internet and try again.",
          {
            duration: 5000,
          },
        );
      } else {
        toast.error("Failed to create user. Please try again.", {
          duration: 4000,
        });
      }

      console.error("Create user error:", error);
    }
  };

  const isSubmitting = createUserMutation.isPending;
  const isFormDisabled = isSubmitting || isValidating;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <DialogTitle>Add New User</DialogTitle>
          </motion.div>
          <DialogDescription>
            Create a new user account with the information below. Click save
            when you&apos;re done.
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
                  ? "Creating..."
                  : "Create User"}
              </Button>
            </DialogFooter>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
