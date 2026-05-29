import cls from './MobileAccountPage.module.css'
import { useMask } from '@react-input/mask'
import { useEffect, useState } from 'react';
import {useAuth} from '../../../context/AuthContext'
import {useAuthModal} from '../../../context/AuthModalContext'
import { useRef } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MobileOrangePhoneIcon } from '../../../../public/assets/icons/MobileOrangePhoneIcon';
import { MobileOrangeWhatsAppIcon } from '../../../../public/assets/icons/MobileOrangeWhatsAppIcon';
import { useMediaQuery } from 'react-responsive';
import { Timer } from '../../../components/Timer';
import {BlackCloseIcon} from '../../../../public/assets/icons/BlackCloseIcon'
import { MobileCheckIcon } from '../../../../public/assets/icons/MobileCheckIcon';

export const MobileAccountPage = () =>{
    const navigate = useNavigate();



    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    const { 
        isAuthModalOpen, 
        closeAuthModal, 
        step, 
        setStep 
    } = useAuthModal();

    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);

    const code = otp.join('');

    const inputsRef = useRef([]);

    const phoneMask = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    // const [phone, setPhone] = useState('');
    // const [otp, setOtp] = useState(['', '', '', '']);
    // const [err, setErr] = useState(false)

    // const code = otp.join('');


    // useEffect(() => {
    //     if (code === '1234') {
    //         setErr(false)
    //         setIsAuth(true);
    //         navigate('/account');
    //         localStorage.setItem('reactCardLogin', 'true');
    //     } else if ((code.length == 4)&&(code!=='1234')){setErr(true)}        
    // }, [code]);


    // const [timer, setTimer] = useState(60);


    // useEffect(() => {
    //     if (step !== 'otp') return;

    //     setTimer(60);

    //     const interval = setInterval(() => {
    //     setTimer((prev) => {
    //         if (prev <= 1) {
    //             clearInterval(interval);
    //             return 0;
    //         }

    //         return prev - 1;
    //     });
    //     }, 1000);



    //     return () => clearInterval(interval);
    // }, [step]);

    // const inputsRef = useRef([]);

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
        if (code.length==0) setLoginError(false)
    };

    const [loginError, setLoginError] = useState(null)

    const handleLoginClick = async() =>{
        if (phone.length !== 18){
            setLoginError('Ошибка ввода телефона')
            return null
        } else{
            await login(phone);
        }
    }

    const {
        login, 
        loading, 
        status, 
        verify, 
        verifyLoading, 
        verifyError,
        clearError,
        verifyStatus, 
        profile, 
        profileLoading, 
        profileError, 
        profileStatus
    } = useLogin();


   
    useEffect(() => {
        if (!verifyStatus?.user) return;

        setOtp(['', '', '', '']);

        if (verifyStatus?.next_step === 'done') {
            setStep('user');
        }

        if (verifyStatus?.next_step === 'profile') {
            setStep('profile');
        }
    }, [verifyStatus]);

    useEffect(()=>{
        // console.log(verifyError)
    },[verifyError])

    useEffect(() => {
        console.log(profileStatus)
        if (profileStatus.next_step == 'done'){
            setStep('finish_registration')
        }
    }, [profileStatus]);


    useEffect(()=>{
        console.log('ACTUAL STATE',step);
    },[step]);

    const {pathname} = useLocation();

    const {fetchUser ,isAuth} = useAuth();
    useEffect(()=>{

    },[isAuth])

    console.log('isAuthMobilePage', isAuth)

    useEffect(() => {
        if (code.length === 4) {
            verify(phone, code);
        }
    }, [code]);

    const[errPhone, setErrPhone] = useState(false)

    useEffect(()=>{
        console.log(status)
    },[status])

    const nextStep = (phone) =>{
        if (phone.length!==18) 
            {
                setErrPhone(true); 
                return null 
            } 
        else{
            setStep('otp');
            handleLogin();
        }
    }    

    const handleLogin = async () => {
        await login(phone);
    };

    const [profileName, setProfileName] = useState('');

    const handleProfile = async() =>{
        await profile(profileName);
    }

    if (!isAuthModalOpen && !isMobile) return null;

    return(
        <div className={cls.mobileLoginPageWrapper}>
            <div className={cls.mobileLoginTitle}>
                <p>Войти в профиль</p>
            </div>
            {step == 'login'&&
            <div className={cls.accountLogin}>
                <div>
                    <p>Добро пожаловать</p>
                    <p>Введите номер телефона, чтобы войти или создать профиль</p>
                </div>
                <div>
                    <input 
                        placeholder='Номер телефона' 
                        ref={phoneMask} 
                        onChange={(e)=>{
                            setPhone(e.target.value); 
                            setErrPhone(null)
                            }
                        } 
                        value={phone}
                        className={errPhone?`${cls.errPhone}`: ""}
                    />
                    <button onClick={()=>nextStep(phone)}>
                        <p>Войти в профиль</p>
                    </button>
                </div>
            </div>}
            {step == 'otp' &&
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
                                    className={verifyError?`${cls.errInput}`: ""}
                                />
                            ))}
                        </div>
                        {verifyError && <p className={cls.errText}>Код указан неверно! Попробуйте заново.</p>}
                    </div>
                </div>
                <Timer />


            </div>
            }
            {step=='user' && 
            <div className={cls.mobileCreateProfile}>
                <p>С Возвращением!</p>
                <div className={cls.mobileInputWrapper}>
                    <button onClick={()=>{
                        closeAuthModal();
                        fetchUser();
                    }}>
                        <p>Перейти в профиль</p>
                    </button>
                </div>
            </div>
            }
            {step == 'profile' && 
            <div className={cls.mobileCreateProfile}>
                <p>Создаем ваш профиль</p>
                <p>Введите свое имя, чтобы закончить создание профиля</p>
                <div className={cls.mobileInputWrapper}>
                    <input 
                        type="text"
                        value={profileName}
                        onChange={(e)=>setProfileName(e.target.value)}
                    />
                    <button onClick={()=>{handleProfile();}}>
                        <p>Создать профиль</p>
                    </button>
                </div>
                <p>Нажимая на кнопку, я соглашаюсь с <span>правилами пользования и политикой конфиденциальности</span> торговой площадки.</p>

            </div>
            }
            {step=='finish_registration' && 
            <div className={cls.mobileCreatedUserProfile}>
                <div className={cls.mobileCreatedUserTop}>
                    <button>
                        <BlackCloseIcon / >
                    </button>
                </div>
                <div className={cls.mobileCreatedUserBottom}>
                    <div className={cls.mobileCreatedIcon}>
                        <MobileCheckIcon />
                    </div>
                    <p>Ваш профиль успешно создан</p>
                    <p>Вы сможете оформить свой заказ, уже прямо сейчас</p>
                    <button onClick={()=>navigate('/account')}>
                        <p>Продолжить</p>
                    </button>
                </div>
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
                        <MobileOrangePhoneIcon />
                        <p>Позвонить</p>
                    </a>
                    <a href="https://wa.me/77052941444" target='_blank'>
                        <MobileOrangeWhatsAppIcon />
                        <p>Написать в WhatsApp</p>
                    </a>
                </div>
                </>}
            </div>
        </div>
    )
}