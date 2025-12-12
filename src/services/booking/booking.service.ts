"use server";

import { serverFetch } from "@/lib/serverFetch";

export const createBooking = async (payload: { tourId: string }) => {
  try {
    const res = await serverFetch.post("/booking", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

export const getTouristBookings = async (queryString: string) => {
  try {
    const res = await serverFetch.get(`/booking/tourist-bookings?${queryString ? queryString : ""}`)
    const result = await res.json()
    return result
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

export const confirmBooking = async (bookingId: string) => {
  try {
    const res = await serverFetch.patch(`/booking/confirm/${bookingId}`)
    const result = await res.json()
    return result
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

export const cancelBooking = async (bookingId: string) => {
  try {
    const res = await serverFetch.patch(`/booking/cancel/${bookingId}`)
    const result = await res.json()
    return result
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

export const completeBooking = async (bookingIds: string[]) => {
    try {
    const res = await serverFetch.patch(`/booking/complete`, {
      body: JSON.stringify({ bookingIds }),
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
      message: error.message || "Error in the complete booking process",
    };
  }
}
