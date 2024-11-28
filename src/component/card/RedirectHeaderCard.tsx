import RightArrowSlant from "@/assets/icon/right-slant-arrow.svg"
import {DefaultButton} from "@/component/button/DefaultButton.tsx";
import {SVGComponent} from "@/util/type/StoreTypes.ts";
import ExcelIcon from "@/assets/icon/excel-icon.svg"
import CsvIcon from "@/assets/icon/csv-document-icon.svg"
import {ExportUtil} from "@/util/helper/ExportUtil.ts";
export interface RedirectHeaderCardProps {
    title: string,
    subtitle: string,
    viewAction?: ()=>void,
    type?: "button"|"text",
    exportOption?: {exportCsv?: ()=> void, exportExcel?: ()=> void, data?: any, name?: string, showCsv?: boolean, showExcel?: boolean},
    buttonOption?: {action: ()=>void, title?: string, icon?: SVGComponent}[]
}

export const RedirectHeaderCard = ({title,viewAction, type="text", subtitle, ...props}: RedirectHeaderCardProps)=>{

    return (
        <div className={'flex justify-between items-center  border-b w-full mb-3 pb-3'}>
            <div>
                <h2 className={'font-bold text-lg'}>{title}</h2>
                <p className={'text-gray-500 text-sm'}>{subtitle}</p>
            </div>

            <div className={'flex items-center gap-3'}>
                {
                    props?.exportOption?.showCsv && (
                        <DefaultButton
                            onClick={()=> {
                                ExportUtil.exportToCSV(props?.exportOption?.data, props?.exportOption?.name)
                                props?.exportOption?.exportCsv && props?.exportOption.exportCsv()
                            }}
                            bgType={'secondary'} className={'flex gap-3 items-center text-xs'}>
                            <CsvIcon className={'w-[20px] h-[20px]'} />
                            <p className={'text-sm'}>Export As Csv</p>
                        </DefaultButton>
                    )
                }

                {
                    props?.exportOption?.showExcel && (
                        <DefaultButton
                            onClick={()=> {
                            ExportUtil.exportToExcel(props?.exportOption?.data, props?.exportOption?.name)
                            props?.exportOption?.exportCsv && props?.exportOption.exportCsv()
                        }}
                                       bgType={'secondary'} className={'flex gap-3 items-center text-xs'}>
                            <ExcelIcon className={'w-[20px] h-[20px]'} />
                            <p className={'text-sm'}>Export As Excel</p>
                        </DefaultButton>
                    )
                }

                {
                    type === "button" ?
                        props?.buttonOption?.length && (
                            props?.buttonOption?.map((it, id) => {
                                const Icon = it?.icon
                                return (
                                    <DefaultButton onClick={() => it?.action && it?.action()} key={id}
                                                   className={'flex gap-3 items-center'}>
                                        {Icon && <Icon />}

                                        {it?.title}
                                    </DefaultButton>
                                )
                            })
                        )
                        :
                        viewAction && (
                            <p onClick={() => viewAction && viewAction()}
                               className={'tap-effect  text-sm flex items-center text-primary-lighter-color gap-1'}>View
                                all <RightArrowSlant/></p>
                        )
                }
            </div>
        </div>
    )
}