import {ICellRendererParams} from "ag-grid-community";

export const SupportTicketRenderer =(props: ICellRendererParams)=>{

    console.log('props', props.data.userFirstName)
    return (
        <div className="flex items-center gap-2 w-full h-full">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border text-gray-500">
                {
                    props.data.supportTicketImageUrl ?
                        <img src={props.data.supportTicketImageUrl} alt={''} /> : ''

                }
            </div>
            <div className="min-w-0 flex-1">
                <span className="text-gray-500 border-b border-gray-400 block tap-effect text-xs capitalize truncate">
                    {props.data.supportTicketTopic}
                </span>
            </div>
        </div>
    )
}