import {PageLayout} from "@/view/layout/PageLayout.tsx";
import React from "react";
import Lottie from "lottie-react";
import Awaiting from "@/assets/lotties/awaiting.json";
import {InitiateLoginRequest, InitiateLoginRequestInit} from "@/model/request/auth/InitiateLoginRequest.ts";
import {auth} from "@/store/module/auth.ts";
import {PayloadAction} from "@reduxjs/toolkit";
import {BaseResponse} from "@/model/response/BaseResponse.ts";
import {ResponseUtil} from "@/util/helper/ResponseUtil.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useRouteUtil} from "@/util/hook/useRouteUtil.tsx";
import {DefaultButton} from "@/component/button/DefaultButton.tsx";

export const LoginAwaitingApprovalScreen = ()=>{
    const authState = useSelector((state: RootState)=> state.auth)
    const locsState = useSelector((state: RootState)=> state.locs)
    const dispatch = useDispatch<any>()
    const routeUtil = useRouteUtil()

    function handleSubmit(){
        const request: InitiateLoginRequest = {
            ...authState?.loginInfo,
            deviceId: authState.deviceToken ?? "",
            latitude: locsState?.position?.coords?.latitude?.toString(),
            longitude: locsState?.position?.coords?.longitude?.toString(),
        }

        // //todo init login
        dispatch(auth.action.login(request)).then((result: PayloadAction<BaseResponse>)=>{
            if (result.payload.responseCode == '00'){
                return ResponseUtil.customResponse(dispatch, result.payload.responseMessage,'success', routeUtil.auth.completeLogin, 'Complete Login')
            }else if (result.payload.responseCode == '110' || result.payload.responseMessage == "User has not completed enrollment"){
                return ResponseUtil.customResponse(dispatch, result.payload.responseMessage,'warning', routeUtil.auth.completeEnrollment,"Proceed")
            }else if (result.payload.responseCode == '32' ){
                return ResponseUtil.customResponse(dispatch, result.payload.responseMessage,'warning', routeUtil.page.loginAwaitingApproval,"Proceed")
            } else {
                return ResponseUtil.apiResponse(dispatch, result)
            }
        })
    }

    return (
        <PageLayout>
            <div className="flex flex-col flex-1 items-center justify-center w-full">
                <Lottie animationData={Awaiting}  className={'w-[70px] h-[70px]'} loop={true} />
                <h2 className={' text-center font-bold'}>Awaiting Approval</h2>
                <DefaultButton type={'submit'} loading={!!authState.loading} onClick={handleSubmit} className={'w-72     mt-3'}>Try Again</DefaultButton>

            </div>
        </PageLayout>
    )
}