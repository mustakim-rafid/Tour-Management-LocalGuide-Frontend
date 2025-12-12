import z from "zod";

export const reviewInputZodSchema = z.object({
  bookingId: z.string().nonempty("Booking id is required"),
  rating: z
    .string()
    .transform((val) => Number(val)),
  comment: z.string().nonempty("Comment is required"),
});
