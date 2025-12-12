import z from "zod";

export const registerZodSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.email("Email is required or invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    role: z.enum(["guide", "tourist"], "Role is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginUserZodSchema = z.object({
  email: z.email("Email is required or invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const adminRegisterZodSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.email("Email is required or invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const changePasswordZodSchema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });
