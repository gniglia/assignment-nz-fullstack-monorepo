import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import type { User } from "@/types/api";
import { userApi } from "@/utils/api";
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
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { editUserFormSchema, type UserFormData } from "@/lib/validations/user";
import { useUpdateUser, useDeleteUser } from "@/hooks/useApi";

type EditUserModalProps = {
  user: User;
  children: React.ReactNode;
};

function EditUserModal({ user, children }: EditUserModalProps) {
  const updateUserMutation = useUpdateUser();
  const [isValidating, setIsValidating] = React.useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      // Validate name uniqueness if it has changed
      if (data.name !== user.name && data.name.trim()) {
        console.log("Validating name uniqueness on submit:", data.name);
        setIsValidating(true);

        try {
          const isUnique = await userApi.checkNameUnique(data.name, user.id);
          console.log("Name unique result:", isUnique);

          if (!isUnique) {
            console.log(
              "Name is not unique, setting error and stopping submission",
            );
            form.setError("name", {
              type: "manual",
              message:
                "This name is already in use by another user. Please choose a different name.",
            });
            return; // Stop submission
          }
        } finally {
          setIsValidating(false);
        }
      }

      // Preserve existing fields that aren't in the form
      const updateData = {
        ...user, // Start with existing user data
        ...data, // Override with form data
        id: user.id, // Ensure ID is preserved
        updatedAt: new Date().toISOString(), // Update updatedAt timestamp
      };

      await updateUserMutation.mutateAsync(updateData);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
      console.error("Update user error:", error);
    }
  };

  const isSubmitting = updateUserMutation.isPending;
  const isFormDisabled = isSubmitting || isValidating;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shadow-xl">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to the user profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter user name"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter user email"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      options={[
                        { value: "user", label: "User" },
                        { value: "admin", label: "Admin" },
                        { value: "moderator", label: "Moderator" },
                      ]}
                      onValueChange={field.onChange}
                      placeholder="Select role"
                      disabled={isFormDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                        { value: "pending", label: "Pending" },
                      ]}
                      onValueChange={field.onChange}
                      placeholder="Select status"
                      disabled={isFormDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type DeleteUserModalProps = {
  user: User;
  children: React.ReactNode;
};

function DeleteUserModal({ user, children }: DeleteUserModalProps) {
  const deleteUserMutation = useDeleteUser();

  const handleConfirm = async () => {
    try {
      await deleteUserMutation.mutateAsync(user.id);
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
      console.error("Delete user error:", error);
    }
  };

  const isDeleting = deleteUserMutation.isPending;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shadow-xl">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove their data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{user.name}</strong>?
          </p>

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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { EditUserModal, DeleteUserModal };
