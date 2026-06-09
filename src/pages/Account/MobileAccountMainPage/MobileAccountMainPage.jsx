import cls from './MainAccountMainPage.module.css'
import { SideBar } from '../../../components/AccountLayout'
import { useState, useEffect } from 'react'
import { useOrders } from '../../../hooks/useOrders'
import { useMediaQuery } from 'react-responsive'
import { MobileLogoutModal } from '../../../components/MobileLogoutModal'
import { useAuth } from '../../../context/AuthContext'
import { AccountProfileImageIcon } from '../../../../public/assets/icons/AccountProdileImageIcon'
import { useOrdersStore } from '../../../stores/useOrdersStore'

export const MainAccountMainPage = () =>{


    const {user, isAuth} = useAuth();

    console.log(user)

    const [link, setLink] = useState('')

    const {orders, loadingOrders, loadOrders} = useOrdersStore();

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
                        <AccountProfileImageIcon />
                    </div>
                    <div>
                        <p>{user?.user.name}</p>
                        <span>{user?.user.profile_type} </span>
                    </div>
                </div>
            </div>
            <div className={cls.sideBarWrapper}>
                <SideBar 
                    setLink={setLink} 
                    link={link} 
                    ordersCount={orders?.data?.length || 0} 
                    isMobile={isMobile} 
                    onMobileLogout={mobileLogoutHandler}
                /> 
            </div>

        </div>        }
        {mobileLogout && <MobileLogoutModal onClose={closeMobileModalHandler}/>}

        </>
    )
}