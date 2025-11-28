import z from "zod";
enum UserRole {
  ADMIN = "admin",
  EMPLOYER = "employer",
  JOBSEEKER = "jobseeker",
}

export const userValidationSchema = z
  .object({
    name: z
      .string({
        message: "Name is required",
      })
      .min(1, "Name cannot be empty")
      .max(100, "Name cannot exceed 100 characters")
      .trim(),

    email: z
      .email("Please provide a valid email address")
      .min(1, "Email cannot be empty")
      .max(255, "Email cannot exceed 255 characters")
      .trim()
      .toLowerCase(),

    password: z
      .string({
        message: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password cannot exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      ),
    confirmPassword: z
      .string({
        message: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password cannot exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      ),
    role: z
      .enum([ "employer", "jobseeker"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });
