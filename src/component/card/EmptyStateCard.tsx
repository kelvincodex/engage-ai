import EmptyStateImage from "@/assets/images/empty-state.png"
import {DefaultButton} from "@/component/button/DefaultButton.tsx";
import {ReactNode} from "react";
import PlusIcon from "@/assets/icon/plus.svg"

export interface EmptyStateCardProps {
    title?: string,
    subtitle?: string,
    children?: ReactNode,
    name: string,
    showButton?: boolean,
    buttonAction?: ()=>void
}
export const EmptyStateCard= ({title,name, subtitle, showButton, buttonAction, children}: EmptyStateCardProps)=>{
    return (
        <div className={'min-w-[300px] h-auto py-3 justify-between flex flex-col items-center gap-5'}>
            <img  src={EmptyStateImage} className={'w-[100px] h-[100px]'} alt={''}/>
            <div className={'text-center'}>
                <p className={'font-bold text-xl'}> {title ? title : `Whoops.. you've got no ${name}`}</p>
                <p className={'font-medium text-gray-500'}> {subtitle ? subtitle : `Start by creating your very first ${name}`}</p>
            </div>
            <DefaultButton className={'flex w-[100px] items-center justify-center gap-2'}>
                <PlusIcon />
                {name}
            </DefaultButton>
            {children}
        </div>
    )
}