import { UserRole } from "@/types/user.interface";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/register"];

const publicRoutes = ["/tours"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  patterns: [],
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin(\/.*)?$/],
};

export const guideProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/guide(\/.*)?$/],
};

export const touristProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard(\/.*)?$/],
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

export const isRouteMatch = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.length > 0) {
    return routes.exact.includes(pathname);
  }
  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "GUIDE" | "TOURIST" | "COMMON" | null => {
  if (isRouteMatch(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatch(pathname, guideProtectedRoutes)) {
    return "GUIDE";
  }
  if (isRouteMatch(pathname, touristProtectedRoutes)) {
    return "TOURIST";
  }
  if (isRouteMatch(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (user: UserRole): string => {
  if (user === "ADMIN") {
    return "/admin/dashboard";
  }
  if (user === "GUIDE") {
    return "/guide/dashboard";
  }
  if (user === "TOURIST") {
    return "/dashboard";
  }
  return "/";
};

export const isValidRouteForRole = (pathname: string, userRole: UserRole) => {
  if (publicRoutes.includes(pathname)) {
    return true;
  }
  const routeOwner = getRouteOwner(pathname);
  if (routeOwner === "COMMON") {
    return true;
  }
  if (routeOwner !== userRole) {
    return false;
  }
  return true;
};
