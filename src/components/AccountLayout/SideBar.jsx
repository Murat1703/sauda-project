import cls from './SideBar.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders.js';
import { useFavoritesStore } from '../../stores/useFavoritesStore.js';
import { AccountOrdersIcon } from '../../../public/assets/icons/AccountOrdersIcon.jsx';
import { MobileControlPanelAccount } from '../../../public/assets/icons/MobileControlPanelAccount.jsx';
import { AccountProfileImageIcon } from '../../../public/assets/icons/AccountProdileImageIcon.jsx';
import { AccountFavoritesIcon } from '../../../public/assets/icons/AccountFavoritesIcon.jsx';
import { AccountReviewsIcon } from '../../../public/assets/icons/AccountReviewsIcon.jsx';
import { AccountInfoIcon } from '../../../public/assets/icons/AccountInfoIcon.jsx';
import { AccountLogOutIcon } from '../../../public/assets/icons/AccountLogOutIcon.jsx';
import {Loader} from '../Loader'

export const SideBar = ({isHeaderProfile, setShowProfileMenu, ordersCount, isMobile, onMobileLogout, reviews}) => {
    const location = useLocation();

    const {favoritesList, loadingFavoritesList, clearFavoritesList} = useFavoritesStore();

    const navigate = useNavigate();

    const {user, logout, fetchUser } = useAuth();

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
    }, [location.pathname])

    const hideProfileMenu = () =>{
        setShowProfileMenu(false);
    }

    const handleLogOut = () =>{
        navigate('/');
        logout();
        clearFavoritesList();
        localStorage.removeItem('reactCardLogin');
        localStorage.removeItem('token');
        localStorage.removeItem('wishlist')
        setShowProfileMenu(false);
    }

    return (
        <>
        {loadingFavoritesList && <Loader />}
        <aside className={cls.sideBar}>
            {isHeaderProfile && (
                <div className={cls.profileShortInfo}>
                    <div className={cls.profileImg}>
                        <AccountProfileImageIcon />
                    </div>
                    <div className={cls.profileText}>
                        <p className={cls.profileName}>{user?.user.name}</p>
                        <span className={cls.profileType}>{user?.user.profile_type}</span>
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
                    <AccountOrdersIcon />
                    <p>Мои заказы</p>
                    <span>{ordersCount || 0}</span>
                </NavLink>
                </li>

                <li className={link === 'favorites' ? cls.active : ''} onClick= {isHeaderProfile ? hideProfileMenu : null}>
                <NavLink
                    to="/account/favorites"
                    className={({ isActive }) => isActive ? cls.active : ''}
                >
                    <AccountFavoritesIcon />
                    <p>Избранное</p>
                    <span>{favoritesList?.length || null}</span>
                </NavLink>
                </li>

                <li className={link === 'reviews' ? cls.active : ''} onClick= {isHeaderProfile ? hideProfileMenu : null} >
                <NavLink
                    to="/account/reviews"
                    className={({ isActive }) => isActive ? cls.active : ''}
                >
                    <AccountReviewsIcon />
                    <p>Отзывы</p>
                    <span>{reviews?.data?.length}</span>
                </NavLink>
                </li>

                <li className={link === 'profile' ? cls.active : ''} onClick= {isHeaderProfile ? hideProfileMenu : null}>
                <NavLink
                    to="/account/profile"
                    className={({ isActive }) => isActive ? cls.active : ''}
                >
                    <AccountInfoIcon />
                    <p>Мои данные</p>
                    <span></span>
                </NavLink>
                </li >
                {isHeaderProfile && (
                    <li
                        onClick={handleLogOut}
                    >
                        <a>
                            <AccountLogOutIcon />
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
        </>
    );
};