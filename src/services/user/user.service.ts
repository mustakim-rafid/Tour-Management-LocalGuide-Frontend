"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getZodErrorResponse } from "@/lib/zodErrorResponse";
import { adminRegisterZodSchema } from "@/zod/auth.validation";
import { updateUserZodSchema } from "@/zod/user.validation";

export const createAdmin = async (_initialState: any, formData: FormData) => {
  try {
    const validationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const zodResponse = adminRegisterZodSchema.safeParse(validationData);

    if (!zodResponse.success)
      return getZodErrorResponse(zodResponse, validationData);

    const user = {
      password: zodResponse.data.password,
      admin: {
        name: zodResponse.data.name,
        email: zodResponse.data.email,
      },
    };

    const newFormData = new FormData();

    newFormData.set("user", JSON.stringify(user));

    const file = formData.get("file");
    if (file instanceof File && file.size > 0 && file.name !== undefined) {
      newFormData.set("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/user/create-admin", {
      body: newFormData,
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
    return {
      success: false,
      message: "Admin creation failed",
    };
  }
};

export const getAllUsers = async (queryParams: string) => {
  try {
    const res = await serverFetch.get(
      `/user?${queryParams ? queryParams : ""}`
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error while getting users",
    };
  }
};

export const updateUser = async (_initialState: any, formData: FormData) => {
  const updateableData = {
    name: formData.get("name"),
    address: formData.get("address"),
    contactNumber: formData.get("contactNumber"),
    bio: formData.get("bio"),
    experienceYears: formData.get("experienceYears"),
  };

  const zodResponse = updateUserZodSchema.safeParse(updateableData)

  if (!zodResponse.success) {
    return getZodErrorResponse(zodResponse, updateableData)
  }

  try {
    const res = await serverFetch.patch("/user", {
      body: JSON.stringify(zodResponse.data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();
    console.log(result)
    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error while updating user",
    };
  }
};

export const softDelete = async (userId: string) => {
  try {
    const res = await serverFetch.patch(`/user/soft-delete/${userId}`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "User deletion failed",
    };
  }
};
