import {useDispatch} from "react-redux";
import {base} from "@/store/module/base.ts";
import React from "react";
import {DefaultButton} from "@/component/button/DefaultButton.tsx";
import {RoundedWrapper} from "@/component/wrapper/RoundedWrapper.tsx";
import {SVGComponent} from "@/util/type/StoreTypes.ts";

interface BaseModalProps {
    title?: string;
    icon?: SVGComponent;
    image?: string;
    subtitle?: string;
    onClose?: ()=> void;
    showHeader?: boolean;
    children?: React.ReactNode;
    size?: 'sm' |'xs' | 'md' | 'lg' | 'xl'
}
export const BaseModal = ({title, onClose, icon: Icon, image, showHeader=true, size="sm",subtitle, children}: BaseModalProps)=>{
    const dispatch = useDispatch<any>();

    function handleClose(){
        dispatch(base.mutation.resetModalOptions())
        onClose && onClose()
    }

    const width = size == 'md' ? '!w-[700px]' : size == 'lg' ? '!w-[900px]' : size == 'xl' ? '!w-[1200px]': size == 'sm' ? '!w-[500px]' : '!w-[300px]'

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className={`relative w-auto my-6 mx-auto max-h-screen ${width}`}>
                    {/*content*/}
                    <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        {
                            showHeader && (
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <div className={'flex gap-3 items-center'}>
                                        {
                                            !image ?
                                                <RoundedWrapper>
                                                    {Icon && <Icon className={'w-[20px] h-[20px]'}/>}
                                                </RoundedWrapper> :
                                                <img src={image} alt="" className={'w-[40px] h-[40px]'}/>
                                        }

                                        <div className={''}>
                                            <h3 className="text-[16px] font-semibold">
                                                {title}
                                            </h3>
                                            <p className={'text-sm'}>{subtitle}</p>
                                        </div>
                                    </div>


                                    <DefaultButton className={''} onClick={handleClose} bgType={'normal'}>
                                     <span
                                         className="bg-transparent text-black opacity-20 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                                    </DefaultButton>

                                </div>
                            )
                        }

                        {children}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
