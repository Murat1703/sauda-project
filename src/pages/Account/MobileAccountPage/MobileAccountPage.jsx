import cls from './MobileAccountPage.module.css'
import { useMask } from '@react-input/mask'
import { useAuth } from '../../../hooks/useAuth.js';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const MobileAccountPage = () =>{
    const navigate = useNavigate();

    useEffect(()=>{
        isAuth && navigate('/account')
    },[])

    const {isAuth, setIsAuth } = useAuth();
    console.log(isAuth)


    const [step, setStep] = useState('login')

    const phoneMask = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [err, setErr] = useState(false)

    const code = otp.join('');


    useEffect(() => {
        if (code === '1234') {
            setErr(false)
            setIsAuth(true);
            navigate('/account');
            localStorage.setItem('reactCardLogin', 'true');
        } else if ((code.length == 4)&&(code!=='1234')){setErr(true)}
        
    }, [code]);


    const [timer, setTimer] = useState(60);


    useEffect(() => {
        if (step !== 'otp') return;

        setTimer(60);

        const interval = setInterval(() => {
        setTimer((prev) => {
            if (prev <= 1) {
                clearInterval(interval);
                return 0;
            }

            return prev - 1;
        });
        }, 1000);



        return () => clearInterval(interval);
    }, [step]);

    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, '');

        e.target.value = value;

        const newOtp = [...otp];
        newOtp[index] = value;  
        setOtp(newOtp);


        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
    };


    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
        if (code.length==0) setErr(false)
    };

    return(
        <div className={cls.mobileLoginPageWrapper}>
            <div className={cls.mobileLoginTitle}>
                <p>Войти в профиль</p>
            </div>
            {step == 'login'?
            <div className={cls.accountLogin}>
                <div>
                    <p>Добро пожаловать</p>
                    <p>Введите номер телефона, чтобы войти или создать профиль</p>
                </div>
                <div>
                    <input placeholder='Номер телефона' ref={phoneMask} onChange={(e)=>setPhone(e.target.value)} value={phone}/>
                    <button onClick={()=>setStep('otp')}>
                        <p>Войти в профиль</p>
                    </button>
                </div>
            </div> : 
            <div className={cls.authOtp}>
                <div className={cls.authOtpTop}>
                    <div className={cls.authOtpContent}>
                        <div className={cls.authOtpTitleBlock}>
                                    <h4>Потвердите номер</h4>
                                    <p>На указанный номер телефона <span>{phone}</span> выслан СМС-код для проверки номера<br/>Укажите его ниже</p>
                                    <a onClick={()=>setStep('login')}>
                                        Изменить номер
                                    </a>

                        </div>
                        <div className={cls.authOtpCodeWrapper}>
                            {[0,1,2,3].map((item, index) => (
                                <input
                                    key={item}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    placeholder='0'
                                    ref={(el) => inputsRef.current[index] = el}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className={err?`${cls.errInput}`: ""}
                                />
                            ))}
                        </div>
                        {err && <p className={cls.errText}>Код указан неверно! Попробуйте заново.</p>}                

                    </div>
                </div>
                {timer !== 0?
                <p>Переотправить СМС-код можно через 00:{timer<10 && "0"}{timer}</p> :
                <button onClick={()=>{setTimer(60);}}>
                    <p>Отправить СМС заново</p>
                </button>
                }


            </div>
            }
            <div className={cls.supportBlock}>
                {step == 'login' && <>
                <div>
                    <hr />
                    <p>Помощь и консультация</p>
                    <hr />
                </div>
                <div>
                    <a href="tel:+77052941444" target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5.58685 5.90211C6.05085 6.86853 6.68338 7.77429 7.48443 8.57534C8.28548 9.37639 9.19124 10.0089 10.1577 10.4729C10.2408 10.5128 10.2823 10.5328 10.3349 10.5481C10.5218 10.6026 10.7513 10.5635 10.9096 10.4501C10.9542 10.4182 10.9923 10.3801 11.0685 10.3039C11.3016 10.0708 11.4181 9.95431 11.5353 9.87812C11.9772 9.59079 12.5469 9.59079 12.9889 9.87812C13.106 9.95431 13.2226 10.0708 13.4556 10.3039L13.5856 10.4338C13.9399 10.7881 14.117 10.9653 14.2132 11.1555C14.4046 11.5339 14.4046 11.9807 14.2132 12.3591C14.117 12.5494 13.9399 12.7265 13.5856 13.0808L13.4805 13.1859C13.1274 13.539 12.9508 13.7155 12.7108 13.8504C12.4445 14 12.0308 14.1075 11.7253 14.1066C11.45 14.1058 11.2619 14.0524 10.8856 13.9456C8.86333 13.3716 6.95509 12.2886 5.36311 10.6967C3.77112 9.10467 2.68814 7.19643 2.11416 5.17417C2.00735 4.79787 1.95395 4.60972 1.95313 4.33442C1.95222 4.02894 2.0598 3.61528 2.20941 3.34894C2.34424 3.10892 2.52078 2.93238 2.87386 2.5793L2.97895 2.47421C3.33325 2.11992 3.5104 1.94277 3.70065 1.84654C4.07903 1.65516 4.52587 1.65516 4.90424 1.84654C5.0945 1.94277 5.27164 2.11991 5.62594 2.47421L5.75585 2.60412C5.98892 2.83719 6.10546 2.95373 6.18165 3.07091C6.46898 3.51284 6.46898 4.08256 6.18165 4.52449C6.10546 4.64167 5.98892 4.75821 5.75585 4.99128C5.67964 5.06749 5.64154 5.10559 5.60965 5.15013C5.49631 5.30842 5.45717 5.53793 5.51165 5.72483C5.52698 5.77742 5.54694 5.81899 5.58685 5.90211Z" stroke="#FF4D00" stroke-width="1.48" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p>Позвонить</p>
                    </a>
                    <a href="https://wa.me/77052941444" target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <g clip-path="url(#clip0_675_19136)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7715 2.1842C11.3668 0.777869 9.49872 0.00301838 7.5085 0.00219727C3.40752 0.00219727 0.0699063 3.33972 0.0682641 7.4418C0.067701 8.75312 0.410246 10.0332 1.06137 11.1615L0.00585938 15.0169L3.95005 13.9822C5.03683 14.5751 6.26036 14.8875 7.50547 14.8878H7.50862C11.6091 14.8878 14.9471 11.55 14.9487 7.44776C14.9495 5.45968 14.1763 3.59047 12.7715 2.1842ZM7.5085 13.6313H7.50592C6.39633 13.6308 5.30808 13.3326 4.35847 12.7693L4.13278 12.6352L1.79223 13.2492L2.41693 10.9672L2.26984 10.7333C1.65081 9.74868 1.32391 8.61069 1.32448 7.44224C1.32577 4.0327 4.09996 1.25878 7.51099 1.25878C9.16274 1.25932 10.7154 1.90338 11.8829 3.07227C13.0505 4.24117 13.6931 5.79488 13.6925 7.44729C13.6911 10.8571 10.9171 13.6313 7.5085 13.6313ZM10.9005 8.99978C10.7147 8.90669 9.80065 8.4571 9.63019 8.39497C9.45991 8.33292 9.33583 8.30202 9.21203 8.48806C9.08804 8.6741 8.73182 9.0929 8.62331 9.21688C8.51481 9.34099 8.40649 9.35654 8.22055 9.26345C8.03462 9.17043 7.43563 8.97404 6.72551 8.34071C6.1729 7.84776 5.79983 7.23898 5.69133 7.05297C5.58301 6.86674 5.69039 6.77583 5.77287 6.67354C5.97412 6.42364 6.17564 6.16163 6.2376 6.03765C6.29963 5.91354 6.26857 5.80497 6.22202 5.71195C6.17564 5.61892 5.80386 4.70387 5.64898 4.33153C5.49796 3.96919 5.34482 4.0181 5.23063 4.01245C5.12232 4.00703 4.99833 4.00593 4.87434 4.00593C4.75042 4.00593 4.54899 4.05238 4.37855 4.23861C4.20818 4.42474 3.72799 4.87443 3.72799 5.78948C3.72799 6.70453 4.39413 7.5885 4.48706 7.71258C4.57996 7.83668 5.798 9.71441 7.66282 10.5196C8.10636 10.7113 8.45259 10.8256 8.72267 10.9113C9.16804 11.0528 9.5732 11.0328 9.89358 10.9849C10.2508 10.9315 10.9934 10.5352 11.1484 10.1009C11.3033 9.66669 11.3033 9.29451 11.2567 9.21688C11.2104 9.13937 11.0864 9.0929 10.9005 8.99978Z" fill="#FF4D00"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_675_19136">
                            <rect width="16" height="16.02" fill="white"/>
                            </clipPath>
                        </defs>
                        </svg>
                        <p>Написать в WhatsApp</p>
                    </a>
                </div>
                </>}
            </div>
        </div>
    )
}