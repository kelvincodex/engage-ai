import React, {ButtonHTMLAttributes, ReactNode} from "react";
import {RotatingLines} from "react-loader-spinner";
interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?: ReactNode,
    bgType?: 'secondary' | 'primary' | 'danger'|'normal',
    loading?: boolean,
    loadingColor?: string,
    buttonRef?: React.RefObject<HTMLButtonElement>;
}
export const DefaultButton = ({buttonRef, loadingColor='#fff',children, className, bgType="primary", loading, ...props}: DefaultButtonProps)=>{

    const bg = bgType === 'secondary' ? "bg-white text-black border" : bgType === 'primary' ? "bg-primary-color text-white" : bgType === 'normal' ? ''  : "bg-red-darker-color text-white"
    return (
        <button ref={buttonRef} disabled={loading} className={`rounded-xl tap-effect text-[16px]  px-3 py-2 ${bg} ${className} disabled:!opacity-70 disabled:!scale-100`} {...props}>
            {
                loading ?
                    <div className={'flex items-center justify-center'}>
                        <RotatingLines
                            visible={true}
                            width="25"
                            strokeColor={loadingColor}
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                        />
                    </div> :
                    children
            }
        </button>
    )
}