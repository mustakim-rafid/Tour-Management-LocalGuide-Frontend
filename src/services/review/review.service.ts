"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getZodErrorResponse } from "@/lib/zodErrorResponse";
import { reviewInputZodSchema } from "@/zod/review.validation";

export const createReview = async (_initialValue: any, formData: FormData) => {
  const reviewData = {
    bookingId: formData.get("bookingId"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  };

  const zodResponse = reviewInputZodSchema.safeParse(reviewData);

  if (!zodResponse.success) {
    return getZodErrorResponse(zodResponse, reviewData);
  }

  try {
    const res = await serverFetch.post("/review", {
        body: JSON.stringify(zodResponse.data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await res.json()
    return result
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Error while creating the review"
    };
  }
};
