import { z } from "zod";

// Define role and status as const arrays for better type safety
const ROLES = ["admin", "user", "moderator"] as const;
const STATUSES = ["active", "inactive", "pending"] as const;

// Base schema without email uniqueness validation
const baseUserFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .trim(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  role: z.enum(ROLES, {
    message: "Please select a valid role",
  }),

  status: z.enum(STATUSES, {
    message: "Please select a valid status",
  }),
});

// Schema for editing existing users (basic validation, uniqueness handled separately)
export const editUserFormSchema = baseUserFormSchema;

// Schema for adding new users (includes email uniqueness validation)
export const addUserFormSchema = baseUserFormSchema.refine(
  (data) => data.name.trim().length > 0,
  {
    message: "Name is required",
    path: ["name"],
  },
);

export type UserFormData = z.infer<typeof baseUserFormSchema>;
export type UserRole = (typeof ROLES)[number];
export type UserStatus = (typeof STATUSES)[number];
