import React, {ChangeEvent, useState, useEffect} from "react";
import {ButtonTab, ButtonTabProps} from "@/component/tab/ButtonTab.tsx";
import {BaseInput} from "@/component/input/BaseInput.tsx";
import BaseRangedDate from "@/component/date/BaseRangedDate.tsx";
import {BaseSelect} from "@/component/input/BaseSelect.tsx";
import RotateIcon from "@/assets/icon/rotate-icon.svg"
import SearchLg from "@/assets/icon/search-lg.svg"
import {SSSROptions} from "@/component/table/BaseTable.tsx";

interface DefaultListHeaderComponentProps {
    pageSize?: number|string,
    setPageSize?:(value: string|number)=> void
    tabsOption: ButtonTabProps
    usedKeys?:{
        filter?: string,
        tab?: string,
    },
    ssr?: SSSROptions,
    listOption?: {
        returnData: (value: any[])=> void,
        data: any[],
    }
}

export const DefaultListHeaderComponent = ({
                                               tabsOption,
                                               pageSize = "10",
                                               setPageSize = () => {},
                                               usedKeys = { filter: "searchParameter", tab: "status" },
                                               ssr,
                                               listOption,
                                               ...props
                                           }: DefaultListHeaderComponentProps) => {
    const [isLoading, setIsLoading] = useState(false);

    // Automatically return all data when component first renders
    useEffect(() => {
        if (listOption?.data && listOption?.returnData) {
            listOption.returnData(listOption.data);
        }
    }, [listOption?.data]);

    function handleOnApply(startDate: string, endDate: string){
        const filteredData = listOption?.data.filter(
            (item) =>
                new Date(item.date) >= new Date(startDate) &&
                new Date(item.date) <= new Date(endDate)
        );
        listOption?.returnData(filteredData || []);
    }

    function handleSearchKeyPress(event: React.KeyboardEvent<HTMLInputElement>){
        const value = (event.target as HTMLInputElement).value;
        if (event.key === "Enter") {
            const filteredData = listOption?.data.filter((item) =>
                Object.values(item).some(
                    (field) =>
                        typeof field === "string" &&
                        field.toLowerCase().includes(value.toLowerCase())
                )
            );
            listOption?.returnData(filteredData || []);
        }
    }
    function handleOnTabChange(value: { value: string; label: string }) {
        // Debug logging
        console.log('Selected Tab Value:', value.value);
        console.log('Full List Data:', listOption?.data);
        console.log('Used Keys Tab:', usedKeys?.tab);

        const filteredData = listOption?.data.filter((item) => {
            // Determine the key to use for filtering
            const filterKey = usedKeys?.tab || "status";

            // Get the item's value for the filter key
            const itemValue = item[filterKey];

            // Debug logging for each item
            console.log(`Item ${JSON.stringify(item)}`);
            console.log(`Item Value for ${filterKey}:`, itemValue);
            console.log(`Comparing: ${itemValue?.toLowerCase()} vs ${value.value.toLowerCase()}`);

            // If "all" is selected, return all items
            if (value.value.toLowerCase() === "all") {
                return true;
            }

            // Specific case handling
            // Ensure both values exist and convert to lowercase for comparison
            return itemValue &&
                itemValue?.toString().toLowerCase() === value.value.toLowerCase();
        });

        console.log('Filtered Data:', filteredData);

        // Return the filtered data
        listOption?.returnData(filteredData || []);
    }


    function handlePageSize(event: ChangeEvent<HTMLSelectElement>){
        const selectedPageSize = event.target.value;
        setPageSize(selectedPageSize);
        console.log("Manual page size change handling:", selectedPageSize);
    }

    return (
        <div className="flex justify-between items-center gap-2 h-[110px]">
            <ButtonTab handleOnChange={handleOnTabChange} {...tabsOption} />
            <div className="flex items-center gap-2">
                <BaseInput
                    onKeyDown={handleSearchKeyPress}
                    id="filter-text-box"
                    leftIcon={SearchLg}
                    placeholder="Search"
                />

                <BaseRangedDate handleOnApply={handleOnApply} />

                <div className="flex items-center gap-2">
                    <p className="font-medium text-[15px] items-center">Page Size</p>
                    <BaseSelect
                        onChange={handlePageSize}
                        value={pageSize}
                        showPlaceholder={false}
                        classNameContainer="w-[100px]"
                        title="Page Size"
                        options={[
                            { value: "5", label: "5" },
                            { value: "10", label: "10", selected: true },
                            { value: "25", label: "25" },
                            { value: "50", label: "50" },
                            { value: "75", label: "75" },
                            { value: "100", label: "100" },
                            { value: "All", label: "ALL" },
                        ]}
                    />
                </div>

                <div className="p-2 rounded-xl border tap-effect flex items-center gap-1">
                    {isLoading ? (
                        <RotateIcon className="w-[20px] h-[20px] animate-spin" />
                    ) : (
                        <RotateIcon className="w-[20px] h-[20px]" />
                    )}
                </div>
            </div>
        </div>
    );
};