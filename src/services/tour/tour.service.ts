"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getZodErrorResponse } from "@/lib/zodErrorResponse";
import { tourInputZodSchema } from "@/zod/tour.validation";

export const createTour = async (_initialState: any, formData: FormData) => {
  try {
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      tourFee: Number(formData.get("tourFee")),
      duration: formData.get("duration"),
      meetingPoint: formData.get("meetingPoint"),
      maxGroupSize: Number(formData.get("maxGroupSize")),
      tourDate: formData.get("tourDate"),
      image: formData.get("image"),
    };

    const zodResponse = tourInputZodSchema.safeParse(data);

    if (!zodResponse.success) return getZodErrorResponse(zodResponse, data);

    const newFormData = new FormData();
    newFormData.append("tour", JSON.stringify(zodResponse.data));

    const file = formData.get("image");
    if (file instanceof File && file.size > 0 && file.name !== undefined) {
      newFormData.append("image", file);
    }

    const res = await serverFetch.post("/tour", {
      body: newFormData,
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      err: error.message || "Something went wrong",
    };
  }
};

export const getAllTours = async (queryParams?: string) => {
  try {
    const res = await serverFetch.get(
      `/tour?${queryParams ? queryParams : ""}`
    );
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

export const getTourById = async (tourId: string) => {
  try {
    const res = await serverFetch.get(`/tour/${tourId}`)
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

export const getGuideTours = async (queryParams?: string) => {
  try {
    const res = await serverFetch.get(
      `/tour/guide-tours?${queryParams ? queryParams : ""}`
    );
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

export const editTour = async (
  id: string,
  _initialState: any,
  formData: FormData
) => {
  try {
    const data = {
      title: formData.get("title") || null,
      description: formData.get("description") || null,
      tourFee: Number(formData.get("tourFee")) || null,
      duration: formData.get("duration") || null,
      meetingPoint: formData.get("meetingPoint") || null,
      maxGroupSize: Number(formData.get("maxGroupSize")) || null,
      tourDate: formData.get("tourDate") || null,
    };

    const res = await serverFetch.patch(`/tour/${id}`, {
      body: JSON.stringify(data),
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
      error: error.message || "Something went wrong",
    };
  }
};

export const deleteTour = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/tour/${id}`);
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
