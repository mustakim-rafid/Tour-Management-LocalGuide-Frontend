import { getMe } from "@/services/auth/getMe";
import DashboardNavbarContent from "./DashboardNavbarContent"

const DashboardNavbar = async () => {
    const userInfo = await getMe()

  return <DashboardNavbarContent userInfo={userInfo!} />
};

export default DashboardNavbar;
