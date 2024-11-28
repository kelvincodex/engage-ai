import {DashboardStatsCard} from "@/component/card/DashboardStatsCard.tsx";
import AirPlayFill from "@/assets/icon/airplay-fill.svg";
import DatabaseLine from "@/assets/icon/database-line.svg";
import User3 from "@/assets/icon/user-3-line.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {BaseTable, BaseTableProps} from "@/component/table/BaseTable.tsx";
import {useEffect} from "react";
import {
    ApplicationReportingRequest,
} from "@/model/request/application/ApplicationReportingRequest.tsx";
import {application} from "@/store/module/application.ts";
import {useRouteUtil} from "@/util/hook/useRouteUtil.tsx";
import {PayloadAction} from "@reduxjs/toolkit";
import {BaseResponse} from "@/model/response/BaseResponse.ts";
import {ResponseUtil} from "@/util/helper/ResponseUtil.ts";
import {base} from "@/store/module/base.ts";
import {ModalConstant} from "@/util/constant/ModalConstant.ts";
import {ReadApplicationResponse} from "@/model/response/application/ReadApplicationResponse.tsx";
import {partner} from "@/store/module/partner.ts";
import {
    PartnerReportingRequest,
    PartnerReportingRequestInit
} from "@/model/request/partner/PartnerReportingRequest.tsx";
import {ActionOptions} from "@/component/table/component/menu/ActionViewMenu.tsx";

export const AdminOverviewScreen =()=>{
    const dashboardState = useSelector((state: RootState)=> state.dashboard)
    const authState = useSelector((state: RootState)=> state.auth)
    const partnerState = useSelector((state: RootState)=> state.partner)
    const dispatch = useDispatch<any>()

    const routeUtil = useRouteUtil();

    const stats = [
        {
            title: "total apps",
            subtitle: dashboardState.adminDashboardStats?.totalApps ?? "-",
            icon:  AirPlayFill,
        },
        {
            title: "Total api",
            subtitle: dashboardState.adminDashboardStats?.totalApis,
            icon: DatabaseLine,
        },
        {
            title: "Total USER",
            subtitle: dashboardState.adminDashboardStats?.totalUsers ?? "-",
            icon: User3,
        },
    ]


    function handleView(value: ReadApplicationResponse['data'][0]){

    }

    const actionOptions: ActionOptions[] =  [
        {title: "View Partner", action: handleView},
        {title: "Edit Partner", action: handleDeactivate},
        {title: "Delete Partner", action: handleDelete},
        {title: "Activate Partner", action: handleActivate},
        {title: "Deactivate Partner", action: handleDeactivate},
    ]

    function handleDeactivate(value)    {
        const action = ()=>{
            const request = {
                ...value,
                applicationStatus: "INACTIVE"
            }
            dispatch(application.action.updateApp(request)).then((result: PayloadAction<BaseResponse>)=>{
                if (result.payload.responseCode == '00'){
                    const requestDp = {
                        applicationPartnerId: authState.userDetails.userPartnerId
                    } as ApplicationReportingRequest
                    dispatch(application.action.readAppReporting(requestDp))
                    return ResponseUtil.customResponse(dispatch, result.payload.responseMessage)
                }else {
                    return ResponseUtil.apiResponse(dispatch, result)
                }
            })
        }
        dispatch(base.mutation.setModalOptions({
            show: true, component: ModalConstant.confirmationModal,
            metadata:{confirmationOptions: {type:'delete', title: `${value?.applicationName}`, message: "", button:{action: action}}
            }
        }))
    }

    function handleActivate(value){
        const action = ()=>{
            const request = {
                ...value,
                applicationStatus: "ACTIVE"
            }
            dispatch(application.action.updateApp(request)).then((result: PayloadAction<BaseResponse>)=>{
                if (result.payload.responseCode == '00'){
                    const requestDp = {
                        applicationPartnerId: authState.userDetails.userPartnerId
                    } as ApplicationReportingRequest
                    dispatch(application.action.readAppReporting(requestDp))
                    return ResponseUtil.customResponse(dispatch, result.payload.responseMessage)
                }else {
                    return ResponseUtil.apiResponse(dispatch, result)
                }
            })
        }
        dispatch(base.mutation.setModalOptions({
            show: true, component: ModalConstant.confirmationModal,
            metadata:{confirmationOptions: {type:'warning', title: `${value?.applicationName}`, message: "", button:{action: action}}
            }
        }))
    }

    function handleDelete(value){
        const action = ()=>{
            const request = {
                applicationId: value?.applicationId
            }
            dispatch(application.action.deleteApplication(request)).then((result: PayloadAction<BaseResponse>)=>{
                if (result.payload.responseCode == '00'){
                    const requestDp = {
                        applicationPartnerId: authState.userDetails.userPartnerId
                    } as ApplicationReportingRequest
                    dispatch(application.action.readAppReporting(requestDp))
                    return ResponseUtil.customResponse(dispatch, result.payload.responseMessage)
                }else {
                    return ResponseUtil.apiResponse(dispatch, result)
                }
            })
        }
        dispatch(base.mutation.setModalOptions({
            show: true, component: ModalConstant.confirmationModal,
            metadata:{confirmationOptions: {type:'warning', title: `${value?.applicationName}`, message: "", button:{action: action}}
            }
        }))
    }


    const columnDefs: BaseTableProps['columnDefs'] = [
        { headerName: 'Company', field: 'partnerInstitutionName'},
        { headerName: 'Type', field: 'partnerInstitutionType'},
        { headerName: 'Partner ID', field: 'partnerId'},
        { headerName: 'Date Created', field: 'partnerCreatedAt' },
        { headerName: 'Last Updated', field: 'partnerUpdatedAt'},
        { headerName: 'Partner Status ', field: 'partnerStatus'},
    ]

    const partners = partnerState.reportingPartners?.partners ?? []

    const tabsOptions = [
        {value: "All", label:"ALL"},
        {value: "Active", label:"ACTIVE"},
        {value: "InActive", label:"INACTIVE"},
    ]

    useEffect(() => {
        const reportingRq = {
        } as PartnerReportingRequest
        dispatch(partner.action.partnerReporting(reportingRq))
    }, []);

    return (
        <main className={'p-6 w-full'}>
            <div className={'grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'}>
                {
                    stats?.map((it, index) => {
                        return (
                            <DashboardStatsCard key={index} icon={it.icon} title={it.title} subtitle={it.subtitle}/>
                        )
                    })
                }
            </div>

            <div className={'w-full '}>
                <BaseTable
                    ssr={{
                        totalCount: partnerState?.reportingPartners?.totalCount,
                        isSsr: true,
                        dispatcher: dispatch,
                        action: partner.action.partnerReporting,
                        payload: {
                            ...PartnerReportingRequestInit,
                        }
                    }}

                    emptyStateOptions={{
                        name: "Partner",
                        buttonAction: () => {
                            console.log('Hello')
                        }
                    }}
                    isPagination={true}
                    showTopBarOptions={{
                        type: 'button',
                        title: "All Partners",
                        subtitle: "This is where you have all partners added to your account.",
                        exportOption: {
                            showCsv: true,
                            showExcel: true,
                            data: partners,
                            name: 'partners'
                        }
                    }}

                    DefaultHeaderOptions={{
                        tabsOption: {tabs: tabsOptions},
                        usedKeys: {filter: 'partnerCreatedAt', tab: 'partnerStatus'}
                    }}
                    actionOptions={actionOptions}
                    columnDefs={columnDefs} rowData={partners}/>
            </div>

        </main>
    )
}