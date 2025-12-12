"use server";

import { serverFetch } from "@/lib/serverFetch";

export const adminDashboardInfo = async () => {
  try {
    const res = await serverFetch.get("/dashboard/admin");
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        error.message || "Error while retrieving the admin dashboard info",
    };
  }
};
