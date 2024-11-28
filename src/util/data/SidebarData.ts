import {RoutesConstant} from "@/util/constant/RoutesConstant.ts";
import DashboardIcon from "@/assets/icon/dashboard.svg"
import UserIcon from "@/assets/icon/user-s.svg"
import LocationIcon from "@/assets/icon/location-link-route.svg"
import CalenderIcon from "@/assets/icon/calender.svg"
import NotificationIcon from "@/assets/icon/notification.svg"

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
            {
                label: 'Segment',
                icon: UserIcon,
                children: [],
                route: RoutesConstant.dashboard.segment.index,
                action: routeUtil.dashboard.overview,
                show: true
            },
            {
                label: 'User Journey',
                icon: LocationIcon,
                children: [],
                route: RoutesConstant.dashboard.userJourney.index,
                action: routeUtil.dashboard.overview,
                show: true
            },
            {
                label: 'Events',
                icon: CalenderIcon,
                children: [],
                route: RoutesConstant.dashboard.event.index,
                action: routeUtil.dashboard.overview,
                show: true
            },
            {
                label: 'Notification',
                icon: NotificationIcon,
                children: [],
                route: RoutesConstant.dashboard.notification.index,
                action: routeUtil.dashboard.overview,
                show: true
            },
        ],
    },
]
