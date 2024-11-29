import { HelperUtil } from "@/util/helper/HelperUtil.ts";
import { ICellRendererParams } from "ag-grid-community";
import React from "react";

export const cellRenderer = (props: ICellRendererParams) => {
    // Define styles for different statuses
    const statusStyles = {
        active: {
            color: "#067647",
            backgroundColor: "#ECFDF3",
            // border: "1px solid #ABEFC6",
        },
        post: {
            color: "#067647",
            backgroundColor: "#ECFDF3",
            // border: "1px solid #ABEFC6",
        },
        reopened: {
            color: "#067647",
            backgroundColor: "#ECFDF3",
            // border: "1px solid #ABEFC6",
        },
        overdue: {
            color: "#9A1C13",
            backgroundColor: "#FEE2E2",
            // border: "1px solid #FCA5A5",
        },
        unresolved: {
            color: "#9A1C13",
            backgroundColor: "#FEE2E2",
            // border: "1px solid #FCA5A5",
        },
        get: {
            color: "#253EA7",
            backgroundColor: "#EBF1FF",
            // border: "1px solid #253EA7",
        },
        pending: {
            color: "#161922",
            backgroundColor: "#F6F8FA",
            // border: "1px solid #161922",
        },
        put: {
            color: "#F17B2C",
            backgroundColor: "#FEF3EB",
            // border: "1px solid #F2AE40",
        },
        inactive: {
            color: "#9A1C13",
            backgroundColor: "#FEE2E2",
            // border: "1px solid #FCA5A5",
        },
        'unressolved': {
            color: "#9A1C13",
            backgroundColor: "#FEE2E2",
            // border: "1px solid #FCA5A5",
        },
        delete: {
            color: "#9A1C13",
            backgroundColor: "#FEE2E2",
            // border: "1px solid #FCA5A5",
        },
        invited: {
            color: "#B47818",
            backgroundColor: "#FBDFB1",
            // border: "1px solid #F2AE40",
        },
    };

    // Determine the current status and styles
    const status = props.value?.toString().toLowerCase();
    const currentStyle = statusStyles[status] || {}; // Default to no styles if no match

    const textClass = `font-normal bg-transparent  truncate max-w-max block py-0 px-3 text-xs capitalize rounded-full  ${props.colDef.cellClass}`;
    const ellipsisCss = 'truncate max-w-max block p-[4px] rounded-2xl'

    // Render component with ellipsis for overflow
    const RenderComponent = (params: ICellRendererParams) => {
        const isDateField =
            params.colDef?.field?.toLowerCase()?.includes("date") ||
            params.colDef?.field?.toLowerCase()?.includes("createdat") ||
            params.colDef?.field?.toLowerCase()?.includes("created") ||
            params.colDef?.field?.toLowerCase()?.includes("updatedat") ||
            params.colDef?.field?.toLowerCase()?.includes("updated");

        // Check if there's a value to display
        if (params.value) {
            if (isDateField) {
                return (
                    <div
                        className={`${textClass} ${ellipsisCss}`}
                        title={params.value} // Optional: Show full text on hover
                    >
                        <p className={"text-sm font-semibold"}>
                            {HelperUtil.convertDate(params.value)}
                        </p>
                        <p className={"text-gray-500 text-xs"}>
                            {HelperUtil.formatTime(params.value)}
                        </p>
                    </div>
                );
            }

            return (
                <div
                    className={`${textClass} `}
                    style={currentStyle}
                    title={params.value} // Optional: Show full text on hover
                >
                    {params.value}
                </div>
            );
        } else {
            return (
                <div
                    className={`${textClass} ${ellipsisCss}`}
                    title="N/A"
                >
                    N/A
                </div>
            );
        }
    };

    //todo Render the component with the props provided to cellRenderer
    return <RenderComponent {...props} />;
};
