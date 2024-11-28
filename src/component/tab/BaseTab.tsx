import {ComponentType, useEffect, useState} from "react";
import {GroupButton} from "@/component/button/GroupButton.tsx";

export type TabsOptions = {
    title: string,
    component: ComponentType,
    isActive?: boolean,
    payload?: any
}
export interface BaseTabProps {
    tabs: TabsOptions[],
    type?: 'button'|'text',
    onSelectedTab?:(value: TabsOptions) => void
}
export const BaseTab = ({tabs, type='text', onSelectedTab}: BaseTabProps)=>{
    const [selectedTab, setSelectedTab] = useState<BaseTabProps['tabs'][0]>()
    const activeClass = 'text-primary-color border-b-2 border-primary-color'

    useEffect(() => {
        const getInitTab = tabs?.find(({isActive})=> isActive == true)
        if (getInitTab){
            setSelectedTab(getInitTab)
            onSelectedTab && onSelectedTab(getInitTab)
        }
    }, []);

    function handleChangeTab(tab: BaseTabProps['tabs'][0]){
        setSelectedTab(tab)
        onSelectedTab && onSelectedTab(tab)
    }

    const gb =    tabs.map((tab, index) => {
        return {
            title: tab.title,
            action: ()=> handleChangeTab(tab)
        }
    })

        const Component = selectedTab?.component
    return (
        <div className={'mt-10'}>
            <div className={'flex items-center gap-3'}>
                {
                    type == "text" ?
                    tabs.map((tab, index) => {
                        return (
                            <p key={index} onClick={()=> handleChangeTab(tab)} className={`tap-effect inline-block font-medium  text-gray-500 capitalize pb-2  ${ selectedTab?.title == tab.title ?  activeClass : 'hover:!text-primary-lighter-color'}`}>{tab.title}</p>
                        )
                    }) :
                        <GroupButton  buttons={gb} />
                }

            </div>
            <div>
                {Component && <Component />}
            </div>
        </div>
    )
}