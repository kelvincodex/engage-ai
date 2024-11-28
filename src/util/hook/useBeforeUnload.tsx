import {useCallback, useEffect} from "react";
import {appConfig} from "../../../config/app.config.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

export const useBeforeUnload = () => {
    const authState = useSelector((state:RootState)=> state.auth)
    const handleBeforeUnload = useCallback((event) => {
        // Cancel the event to show confirmation dialog
        event.preventDefault();

        // Chrome requires returnValue to be set explicitly
        event.returnValue = 'Are you sure you want to close?';

        // // Send beacon request
        // const url = `${appConfig[`baseUrl${import.meta.env.VITE_APP_ENV}`]}/authentication/logout`;
        // const data = JSON.stringify({
        //     userEmail: authState.userDetails?.userEmail ?? authState.loginInfo?.userEmail ?? "",
        // });
        //
        // navigator.sendBeacon(url, data);
    }, []);


    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [handleBeforeUnload]);
};