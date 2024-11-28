import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ModalConstant} from "@/util/constant/ModalConstant.ts";

export type BaseState ={
    selectedPlatform: string;
    loading: boolean;
    showMenStep: boolean;
    currentRoutePath: string|null;
    modalOptions: {show: boolean,
        component?: ModalConstant,
        metadata?: {
            confirmationOptions?: {title?: string, message?: string, type?: "success" | "warning" | "error"|"delete", button?: {title?: string, action: ()=> void}}
            notificationOptions?: {title?: string, message?: string, type?: "success" | "warning" | "error", buttons?: {title?: string, action: ()=> void}[]}
        },
        payload?: any,
    }
}

const initialState: BaseState = {
    selectedPlatform: "",
    loading: false,
    showMenStep: false,
    currentRoutePath: null,
    modalOptions: {show: false, metadata:{notificationOptions: {type: "success"}}},
};

const actions = {};
const slice = createSlice({
    name: "base",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setShowMenStep: (state, action) => {
            state.showMenStep = action.payload;
        },
        setCurrentRoutePath: (state, action) => {
            state.currentRoutePath = action.payload;
        },
        setSelectedPlatform: (state, action) => {
            state.selectedPlatform = action.payload;
        },
        setModalOptions(state, action:PayloadAction<BaseState['modalOptions']>){
            state.modalOptions = action.payload
        },
        resetModalOptions:(state)=> ({...state, modalOptions: initialState.modalOptions})
    },
    extraReducers: (builder) => {
        builder
    },
});

export const base = {
    reducer: slice.reducer,
    actions: actions,
    mutation: slice.actions,
};