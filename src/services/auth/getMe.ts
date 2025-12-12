import { serverFetch } from "@/lib/serverFetch";
import { UserInfo } from "@/types/user.interface";

export const getMe = async (): Promise< UserInfo | null > => {
  try {
    const res = await serverFetch.get("/auth/getme")
    const result = await res.json()

    if (!result.success) {
        return null
    }

    return result.data

  } catch (error) {
    console.log(error)
    return null;
  }
};
