import cls from './Header.module.css'
import logoHeader from '../../../public/assets/images/logo_header.svg'
import { useEffect, useState } from 'react'
import { ControlBtn } from '../Button';
import { CatalogMenu } from '../CatalogMenu';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../context/AuthContext.jsx';
import { useAuthModal } from '../../context/AuthModalContext.jsx'
import { SideBar } from '../AccountLayout/SideBar.jsx';
import { useOrders } from '../../hooks/useOrders.js';
import { CounterBadge } from '../CounterBadge';
import { useCart } from '../../stores/useCart.js';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CatalogBtnIcon } from '../../../public/assets/icons/CatalogBtnIcon.jsx';
import { SearchIcon } from '../../../public/assets/icons/SearchIcon.jsx';
import { FavoriteHeaderIcon } from '../../../public/assets/icons/FavoriteHeaderIcon.jsx';
import { CartBtnIcon } from '../../../public/assets/icons/CartBtnIcon.jsx';
import { LoginBtnIcon } from '../../../public/assets/icons/LoginBtnIcon.jsx';
import { MobileControlPanelHome } from '../../../public/assets/icons/MobileControlPanelHome.jsx';
import { MobileControlPanelCatalog } from '../../../public/assets/icons/MobileControlPanelCatalog.jsx';
import { MobileControlPanelFavorites } from '../../../public/assets/icons/MobileControlPanelFavorites.jsx';
import { MobileControlPanelCart } from '../../../public/assets/icons/MobileControlPanelCart.jsx';
import { MobileControlPanelAccount } from '../../../public/assets/icons/MobileControlPanelAccount.jsx';
import { Search } from '../Search';
import { useLanguage } from '../../stores/useLanguage.js';
import { useFavoritesStore } from '../../stores/useFavoritesStore.js';

