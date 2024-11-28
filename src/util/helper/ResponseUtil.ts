import {base} from "@/store/module/base.ts";
import {ModalConstant} from "@/util/constant/ModalConstant.ts";
import {Dispatch} from "redux";

export class ResponseUtil {
    static customResponse(dispatch: Dispatch, message:string="successful", type: 'warning'|'error'|'success'= 'success', callback?:()=>void, title: string="Proceed"){
        dispatch(base.mutation.setModalOptions({
            component: ModalConstant.notificationModal,
            show: true,
            metadata: {
                notificationOptions: {
                    title: type == 'error' ? "Error" : type == 'success' ? 'Success' :  'Warning',
                    message: message,
                    type: type,
                    buttons:[
                        {title: title, action:()=>{
                                dispatch(base.mutation.resetModalOptions())
                                callback && callback();
                            }}
                    ]
                }
            }
        }))
    }

    static apiResponse(dispatch: Dispatch, response: any, type: 'warning'|'error'|'success'= 'error', callback?:()=>void){
        if (response.payload.responseCode){
            dispatch(base.mutation.setModalOptions({
                component: ModalConstant.notificationModal,
                show: true,
                metadata: {
                    notificationOptions: {
                        title: type == 'error' ? "Error" : type == 'success' ? 'Success' :  'Warning',
                        message: response?.payload?.responseMessage ?? response?.responseMessage,
                        type: type,
                        buttons:[
                            {title: "Ok", action:()=>{
                                dispatch(base.mutation.resetModalOptions())
                                    callback && callback();
                                }}
                        ]
                    }
                }
            }))
        }else {
            dispatch(base.mutation.setModalOptions({
                component: ModalConstant.notificationModal,
                show: true,
                metadata: {
                    notificationOptions: {
                        title:"Error",
                        message: "Something went wrong.",
                        type: "error",
                        buttons:[
                            {title: "Proceed", action:()=>{
                                    dispatch(base.mutation.resetModalOptions())
                                    callback && callback();
                                }}
                        ]
                    }
                }
            }))
        }
    }
}