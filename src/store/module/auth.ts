import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthService} from "@/service/AuthService.ts";
import {InitiateLoginRequest} from "@/model/request/auth/InitiateLoginRequest.ts";
import {InitiatePasswordResetRequest} from "@/model/request/auth/InitiatePasswordResetRequest.ts";
import {CompletePasswordResetRequest} from "@/model/request/auth/CompletePasswordResetRequest.ts";
import {ChangePasswordRequest} from "@/model/request/auth/ChangePasswordRequest.ts";
import {UserDetailsResponse} from "@/model/response/auth/UserDetailsResponse.tsx";
import {ResendOtpRequest} from "@/model/request/auth/ResendOtpRequest.tsx";
import {CompleteSignupRequest} from "@/model/request/auth/CompleteSignupRequest.tsx";
import {CompleteLoginRequest} from "@/model/request/auth/CompleteLoginRequest.tsx";
import {BaseResponse} from "@/model/response/BaseResponse.ts";
import {RejectSecondLoginRequest} from "@/model/request/auth/RejectSecondLoginRequest.ts";

export type AuthState = {
    token: string|null,
    deviceToken: string|null,
    loading: boolean,
    changeLoading: boolean,
    resendLoading: boolean,
    loginInfo: any,
    userDetails: UserDetailsResponse,
    routePath: string,
}

const initialState: AuthState = {
    token: null,
    deviceToken : null,
    loading: false,
    changeLoading: false,
    resendLoading: false,
    userDetails:{} as UserDetailsResponse,
    loginInfo: {},
    routePath: ""
}

const action = {
    login: createAsyncThunk("auth/initiateLogin",  async (payload:InitiateLoginRequest, thunkAPI)=>{
        try {
            const response = await AuthService.initiateLogin(thunkAPI,payload)
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.message)
        }
    }),
    completeLogin: createAsyncThunk("auth/completeLogin",  async (payload:CompleteLoginRequest, thunkAPI)=>{
        try {
            const response = await AuthService.completeLogin(thunkAPI,payload)
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.message)
        }
    }),
    userDetails: createAsyncThunk("auth/userDetails",  async (_, thunkAPI)=>{
        try {
            const response = await AuthService.userDetails(thunkAPI)
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.message)
        }
    }),
    initiatePasswordReset: createAsyncThunk("auth/initiatePasswordReset",  async (payload: InitiatePasswordResetRequest, thunkAPI)=>{
        try {
            const response = await AuthService.initiatePasswordRequest(thunkAPI, payload)
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.message)
        }
    }),
    completePasswordReset: createAsyncThunk("auth/completePasswordReset",  async (payload:CompletePasswordResetRequest, thunkAPI)=>{
        try {
            const response = await AuthService.completePasswordRequest(thunkAPI, payload)
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.message)
        }

    }),
    changePassword: createAsyncThunk("auth/changePassword",  async (payload: ChangePasswordRequest, thunkAPI)=>{
        try {
            const response = await AuthService.changePassword(thunkAPI, payload)
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.message)
        }
    }),
    completeSignup: createAsyncThunk("auth/completeSignup",  async (payload:CompleteSignupRequest, thunkAPI)=>{
        try {
            const response = await AuthService.completeSignup(thunkAPI, payload)
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.message)
        }
    }),
    resendOtp: createAsyncThunk("auth/resendOtp",  async (payload:ResendOtpRequest, thunkAPI)=>{
        try {
            const response = await AuthService.resendOtp(thunkAPI, payload)
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.message)
        }
    }),
    logout: createAsyncThunk("auth/logout",  async (_, thunkAPI)=>{
        try {
            thunkAPI.dispatch(slice.actions.setToken(null))
        } catch (error){
            return thunkAPI.rejectWithValue(error)
        }
    }),
    ssrLogout: createAsyncThunk("auth/ssrLogout",  async (payload:{userEmail: string}, thunkAPI)=>{
        try {
            const response = await AuthService.ssrLogout(thunkAPI, payload)
            return response.data
        } catch (error){
            return thunkAPI.rejectWithValue(error)
        }
    }),
    rejectSecondLogin: createAsyncThunk("auth/rejectSecondLogin",  async (payload:RejectSecondLoginRequest, thunkAPI)=>{
        try {
            const response = await AuthService.rejectSecondLogin(thunkAPI, payload)
            return response.data
        } catch (error){
            return thunkAPI.rejectWithValue(error)
        }
    }),
    approveSecondLogin: createAsyncThunk("auth/approveSecondLogin",  async (payload:RejectSecondLoginRequest, thunkAPI)=>{
        try {
            const response = await AuthService.approveSecondLogin(thunkAPI, payload)
            return response.data
        } catch (error){
            return thunkAPI.rejectWithValue(error)
        }
    }),
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, {payload}){
            state.token = payload
        },
        setLoading(state ,{payload}){
            state.loading = payload
        },
        setLoginInfo(state ,{payload}){
            state.loginInfo = payload
        },
        setRoutePath(state ,{payload}){
            state.routePath = payload
        },
        setDeviceToken(state ,{payload}){
            state.deviceToken = payload
        },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(action.approveSecondLogin.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.approveSecondLogin.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(action.rejectSecondLogin.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.rejectSecondLogin.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(action.login.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.login.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(action.ssrLogout.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.ssrLogout.fulfilled, (state, action: PayloadAction<BaseResponse>) => {
                state.loading = false;
                if (action.payload.responseCode == '00'){
                    state.token = null
                }
            })

            .addCase(action.completeLogin.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.completeLogin.fulfilled, (state, action: PayloadAction<UserDetailsResponse>)=>{
                const response = action.payload
                state.loading = false

                if (response.responseCode === "00") {
                    state.token = response.token
                    state.userDetails = response
                }

            })
            .addCase(action.userDetails.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.userDetails.fulfilled, (state, action: PayloadAction<UserDetailsResponse>)=>{
                const response = action.payload
                state.loading = false
                if (response.responseCode === "00") {
                    state.token = response.token
                    state.userDetails = response
                }

            })
            .addCase(action.initiatePasswordReset.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.initiatePasswordReset.fulfilled, (state)=>{
                state.loading = false
            })
            .addCase(action.completePasswordReset.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.completePasswordReset.fulfilled, (state)=>{
                state.loading = false

            })
            .addCase(action.changePassword.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.changePassword.fulfilled, (state)=>{
                state.loading = false
            })
            .addCase(action.completeSignup.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.completeSignup.fulfilled, (state)=>{
                state.loading = false
            })
            .addCase(action.resendOtp.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.resendOtp.fulfilled, (state)=>{
                state.loading = false
            })
    }
})

export const auth = {
    reducer: slice.reducer,
    action: action,
    mutation: slice.actions,
}

