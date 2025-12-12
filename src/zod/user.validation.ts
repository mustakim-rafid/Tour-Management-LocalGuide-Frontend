import { z } from "zod";

export const updateUserZodSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  address: z.string().nonempty("Address is required").optional(),
  contactNumber: z.string().nonempty("Address is required").optional(),
  bio: z.string().nonempty("Address is required").optional(),
  experienceYears: z
    .string()
    .transform((val) => Number(val))
    .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
});
