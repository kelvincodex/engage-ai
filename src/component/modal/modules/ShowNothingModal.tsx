import {BaseModal} from "@/component/modal/BaseModal.tsx";
import AddUser from "@/assets/icon/user-add-line.svg"
export const ShowNothingModal = ()=>{

    return (
        <BaseModal size={'sm'} icon={AddUser} showHeader={true} title={"User Activity"} subtitle={""}>
            <div className={'relative p-6 flex-auto flex flex-col items-center gap-5'}>
                Nothing To Show!
            </div>
        </BaseModal>
)
}