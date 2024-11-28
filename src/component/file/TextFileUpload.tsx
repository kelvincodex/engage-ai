import {ReactNode, useEffect, useState} from "react";
import {DefaultFileUploadProps} from "@/component/file/DefaultFileUpload.tsx";
import {FileUploader} from "react-drag-drop-files";

interface TextFileUploadProps extends DefaultFileUploadProps{
    children?: ReactNode
}
export const TextFileUpload = ({children, ...props}: TextFileUploadProps)=>{
    const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];
    const [preview, setPreview] = useState<string | null>( null);


    const handleChange = (value: File | null) => {
        props?.onChangeFile && props?.onChangeFile(value)

        if (value) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                props?.onSelectedPreview && props?.onSelectedPreview(reader.result as string);
            };
            reader.readAsDataURL(value);
        }
    };

    useEffect(() => {
        setPreview(props?.value)
    }, [props?.value]);

    return (
        <FileUploader
            multiple={true}
            handleChange={(fileList: FileList) => handleChange(fileList[0])}
            name="file"
            types={props?.types?.length > 0 ? props?.types : fileTypes}
            classes={''}
        >
            {children}
        </FileUploader>
    )
}