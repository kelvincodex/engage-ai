import React from "react";
import {authRoute} from "@/router/routes/auth-route.ts";
import {dashboardRoute} from "@/router/routes/dashboard-route.ts";
import {pageRoute} from "@/router/routes/page-route.ts";
import {DashboardLayoutProps} from "@/view/layout/DashboardLayout.tsx";

export type RouteType = {
    path: string,
    component: React.ComponentType,
    metadata?: Options,
}
type Options = {
    hasSidebar?: boolean,
    isAuthenticated?: boolean,
    redirectTo?: string,
    dashboardProps?: DashboardLayoutProps
}

const initRoute  = ([] as RouteType[]);

export const routes = initRoute.concat(pageRoute, authRoute, dashboardRoute)
