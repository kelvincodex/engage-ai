import { motion } from "framer-motion"
import {FramerConfigUtil} from "@/util/FramerConfigUtil.ts";

interface  DashboardStatCardProps  {
    title?: string
    items?: {
        day?: string,
        date?: string,
        num?: string,
    }[]
}
export const  DashboardStatCard = ({title, items}: DashboardStatCardProps)=>{

    return (
        <motion.div
            variants={FramerConfigUtil.stagChildren}
            className={'bg-[#FDFDFD] w-[350px] rounded-lg p-3'}>
            <p className={''}>{title}</p>
            {
                items?.map((it, index)=>{
                    return (
                        <div key={index} className={'flex py-3 items-center justify-between w-full'}>
                            <div className={'flex flex-col gap-2'}>
                                <p className={'text-sm'}>{it?.day}</p>
                                <p className={'text-xs text-gray-500'}>{it?.date}</p>
                            </div>

                            <p className={'text-lg'}>{it?.num}</p>
                        </div>
                    )
                })
            }


        </motion.div>
    )
}