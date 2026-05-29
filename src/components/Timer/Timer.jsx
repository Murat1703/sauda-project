import { useState, useEffect } from "react"

export const Timer = () =>{

    const [timer, setTimer] = useState(60);
    const [running, setRunning] = useState(true);

    useEffect(()=>{

        if (!running) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setRunning(false)
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);

    },[running])

    const reLoadTimer = () =>{
        if (timer==0 ){
        setTimer(60);
        setRunning(true);}
    }

    return(
        <p>
            Переотправить СМС-код можно через{" "}
                {timer === 0 ? (
                    <button onClick={reLoadTimer}>
                    Отправить код заново
                    </button>
                ) : (
                    `00:${String(timer).padStart(2, '0')}`
                )}
        </p>
    )
}