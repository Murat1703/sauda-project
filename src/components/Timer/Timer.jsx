import { useState, useEffect } from "react"
import cls from './Timer.module.css'

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
        <div>
            Переотправить СМС-код можно через{" "}
                {timer === 0 ? (
                    <button className={cls.timerBtn} onClick={reLoadTimer}>
                        <p>Отправить код заново</p>
                    </button>
                ) : (
                    `00:${String(timer).padStart(2, '0')}`
                )}
        </div>
    )
}