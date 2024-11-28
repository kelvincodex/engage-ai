
interface  DashboardStatCardProps  {
    title?: string
    items?: {
        day?: string,
        date?: string,
        num?: string,
    }[]
}
export const  DashboardStatCard = ({title, items}: DashboardStatCardProps)=>{

    return (
        <div className={'bg-neutral-lighter-color w-[350px] rounded-lg p-3'}>
            <p>{title}</p>
            {
                items?.map((it, index)=>{
                    return (
                        <div key={index} className={'flex py-3 items-center justify-between w-full'}>
                            <div className={'flex flex-col gap-2'}>
                                <p className={'text-sm'}>{it?.day}</p>
                                <p className={'text-xs text-gray-500'}>{it?.date}</p>
                            </div>

                            <p className={'text-lg'}>{it?.num}</p>
                        </div>
                    )
                })
            }


        </div>
    )
}