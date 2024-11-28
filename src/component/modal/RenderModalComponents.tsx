import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {ModalConstant} from "@/util/constant/ModalConstant.ts";
import {AddUserModal} from "@/component/modal/modules/AddUserModal.tsx";


export const RenderModalComponents = ()=>{
    const  baseState = useSelector((state: RootState)=> state.base)
    if (!baseState.modalOptions.show){
        return<></>
    }

    if (baseState.modalOptions.component == ModalConstant.addUserModal){
        return  <AddUserModal />
    }
}