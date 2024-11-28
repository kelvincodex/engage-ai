import {useNavigate} from "react-router-dom";
import {RoutesConstant} from "@/util/constant/RoutesConstant.ts";

export const useRouteUtil = () => {
    const navigate = useNavigate();

    return {
        page: {
        },
        auth: {
        },
        dashboard: {
            overview: () => navigate(RoutesConstant.dashboard.overview.index),
        },
        back: (step?: number) => navigate(step ?? -1),

    }
}
