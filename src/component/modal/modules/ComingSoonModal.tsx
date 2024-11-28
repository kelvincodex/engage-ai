import {BaseModal} from "@/component/modal/BaseModal.tsx";
import AddUser from "@/assets/icon/user-add-line.svg"
export const ComingSoonModal = ()=>{

    return (
        <BaseModal size={'sm'} showHeader={true} icon={AddUser} title={"Modules"} subtitle={""}>
            <div className={'relative p-6 flex-auto flex flex-col items-center gap-5'}>
                Coming Soon!
            </div>
        </BaseModal>
)
}