"use server";

import { serverFetch } from "@/lib/serverFetch";

export const tourPayment = async (bookingId: string) => {
  try {
    const res = await serverFetch.post(`/payment/${bookingId}`)
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
};