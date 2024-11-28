import {BaseModal} from "@/component/modal/BaseModal.tsx";
import AddUser from "@/assets/icon/user-add-line.svg"
export const AddUserModal = ()=>{

    return (
        <BaseModal  size={'sm'} icon={AddUser} title={"Add User"} subtitle={"Onboard a user to your account"}>
        </BaseModal>
    )
}