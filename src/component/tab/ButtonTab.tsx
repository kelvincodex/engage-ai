import {useEffect, useState} from "react";

export interface ButtonTabProps {
    tabs: {value?: string, label?: string,}[]
    initialTab?: number,
    handleOnChange?: (tab?: ButtonTabProps['tabs'][0])=> void
}
export const ButtonTab = ({tabs, initialTab= 0, handleOnChange}: ButtonTabProps)=>{
    const [active, setActive] = useState<ButtonTabProps['tabs'][0]>()


    const activeClass = "bg-white"

    useEffect(() => {
            const tab = tabs?.find((_, index)=>{
                return initialTab == index
            })
            console.log(tab)
            setActive(tab)
    }, []);


    function handleSelectTab(tab?: ButtonTabProps['tabs'][0]){
        setActive(tab)
        handleOnChange && handleOnChange(tab)
    }
    return (
        <div
            className={' h-[40px] p-2 tex flex items-center bg-neutral-lighter-color p gap-4 text-sm  font-semibold text-gray-500   rounded-xl'}>
            {
                tabs?.map((value, index)=>{
                    return (
                        <button onClick={()=> handleSelectTab(value)} key={index} className={`tap-effect px-3 py-2 rounded-lg ${value.value == active?.value ? activeClass : ''}`}>{value.label}</button>
                    )
                })
            }
        </div>
    )
}