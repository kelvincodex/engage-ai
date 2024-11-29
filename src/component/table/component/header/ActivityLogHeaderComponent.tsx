import {BaseSelect} from "@/component/input/BaseSelect.tsx";
import BaseRangedDate from "@/component/date/BaseRangedDate.tsx";
export const ActivityLogHeaderComponent = ()=>{


    const roleOptions = [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
    ]

    const statusOptions = [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
    ]
    return (
        <div className={'flex justify-between gap-2 h-[110px]'}>
            <BaseSelect classNameContainer={'flex-1'} name={"Users"} options={roleOptions}  />
            <BaseSelect classNameContainer={'flex-1'} name={"Activity Type"} options={roleOptions}  />
            <BaseSelect classNameContainer={'flex-1'} name={"Activities"} options={roleOptions}  />
            <BaseSelect classNameContainer={'flex-1'} name={"Date"} options={statusOptions}  />
            <BaseRangedDate />
        </div>
    )
}