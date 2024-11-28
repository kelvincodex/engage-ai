import React, { useState} from "react";
import NotificationIcon from "@/assets/icon/notification-icon.svg";
import DashboardLine from "@/assets/icon/dashboard-line.svg";
import {Sidebar} from "@/component/bar/Sidebar.tsx";
import MenuIcon from "@/assets/icon/menu-alt.svg";
import {RoundedWrapper} from "@/component/wrapper/RoundedWrapper.tsx";
import {SVGComponent} from "@/util/type/StoreTypes.ts";

export interface DashboardLayoutProps {
    children?: React.ReactNode;
    dashboardHeading?: string,
    icon?: SVGComponent,
    dashboardSubHeading?: string,
}

export const DashboardLayout = ({children,icon: Icon=DashboardLine, dashboardHeading, dashboardSubHeading}: DashboardLayoutProps) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    return (
        <div className={'flex h-screen bg-white'}>
            <div
                className={`xl:w-72 md:w-16    h-full bg-white transition-all duration-300 flex flex-col  shadow-lg`}>
                {/*sidebar header*/}
                <div className={` items-center md:hidden xl:flex justify-center gap-2 w-full p-6 border`}>
                    <span className={'font-bold text-xl'}>EngageAI</span>
                    {/*<img src={LogoMd} className={'w-[90px] h-[40px]'} alt={''}/>*/}
                </div>

                <div className={'items-center flex-shrink-0 md:flex xl:hidden border flex justify-center gap-2 h-[90px]  w-full '}>
                    <MenuIcon onClick={()=> setShowSidebar(!showSidebar)} className={'tap-effect'} color={'#808080'} width={40} height={40} />
                </div>

                {/*#868C98*/}
                {/* navigation link*/}
                <Sidebar  />
            </div>
            <div className={'flex-1 transition-all max-h-screen overflow-y-scroll duration-300'}>
                {/*   top header */}
                <header className={'bg-white shadow-sm '}>
                    <div className={'flex items-center justify-between p-6'}>
                        <div className={'flex items-start justify-center gap-2'}>
                            <RoundedWrapper className={'bg-gray-100 '}>
                                {
                                    Icon && <Icon color={'#868C98'} width={20} height={20} />
                                }
                                {/*<DashboardLine color={'#868C98'} width={20} height={20}/>*/}
                            </RoundedWrapper>
                            <div>
                                <h3 className={'font-semibold leading-6 text-[16px]'}>{dashboardHeading}</h3>
                                <p className={'text-gray-500 text-sm'}>{dashboardSubHeading}</p>
                            </div>

                        </div>
                        <div className={'flex items-center justify-center gap-3'}>
                            <NotificationIcon />
                        </div>
                    </div>
                </header>
                {children}
            </div>
        </div>
)
}