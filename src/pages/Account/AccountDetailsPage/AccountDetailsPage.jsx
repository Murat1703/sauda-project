import cls from './AccountDetailsPage.module.css';
import { AccountTitle } from '../../../components/AccountLayout';
import { BreadCrumbs } from '../../../components/AccountLayout';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';

export const AccountDetailsPage = () =>{

    const {user} = useAuth();

    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    useEffect(()=>{
       setUserName(user?.user.name);
       setUserPhone(user?.user.phone)
    }, [])

    
    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    return(
        <>
        <div className={cls.accountDetailsPageWrapper}>
            <div className={cls.pageTop}>
                <div className={cls.breadCrumbsWrapper}>
                    <BreadCrumbs >Профиль</BreadCrumbs>
                    <BreadCrumbs >-</BreadCrumbs>
                    <BreadCrumbs >Мои данные</BreadCrumbs>
                </div>
                {isMobile && <Link to={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 5L5 12L12 19" stroke="#152429" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </Link>}
                <div className={cls.pageTitleWrapper}>
                    <AccountTitle>Мои данные</AccountTitle>
                </div>
                {isMobile && <div></div>}
            </div>
            <div className={cls.accountDetailsInputs}>
                <div className={cls.row}>
                    <div className={cls.accountItemInputWrapper}>
                        <p>Имя <span>*</span></p>
                        <input 
                            type="text" 
                            name='name' 
                            placeholder='Ваше имя'
                            value={userName}
                        />
                    </div>
                    <div className={cls.accountItemInputWrapper}>
                        <p>Фамилия</p>
                        <input 
                            type="text" 
                            name='surname' 
                            placeholder='Введите фамилию'
                        />
                    </div>
                    <div className={cls.accountItemInputWrapper}>
                        <p>Город</p>
                        <div className={cls.select}>
                            <p>Астана</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12.0006 13.1714L16.9504 8.22168L18.3646 9.63589L12.0006 15.9999L5.63672 9.63589L7.05093 8.22168L12.0006 13.1714Z" fill="#8F9596"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={cls.row}>
                    <div className={cls.accountItemInputWrapper}>
                        <p>Номер телефона <span>*</span></p>
                        <input 
                            type="text" 
                            name='phone' 
                            placeholder='+7'
                            value={userPhone}
                        />
                    </div>
                    <div className={cls.accountItemInputWrapper}>
                        <p>Эл. почта</p>
                        <input type="text" name='email' placeholder='Введите вашу почту'/>
                    </div>
                </div>
                <button className={cls.submitBtn}>
                    <p>Сохранить</p>
                </button>
            </div>
        </div>
        </>
    )
}