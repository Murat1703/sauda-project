import cls from './MainAccountMainPage.module.css'
import { SideBar } from '../../../components/AccountLayout'
import { useState, useEffect } from 'react'
import { useOrders } from '../../../hooks/useOrders'
import { useMediaQuery } from 'react-responsive'
import { MobileLogoutModal } from '../../../components/MobileLogoutModal'
import { useAuth } from '../../../context/AuthContext'

export const MainAccountMainPage = () =>{


    const {user, isAuth} = useAuth();

    console.log(user)

    const [link, setLink] = useState('')

    const {orders, loadingOrders, loadOrders} = useOrders();

    useEffect(()=>{
        loadOrders()
    },[]);

    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    const [mobileLogout, setMobileLogout] = useState(false)

    const mobileLogoutHandler = () =>{
        setMobileLogout(true)
    }
    const closeMobileModalHandler = () =>{
        setMobileLogout(false)
    }

    return(
        <>
        {isAuth &&
        <div className={cls.mobileAccountMainPage}>
            <div className={cls.mobileAccountTitleBlock}>
                <p>Мой профиль</p>
            </div>
            <div className={cls.mobileAccountInfoBlock}>
                <div className={cls.mobileAccountNameBlock}>
                    <div className={cls.icon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z" fill="white"/>
                            <path d="M3.00065 20.1992C3.38826 15.4265 7.26191 13 11.9833 13C16.7712 13 20.7049 15.2932 20.9979 20.2C21.0096 20.3955 20.9979 21 20.2467 21C16.5411 21 11.0347 21 3.7275 21C3.47671 21 2.97954 20.4592 3.00065 20.1992Z" fill="white"/>
                            </svg>
                    </div>
                    <div>
                        <p>{user?.user.name}</p>
                        <span>{user?.user.profile_type} </span>
                    </div>
                </div>
            </div>
            <div className={cls.sideBarWrapper}>
                <SideBar setLink={setLink} link={link} ordersCount={orders?.length || 0} isMobile={isMobile} onMobileLogout={mobileLogoutHandler}/> 
            </div>

        </div>        }
        {mobileLogout && <MobileLogoutModal onClose={closeMobileModalHandler}/>}

        </>
    )
}