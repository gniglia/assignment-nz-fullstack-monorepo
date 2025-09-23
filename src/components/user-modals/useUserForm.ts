import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { userApi } from "@/utils/api";
import {
  editUserFormSchema,
  addUserFormSchema,
  type UserFormData,
} from "@/lib/validations/user";
import type { User } from "@/types";

export function useUserForm(user?: User) {
  const [isValidating, setIsValidating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(user ? editUserFormSchema : addUserFormSchema),
    defaultValues: user
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
        },
  });

  const validateNameUniqueness = async (name: string) => {
    if (!name.trim()) return true;

    setIsValidating(true);
    try {
      const isUnique = await userApi.checkNameUnique(name, user?.id);
      if (!isUnique) {
        form.setError("name", {
          type: "manual",
          message:
            "This name is already in use by another user. Please choose a different name.",
        });
        return false;
      }
      return true;
    } catch (validationError) {
      toast.error("Unable to verify name availability. Please try again.", {
        duration: 4000,
      });
      console.warn("Name validation failed:", validationError);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    if (!newOpen) {
      form.reset(
        user
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
            },
      );
    }
  };

  const resetForm = () => {
    form.reset(
      user
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
          },
    );
  };

  return {
    form,
    isValidating,
    isOpen,
    setIsOpen,
    validateNameUniqueness,
    handleOpenChange,
    resetForm,
  };
}
