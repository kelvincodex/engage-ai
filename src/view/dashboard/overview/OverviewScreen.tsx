import {DashboardStatCard} from "@/component/card/DashboardStatCard.tsx";
import { motion } from "framer-motion";
import {FramerConfigUtil} from "@/util/FramerConfigUtil.ts";
import {DashboardOverviewContainer} from "@/component/card/DashboardOverviewContainer.tsx";

export const OverviewScreen =()=>{

    const stats = [
        {
            title: "Daily Active users",
            items: [
                {
                    day: "Today",
                    date: "26th Nov",
                    num: "12.4k",
                },
                {
                    day: "Yesterday",
                    date: "25th Nov",
                    num: "7.8k",
                },
            ]
        },
        {
            title: "Weekly Active users",
            items: [
                {
                    day: "Today",
                    date: "26th Nov",
                    num: "12.4k",
                },
                {
                    day: "Yesterday",
                    date: "25th Nov",
                    num: "7.8k",
                },
            ]
        },
        {
            title: "Monthly Active users",
            items: [
                {
                    day: "Today",
                    date: "26th Nov",
                    num: "12.4k",
                },
                {
                    day: "Yesterday",
                    date: "25th Nov",
                    num: "7.8k",
                },
            ]
        },
        {
            title: "Total Active Users",
            items: [
                {
                    day: "Today",
                    date: "26th Nov",
                    num: "12.4k",
                },
            ]
        },
        {
            title: "New Activations",
            items: [
                {
                    day: "Today",
                    date: "26th Nov",
                    num: "12.4k",
                },
            ]
        },
        {
            title: "App Uninstalls",
            items: [
                {
                    day: "Today",
                    date: "26th Nov",
                    num: "12.4k",
                },
            ]
        },
    ]

    return (
        <main className={'p-6 w-full'}>
            <motion.div
                variants={FramerConfigUtil.stagParent}
                initial={'hidden'}
                whileInView={'show'}
                className={'grid gap-7 mb-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'}>
                {
                    stats.map((it, index)=>{
                        return (
                            <DashboardStatCard key={index} title={it?.title} items={it?.items}  />
                        )
                    })
                }

            </motion.div>

            <div>
                <DashboardOverviewContainer />
            </div>
        </main>
    )
}