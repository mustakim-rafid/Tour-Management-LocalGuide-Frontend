import { z } from "zod";

export const tourInputZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tourFee: z
    .number()
    .nonnegative("Tour fee must be a positive number")
    .min(1, "Tour fee is required"),
  duration: z.string().min(1, "Duration is required"),
  meetingPoint: z.string().min(1, "Meeting point is required"),
  maxGroupSize: z
    .number()
    .int()
    .positive("Group size must be a positive number"),
  image: z.file().refine((file) => file.size > 0, {
    message: "Tour destination image is required",
  }),
  tourDate: z
    .string()
    .regex(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/, {
      message: "Tour date is required",
    })
    .refine((value) => {
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }, "Invalid calendar date"),
});
