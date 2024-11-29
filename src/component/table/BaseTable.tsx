import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, {ReactNode, useCallback, useMemo, useRef, useState} from "react";
import {GridOptions, GridReadyEvent} from "ag-grid-community";
import {cellRenderer} from "@/component/table/component/renderer/CellRenderer.tsx";
import {HeaderContainer} from "@/component/table/component/container/HeaderContainer.tsx";
import {ActionOptions, ActionViewMenu} from "@/component/table/component/menu/ActionViewMenu.tsx";
import {PaginationContainer} from "@/component/table/component/container/PaginationContainer.tsx";
import {
    DefaultHeaderComponent,
    DefaultHeaderComponentProps
} from "@/component/table/component/header/DefaultHeaderComponent.tsx";
import {Dispatch} from "redux";
import {PayloadAction} from "@reduxjs/toolkit";
import {BaseResponse} from "@/model/response/BaseResponse.ts";
import {table} from "@/store/module/table.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

export type SSSROptions  = {isSsr?: boolean, totalCount?: number, dispatcher?: Dispatch, action?:(payload?: any)=> any, payload?: any}
export interface BaseTableProps extends GridOptions{
    loading?: boolean
    tableType?: "noLabel"|"label"|""
    showTopBar?: boolean
    DefaultHeaderOptions?: DefaultHeaderComponentProps
    onCellClickAction?: (value?: any)=> void,
    reloadAction?: (value?: any)=> void,
    autoReload?: boolean,
    actionOptions?: ActionOptions[],
    customHeaderComponent?:(gridRef?: React.RefObject<AgGridReact>)=>  ReactNode,
    isPagination?: boolean,
    ssr?: SSSROptions,
}


export const BaseTable = ({loading, onCellClickAction,rowData, isPagination=true, showTopBar=true, ...props}: BaseTableProps)=>{
    const gridRef = useRef<AgGridReact>(null);
    const tableState = useSelector((state: RootState)=> state.table)
    const [pageSize, setPageSize] = useState<number|string>(10);
    const [isGridReady, setIsGridReady] = useState(false);
    const totalPages = Math.ceil(  (props?.ssr?.totalCount ?? 0)/ Number(pageSize));

    console.log('totalPages', tableState?.currentPage)
    const defaultColDef: BaseTableProps['defaultColDef'] = {
        flex: 1,
        filter: false,
        sortable: true,
        headerClass:"bg-white cursor-pointer",
        floatingFilter: false,
        // icons:{
        //     sortAscending: `<svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                         <path d="M4 0.5L8 4.5H0L4 0.5Z" fill="#525866"/>
        //                         </svg>`,
        //     sortDescending: `<svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                         <path d="M4.5 4.5L0.5 0.5H8.5L4.5 4.5Z" fill="#525866"/>
        //                         </svg>`,
        // },
        headerComponent: HeaderContainer,
        autoHeight: true,
        minWidth: 150,
        cellRenderer: cellRenderer,
        cellStyle: {fontSize: '14px',whiteSpace: 'nowrap',paddingTop:'8px', paddingBottom:'8px', overflow: 'hidden', textOverflow: 'ellipsis', color: "#0a0d14", fontWeight: '700', justification: 'center', alignItems: 'center', display:'flex', flex: 1 },
        cellClass: `${onCellClickAction && 'cursor-pointer'}`,
    }

    const paginationPageSizeSelector = useMemo(() => {
        return [10, 20, 50, 100];
    }, []);


    const onGridReady = useCallback((params: GridReadyEvent) => {
        if (gridRef.current?.api) {
            gridRef.current.api.sizeColumnsToFit();
            setIsGridReady(true);
        }
    }, []);

    const getRowStyle = (params) => {
        if (params.node.rowIndex % 2 === 0) {
            return { backgroundColor: 'var(--beam-gray-color)' };
        }
    };

    if (rowData?.length > 0
        && (props?.actionOptions?.length > 0)
        && !props.columnDefs?.some(col => (col as any).field === 'actions')) {
        props.columnDefs?.push({
            headerName: "",
            field: "actions",
            filter: false,
            suppressNavigable: true,
            maxWidth: 70,
            sortable: false,
            pinned: "right",
            cellRenderer: ActionViewMenu,
            cellRendererParams: {
                actionOptions: props?.actionOptions
            },
        });
    }


   function handleFetch(page: number){
        const params = {
            ...props?.ssr?.payload,
            pageNo: page,
            pageSize: 10,
        }
        if (props?.ssr?.dispatcher){
            props?.ssr?.dispatcher(props?.ssr?.action(params))?.then((result: PayloadAction<BaseResponse>)=>{
                if (result.payload.responseCode == '00'){
                    props?.ssr?.dispatcher(table.mutation.setCurrentPage(page))
                }
            })
        }
    }

    return (
        <div className={'w-full py-3 border overflow-scroll rounded-xl p-4 '}>

            {


                    props?.customHeaderComponent ?
                        props?.customHeaderComponent(gridRef) :
                        <DefaultHeaderComponent pageSize={pageSize} setPageSize={setPageSize}  ssr={props?.ssr} gridRef={gridRef} {...props?.DefaultHeaderOptions}  />
            }


            <div className={'ag-theme-quartz w-full  min-h-fit max-h-full !text-xs'}>
                {
                    rowData?.length > 0 ?
                        <AgGridReact
                            rowData={rowData}
                            className={'w-full min-h-fit max-h-full'}
                            ref={gridRef}
                            getRowStyle={getRowStyle}
                            loading={loading}
                            ensureDomOrder={true}
                            pagination={true}
                            domLayout={'autoHeight'}
                            enableCellTextSelection={true}
                            onCellClicked={(event) => {
                                if (event.colDef.headerName?.toLowerCase() == 'actions') {
                                    event.event.stopPropagation();
                                } else {
                                    onCellClickAction && onCellClickAction(event.data)
                                }
                            }}
                            rowGroupPanelShow={'always'}
                            serverSideInitialRowCount={10}
                            paginateChildRows={true}
                            suppressPaginationPanel={true}
                            paginationPageSizeSelector={paginationPageSizeSelector}
                            rowHeight={30}
                            rowModelType="clientSide"
                            paginationPageSize={Number(pageSize)}
                            headerHeight={40}
                            onGridReady={onGridReady}
                            defaultColDef={defaultColDef}
                            {...props}
                        />
                        :
                        <>Nothing to show</>
                }

            </div>

            {
                isGridReady && isPagination && (
                    <PaginationContainer currentPage={tableState?.currentPage} totalPages={totalPages}  onPageChange={handleFetch} isSsr={!!props?.ssr?.isSsr} gridRef={gridRef} />
                )
            }
        </div>
    )
}