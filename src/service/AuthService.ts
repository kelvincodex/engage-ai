import {BaseService} from "./BaseService";
import {InitiateLoginRequest} from "../model/request/auth/InitiateLoginRequest.ts";
import {CompleteLoginRequest} from "../model/request/auth/CompleteLoginRequest.tsx";
import {InitiatePasswordResetRequest} from "../model/request/auth/InitiatePasswordResetRequest.ts";
import {CompletePasswordResetRequest} from "../model/request/auth/CompletePasswordResetRequest.ts";
import {ChangePasswordRequest} from "../model/request/auth/ChangePasswordRequest.ts";
import {CompleteSignupRequest} from "../model/request/auth/CompleteSignupRequest.tsx";
import {ResendOtpRequest} from "../model/request/auth/ResendOtpRequest.tsx";
import {RejectSecondLoginRequest} from "@/model/request/auth/RejectSecondLoginRequest.ts";

export class AuthService {
    static initiateLogin = (others: any, data: InitiateLoginRequest) =>{
        return BaseService.apiClient(others).post("/authentication/initiate-login",data)
    }
    static completeLogin = (others: any, data: CompleteLoginRequest) =>{
        return BaseService.apiClient(others).post("/authentication/complete-login",data)
    }
    static resendOtp = (others: any, data: ResendOtpRequest) =>{
        return BaseService.apiClient(others).post("/authentication/resend-otp",data)
    }
    static userDetails = (others: any) =>{
        return BaseService.apiClient(others).get("/authentication/user-details")
    }
    static initiatePasswordRequest = (others: any, data: InitiatePasswordResetRequest) =>{
        return BaseService.apiClient(others).post("/authentication/initiate-password-reset", data)
    }
    static completePasswordRequest = (others: any, data: CompletePasswordResetRequest) =>{
        return BaseService.apiClient(others).post("/authentication/complete-password-reset", data)
    }
    static changePassword = (others: any, data: ChangePasswordRequest) =>{
        return BaseService.apiClient(others).post("/authentication/change-password", data)
    }
    static completeSignup = (others: any, data: CompleteSignupRequest) =>{
        return BaseService.apiClient(others).post("/authentication/complete-enrollment", data)
    }
    static ssrLogout = (others: any, data: {userEmail: string}) =>{
        return BaseService.apiClient(others).post("/authentication/logout", data)
    }
    static rejectSecondLogin = (others: any, data: RejectSecondLoginRequest) =>{
        return BaseService.apiClient(others).post("/authentication/reject-second-login", data)
    }
    static approveSecondLogin = (others: any, data: RejectSecondLoginRequest) =>{
        return BaseService.apiClient(others).post("/authentication/approve-second-login", data)
    }
}