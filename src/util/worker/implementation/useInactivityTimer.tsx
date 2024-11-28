import  { useEffect, useState, useRef } from 'react';

interface UseInactivityTimerProps {
    onTimeout: () => void
    customTimer?: string|number,
    initialTimer?: string|number
}
export const useInactivityTimer = ({ onTimeout, initialTimer=30, customTimer=0}: UseInactivityTimerProps) => {
    const timer =   Number(customTimer) ? Number(customTimer) * 60 * 1000 : Number(initialTimer) * 60 * 1000
   
    // const timer = 1000
    const [timeLeft, setTimeLeft] = useState(timer); // 30 minutes in milliseconds
    const workerRef = useRef(null);
    // console.log('session timeLeft', timeLeft)

    useEffect(() => {
        // Initialize the web worker
        workerRef.current = new Worker(new URL('/src/util/worker/timeoutWorker.ts', import.meta.url));

        // Start the countdown immediately
        startTimer();

        // Set up event listeners to reset the timer on user activity
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        return () => {
            // Clean up event listeners on unmount
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });

            // Clean up the worker on unmount
            workerRef.current.terminate();
        };
    }, []);

    const startTimer = () => {
        workerRef.current.postMessage({ type: 'start', timeLeft: timer });

        workerRef.current.onmessage = (e) => {
            if (e.data.type === 'timeout') {
                onTimeout();
            } else {
                setTimeLeft(e.data.countdown);
                localStorage.setItem('inactivityTimeLeft', e.data.countdown);
            }
        };
    };

    const resetTimer = () => {
        // Reset the countdown timer
        workerRef.current.postMessage({ type: 'reset', timeLeft: timer });
    };

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / (60 * 1000));
        const seconds = Math.floor((ms % (60 * 1000)) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            {formatTime(timeLeft)}
        </div>
    );
};