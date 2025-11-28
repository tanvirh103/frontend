import z from "zod";

export const updateUserValidationSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(100, "Name cannot exceed 100 characters")
    .trim()
    .optional(),
  bio: z.string().max(1000, "Bio cannot exceed 1000 characters").optional(),
  skills: z
    .array(
      z
        .string()
        .min(1, "Skill cannot be empty")
        .max(50, "Skill cannot exceed 50 characters")
        .trim()
    )
    .max(20, "Cannot have more than 20 skills")
    .optional(),
  experience: z
    .string()
    .trim()
    .max(20, "Experience cannot exceed 20 characters")
    .optional(),
  resume: z.url("Resume must be a valid URL").optional().or(z.literal("")),
});

export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string({ message: "Old password is required" })
      .trim()
      .min(8)
      .nonempty(),
    password: z
      .string({ message: "New password is required" })
      .trim()
      .min(8)
      .nonempty(),
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .trim()
      .min(8)
      .nonempty(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "does not match",
    path: ["confirmPassword"],
  });
