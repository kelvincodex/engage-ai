import React from "react";
import Chart, { Props } from "react-apexcharts";
import {useDispatch} from "react-redux";
import {base} from "@/store/module/base.ts";
import {ModalConstant} from "@/util/constant/ModalConstant.ts";
import { motion } from "framer-motion";
import {FramerConfigUtil} from "@/util/FramerConfigUtil.ts";

export const DashboardOverviewContainer = () => {
    const dispatch = useDispatch<any>();
    const data = [
        [14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 15, 15.1, 15.2, 15.3],
        [29.1, 29.5, 34.2, 40.2, 48.0, 41.6, 40.5, 36.5, 43.4, 52.4],
    ];

    // Define thresholds for dynamic comparison
    const thresholdHigh = 500; // Adjust this value
    const thresholdMedium = 100; // Adjust this value

    // Dynamically assign colors based on data values
    // const barColors = data[0].map((value) => {
    //     if (value > thresholdHigh) return "#DF1C41"; // High - Gray
    //     if (value > thresholdMedium) return "#241E4E"; // Medium - Yellow
    //     return "#EAECF0"; // Low - Red
    // });

    const chartPayload: Props = {
        options: {
            chart: {
                id: "basic-bar",
                toolbar: {
                    show: false,
                },
                stacked: true,
            },
            xaxis: {
                categories: [
                    "14.10",
                    "14.20",
                    "14.30",
                    "14.40",
                    "14.50",
                    "14.60",
                    "15.00",
                    "15.10",
                    "15.20",
                    "15.30",
                ],
            },
            colors: ["#00A389", "#FFBB54"],
            plotOptions: {
                bar: {
                    distributed: true,
                },
            },
            dataLabels: {
                enabled: false,
            },
        },
        series: [
            {
                name: "Android",
                data: data[0],
            },
            {
                name: "iOS",
                data: data[1],
            },
        ],
    };


    function handleShowModal(){
        dispatch(base.mutation.setModalOptions({show: true, component: ModalConstant.showNothingModal}));
    }

    return (
        <motion.div
            animate={{ x: 0 }}
            transition={{ duration: 0.3, delay: 3, ease: "linear" }}

            className={"p-5 w-[70%]  h-[400px] border rounded-xl overflow-hidden"}>
            <div className={'flex items-center justify-between'}>
                <p className={"font-semibold text-xl"}>Live User Activity</p>
                <p className={'text-primary-color text-sm tap-effect'} onClick={handleShowModal}>View more</p>
            </div>
            <Chart
                options={chartPayload.options}
                series={chartPayload.series}
                type="line"
                width="100%"
                height="300px"
            />
        </motion.div>
    );
};