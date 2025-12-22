import { INavMain } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute } from "./auth-utils";
import { UserRole } from "@/types/user.interface";

export const adminNavMainItems: INavMain[] = [
  {
    title: "User management",
    icon: "Users",
    isActive: false,
    items: [
      {
        title: "Users",
        url: "/admin/dashboard/user-management",
      },
    ],
  },
  {
    title: "Tour management",
    icon: "Luggage",
    isActive: false,
    items: [
      {
        title: "Tours",
        url: "/admin/dashboard/tour-management",
      },
    ],
  },
];

export const guideNavMainItems: INavMain[] = [
  {
    title: "Tour",
    icon: "Luggage",
    isActive: false,
    items: [
      {
        title: "My tours",
        url: "/guide/dashboard/my-tours",
      },
    ],
  },
  {
    title: "Bookings",
    icon: "TicketsPlane",
    isActive: false,
    items: [
      {
        title: "Tour Requests",
        url: "/guide/dashboard/pending-requests",
      },
      {
        title: "Upcoming Bookings",
        url: "/guide/dashboard/upcoming-bookings"
      }
    ],
  },
];

export const touristNavMainItems: INavMain[] = [
  {
    title: "Tour",
    icon: "TicketsPlane",
    isActive: false,
    items: [
      {
        title: "Booked tours",
        url: "/dashboard/my-trips",
      },
      {
        title: "Explore tours",
        url: "/tours"
      }
    ],
  },
];

export const getCommonNavMainItemsByRole = (userRole: UserRole): INavMain[] => {
  return [
    {
      title: "Home",
      icon: "Home",
      isActive: true,
      items: [
        {
          title: "Home page",
          url: "/"
        },
        {
          title: "Overview",
          url: getDefaultDashboardRoute(userRole),
        },
      ],
    },
    {
      title: "Settings",
      icon: "Settings",
      isActive: false,
      items: [
        {
          title: "My profile",
          url: "/my-profile",
        },
        {
          title: "Change password",
          url: "/change-password",
        },
      ],
    },
  ];
};

export const getNavMainItemsByRole = (userRole: UserRole): INavMain[] => {
  switch (userRole) {
    case "ADMIN":
      return [...getCommonNavMainItemsByRole(userRole), ...adminNavMainItems];
    case "GUIDE":
      return [...getCommonNavMainItemsByRole(userRole), ...guideNavMainItems];
    case "TOURIST":
      return [...getCommonNavMainItemsByRole(userRole), ...touristNavMainItems];
  }
};
