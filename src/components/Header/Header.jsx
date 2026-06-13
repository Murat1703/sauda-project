import cls from './Header.module.css'
import logoHeader from '../../../public/assets/images/logo_header.svg'
import { useEffect, useState } from 'react'
import { ControlBtn } from '../Button';
import { CatalogMenu } from '../CatalogMenu';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../context/AuthContext.jsx';
import { useAuthModal } from '../../context/AuthModalContext.jsx'
import { SideBar } from '../AccountLayout/SideBar.jsx';
import { CounterBadge } from '../CounterBadge';
import { useCart } from '../../stores/useCart.js';
import { Link, useLocation } from 'react-router-dom';
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
import { MobileSearchIcon } from '../../../public/assets/icons/MobileSearchIcon.jsx';
import { MobileSearchPanel } from './MobileSearchPanel/MobileSearchPanel.jsx';

export const Header = ({ordersCount}) =>{
    const {lang, setLang} = useLanguage();
    const[isOpen, setIsOpen] = useState(false);

    const handleToMenu = () =>{
        setIsOpen(!isOpen)
    }

    const handleCloseMenu = () =>{
        if (isOpen) setIsOpen(false)
    }

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const { isAuth, setIsAuth, user, loading } = useAuth();
    const { 
        isAuthModalOpen, 
        openAuthModal, 
        closeAuthModal, 
        step, 
        setStep 
    } = useAuthModal();

    const hasToken = localStorage.getItem('token');

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handlerToProfile = () =>{
        setShowProfileMenu(!showProfileMenu)
    }

    const loginHandler = (e) =>{
        {!isAuth ? openAuthModal() : handlerToProfile()}
    }

    const {favoritesList, syncLocalFavorites} = useFavoritesStore();

    const {cartItems, loadCart, syncLocalCartWithAccount} = useCart();
    const [showLogin, setShowLogin] = useState(false)

    useEffect(()=>{            
        if (!isAuth) {
            setShowLogin(false); return
        };    
        syncLocalCartWithAccount();
        setShowLogin(true);
        syncLocalFavorites();
    },[isAuth])

    const {pathname} = useLocation();

    const hiddenMobileHeaderRoutes = [
        '/account',
        '/cart',
        '/account/profile',
        '/account/reviews',
        '/account/orders',
        '/login',
        '/account/favorites',
        '/account/new-order'
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
                                placeholder={lang=='ru'?'Ищите все для стройки и ремонта':'Құрылыс пен жөндеуге қажеттінің бәрін іздеңіз'}
                                value={searchString}
                                onChange={(e)=>setSearchString(e.target.value)}
                            />
                            <button>
                                <SearchIcon />
                            </button>
                        </div>
                        }
                        <div className={cls.langWrapper}>
                            <button className={lang=='ru'?`${cls.active}`: ''} onClick={()=>{setLang('ru')}}>
                                <p>Рус</p>
                            </button>
                            <button onClick={()=>{setLang('kk')}} className={lang=='kk'?`${cls.active}`: ''}>
                                <p>қаз</p>
                            </button>
                        </div>
                    </div> 
                    {!isMobile &&
                    <div className={cls.headerRight}>
                        <ControlBtn nav='/account/favorites'>
                            <FavoriteHeaderIcon />
                            <p>
                                {lang==='ru'?`Избранное`:`Таңдаулылар`}
                            </p>
                            {favoritesList.length!== 0 
                            && <CounterBadge count={favoritesList.length}/>
                            }                        
                        </ControlBtn>
                        <ControlBtn nav='/cart'>
                            <CartBtnIcon />
                            <p>{lang=='ru'?`Корзина`:`Себет`}</p>
                            {cartItems.length!== 0 && <CounterBadge count={cartItems.length}/>}
                        </ControlBtn>
                        <ControlBtn 
                            onClick={loginHandler}
                        >   

                            <LoginBtnIcon isActive={isAuth || (hasToken && loading)} />
                                {showLogin || loading ? (
                                <p>Профиль</p>
                                ) : (
                                <p>{lang=='ru'?`Войти`:`Кіру`}</p>
                                )}
                        </ControlBtn>
                        {showProfileMenu && 
                        <SideBar 
                            isHeaderProfile={true} 
                            setShowProfileMenu={setShowProfileMenu} 
                            ordersCount={ordersCount}
                            showProfileMenu={showProfileMenu}
                        />
                        }
                    </div>
                    }
                    {isMobile && 
                    <MobileSearchPanel 
                        searchString={searchString || ""} 
                        setSearchString={setSearchString} 
                        lang={lang}
                    />}
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
        {searchString.length>1 && 
            <Search text={searchString} onClose={()=>setSearchString("")}/>
        }        
        </>
    )
}