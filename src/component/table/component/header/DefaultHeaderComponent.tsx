import {BaseInput} from "@/component/input/BaseInput.tsx";
// import FilterIcon from "@/assets/icon/filter-icon.svg"
import RotateIcon from "@/assets/icon/rotate-icon.svg"
import SearchLg from "@/assets/icon/search-lg.svg"
import {ButtonTab, ButtonTabProps} from "@/component/tab/ButtonTab.tsx";
import React, {ChangeEvent, useCallback} from "react";
import {AgGridReact} from "ag-grid-react";
import BaseRangedDate from "@/component/date/BaseRangedDate.tsx";
import {SSSROptions} from "@/component/table/BaseTable.tsx";
import {PayloadAction} from "@reduxjs/toolkit";
import {BaseResponse} from "@/model/response/BaseResponse.ts";
import { FilterModel } from 'ag-grid-community';
import {BaseSelect} from "@/component/input/BaseSelect.tsx";
export interface DefaultHeaderComponentProps {
    pageSize?: number|string,
    setPageSize?:(value: string|number)=> void
    tabsOption: ButtonTabProps
    gridRef?: React.RefObject<AgGridReact>;
    usedKeys?:{
        filter?: string,
        tab?: string,
    },
    ssr?: SSSROptions,
    type?: 'table'|'list'
    listOption?: {
        returnData: any[],
        data: any[],

    }
}

export const DefaultHeaderComponent = ({tabsOption, type='table', ...props}:DefaultHeaderComponentProps)=>{
    // const dispatch = useDispatch<any>()

    const onFilterTextBoxChanged = useCallback(() => {
        props.gridRef.current!.api.setGridOption(
            "quickFilterText",
            (document.getElementById("filter-text-box") as HTMLInputElement).value,
        );
    }, []);


    function handleOnApply(startDate: string, endDate: string){
        if(props?.ssr?.isSsr){
            const params = {
                ...props?.ssr?.payload,
                startDate: startDate,
                endDate: endDate,
            }
            if (props?.ssr?.dispatcher){
                props?.ssr?.dispatcher(props?.ssr?.action(params))?.then((result: PayloadAction<BaseResponse>)=>{

                })
            }
        }else {
            if (props?.gridRef?.current?.api) {
                const filterModel: FilterModel = {
                    [props?.usedKeys?.filter]: {
                        filterType: 'date',
                        type: 'inRange',
                        dateFrom: startDate,
                        dateTo: endDate,
                    }
                };
                props?.gridRef.current.api.setFilterModel(filterModel);
            }
        }

    }

    function handleSearchKeyPress(event: React.KeyboardEvent<HTMLInputElement>){
        if(props?.ssr?.isSsr) {
            if (event.key == "Enter"){
                const value = (event.target as HTMLInputElement).value;
                const params = {
                    ...props?.ssr?.payload,
                    searchParameter: value,
                }
                if (props?.ssr?.dispatcher) {
                    props?.ssr?.dispatcher(props?.ssr?.action(params))?.then((result: PayloadAction<BaseResponse>) => {

                    })
                }
            }
        }

    }

    function handleOnTabChange(value: {value: string, label: string}){
        if(props?.ssr?.isSsr) {
            const params = {
                ...props?.ssr?.payload,
                [props?.usedKeys?.tab]:  value.value?.toLowerCase() == 'all' ? '' : value.value
            }
            if (props?.ssr?.dispatcher) {
                props?.ssr?.dispatcher(props?.ssr?.action(params))?.then((result: PayloadAction<BaseResponse>) => {

                })
            }
        }else {
            if (!props?.gridRef?.current?.api) return;

            const filterModel: FilterModel = {};

            // Clear existing filters
            props?.gridRef.current.api.setFilterModel(null);

            // Apply new filter based on tab value
            if (value.value !== 'all') {
                filterModel[props?.usedKeys?.tab] = { // Assuming 'status' is the field to filter by
                    filterType: 'text',
                    type: 'equals',
                    filter: value.value
                };
                props?.gridRef.current.api.setFilterModel(filterModel);
            }
        }
    }

    const pageSizeOptions = [
        {value: '5', label: '5', },
        {value: '10', label: '10', selected: true},
        {value: '25', label: '25', },
        {value: '50', label: '50', },
        {value: '75', label: '75', },
        {value: '100', label: '100', },
        {value: 'All', label: 'ALL', },
    ]

    function handlePageSize(event: ChangeEvent<HTMLSelectElement>){
        if(props?.ssr?.isSsr) {
            const params = {
                ...props?.ssr?.payload,
                pageSize: event?.target?.value
            }
            if (props?.ssr?.dispatcher) {
                props?.ssr?.dispatcher(props?.ssr?.action(params))?.then((result: PayloadAction<BaseResponse>) => {
                    if (result?.payload.responseCode == '00'){
                        console.log('hiii', event?.target?.value)
                        console.log('hyyy', params?.pageSize)
                        props?.setPageSize(params?.pageSize)
                    }
                })
            }
        }else {
            props?.setPageSize(event?.target?.value)
        }
    }

    return (
        <div className={'flex justify-between items-center gap-2 h-[110px]'}>
            <ButtonTab  handleOnChange={handleOnTabChange} {...tabsOption}  />
            <div className={'flex items-center gap-2'}>
                <BaseInput
                    onKeyDown={handleSearchKeyPress}
                    id={'filter-text-box'}
                    onInput={onFilterTextBoxChanged}
                    leftIcon={SearchLg} placeholder={"Search"}/>
                {/*<div className={'p-2 rounded-xl border tap-effect flex items-center gap-1'}>*/}
                {/*    <FilterIcon/>*/}
                {/*    <p className={'text-gray-500 text-sm'}>Filter</p>*/}
                {/*</div>*/}
                <BaseRangedDate handleOnApply={handleOnApply}   />

                <div className={'flex items-center  gap-2'}>
                    <p className={'font-medium text-[15px]  items-center'}>Page Size</p>
                    <BaseSelect onChange={handlePageSize} value={props?.pageSize} showPlaceholder={false} classNameContainer={'w-[100px]'} title={'Page Size'} options={pageSizeOptions} />
                </div>
                <div className={'p-2 rounded-xl border tap-effect flex items-center gap-1'}>
                    <RotateIcon className={'w-[20px] #animate-spin h-[20px] '}/>
                </div>
            </div>
        </div>
    )
}