import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { UseFormReturn } from "react-hook-form";
import type { UserFormData } from "@/lib/validations/user";

type UserFormFieldsProps = {
  form: UseFormReturn<UserFormData>; // React Hook Form instance
  isFormDisabled: boolean;
};

const roleOptions = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
  { value: "moderator", label: "Moderator" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

export const UserFormFields = React.memo(function UserFormFields({
  form,
  isFormDisabled,
}: UserFormFieldsProps) {
  return (
    <motion.div
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
                  options={roleOptions}
                  onValueChange={field.onChange}
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
                  options={statusOptions}
                  onValueChange={field.onChange}
                  disabled={isFormDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </motion.div>
  );
});
