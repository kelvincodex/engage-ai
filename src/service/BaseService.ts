import axios from "axios";
import {GetThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {ThunkApiConfig} from "@/util/type/StoreTypes.ts";
import {RootState} from "@/store";
import {appConfig} from "../../config/app.config.ts";
import {base} from "@/store/module/base.ts";
import {ModalConstant} from "@/util/constant/ModalConstant.ts";
import {auth} from "@/store/module/auth.ts";
import {RoutesConstant} from "@/util/constant/RoutesConstant.ts";
import {NetworkHandlerHelper} from "@/util/helper/NetworkHandlerHelper.ts";

const ApiClient = (others: GetThunkAPI<ThunkApiConfig>) => {
    const authState = (others.getState() as RootState).auth
    //todo axiosInstance
    const axiosInstance = axios.create({
        baseURL: appConfig[`baseUrl${import.meta.env.VITE_APP_ENV}`],
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": '*'
        }
    })

    //interceptors request
    axiosInstance.interceptors.request.use(function (config) {
        config.headers.Authorization =  `${authState?.token}`
        // console.log("Headers ===> ", config.headers)
        console.log("Url ===> ", config.baseURL! + config.url!)
        console.log("Request ===> ", config.data)

        if (config.method === 'post' || config.method === 'put') {
            config.onUploadProgress = (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percentCompleted}%`);
            };
        }

        if (config.method === 'get' && config.responseType === 'blob') {
            config.onDownloadProgress = (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Download progress: ${percentCompleted}%`);
            };
        }

        return config;
    }, function (error) {
        console.log("Request Error ===> ",error.response.data)
        return Promise.reject(error);
    });

    //interceptors response
    axiosInstance.interceptors.response.use((response)=>{
        console.log("Response ===> ",response.data)
        if(response.data?.responseMessage?.includes('JWT')){
            others.dispatch(base.mutation.setModalOptions({
                component: ModalConstant.notificationModal,
                show: true,
                metadata: {
                    notificationOptions: {
                        title:"Session timeout",
                        message: "Your session has timed out. Click to login again.",
                        type: "warning",
                        buttons:[
                            {title: "Proceed, to Login",
                                action:()=>{
                                    others.dispatch(auth.action.ssrLogout({userEmail: authState.userDetails?.userEmail}));
                                    others.dispatch(auth.mutation.setToken(null))
                                    others.dispatch(base.mutation.setCurrentRoutePath(window.location.pathname));
                                    localStorage.removeItem('timeLeft');
                                    window.location.href = RoutesConstant.auth.initialLogin
                                    others.dispatch(base.mutation.resetModalOptions())
                                }}
                        ]
                    }
                }
            }))
        }
        return response
    },(error)=>{
        console.log("Response Error ===> ",error.response.data)

       const err = NetworkHandlerHelper.handle(error?.code)

        return Promise.reject(err)
    })
    return axiosInstance
}


export const BaseService = {
    apiClient: ApiClient,
}