import {RoutesConstant} from "@/util/constant/RoutesConstant.ts";
import DashboardIcon from "@/assets/icon/dashboard.svg"

export const  SidebarData =  (routeUtil?: any, value?: string)=>  [
    {
        label: '',
        items: [
            {
                label: 'Dashboard',
                icon: DashboardIcon,
                children: [],
                route: RoutesConstant.dashboard.overview.index,
                action: routeUtil.dashboard.overview,
                show: true
            },
        ],
    },
]
