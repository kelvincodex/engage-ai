import {combineReducers} from "@reduxjs/toolkit";
import {auth} from "./auth.ts";
import {base} from "@/store/module/base.ts";

export const rootReducer = combineReducers({
    auth: auth.reducer,
    base: base.reducer,
})


