import LogoutBox from "@/assets/icon/logout-box-r-line.svg";
import ArrowRightLine from "@/assets/icon/arrow-right-s-line.svg";
import React, {Fragment, useState} from "react";
import {useRouteUtil} from "@/util/hook/useRouteUtil.tsx";
import {SidebarData} from "@/util/data/SidebarData.ts";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "@/store/module/auth.ts";
import {RootState} from "@/store";
import {PayloadAction} from "@reduxjs/toolkit";
import {BaseResponse} from "@/model/response/BaseResponse.ts";

interface SidebarProps {
    className?: string
}
export const Sidebar = ({className}: SidebarProps)=>{
    const [showChildren, setShowChildren] = useState<{ index?: number }>({index: null})
    const routUtil = useRouteUtil()
    const url = new URL(window.location.href);
    const activeClass = "!bg-primary-lighter-color !text-primary-color font-semibold rounded-lg"
    const authState = useSelector((state:RootState)=>state.auth);

    return (
        <nav className={` p-4 space-y-2 text-[#868C98] overflow-y-scroll md:hidden xl:block flex-1 ${className}`}>
            {
                SidebarData(routUtil, authState?.userDetails.userRoleName).map((it, index)=>{
                    return (
                        <Fragment key={index}>
                            <h2 className={'text-[14px] text-black max-w-full truncate   font-semibold !my-2'}>{it.label}</h2>
                            {
                                it.items?.map((item, id)=>{
                                    const isActive = url.pathname == item.route

                                    const isChildActive = item.children?.some((it)=>{
                                        return window.location.pathname == it.route
                                    })
                                    const Icon = item.icon
                                    return (
                                        <div key={id}>
                                            <button
                                                onClick={()=>{
                                                    item.action && item.action()
                                                    setShowChildren((prevState)=>({
                                                        ...prevState,
                                                        [id]: !prevState[id],
                                                    }))
                                                }}
                                                className={`flex items-center hover:!text-primary-color  w-full p-2 tap-effect   font-semibold text-neutral-dark-color transition-colors bg-transparent gap-2 text-[15px] ${ (isActive || isChildActive) && activeClass} ${!item?.show && 'hidden'}`}>
                                                {
                                                    Icon &&  <Icon color={(isActive || isChildActive) ? '#356D00' : "#868C98"}   width={18} height={18}/>
                                                }
                                                {item.label}
                                            </button>
                                            {
                                                (item.children?.length > 0 && showChildren[id]) && (
                                                    <ul className={'px-2 ml-4 transition-all duration-300 border-l-2'}>
                                                        {
                                                            item.children?.map((child)=>{
                                                                return (
                                                                    <li onClick={child.action && child.action} className={`text-[16px] hover:text-primary-color tap-effect max-w-full truncate mt-2 font-medium p-2 rounded-lg ${ (child.route  == url.pathname) && 'bg-white !text-primary-color'}`}>
                                                                        {child?.label}
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    )
                })
            }
        </nav>
    )
}