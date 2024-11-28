import { useMsal } from "@azure/msal-react";
import {AuthenticationResult, PopupRequest} from '@azure/msal-browser';
import {MsLoginRequestInit} from "@/model/request/auth/MsLoginRequest.ts";
import {toast} from "react-toastify";
import {RoutesConstant} from "@/util/constant/RoutesConstant.ts";

interface UseAuthReturn {
    login: () => Promise<void>;
    logout: () => Promise<void>;
    getToken: () => Promise<string | null>;
    isAuthenticated: boolean;
    userEmail?: string;
    userName?: string;
}

export const useMSAuth = (): UseAuthReturn => {
    const { instance, accounts } = useMsal();

    const login = async (): Promise<void> => {
        try {
            const loginOptions: PopupRequest = {
                ...MsLoginRequestInit,
                // redirectUri: `${window.location.origin}${RoutesConstant.auth.initialLogin}`,
                redirectUri: import.meta.env.VITE_MS_REDIRECT_URL,
            };

            await instance.loginPopup(loginOptions);
        } catch (error) {
            console.error('Login failed:', error);
            toast(`Login failed: ${error}`, {type: "error"})
            throw error;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await instance.logoutPopup();
        } catch (error) {
            console.error('Logout failed:', error);
            toast(`Logout failed: ${error}`, {type: "error"})

            throw error;
        }
    };

    const getToken = async (): Promise<string | null> => {
        try {
            const response: AuthenticationResult = await instance.acquireTokenSilent({
                ...MsLoginRequestInit,
                account: accounts[0]
            });
            return response.accessToken;
        } catch (error) {
            console.error('Token acquisition failed:', error);
            toast(`Token acquisition failed: ${error}`, {type: "error"})
            return null;
        }
    };

    return {
        login,
        logout,
        getToken,
        isAuthenticated: accounts.length > 0,
        userEmail: accounts[0]?.username,
        userName: accounts[0]?.name
    };
};