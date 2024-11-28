import {SelectHTMLAttributes} from "react";
import HelpIcon from "@/assets/icon/help-icon.svg"
import placeholder from "lodash/fp/placeholder";
interface BaseSelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label?: string;
    title?: string,
    showPlaceholder?: boolean,
    placeholder?: string,
    options?: {label?: string, value?: string, selected?: boolean}[]
    classNameContainer?: string;
    formik?: any,
    helper?: boolean
}
export const BaseSelect = ({formik, showPlaceholder=true, ...props}: BaseSelectProps)=>{


    const isError = formik?.touched[props?.name ?? ""] && formik?.errors[props?.name ?? ""]

    return (
        <div className={`my-3 ${props.classNameContainer}`}>
            <label className={'font-medium text-[15px] flex items-center gap-2'} htmlFor={props.id}>{props.label} {props.helper && <HelpIcon width={15} />} </label>
            <div className={'bg-white rounded-xl  flex  items-center px-3 w-full  border gap-2 overflow-hidden h-[40px]'}>
                <select
                    value={formik?.values[props?.name] ?? props.value}
                    onBlur={formik?.handleBlur(props?.name ?? "")}
                    onChange={formik?.handleChange(props?.name ?? "")}
                    className={'grow max-w-full !outline-0'}
                    {...props}
                >
                    {
                        showPlaceholder && (
                            <option value={""}>{props?.placeholder ? props?.placeholder :  `Select  ${props?.title ?? props?.label}`}</option>
                        )
                    }

                    {
                        props?.options?.map((it, index) => {
                            return (
                                <option  key={index} selected={it?.selected} value={it?.value}>{it?.label}</option>
                            )
                        })
                    }
                </select>
            </div>
                {
                    isError && (
                        <p className={'text-red-600 text-xs'}> {formik?.errors[props?.name ?? ""]} </p>
                    )
                }
        </div>
    )
}