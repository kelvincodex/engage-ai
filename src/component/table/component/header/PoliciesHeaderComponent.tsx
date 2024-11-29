import {BaseInput} from "@/component/input/BaseInput.tsx";
import {BaseSelect} from "@/component/input/BaseSelect.tsx";
import SearchLg from "@/assets/icon/search-lg.svg"
export const PoliciesHeaderComponent = ()=>{


    const roleOptions = [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
    ]

    const statusOptions = [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
    ]

    const categoryOptions = [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
    ]


    const createdOptions = [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
    ]
    return (
        <div className={'flex justify-between gap-2 h-[110px]'}>
            <BaseInput leftIcon={SearchLg} placeholder={"Search"} classNameContainer={'flex-1'} label={'Search Policy Title'} />
            <BaseSelect classNameContainer={'flex-1'} name={"Status"} options={statusOptions} label={'Status'} />
            <BaseSelect classNameContainer={'flex-1'} name={"Categories"} options={categoryOptions} label={'Categories'} />
            <BaseSelect classNameContainer={'flex-1'} name={"Created by"} options={createdOptions} label={'Created by'} />
        </div>
    )
}