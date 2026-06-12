import cls from './AuthModal.module.css'
import { useMask } from '@react-input/mask'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useAuthModal } from '../../context/AuthModalContext.jsx'
import { useMediaQuery } from 'react-responsive';
import { useLogin } from '../../hooks/useLogin.js';
import { Timer } from '../Timer';
import { MobileCheckIcon } from '../../../public/assets/icons/MobileCheckIcon.jsx';
import { MobileOrangePhoneIcon } from '../../../public/assets/icons/MobileOrangePhoneIcon.jsx';
import { MobileOrangeWhatsAppIcon } from '../../../public/assets/icons/MobileOrangeWhatsAppIcon.jsx';
import { Link } from 'react-router-dom';
import { CloseIconDesktop } from '../../../public/assets/icons/CloseIconDesktop.jsx';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore.js';

export const AuthModal = ({next}) =>{

    console.log(next);

    const {pathname} = useLocation();

    const phoneMask = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    const {fetchUser} = useAuthStore();

    const { isAuthModalOpen, closeAuthModal, step, setStep, newOrderPhone } = useAuthModal();

    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);

    const code = otp.join('');

    const inputsRef = useRef([]);

    const handleChange = async(e, index) => {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
        const newOtp = [...otp];
        newOtp[index] = value;  
        setOtp(newOtp);
        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
        const fullCode = newOtp.join('');
        if (fullCode.length === 4 && !verifyLoading) {
            if (newOrderPhone!==null){
                await verify(newOrderPhone, fullCode);
            } else{
                await verify(phone, fullCode);
            }
            
        }

        // clearError()
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const isMobile = useMediaQuery({
        maxWidth: 768
    })

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
        console.log(verifyError)
    },
    [verifyError])

    useEffect(() => {
        console.log(profileStatus)
        if (profileStatus.next_step == 'done'){
            setStep('finish_registration')
        }
    }, [profileStatus]);


    useEffect(()=>{
        // console.log('ACTUAL STATE',step)
    },[step])

    useEffect(()=>{

    },[phone])

    const[errPhone, setErrPhone] = useState(null)

    useEffect(()=>{
        // console.log(status)
    },[status])


    const nextStep = (phone) =>{
        validate(phone);
    }    

    const kzCodes = [
        "700", "701", "702",
        "705", "706", "707", "708",
        "747",
        "771",
        "775", "776", "777", "778",
    ];


    const validate = async(phone) =>{
        let digits = phone.replace(/\D/g, "");
        const code = digits.slice(1,4)
        if (!kzCodes.includes(code))
            {
                setErrPhone('Номер не принадлежит сотовому оператору')
                return
            }
        if (digits.length < 11) {            
            setErrPhone('Проверьте длину введенного номера');
            return
        }
        if ((digits.length==11) && !errPhone) {
            const validNum = `+`+digits;
            console.log(validNum);
            setStep('otp');
            await login(validNum)
        }

    }


    const [profileName, setProfileName] = useState('');

    const handleProfile = async() =>{
        await profile(profileName);
    }


    if (!isAuthModalOpen) return null;


    return(
    (isAuthModalOpen) &&
        <div 
            className={cls.authModalWrapper} 
            onClick={(e)=>{
            if (e.target === e.currentTarget ){
                closeAuthModal();
            }}}
        >
            {isMobile && 
            <div className={cls.mobileTitle}>
                <p>Войти в профиль</p>       
            </div>
            }
            <div 
                className={cls.authModalContent} 
                onClick={(e)=>e.stopPropagation()}
            >
                <button 
                    className={cls.closeModalBtn} 
                    onClick={closeAuthModal}
                >
                   <CloseIconDesktop />
                </button>
                {(step == 'login') && 
                    <div className={cls.authLogin}>
                        <div className={cls.authLoginTop}>
                            <div>
                                <h4>{!isMobile ?`Войти или создать профиль`:`Добро пожаловать` }</h4>
                                <p>Введите номер телефона чтобы войти</p>
                            </div>
                            <div className={`${cls.inputWrapper} ${errPhone? cls.error: ""}`}>
                                <input 
                                    type="text" 
                                    placeholder='+7()' 
                                    ref={phoneMask}
                                    value={phone}
                                    onChange={(e)=>{
                                        const value = e.target.value;
                                        setPhone(value); 
                                        setErrPhone(false)
                                    }}
                                />
                                {errPhone && <p className={cls.phoneError}>{errPhone}</p>}
                                <button onClick={()=>
                                    {
                                        validate(phone);
                                    }
                                }
                                >
                                    <p>Войти в кабинет</p>
                                </button>
                            </div>
                        </div>
                        <p>Нажимая на кнопку, я соглашаюсь <Link to={`/privacy-police`} onClick={()=>closeAuthModal()}>с правилами пользования и политикой конфиденциальности</Link> торговой площадки</p>
                    </div>
                }
                {( step == 'otp') &&
                    <div className={cls.authOtp}>
                        <div className={cls.authOtpTop}>
                            <div className={cls.authOtpContent}>
                                <div className={cls.authOtpTitleBlock}>
                                    <h4>Потвердите номер</h4>
                                    <p>На указанный номер телефона<span>{newOrderPhone ? newOrderPhone : phone}</span> выслан СМС-код для проверки номера<br/>Укажите его ниже</p>
                                    {isMobile &&
                                    <a onClick={()=>setStep('login')}>
                                        Изменить номер
                                    </a>
                                    }
                                </div>
                                <div className={cls.authOtpCodeWrapper}>
                                    {[0,1,2,3].map((item, index) => (
                                        <input
                                            key={item}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            className={verifyError?`${cls.errorOTP}`: ""}
                                            value={otp[index]}
                                            placeholder='0'
                                            ref={(el) => inputsRef.current[index] = el}
                                            onChange={(e) => 
                                                handleChange(e, index)
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, index)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                            {verifyError &&
                            <p className={cls.error}>{verifyError}</p>}
                            <Timer />
                        </div>
                        {!isMobile &&
                        <a onClick={()=>setStep('login')}>
                            Изменить номер
                        </a>
                        }
                    </div>
                }
                {(step == 'profile') && 
                    <div className={cls.authModalProfile}>
                        <div className={cls.authModalProfileTop}>
                            <h4>Создаем ваш профиль</h4>
                            <p>Введите свое имя, чтобы закончить создание профиль</p>
                        </div>
                        <div className={cls.authModalProfileBottom}>
                            <div className={cls.authModalProfileInputWrapper}>
                                <p>Ваше имя</p>
                                <input 
                                    type="text" 
                                    placeholder='Введите ваше имя'
                                    value={profileName}
                                    onChange={(e)=>setProfileName(e.target.value)}
                                />
                                <button
                                    onClick={
                                        ()=>{
                                        handleProfile(); 
                                        }
                                    }
                                >
                                    <p>Создать профиль</p>
                                </button>
                            </div>
                            <p>Нажимая на кнопку, я соглашаюсь с <Link 
                                to={`/privacy-police` }
                                onClick={()=>closeAuthModal()}
                            >правилами пользования и политикой конфиденциальности</Link> торговой площадки</p>
                        </div>
                    </div>
                }
                {(step == 'user') && 
                    <div className={cls.authModalUser}>
                        <div className={cls.authModalUserTop}>
                            <div>
                                <MobileCheckIcon />
                            </div>
                            <div>
                                <h4>С возращением!</h4>
                                <p>Расширяем линейку товаров в SAUDA ради этого!</p>
                            </div>
                        </div>
                        <div className={cls.authModalUserBottom}>
                            <button onClick={()=>{closeAuthModal();}}>
                                <p>Продолжить</p>
                            </button>
                        </div>
                    </div>
                }
                {(step == 'finish_registration') && 
                    <div className={cls.finishRegistration}>
                        <div className={cls.finishRegistrationTop}>
                            <div className={cls.finishRegistrationIcon}>
                                <MobileCheckIcon />
                            </div>
                            <div>
                                <h4>Ваш профиль успешно создан</h4>
                                <p>Вы сможете оформить свой заказ, уже прямо сейчас</p>
                            </div>
                        </div>
                        <button onClick={()=>{closeAuthModal(); }}>
                            <p>Продолжить</p>
                        </button>
                    </div>                   
                }

            </div>
            {isMobile && 
            <div className={cls.supportText}>
                <div className={cls.suportTextTop}>
                    <hr />
                    <p>Помощь и консультация</p>
                    <hr />
                </div>
                <div className={cls.supportLinks}>
                    <a href="tel:+77771231212" target="_blank">
                        <MobileOrangePhoneIcon />
                        <p>Позвонить</p>
                    </a>
                    <a href="https://wa.me/77052941444" target="_blank">
                        <MobileOrangeWhatsAppIcon/>
                        <p>Написать в WhatsApp</p>
                    </a>
                </div>
            </div>
            }
        </div>
    )
}