export const Header = ({ordersCount}) =>{

    const[activeLang, setActiveLang] = useState('ru');
    const{lang, setLang} = useLanguage();
    
    const[isOpen, setIsOpen] = useState(false);

    const handleToMenu = () =>{
        setIsOpen(!isOpen)
    }

    const handleCloseMenu = () =>{
        if (isOpen) setIsOpen(false)
    }

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const { isAuth, setIsAuth, user, loading } = useAuth();

    const [showModal, setShowModal] = useState(false);

    const { 
        isAuthModalOpen, 
        openAuthModal, 
        closeAuthModal, 
        step, 
        setStep } = useAuthModal();

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handlerToProfile = () =>{
        setShowProfileMenu(!showProfileMenu)
    }

    const loginHandler = () =>{
        // setIsAuth(!isAuth);
        {!isAuth ? openAuthModal() : handlerToProfile()}
        // localStorage.setItem('reactCardLogin', !isAuth)
    }

    const {orders, loadingOrders, loadOrders} = useOrders();

    const {favoritesList, syncLocalFavorites} = useFavoritesStore();

    const {cartItems, loadCart} = useCart();

    useEffect(
        ()=>{
            if (isAuth == true){
                loadCart();
                syncLocalFavorites();
            } else {
                    return 
            }
        },[isAuth]
    )

    const {pathname} = useLocation();

    const {id} = useParams();

    const hiddenMobileHeaderRoutes = [
    '/account',
    '/cart',
    '/account/profile',
    '/account/reviews',
    '/account/orders',
    '/login',
    '/account/favorites',
    ];

    const shouldHideHeader =
    isMobile &&(
        hiddenMobileHeaderRoutes.includes(pathname) ||
        pathname.startsWith('/account/orders')
    );

    const [searchString, setSearchString] = useState('')

    
    return(
        <>
        {!shouldHideHeader &&
        <header>
            <div className={cls.headerContent}>
                <div className={cls.headerLeft}>
                    <Link to='/'>
                        <img src={logoHeader} alt='header_logo'/>
                    </Link>
                    {!isMobile &&
                    <button className={cls.catalogBtn} onClick={handleToMenu}>
                        <CatalogBtnIcon isActive={isOpen}/>
                        <p>Каталог</p>
                    </button>
                    }
                    {!isMobile &&
                    <div className={cls.searchWrapper}>
                        <input 
                            type="text" 
                            placeholder='Ищите все для стройки и ремонта'
                            value={searchString}
                            onChange={(e)=>setSearchString(e.target.value)}
                        />
                        <button>
                            <SearchIcon />
                        </button>
                    </div>
                    }
                    <div className={cls.langWrapper}>
                        <button className={activeLang=='ru'?`${cls.active}`: ''} onClick={()=>{setActiveLang('ru'); setLang('ru')}}>
                            <p>Рус</p>
                        </button>
                        <button onClick={()=>{setActiveLang('kk'); setLang('kk')}} className={activeLang=='kk'?`${cls.active}`: ''}>
                            <p>қаз</p>
                        </button>
                    </div>
                </div> 
                {!isMobile &&
                <div className={cls.headerRight}>
                    <ControlBtn nav='/account/favorites'>
                        <FavoriteHeaderIcon />
                        <p>Избранное</p>
                        {favoritesList.length!== 0 && <CounterBadge count={favoritesList.length}/>}                        
                    </ControlBtn>
                    <ControlBtn nav='/cart'>
                        <CartBtnIcon />
                        <p>Корзина</p>
                        {cartItems.length!== 0 && <CounterBadge count={cartItems.length}/>}
                    </ControlBtn>
                    <ControlBtn onClick={loginHandler}>
                        <LoginBtnIcon isActive={isAuth} />
                        <p>{!isAuth  ? `Войти` : `Профиль` }</p>
                    </ControlBtn>
                    {showProfileMenu && 
                    <SideBar 
                        isHeaderProfile={true} 
                        setShowProfileMenu={setShowProfileMenu} 
                        ordersCount={ordersCount}
                    />
                    }
                </div>
                }
                {isMobile && <div className={cls.mobileSearchPanel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.5 1C11.084 1 13.244 1.73 14.757 3.243C16.27 4.756 17 6.916 17 9.5C17 11.678 16.479 13.553 15.41 14.995L18.707 18.293C18.8892 18.4816 18.99 18.7342 18.9877 18.9964C18.9854 19.2586 18.8802 19.5094 18.6948 19.6948C18.5094 19.8802 18.2586 19.9854 17.9964 19.9877C17.7342 19.99 17.4816 19.8892 17.293 19.707L13.995 16.409C12.553 17.48 10.678 18 8.5 18C5.916 18 3.756 17.27 2.243 15.757C0.73 14.244 0 12.084 0 9.5C0 6.916 0.73 4.756 2.243 3.243C3.756 1.73 5.916 1 8.5 1ZM8.5 3C6.284 3 4.694 3.62 3.657 4.657C2.62 5.694 2 7.284 2 9.5C2 11.716 2.62 13.306 3.657 14.343C4.694 15.38 6.284 16 8.5 16C10.716 16 12.306 15.38 13.343 14.343C14.38 13.306 15 11.716 15 9.5C15 7.284 14.38 5.694 13.343 4.657C12.306 3.62 10.716 3 8.5 3Z" fill="#8F9596"/>
                    </svg>
                <input className={cls.mobileSearch} value={searchString}
                onChange={(e)=>setSearchString(e.target.value)} placeholder='Ищите все для стройки и ремонта '/></div>}
            </div>
        </header>
        }
        {isOpen && <CatalogMenu onClose={handleCloseMenu}/>}
        {isMobile && 
        <div className={cls.mobileControlPanel}>
            <ControlBtn 
                nav='/' 
                onClick={()=>{
                    closeAuthModal(); }
                }
                onTouch={handleCloseMenu}
            >
                <MobileControlPanelHome isActive={pathname == '/' && isOpen==false}/>
                <p>Главная</p>
            </ControlBtn>
            <ControlBtn  
                onClick={()=>handleToMenu()}
            >
                <MobileControlPanelCatalog isActive={isOpen==true}/>
                <p>Каталог</p>
            </ControlBtn>
            <ControlBtn 
                nav='/account/favorites'
                onTouch={handleCloseMenu}
            >
                <MobileControlPanelFavorites isActive={pathname == '/account/favorites' && isOpen == false}/>
                <p>Избранное</p>
                {favoritesList.length!== 0 && <CounterBadge count={favoritesList.length}/>}
            </ControlBtn>
            <ControlBtn 
                nav='/cart'
                onTouch={handleCloseMenu}
            >
                <MobileControlPanelCart isActive={pathname == '/cart' && isOpen==false}/>
                <p>Корзина</p>
                {cartItems.length!== 0 && <CounterBadge count={cartItems.length}/>}
            </ControlBtn>
            <ControlBtn  
                nav="/account"
                onTouch={handleCloseMenu}
            >
                <MobileControlPanelAccount 
                isActive={(pathname == '/account'||pathname =='/account/orders'||pathname=='/account/reviews'||pathname=='/account/profile'|| pathname == '/login')&& isOpen==false}/>
                <p>Профиль</p>
            </ControlBtn>
        </div>}
        {searchString.length>1 && <Search text={searchString} onClose={()=>setSearchString("")}/>}
        
        </>
    )
}