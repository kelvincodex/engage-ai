import {ButtonHTMLAttributes} from "react";
import {SVGComponent} from "@/util/type/StoreTypes.ts";

interface GroupButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    buttons: {
        icon?: SVGComponent,
        title?: string,
        isActive?: boolean,
        action?: () => void
    }[]
}

export const GroupButton = ({buttons,className, ...props}: GroupButtonProps) => {
    return (
        <div className="flex">
            {buttons.map((button:{title: string, icon: SVGComponent, action: ()=>void}, index) => {
                const Icon = button.icon
                return (
                    <button
                        key={index}
                        onClick={button.action}
                        className={`
                        px-4 
                        py-2 
                        border 
                        bg-white
                        hover:bg-gray-50
                        transition-colors
                        -ml-[1px] 
                        tap-effect
                        first:ml-0
                        ${index === 0 ? 'rounded-l-md' : ''} 
                        ${index === buttons.length - 1 ? 'rounded-r-md' : ''}
                        ${className}
                        ${className}
                    `}
                        {...props}
                    >
                        {Icon &&   <Icon className={'w-[20px] h-[20px]'} />}
                        {button.title}
                    </button>
                )
            })}
        </div>
    )
}

//                        ${index === 0 ? '' : ''}
//                         ${index === buttons.length - 1 ? '' : ''}
//                         ${index !== 0 && index !== buttons.length - 1 ? '' : ''}