import z from "zod";

export const signInSchema = z.object({
  remember: z
    .string({
      message: "Remember preference must be a text value",
    })
    .optional(),

  email: z
    .email({
      message: "Please enter a valid email address format",
    })
    .trim()
    .nonempty({
      message: "Email address cannot be empty",
    })
    .max(254, {
      message: "Email address cannot exceed 254 characters",
    }),

  password: z
    .string({
      message: "Password is required",
    })
    .trim()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .nonempty({
      message: "Password cannot be empty",
    })
    .max(100, {
      message: "Password cannot exceed 100 characters",
    }),
});

