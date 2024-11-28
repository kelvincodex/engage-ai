import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthService} from "@/service/AuthService.ts";
import {InitiateLoginRequest} from "@/model/request/auth/InitiateLoginRequest.ts";
import {UserDetailsResponse} from "@/model/response/auth/UserDetailsResponse.tsx";

export type AuthState = {
    token: string|null,
    loading: boolean,
    loginInfo: any,
    userDetails: UserDetailsResponse,
    routePath: string,
}

const initialState: AuthState = {
    token: null,
    loading: false,
    userDetails:{} as UserDetailsResponse,
    loginInfo: {},
    routePath: ""
}

const action = {
    login: createAsyncThunk("auth/login",  async (payload:InitiateLoginRequest, thunkAPI)=>{
        try {
            const response = await AuthService.initiateLogin(thunkAPI,payload)
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.message)
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

    },
    extraReducers: (builder)=>{
        builder

            .addCase(action.login.pending, (state)=>{
                state.loading = true
            })
            .addCase(action.login.fulfilled, (state) => {
                state.loading = false;
            })

    }
})

export const auth = {
    reducer: slice.reducer,
    action: action,
    mutation: slice.actions,
}

