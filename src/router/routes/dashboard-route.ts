import {RouteType} from "@/router/routes/index.ts";
import {RoutesConstant} from "@/util/constant/RoutesConstant.ts";
import {OverviewScreen} from "@/view/dashboard/overview/OverviewScreen.tsx";

export const dashboardRoute: RouteType[] = [
    {
        path: RoutesConstant.dashboard.overview.index,
        component: OverviewScreen,
        metadata: {
            hasSidebar: true,
            isAuthenticated: false,
        }
    },
]
