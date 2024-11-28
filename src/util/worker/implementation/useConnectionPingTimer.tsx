import { useEffect, useState, useRef } from 'react';

export const useConnectionPingTimer = ({ onTimeout, reset=true }: { onTimeout: () => void, reset?: boolean }) => {
    const timerDuration = 4 * 60 * 1000;
    const [timeLeft, setTimeLeft] = useState<number>(timerDuration);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // Retrieve remaining time from localStorage
        const savedTimeLeft = localStorage.getItem('connectionPingTimeLeft');
        if (savedTimeLeft) {
            const remainingTime = parseInt(savedTimeLeft, 10);
            setTimeLeft(remainingTime > 0 ? remainingTime : timerDuration);
        }

        workerRef.current = new Worker(new URL('/src/util/worker/timeoutWorker.ts', import.meta.url));
        startCountdown();

        return () => {
            workerRef.current?.terminate();
            localStorage.removeItem('connectionPingTimeLeft');
        };
    }, []);

    const startCountdown = () => {
        workerRef.current?.postMessage({ type: 'start', timeLeft });

        workerRef.current.onmessage = (e) => {
            if (e.data.type === 'timeout') {
                onTimeout(); // Call onTimeout callback
                if (reset){
                    resetTimer(); // Restart the countdown after timeout
                }

            } else {
                setTimeLeft(e.data.countdown);
                localStorage.setItem('connectionPingTimeLeft', e.data.countdown.toString());
            }
        };
    };

    const resetTimer = () => {
        setTimeLeft(timerDuration);
        workerRef.current?.postMessage({ type: 'start', timeLeft: timerDuration });
    };

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / (60 * 1000));
        const seconds = Math.floor((ms % (60 * 1000)) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <span>
            {formatTime(timeLeft)}
        </span>
    );
};

