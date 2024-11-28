(() => {
    let timer: NodeJS.Timeout | null = null;
    let countdown: number;

    self.onmessage = (e) => {
        if (e.data.type === 'start') {
            countdown = e.data.timeLeft;

            if (timer) clearInterval(timer);
            timer = setInterval(() => {
                countdown -= 1000;
                self.postMessage({ countdown });

                if (countdown <= 0) {
                    clearInterval(timer);
                    self.postMessage({ type: 'timeout' });
                }
            }, 1000);
        }

        if (e.data.type === 'reset') {
            countdown = e.data.timeLeft;
            if (timer) clearInterval(timer);
            timer = setInterval(() => {
                countdown -= 1000;
                self.postMessage({ countdown });

                if (countdown <= 0) {
                    clearInterval(timer);
                    self.postMessage({ type: 'timeout' });
                }
            }, 1000);
        }
    };
})();
