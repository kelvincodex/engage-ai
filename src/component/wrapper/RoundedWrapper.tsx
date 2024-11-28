import React from "react";

interface RoundedWrapper {
    children?: React.ReactNode;
    className?: string
    action?: ()=>void
}
export const RoundedWrapper = ({children, action, className}: RoundedWrapper)=>{
    return (
        <div
            onClick={action && action}
            className={`w-[40px] text-[#2F2B43] overflow-hidden  font-medium h-[40px] border rounded-full flex items-center justify-center ${className}`}>
            {children}
        </div>
    )
}