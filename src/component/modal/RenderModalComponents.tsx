import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {ModalConstant} from "@/util/constant/ModalConstant.ts";
import {AddUserModal} from "@/component/modal/modules/AddUserModal.tsx";
import {ShowNothingModal} from "@/component/modal/modules/ShowNothingModal.tsx";
import {ComingSoonModal} from "@/component/modal/modules/ComingSoonModal.tsx";


export const RenderModalComponents = ()=>{
    const  baseState = useSelector((state: RootState)=> state.base)
    if (!baseState.modalOptions.show){
        return<></>
    }

    if (baseState.modalOptions.component == ModalConstant.addUserModal){
        return  <AddUserModal />
    }

    if (baseState.modalOptions.component == ModalConstant.showNothingModal){
        return  <ShowNothingModal />
    }

    if (baseState.modalOptions.component == ModalConstant.comingSoonModal){
        return  <ComingSoonModal />
    }
}