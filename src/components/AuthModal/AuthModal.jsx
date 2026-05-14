import cls from './AuthModal.module.css'
import { useAuthModal } from '../../hooks/useAuthModal.js'
import { useMask } from '@react-input/mask'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useAuth } from '../../hooks/useAuth.js';

export const AuthModal = ({onClose}) =>{

  const { isAuth, setIsAuth } = useAuth();

  const { isAuthModalOpen, closeAuthModal, step, setStep } = useAuthModal();

  if (!isAuthModalOpen) return null;

  console.log(step)

    const phoneMask = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);

    const code = otp.join('');

    useEffect(() => {
        if (code === '1234') {
            setIsAuth(true);
            localStorage.setItem('reactCardLogin', 'true');
            closeAuthModal();
        }
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
    };


    return(
        <div className={cls.authModalWrapper} onClick={closeAuthModal}>
            <div className={cls.authModalContent} onClick={(e)=>e.stopPropagation()}>
                <button className={cls.closeModalBtn} onClick={closeAuthModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M27 9L9 27M9 9L27 27" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                {step == 'login' && 
                    <div className={cls.authLogin}>
                        <div className={cls.authLoginTop}>
                            <div>
                                <h4>Войти или создать профиль</h4>
                                <p>Введите номер телефона чтобы войти</p>
                            </div>
                            <div className={cls.inputWrapper}>
                                <input 
                                    type="text" 
                                    placeholder='+7()' 
                                    ref={phoneMask}
                                    value={phone}
                                    onChange={(e)=>setPhone(e.target.value)}
                                />
                                <button onClick={()=>setStep('otp')}>
                                    <p>Войти в кабинет</p>
                                </button>
                            </div>
                        </div>
                        <p>Нажимая на кнопку, я соглашаюсь с правилами пользования и политикой конфиденциальности торговой площадки</p>
                    </div>
                }
                {step == 'otp' &&
                    <div className={cls.authOtp}>
                        <div className={cls.authOtpTop}>
                            <div className={cls.authOtpContent}>
                                <div className={cls.authOtpTitleBlock}>
                                    <h4>Потвердите номер</h4>
                                    <p>На указанный номер телефона <span>{phone}</span> выслан СМС-код для проверки номера<br/>Укажите его ниже</p>
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
                                        />
                                    ))}
                                </div>
                            </div>
                            <p>Переотправить СМС-код можно через 00:{timer<10 && "0"}{timer}</p>
                        </div>

                        <a href={()=>{
                            
                        }} onClick={()=>setStep('login')}>
                            Изменить номер
                        </a>
                    </div>
                }

            </div>
        </div>
    )
}