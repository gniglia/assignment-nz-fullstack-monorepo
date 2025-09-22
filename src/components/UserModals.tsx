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
import {
  editUserFormSchema,
  addUserFormSchema,
  type UserFormData,
} from "@/lib/validations/user";
import { useUpdateUser, useDeleteUser, useCreateUser } from "@/hooks/useApi";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Edit3, Trash2, AlertTriangle, Plus } from "lucide-react";

type EditUserModalProps = {
  user: User;
  children: React.ReactNode;
};

function EditUserModal({ user, children }: EditUserModalProps) {
  const updateUserMutation = useUpdateUser();
  const [isValidating, setIsValidating] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

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
        setIsValidating(true);

        try {
          const isUnique = await userApi.checkNameUnique(data.name, user.id);

          if (!isUnique) {
            form.setError("name", {
              type: "manual",
              message:
                "This name is already in use by another user. Please choose a different name.",
            });
            return; // Stop submission
          }
        } catch (validationError) {
          // Block submission when validation fails
          toast.error("Unable to verify name availability. Please try again.", {
            duration: 4000,
          });
          console.warn("Name validation failed:", validationError);
          setIsValidating(false);
          return; // Stop submission
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

      // Close modal after successful update
      setIsOpen(false);
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
        toast.error("Failed to save user changes. Please try again.", {
          duration: 4000,
        });
      }

      console.error("Update user error:", error);
    }
  };

  const isSubmitting = updateUserMutation.isPending;
  const isFormDisabled = isSubmitting || isValidating;

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    if (!newOpen) {
      // Reset form to original values when modal closes
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  };

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
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
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
            </motion.div>

            <motion.div variants={fadeInUp}>
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
            </motion.div>

            <motion.div variants={fadeInUp}>
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
            </motion.div>

            <motion.div variants={fadeInUp}>
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
            </motion.div>

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
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-2 bg-red-100 rounded-lg">
              <Trash2 className="w-5 h-5 text-red-600" />
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
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-900">
                Warning: This action is permanent
              </p>
              <p className="text-sm text-red-700 mt-1">
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

type AddUserModalProps = {
  children: React.ReactNode;
};

function AddUserModal({ children }: AddUserModalProps) {
  const createUserMutation = useCreateUser();
  const [isValidating, setIsValidating] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(addUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      status: "active",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      // Validate name uniqueness
      if (data.name.trim()) {
        setIsValidating(true);

        try {
          const isUnique = await userApi.checkNameUnique(data.name);

          if (!isUnique) {
            form.setError("name", {
              type: "manual",
              message:
                "This name is already in use by another user. Please choose a different name.",
            });
            return; // Stop submission
          }
        } catch (validationError) {
          // Block submission when validation fails
          toast.error("Unable to verify name availability. Please try again.", {
            duration: 4000,
          });
          console.warn("Name validation failed:", validationError);
          setIsValidating(false);
          return; // Stop submission
        } finally {
          setIsValidating(false);
        }
      }

      // Create user data with required fields
      const userData = {
        ...data,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}&size=150`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await createUserMutation.mutateAsync(userData);
      toast.success("User created successfully!");

      // Close modal after successful creation
      setIsOpen(false);

      // Reset form after successful creation
      form.reset({
        name: "",
        email: "",
        role: "user",
        status: "active",
      });
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

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    if (!newOpen) {
      // Reset form when modal closes
      form.reset({
        name: "",
        email: "",
        role: "user",
        status: "active",
      });
    }
  };

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
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
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
            </motion.div>

            <motion.div variants={fadeInUp}>
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
            </motion.div>

            <motion.div variants={fadeInUp}>
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
            </motion.div>

            <motion.div variants={fadeInUp}>
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
            </motion.div>

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

export { EditUserModal, DeleteUserModal, AddUserModal };
