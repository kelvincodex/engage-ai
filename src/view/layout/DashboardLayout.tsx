import React, { useState} from "react";
import DashboardLine from "@/assets/icon/dashboard-line.svg";
import {Sidebar} from "@/component/bar/Sidebar.tsx";
import MenuIcon from "@/assets/icon/menu-alt.svg";
import {SVGComponent} from "@/util/type/StoreTypes.ts";
import LogoutBox from "@/assets/icon/logout.svg";
import SearchS from "@/assets/icon/search-s.svg";
import Settings from "@/assets/icon/settings.svg";
import {BaseInput} from "@/component/input/BaseInput.tsx";
import {RoundedWrapper} from "@/component/wrapper/RoundedWrapper.tsx";

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
                className={`xl:w-52 md:w-16    h-full bg-sidebar-gradient transition-all duration-300 flex flex-col z-40  shadow-lg`}>
                {/*sidebar header*/}
                <div className={` items-center md:hidden xl:flex justify-center gap-2 w-full  p-5 `}>
                    <span className={'font-bold text-2xl'}>EngageAI</span>
                    {/*<img src={LogoMd} className={'w-[90px] h-[40px]'} alt={''}/>*/}
                </div>

                <div className={'items-center flex-shrink-0 md:flex xl:hidden border flex justify-center gap-2 h-[90px]  w-full '}>
                    <MenuIcon onClick={()=> setShowSidebar(!showSidebar)} className={'tap-effect'} color={'#808080'} width={40} height={40} />
                </div>

                {/*#868C98*/}
                {/* navigation link*/}
                <Sidebar  />

                <div className={'p-4'}>

                    <button
                        className={'flex   items-center justify-start tap-effect   py-4 font-normal text-gray-500 gap-2 w-full'}>
                        <Settings width={18} height={18}/>
                        <span className={' truncate'}>Settings</span>
                    </button>
                    <button
                        className={'flex   items-center justify-start tap-effect font-normal text-gray-500  py-4 gap-2 w-full'}>
                        <LogoutBox width={18} height={18}/>
                        <span className={' truncate'}>Logout</span>
                    </button>
                </div>
            </div>
            <div className={'flex-1 transition-all max-h-screen overflow-y-scroll duration-300'}>
                {/*   top header */}
                <header className={'bg-white  '}>
                    <div className={'flex items-center justify-between p-5'}>
                        <div className={'flex items-start justify-center gap-2'}>
                            <div>
                                <h3 className={'font-semibold leading-6 text-[20px]'}>Snapshot</h3>
                                <p className={'text-gray-500 text-sm'}>{dashboardSubHeading}</p>
                            </div>

                        </div>
                        <div className={'flex items-center justify-center gap-3'}>
                            <BaseInput classNameMiniContainer={'bg-gray-300'} className={'text-sm'} placeholder={'Search here...'} rightIcon={SearchS}  />
                            <RoundedWrapper className={'bg-neutral-500 !rounded-lg'}>

                            </RoundedWrapper>
                        </div>
                    </div>
                </header>
                {children}
            </div>
        </div>
)
}