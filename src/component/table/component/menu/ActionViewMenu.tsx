import React, {useState, useRef, CSSProperties} from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import {PopupPortalMenu} from "@/component/table/component/menu/PopupPortalMenu.tsx";

export type ActionOptions = {action?:(value: any)=>void, title: string, style?: CSSProperties, className?: string}
export const ActionViewMenu = (props: ICellRendererParams & any) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                ref={buttonRef}
                className="flex items-center justify-center w-8 h-8 bg-transparent text-gray-500 border-none focus:outline-none"
                onClick={toggleMenu}
            >
                <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
            </button>

            <PopupPortalMenu  setIsOpen={setIsOpen} isOpen={isOpen} anchorEl={buttonRef.current}>
                <div style={{width:"100%"}} className="bg-white rounded-md shadow-lg z-50 !w-44">
                    <ul className="py-1 m-0 list-none">
                        {
                             (props?.actionOptions as ActionOptions[])?.map((it, index)=>{
                                 return (
                                     <li key={index} className="px-4 text-sm py-2 hover:bg-gray-100 cursor-pointer"
                                         onClick={()=>it.action(props?.data)}>{it.title}</li>
                                 )
                             })
                        }
                    </ul>
                </div>
            </PopupPortalMenu>
        </>
    );
};

