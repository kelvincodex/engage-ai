import { useState, useCallback } from 'react';
import { getToken, getMessaging, isSupported } from "firebase/messaging";
import { messaging } from "@/configuration";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { auth } from "@/store/module/auth";

interface NotificationState {
    token: string | null;
    permission: NotificationPermission;
    supported: boolean;
}

interface NotificationResponse {
    success: boolean;
    token?: string;
    error?: any;
}

export const useNotification = () => {
    const [notificationState, setNotificationState] = useState<NotificationState>({
        token: null,
        permission: "default",
        supported: false
    });
    const dispatch = useDispatch();

    const checkBrowserSupport = useCallback(async (): Promise<boolean> => {
        try {
            // Check if the browser supports Firebase messaging
            const isMessagingSupported = await isSupported();

            // Check if we're on HTTPS or localhost
            const isSecureContext = window.isSecureContext;

            // Check if service worker is supported
            const isServiceWorkerSupported = 'serviceWorker' in navigator;

            const supported = isMessagingSupported && (isSecureContext || window.location.hostname === 'localhost') && isServiceWorkerSupported;

            setNotificationState(prev => ({ ...prev, supported }));
            return supported;
        } catch (error) {
            console.error('Error checking browser support:', error);
            setNotificationState(prev => ({ ...prev, supported: false }));
            return false;
        }
    }, []);

    const registerServiceWorker = useCallback(async () => {
        try {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
                return registration;
            }
            throw new Error('Service Worker not supported');
        } catch (error) {
            console.error('Failed to register service worker:', error);
            throw error;
        }
    }, []);

    const requestPermission = useCallback(async (): Promise<NotificationResponse> => {
        try {
            // First check browser support
            const isSupported = await checkBrowserSupport();
            if (!isSupported) {
                toast('Notifications are not supported in this browser', { type: 'warning' });
                return {
                    success: false,
                    error: 'Browser not supported'
                };
            }

            // Register service worker
            await registerServiceWorker();

            // Request notification permission
            const permission = await Notification.requestPermission();
            setNotificationState(prev => ({ ...prev, permission }));

            if (permission === "granted") {
                try {
                    // Initialize messaging if not already initialized
                    const messagingInstance = messaging || getMessaging();

                    const token = await getToken(messagingInstance, {
                        vapidKey: import.meta.env.VITE_FIREBASE_VAPI_KEY,
                    });

                    if (!token) {
                        throw new Error('Failed to generate FCM token');
                    }

                    dispatch(auth.mutation.setDeviceToken(token));
                    setNotificationState(prev => ({
                        ...prev,
                        token,
                        permission
                    }));

                    console.log('Generated token:', token);
                    return { success: true, token };

                } catch (error) {
                    console.error('Error getting FCM token:', error);
                    toast('Failed to setup push notifications', { type: 'error' });
                    return {
                        success: false,
                        error: 'Failed to generate token'
                    };
                }
            } else {
                toast('Notification permission denied', { type: 'error' });
                return {
                    success: false,
                    error: 'Permission denied'
                };
            }
        } catch (error) {
            console.error('Failed to setup notifications:', error);

            let errorMessage = 'Unknown error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            // Show different messages based on error types
            if (errorMessage.includes('messaging/unsupported-browser')) {
                toast('This browser doesn\'t support notifications', { type: 'warning' });
            } else if (errorMessage.includes('permission')) {
                toast('Please enable notifications in your browser settings', { type: 'info' });
            } else {
                toast('Failed to setup notifications', { type: 'error' });
            }

            return { success: false, error };
        }
    }, [dispatch]);

    const checkPermission = useCallback(async () => {
        try {
            const currentPermission = await Notification.requestPermission();
            setNotificationState(prev => ({ ...prev, permission: currentPermission }));
            return currentPermission;
        } catch (error) {
            console.error('Error checking permission:', error);
            return 'denied' as NotificationPermission;
        }
    }, []);

    return {
        requestPermission,
        checkPermission,
        checkBrowserSupport,
        notificationState
    };
};