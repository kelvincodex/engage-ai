// import { useEffect, useRef, useState, useCallback } from 'react';
// import { useDispatch } from "react-redux";
// import { base } from "@/store/module/base";
// import { ModalConstant } from "@/util/constant/ModalConstant";
// import {useRouteUtil} from "@/util/hook/useRouteUtil.tsx";
//
// interface UsePreventNavigationProps {
//     isDirty?: boolean;
//     backHref?: string;
// }
//
// export const usePreventNavigation = ({ isDirty = true, backHref = "" }: UsePreventNavigationProps) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [leavingPage, setLeavingPage] = useState(false);
//     const dispatch = useDispatch();
//     const routeUtil = useRouteUtil();
//     const navigationTarget = useRef<string | null>(null);
//     const navigationAction = useRef<'back' | 'href' | 'close' | null>(null);
//     const preventNavigationRef = useRef(false);
//
//     // Prevent accidental browser close or navigation when form is dirty
//     const preventUnload = useCallback((e: BeforeUnloadEvent) => {
//         if (isDirty) {
//             e.preventDefault();
//             e.returnValue = '';
//         }
//     }, [isDirty]);
//
//     // Handle link click prevention
//     const handleLinkClick = useCallback((e: MouseEvent) => {
//         if (!isDirty) return;
//
//         const target = e.target as HTMLAnchorElement;
//         if (target.tagName === 'A' && target.href) {
//             e.preventDefault();
//             navigationTarget.current = target.href;
//             navigationAction.current = 'href';
//             setLeavingPage(true);
//         }
//     }, [isDirty]);
//
//     // Handle browser back/forward navigation
//     const handlePopState = useCallback((e: PopStateEvent) => {
//         if (!isDirty) return;
//
//         // Prevent default navigation
//         e.preventDefault();
//
//         // Always go back one step to counteract the navigation attempt
//         window.history.forward();
//
//         // Trigger leaving page modal
//         navigationTarget.current = backHref || '/';
//         navigationAction.current = 'back';
//         preventNavigationRef.current = true;
//         setLeavingPage(true);
//     }, [isDirty, backHref]);
//
//     // Perform actual navigation after confirmation
//     const performNavigation = useCallback(() => {
//         if (navigationAction.current === 'href' && navigationTarget.current) {
//             console.log('href')
//             window.location.href = navigationTarget.current;
//         } else if (navigationAction.current === 'back') {
//             window.location.href = backHref || '/';
//         } else if (navigationAction.current === 'close') {
//             console.log('close')
//             window.close();
//         }
//
//
//         // Reset states
//         navigationTarget.current = null;
//         navigationAction.current = null;
//         setLeavingPage(false);
//         setIsOpen(false);
//         preventNavigationRef.current = false;
//     }, [backHref]);
//
//
//     // Open leaving page modal
//     const handleLeave = useCallback(() => {
//         dispatch(base.mutation.setModalOptions({
//             show: true,
//             component: ModalConstant.leavingPageModal,
//             payload: {
//                 noCallback: () => {
//                     // Reset navigation state
//                     navigationTarget.current = null;
//                     navigationAction.current = null;
//                     setLeavingPage(false);
//                     preventNavigationRef.current = false;
//                 },
//                 yesCallback: performNavigation
//             }
//         }));
//     }, [dispatch, performNavigation]);
//
//     // Setup event listeners
//     useEffect(() => {
//         if (!isDirty) return;
//
//         // Add listeners
//         window.addEventListener('beforeunload', preventUnload);
//         document.addEventListener('click', handleLinkClick, true);
//         window.addEventListener('popstate', handlePopState);
//
//         return () => {
//             // Cleanup listeners
//             window.removeEventListener('beforeunload', preventUnload);
//             document.removeEventListener('click', handleLinkClick, true);
//             window.removeEventListener('popstate', handlePopState);
//         };
//     }, [isDirty, preventUnload, handleLinkClick, handlePopState]);
//
//     // Trigger leaving page modal when leaving is true
//     useEffect(() => {
//         if (leavingPage) {
//             handleLeave();
//         }
//     }, [leavingPage, handleLeave]);
//
//     // Method to handle browser close attempt
//     const handleClose = useCallback(() => {
//         if (!isDirty) return;
//
//         navigationAction.current = 'close';
//         setLeavingPage(true);
//     }, [isDirty]);
//
//     return {
//         setLeavingPage,
//         isOpen,
//         setIsOpen,
//         handleClose  // Expose method to trigger close confirmation
//     };
// };

import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { base } from "@/store/module/base";
import { ModalConstant } from "@/util/constant/ModalConstant";

interface UsePreventNavigationProps {
    isDirty?: boolean;
    backHref?: string;
}

export const usePreventNavigation = ({
                                         isDirty = true,
                                         backHref = "",
                                     }: UsePreventNavigationProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [leavingPage, setLeavingPage] = useState(false);
    const dispatch = useDispatch();
    const navigationTarget = useRef<string | null>(null);
    const navigationAction = useRef<"back" | "href" | "close" | null>(null);
    const preventNavigationRef = useRef(false);

    // Prevent accidental browser close or navigation when form is dirty
    const preventUnload = useCallback(
        (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = ""; // Trigger the native browser confirmation
            }
        },
        [isDirty]
    );

    // Handle browser back/forward navigation
    const handlePopState = useCallback(() => {
        if (!isDirty) return;

        if (preventNavigationRef.current) {
            preventNavigationRef.current = false;
            return;
        }

        // Stop the default behavior and show the modal
        navigationTarget.current = backHref || document.referrer || "/";
        navigationAction.current = "back";
        preventNavigationRef.current = true;
        setLeavingPage(true);

        // Push the state back to maintain history stack
        window.history.pushState(null, "", window.location.href);
    }, [isDirty, backHref]);

    // Perform actual navigation after confirmation
    const performNavigation = useCallback(() => {
        if (navigationAction.current === "href" && navigationTarget.current) {
            window.location.href = navigationTarget.current;
        } else if (navigationAction.current === "back" && navigationTarget.current) {
            window.location.href = navigationTarget.current;
        } else if (navigationAction.current === "close") {
            window.close();
        }

        // Reset states
        navigationTarget.current = null;
        navigationAction.current = null;
        setLeavingPage(false);
        setIsOpen(false);
    }, []);

    // Open leaving page modal
    const handleLeave = useCallback(() => {
        dispatch(
            base.mutation.setModalOptions({
                show: true,
                component: ModalConstant.leavingPageModal,
                payload: {
                    noCallback: () => {
                        preventNavigationRef.current = false;
                        navigationTarget.current = null;
                        navigationAction.current = null;
                        setLeavingPage(false);
                    },
                    yesCallback: performNavigation,
                },
            })
        );
    }, [dispatch, performNavigation]);

    // Setup event listeners
    useEffect(() => {
        if (!isDirty) return;

        // Add listeners
        window.addEventListener("beforeunload", preventUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            // Cleanup listeners
            window.removeEventListener("beforeunload", preventUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isDirty, preventUnload, handlePopState]);

    // Trigger leaving page modal when leavingPage is true
    useEffect(() => {
        if (leavingPage) {
            handleLeave();
        }
    }, [leavingPage, handleLeave]);

    // Handle browser close attempts
    const handleClose = useCallback(() => {
        if (!isDirty) return;

        navigationAction.current = "close";
        setLeavingPage(true);
    }, [isDirty]);

    return {
        setLeavingPage,
        isOpen,
        setIsOpen,
        handleClose, // Expose method to trigger close confirmation
    };
};
