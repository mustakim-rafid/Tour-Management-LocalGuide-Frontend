"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getStats = async () => {
  try {
    const res = await serverFetch.get("/home");
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Error while getting stats",
    };
  }
};
