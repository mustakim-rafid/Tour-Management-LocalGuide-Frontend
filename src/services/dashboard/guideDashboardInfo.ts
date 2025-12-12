"use server";

import { serverFetch } from "@/lib/serverFetch";

export const guideDashboardInfo = async () => {
  try {
    const res = await serverFetch.get("/dashboard/guide");
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        error.message || "Error while retrieving the guide dashboard info",
    };
  }
};
