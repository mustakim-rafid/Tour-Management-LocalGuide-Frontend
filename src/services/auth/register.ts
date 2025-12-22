"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getZodErrorResponse } from "@/lib/zodErrorResponse";
import { registerZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./login";

export const register = async (_initialState: any, formData: FormData) => {
  try {
    const validationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role"),
    };

    const zodResponse = registerZodSchema.safeParse(validationData);

    if (!zodResponse.success)
      return getZodErrorResponse(zodResponse, validationData);

    const user = {
      password: zodResponse.data.password,
      [zodResponse.data.role]: {
        name: zodResponse.data.name,
        email: zodResponse.data.email,
      },
    };

    const newFormData = new FormData();

    newFormData.set("user", JSON.stringify(user));

    const file = formData.get("profilePhoto");
    if (file instanceof File && file.size > 0 && file.name !== undefined) {
      newFormData.append("profilePhoto", file);
    }

    let res;
    if (zodResponse.data.role === "guide") {
      res = await serverFetch.post("/user/create-guide", {
        body: newFormData,
      });
    } else if (zodResponse.data.role === "tourist") {
      res = await serverFetch.post("/user/create-tourist", {
        body: newFormData,
      });
    } else {
      throw new Error("Invalid role");
    }

    const result = await res.json();

    if (!result.success && result.error) {
      return result;
    }

    if (result.success) {
      await loginUser(_initialState, formData);
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
    return {
      success: false,
      message: "User creation failed",
    };
  }
};
