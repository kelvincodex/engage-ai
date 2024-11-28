import {InputHTMLAttributes, useState} from "react";
import Eye from "@/assets/icon/eye.svg"
import EyeSlash from "@/assets/icon/eye-slash.svg"
export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    leftIcon?: any;
    rightIcon?: any;
    classnameContainer?: string;
    classNameMiniContainer?: string;
    formik?: any
}
export const BaseInput = ({leftIcon:LeftIcon, formik,classnameContainer ,classNameMiniContainer, rightIcon:RightIcon, type, className ,...props}: BaseInputProps)=>{
    const [secured, setSecured] = useState<boolean>(true)

    const inputType = type == 'password' ? secured ? 'password' : 'text' : type
    const isError = formik?.touched[props?.name ?? ""] && formik?.errors[props?.name ?? ""]


    const countryCodes = [
        { label: "Nig (+234)", code: "+234" },
        { label: "USA (+1)", code: "+1" },
        { label: "UK (+44)", code: "+44" },

    ]

    return (
        <div className={`my-3 ${classnameContainer}`}>
            <label className={'font-medium text-[15px]'} htmlFor={props.id}>{props.label}</label>
            <div className={`bg-white  rounded-xl flex items-center px-3  gap-2 overflow-hidden h-[40px] ${classNameMiniContainer}`}>
                {
                    type == 'tel' && (
                        <select className={'!outline-0'}>
                            <option value={'234'}>Nig</option>
                        </select>
                    )
                }
                {
                    LeftIcon && <LeftIcon width={20} height={20}/>
                }
                <input
                    value={formik?.values[props?.name] ?? props.value}
                    onBlur={formik?.handleBlur(props?.name ?? "")}
                    onChange={formik?.handleChange(props?.name ?? "")}
                    id={props.id} type={inputType}
                    className={`!outline-0 flex-1 bg-transparent h-full ${className}`} {...props} />
                {
                    RightIcon && <RightIcon width={20} height={20}/>
                }
                {
                    type === 'password' && (
                        !secured ?
                            <button onClick={()=> setSecured(!secured)}> <EyeSlash color={'#868C98'}  width={20} height={20}/></button> :
                            <button onClick={()=> setSecured(!secured)}>  <Eye color={'#868C98'} width={20} height={20}/></button>
                    )
                }
            </div>
            {
                isError && (
                    <p className={'text-red-600 text-xs'}> {formik?.errors[props?.name ?? ""]} </p>
                )
            }
        </div>
    )
}