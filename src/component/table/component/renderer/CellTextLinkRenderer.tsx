import {ICellRendererParams} from "ag-grid-community";

export const CellTextLinkRenderer =(props: ICellRendererParams)=>{



    return (
        <div className={' flex-1 min-w-[150px]'}>
            <p onClick={(props as any)?.onClick && (props as any)?.onClick}
               className="text-primary-color w-auto text-center border-b border-gray-400  tap-effect text-xs capitalize">
                {(props as any)?.text ? (props as any)?.text : 'N/A'}
            </p>
        </div>
    )
}

