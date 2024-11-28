import {AppRouter} from "@/router";
import "@/assets/style/index.scss";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useBeforeUnload} from "@/util/hook/useBeforeUnload.tsx";
import {useInitialization} from "@/util/hook/useInitialization.tsx";
import {useRouteUtil} from "@/util/hook/useRouteUtil.tsx";

export const App = ()=>{
    useBeforeUnload()
    useInitialization()
    const routeUtil = useRouteUtil()


        return (
        <>
            <ToastContainer />
            <AppRouter />
        </>
    )
}