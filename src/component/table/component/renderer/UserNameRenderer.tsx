import {ICellRendererParams} from "ag-grid-community";

export const UserNameRenderer =(props: ICellRendererParams)=>{

    return (
        <div className="flex items-center gap-2 w-full h-full">
            <div className="flex-shrink-0 w-10 h-10 flex items-center overflow-hidden justify-center rounded-full border text-gray-500">
                {
                    props.data?.userProfilePicture ?
                        <a className={'tap-effect '} target="_blank" href={props.data?.userProfilePicture}>
                            <img src={props.data?.userProfilePicture} className={'w-full h-full'} alt={''}/>
                        </a> :
                        `${props.data.userFirstName?.toUpperCase()?.slice(0,1)}${props.data.userLastName?.toUpperCase()?.slice(0,1)}`
                }
            </div>
            <div className="min-w-0 flex-1">
                <span className="text-gray-500 border-b border-gray-400 block tap-effect text-xs capitalize truncate">
                    {props.data.userFirstName} {props.data.userLastName}
                </span>
            </div>
        </div>
    )
}