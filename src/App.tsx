import {AppRouter} from "@/router";
import "@/assets/style/index.scss";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useBeforeUnload} from "@/util/hook/useBeforeUnload.tsx";
import {useInitialization} from "@/util/hook/useInitialization.tsx";
import {MotionConfig} from "framer-motion";

export const App = ()=>{
    useBeforeUnload()
    useInitialization()
        return (
        <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }} >
            <ToastContainer />
            <AppRouter />
        </MotionConfig>
    )
}