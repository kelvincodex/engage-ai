import {RouteType} from "@/router/routes/index.ts";
import {RoutesConstant} from "@/util/constant/RoutesConstant.ts";
import {NotFoundPage} from "@/view/page/NotFoundPage.tsx";

export const pageRoute: RouteType[] = [
    {
        path:RoutesConstant.page.notFound,
        component: NotFoundPage,
        metadata: {}
    },
]