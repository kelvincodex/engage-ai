import type {Dispatch} from "redux";
import {FunctionComponent, SVGProps} from "react";

export type  SVGComponent = FunctionComponent<SVGProps<SVGSVGElement> & {     title?: string; }>

export type ThunkApiConfig = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
}