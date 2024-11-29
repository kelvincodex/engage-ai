import { createSlice} from "@reduxjs/toolkit";

export type TableState = {
    loading: boolean,
    currentPage: number
    helpSupportPop: boolean
}

const initialState: TableState = {
    loading: false,
    currentPage: 1,
    helpSupportPop: true
}

const action = {}

const slice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setLoading(state ,{payload}){
            state.loading = payload
        },
        setCurrentPage(state ,{payload}){
            state.currentPage = payload
        },
        setHelpSupportPop(state ,{payload}){
            state.helpSupportPop = payload
        },
    },
    extraReducers: (builder)=>{
        builder
    }
})

export const table = {
    reducer: slice.reducer,
    action: action,
    mutation: slice.actions,
}

