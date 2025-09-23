import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { userApi } from "@/utils/api";
import {
  editUserFormSchema,
  addUserFormSchema,
  type UserFormData,
} from "@/features/users/formSchema";
import type { User } from "@/types";

export function useUserForm(user?: User) {
  const [isValidating, setIsValidating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Extract default values logic to avoid repetition
  const getDefaultValues = useCallback((): UserFormData => {
    return user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        }
      : {
          name: "",
          email: "",
          role: "user",
          status: "active",
        };
  }, [user]);

  const form = useForm<UserFormData>({
    resolver: zodResolver(user ? editUserFormSchema : addUserFormSchema),
    defaultValues: getDefaultValues(),
  });

  // Reset form when user data changes (for optimistic updates)
  useEffect(() => {
    if (user) {
      form.reset(getDefaultValues());
    }
  }, [user, form, getDefaultValues]);

  const validateEmailUniqueness = async (email: string) => {
    if (!email.trim()) return true;

    setIsValidating(true);
    try {
      const isUnique = await userApi.checkEmailUnique(email, user?.id);
      if (!isUnique) {
        form.setError("email", {
          type: "manual",
          message:
            "This email is already in use by another user. Please choose a different email.",
        });
        return false;
      }
      return true;
    } catch (validationError) {
      toast.error("Unable to verify email availability. Please try again.");
      console.warn("Email validation failed:", validationError);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    if (!newOpen) {
      form.reset(getDefaultValues());
    }
  };

  const resetForm = () => {
    form.reset(getDefaultValues());
  };

  return {
    form,
    isValidating,
    isOpen,
    setIsOpen,
    validateEmailUniqueness,
    handleOpenChange,
    resetForm,
  };
}
