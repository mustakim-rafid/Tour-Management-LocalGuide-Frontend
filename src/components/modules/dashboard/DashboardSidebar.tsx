import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { getMe } from "@/services/auth/getMe";
import { getNavMainItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { UserInfo } from "@/types/user.interface";

const DashboardSidebar = async () => {
  const userInfo = await getMe();

  const navMainItems = getNavMainItemsByRole((userInfo as UserInfo).role);

  const defaultDashboardPath = getDefaultDashboardRoute(userInfo!.role);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground dark:hover:bg-gray-800"
            >
              <Link
                href={defaultDashboardPath}
                className="flex items-center gap-2"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <div className="w-8 h-8 bg-linear-to-b rounded-lg from-primary to-secondary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">
                      LG
                    </span>
                  </div>
                </div>

                <span className="text-xl font-bold w-40 text-foreground sm:inline">
                  Local Guide
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userInfo={userInfo!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
