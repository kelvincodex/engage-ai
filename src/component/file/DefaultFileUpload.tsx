import {FileUploader} from "react-drag-drop-files";
import {ReactNode, useEffect, useState} from "react";
import UploadCloudImg from "./assets/upload-cloud-2-line.svg";
import {DefaultButton} from "@/component/button/DefaultButton.tsx";

export interface DefaultFileUploadProps {
    onChangeFile?: (value: any|null)=> void,
    value?: string|null,
    image?: string|null,
    onSelectedPreview?: (value?: any)=> void
    label?: string,
    containerClassName?: string,
    children?: ReactNode,
    types?: string[],
    isMultiple?: boolean,
}

export const DefaultFileUpload =({onChangeFile=()=>{}, image, value,onSelectedPreview=()=>{}, isMultiple=false, types=[], children, label, containerClassName}: DefaultFileUploadProps)=>{
    const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];
    const [preview, setPreview] = useState<string | null>( null);


    const handleChange = (value: File | null) => {
        onChangeFile && onChangeFile(value)

        if (value) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                onSelectedPreview && onSelectedPreview(reader.result as string);
            };
            reader.readAsDataURL(value);
        }
    };

    useEffect(() => {
        setPreview(value)
    }, [value]);
    return (
        <div className={`w-full h-[150px] flex flex-col justify-between my-5 ${containerClassName}`}>
            <label className={'font-medium text-[15px]'} >{label}</label>

            <FileUploader
                multiple={true}
                handleChange={(fileList: FileList) => handleChange(fileList[0])}
                name="file"
                types={types?.length > 0 ? types : fileTypes}
                classes={''}
            >
                {
                    children ? children :
                        <div className=" flex-col gap-1 w-full p-2 h-full border rounded-xl flex items-center justify-center">
                            {
                                (preview || image) ?
                                    <div className={'w-[100px] max-h-[70px] overflow-hidden'}>
                                        <img src={preview ?? image} alt="Selected" className={"w-full object-cover  h-full"}/>
                                    </div> :
                                    <>
                                        <UploadCloudImg/>
                                        <p className={'text-sm font-semibold'}>Drag drop some files here, or click to select
                                            files</p>
                                        <p className={'text-xs text-gray-500'}>pdf, doc recommended, up to 10MB each.</p>
                                    </>
                            }
                            <DefaultButton className={'mt-2'} bgType={'secondary'}>
                                Browser File
                            </DefaultButton>
                        </div>
                }
            </FileUploader>
        </div>
    )
}