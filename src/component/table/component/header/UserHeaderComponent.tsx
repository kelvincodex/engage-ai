import {BaseInput} from "@/component/input/BaseInput.tsx";
import {BaseSelect} from "@/component/input/BaseSelect.tsx";
import SearchLg from "@/assets/icon/search-lg.svg"
import BaseRangedDate from "@/component/date/BaseRangedDate.tsx";
import React, {ChangeEvent, useCallback} from "react";
import {AgGridReact} from "ag-grid-react";
import {ReadUserReportingRequest} from "@/model/request/user/ReadUserReportingRequest.ts";
import {user} from "@/store/module/user.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import RotateIcon from "@/assets/icon/rotate-icon.svg";

interface UserHeaderComponentProps {
    gridRef?: React.RefObject<AgGridReact>
}
export const UserHeaderComponent = (props: UserHeaderComponentProps)=>{
    const roleState = useSelector((state: RootState) => state.role);
    const authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<any>()
    const  roles = roleState.roles?.filter((it)=>{
        return it?.roleName?.toLowerCase()?.includes('partner')
    })

    const roleOptions = [{label: "All", value: "All", selected: true},...roles?.map((it)=>{
        return {value: it?.roleId?.toString(), label: it?.roleName}
    })]

    const statusOptions = [
        {label: "All", value: "All", selected: true},
        {label: "ACTIVE", value: "ACTIVE"},
        {label: "INACTIVE", value: "INACTIVE"},
        {label: "PENDING", value: "PENDING"},
    ]

    const onFilterTextBoxChanged = useCallback(() => {
        props.gridRef.current!.api.setGridOption(
            "quickFilterText",
            (document.getElementById("filter-text-box") as HTMLInputElement).value,
        );
    }, []);

    function handleOnApply(startDate: string, endDate: string){
        const userReportRq = {
            userPartnerId: authState.userDetails.userPartnerId,
            endDate: endDate,
            startDate: startDate,
        } as ReadUserReportingRequest
        dispatch(user.action.readUserReporting(userReportRq))
    }

    function handleRefresh(){
        const userReportRq = {
            userPartnerId: authState.userDetails.userPartnerId,
        } as ReadUserReportingRequest
        dispatch(user.action.readUserReporting(userReportRq))
    }


    function handleStatus(event: ChangeEvent<HTMLSelectElement>){
        const userReportRq = {
            userPartnerId: authState.userDetails.userPartnerId,
            userStatus: event.target.value?.toLowerCase() == 'all' ? "": event.target.value
        } as ReadUserReportingRequest
        dispatch(user.action.readUserReporting(userReportRq))
    }


    function handleRole(event: ChangeEvent<HTMLSelectElement>){
        const userReportRq = {
            userPartnerId: authState.userDetails.userPartnerId,
            userRoleId: event.target.value?.toLowerCase() == 'all' ? 0 : Number(event.target.value),
        } as ReadUserReportingRequest
        dispatch(user.action.readUserReporting(userReportRq))
    }

    function handleSearchKeyPress(event: React.KeyboardEvent<HTMLInputElement>){
        if (event.key == "Enter"){
            const value = (event.target as HTMLInputElement).value;
            const userReportRq = {
                userPartnerId: authState.userDetails.userPartnerId,
                searchParameter: value,
            } as ReadUserReportingRequest
            dispatch(user.action.readUserReporting(userReportRq))
        }
    }
    return (
        <div className={'flex justify-between gap-2 h-[110px]'}>
            <BaseInput
                onKeyDown={handleSearchKeyPress}
                id={'filter-text-box'}
                onInput={onFilterTextBoxChanged}
                leftIcon={SearchLg} placeholder={"Search"} classNameContainer={'flex-1'}
                label={'Search Name or Email'}/>
            <BaseSelect showPlaceholder={false} onChange={handleRole} classNameContainer={'flex-1'} name={"Role"} options={roleOptions} label={'Filter By Role'}/>
            <BaseSelect showPlaceholder={false} onChange={handleStatus} classNameContainer={'flex-1'} name={"Status"} options={statusOptions} label={'Status'}/>
            <BaseRangedDate handleOnApply={handleOnApply} label={'Date'}/>

            <div onClick={handleRefresh} className={'p-2 rounded-xl h-[40px]  mt-9 border tap-effect flex items-center gap-1'}>
                <RotateIcon className={'w-[20px] #animate-spin h-[20px] '}/>
            </div>
        </div>
    )
}