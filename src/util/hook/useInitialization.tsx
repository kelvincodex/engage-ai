import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { base } from "@/store/module/base";

export const useInitialization = () => {
    const dispatch = useDispatch<any>();

    useEffect(() => {
        const preloader = document.querySelector('.preloader');
        preloader?.classList.replace('display-none', 'display');

        const init =  () => {
            dispatch(base.mutation.resetModalOptions());
            preloader?.classList.replace('display', 'display-none');
        };

        init();
    }, [dispatch]);
};