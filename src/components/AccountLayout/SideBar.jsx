import cls from './SideBar.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders.js';
import { useFavorites } from '../../hooks/useFavorites.js';


export const SideBar = ({isHeaderProfile, setShowProfileMenu, ordersCount, isMobile, onMobileLogout}) => {
    const location = useLocation();

    const {favorites} = useFavorites();

    const navigate = useNavigate();

    const { isAuth, setIsAuth } = useAuth();

    const [link, setLink] = useState('');

    const getLinkActiveLink = () => {
        switch (location.pathname) {
            case '/account/orders':
                return setLink('orders');
            case '/account/favorites':
                return setLink('favorites');
            case '/account/reviews':
                return setLink('reviews');
            case '/account/profile':
                return setLink('profile');
        }
    };

    useEffect(()=>{
        getLinkActiveLink()
    },
    [location.pathname])

    const hideProfileMenu = () =>{
        setShowProfileMenu(false);
    }


    const handleLogOut = () =>{
        navigate('/');
        setIsAuth(false);
        localStorage.removeItem('reactCardLogin');
        setShowProfileMenu(false);
    }

    console.log('ordersCount = ', ordersCount)

    return (
        <aside className={cls.sideBar}>
            {isHeaderProfile && (
                <div className={cls.profileShortInfo}>
                    <div className={cls.profileImg}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z" fill="white"/>
                            <path d="M3.00065 20.1992C3.38826 15.4265 7.26191 13 11.9833 13C16.7712 13 20.7049 15.2932 20.9979 20.2C21.0096 20.3955 20.9979 21 20.2467 21C16.5411 21 11.0347 21 3.7275 21C3.47671 21 2.97954 20.4592 3.00065 20.1992Z" fill="white"/>
                        </svg>
                    </div>
                    <div className={cls.profileText}>
                        <p className={cls.profileName}>John Doe</p>
                        <span className={cls.profileType}>Физическое лицо</span>
                    </div>
                </div>
            )}
            <ul>
                <li 
                    className={link === 'orders' ? cls.active : ''} onClick= {isHeaderProfile ? hideProfileMenu : null}
                >
                <NavLink
                    to="/account/orders"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20.5 7.27771L12 11.9999M12 11.9999L3.49997 7.27771M12 11.9999L12 21.5M21 16.0585V7.94141C21 7.59876 21 7.42744 20.9495 7.27464C20.9049 7.13947 20.8318 7.01539 20.7354 6.9107C20.6263 6.79236 20.4766 6.70916 20.177 6.54276L12.777 2.43164C12.4934 2.27409 12.3516 2.19531 12.2015 2.16442C12.0685 2.13709 11.9315 2.13709 11.7986 2.16442C11.6484 2.19531 11.5066 2.27409 11.223 2.43165L3.82297 6.54276C3.52345 6.70916 3.37369 6.79236 3.26463 6.9107C3.16816 7.01539 3.09515 7.13947 3.05048 7.27465C3 7.42745 3 7.59877 3 7.94141V16.0585C3 16.4012 3 16.5725 3.05048 16.7253C3.09515 16.8605 3.16816 16.9845 3.26463 17.0892C3.37369 17.2076 3.52345 17.2908 3.82297 17.4572L11.223 21.5683C11.5066 21.7258 11.6484 21.8046 11.7986 21.8355C11.9315 21.8628 12.0685 21.8628 12.2015 21.8355C12.3516 21.8046 12.4934 21.7258 12.777 21.5683L20.177 17.4572C20.4766 17.2908 20.6263 17.2076 20.7354 17.0892C20.8318 16.9845 20.9049 16.8605 20.9495 16.7253C21 16.5725 21 16.4012 21 16.0585Z" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 9.5L7.5 4.5" stroke="#152429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>Мои заказы</p>
                    <span>{ordersCount || 0}</span>
                </NavLink>
                </li>

                <li className={link === 'favorites' ? cls.active : ''} onClick= {isHeaderProfile ? hideProfileMenu : null}>
                <NavLink
                    to="/account/favorites"
                    className={({ isActive }) => isActive ? cls.active : ''}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>Избранное</p>
                    <span>{favorites?.length || null}</span>
                </NavLink>
                </li>

                <li className={link === 'reviews' ? cls.active : ''} onClick= {isHeaderProfile ? hideProfileMenu : null} >
                <NavLink
                    to="/account/reviews"
                    className={({ isActive }) => isActive ? cls.active : ''}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14.012 7.23109C14.294 7.96432 14.435 8.33093 14.6542 8.63931C14.8486 8.91262 15.0874 9.15141 15.3607 9.34575C15.6691 9.56503 16.0357 9.70603 16.7689 9.98804L22 12L16.7689 14.012C16.0357 14.294 15.6691 14.435 15.3607 14.6542C15.0874 14.8486 14.8486 15.0874 14.6542 15.3607C14.435 15.6691 14.294 16.0357 14.012 16.7689L12 22L9.98804 16.7689C9.70603 16.0357 9.56503 15.6691 9.34575 15.3607C9.15141 15.0874 8.91262 14.8486 8.63931 14.6542C8.33093 14.435 7.96432 14.294 7.23109 14.012L2 12L7.23108 9.98804C7.96431 9.70603 8.33093 9.56503 8.63931 9.34575C8.91262 9.15141 9.15141 8.91262 9.34575 8.63931C9.56503 8.33093 9.70603 7.96431 9.98804 7.23108L12 2Z" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>Отзывы</p>
                    <span></span>
                </NavLink>
                </li>

                <li className={link === 'profile' ? cls.active : ''} onClick= {isHeaderProfile ? hideProfileMenu : null}>
                <NavLink
                    to="/account/profile"
                    className={({ isActive }) => isActive ? cls.active : ''}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>Мои данные</p>
                    <span></span>
                </NavLink>
                </li >
                {isHeaderProfile && (
                    <li
                        onClick={handleLogOut}
                    >
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M16 7L21 12L16 17M21 12H9M12 17C12 17.93 12 18.395 11.8978 18.7765C11.6204 19.8117 10.8117 20.6204 9.77646 20.8978C9.39496 21 8.92997 21 8 21H7.5C6.10218 21 5.40326 21 4.85195 20.7716C4.11687 20.4672 3.53284 19.8831 3.22836 19.1481C3 18.5967 3 17.8978 3 16.5V7.5C3 6.10217 3 5.40326 3.22836 4.85195C3.53284 4.11687 4.11687 3.53284 4.85195 3.22836C5.40326 3 6.10218 3 7.5 3H8C8.92997 3 9.39496 3 9.77646 3.10222C10.8117 3.37962 11.6204 4.18827 11.8978 5.22354C12 5.60504 12 6.07003 12 7" stroke="#152429" strokeWidth="1.62" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p>Выйти</p>
                        </a>
                    </li>
                    )
                }
                {isMobile && <li onClick={onMobileLogout}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M16 7L21 12L16 17M21 12H9M12 17C12 17.93 12 18.395 11.8978 18.7765C11.6204 19.8117 10.8117 20.6204 9.77646 20.8978C9.39496 21 8.92997 21 8 21H7.5C6.10218 21 5.40326 21 4.85195 20.7716C4.11687 20.4672 3.53284 19.8831 3.22836 19.1481C3 18.5967 3 17.8978 3 16.5V7.5C3 6.10217 3 5.40326 3.22836 4.85195C3.53284 4.11687 4.11687 3.53284 4.85195 3.22836C5.40326 3 6.10218 3 7.5 3H8C8.92997 3 9.39496 3 9.77646 3.10222C10.8117 3.37962 11.6204 4.18827 11.8978 5.22354C12 5.60504 12 6.07003 12 7" stroke="#152429" strokeWidth="1.62" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p>Выйти</p>
                        </a>
                </li>}
                
            </ul>
        </aside>
    );
};