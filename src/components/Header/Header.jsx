import cls from './Header.module.css'
import logoHeader from '../../../public/assets/images/logo_header.svg'
import { useState } from 'react'
import { ControlBtn } from '../Button';
import { CatalogMenu } from '../CatalogMenu';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../hooks/useAuth.js';
import { AuthModal } from '../AuthModal/AuthModal.jsx';
import { useAuthModal } from '../../hooks/useAuthModal.js'
import { SideBar } from '../AccountLayout/SideBar.jsx';
import { useOrders } from '../../hooks/useOrders.js';
import { CounterBadge } from '../CounterBadge';
import { useFavorites } from '../../hooks/useFavorites.js';

export const Header = ({ordersCount}) =>{

    const[activeLang, setActiveLang] = useState('ru');
    const[isOpen, setIsOpen] = useState(false);

    const handleToMenu = () =>{
        setIsOpen(!isOpen)
    }

    const isMobile = useMediaQuery({ maxWidth: 768 });


    const { isAuth, setIsAuth } = useAuth();

    const [showModal, setShowModal] = useState(false);

    const { isAuthModalOpen, openAuthModal, closeAuthModal, step, setStep } = useAuthModal();

    console.log('isAuth = ',isAuth);

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

    console.log('headerOrders = ', orders  )

    const {favorites, toggleFavorites} = useFavorites();

    return(
        <>
        <header>
            <div className={cls.headerContent}>
                <div className={cls.headerLeft}>
                    <a href='/'>
                        <img src={logoHeader} alt='header_logo'/>
                    </a>
                    {!isMobile &&
                    <button className={cls.catalogBtn} onClick={handleToMenu}>
                        {!isOpen? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2.49988 10H13.3332M2.49988 5H17.4999M2.49988 15H9.16654" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>:
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 19C5.02943 19 1 14.9705 1 10C1 5.02943 5.02943 1 10 1C14.9705 1 19 5.02943 19 10C19 14.9705 14.9705 19 10 19ZM10 8.72722L7.45441 6.18162L6.18162 7.45441L8.72722 10L6.18162 12.5456L7.45441 13.8183L10 11.2728L12.5456 13.8183L13.8183 12.5456L11.2728 10L13.8183 7.45441L12.5456 6.18162L10 8.72722Z" fill="white"/>
                        </svg>
                        }
                        <p>Каталог</p>
                    </button>
                    }
                    {!isMobile &&
                    <div className={cls.searchWrapper}>
                        <input type="text" placeholder='Ищите все для стройки и ремонта'/>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.16662 3.42495C5.99558 3.42495 3.42495 5.99558 3.42495 9.16662C3.42495 12.3377 5.99558 14.9083 9.16662 14.9083C10.7111 14.9083 12.1132 14.2984 13.1452 13.3064C13.1684 13.2767 13.1936 13.2482 13.2209 13.2209C13.2482 13.1936 13.2767 13.1684 13.3064 13.1452C14.2984 12.1132 14.9083 10.7111 14.9083 9.16662C14.9083 5.99558 12.3377 3.42495 9.16662 3.42495ZM15.1491 13.8409C16.1573 12.5523 16.7583 10.9296 16.7583 9.16662C16.7583 4.97386 13.3594 1.57495 9.16662 1.57495C4.97386 1.57495 1.57495 4.97386 1.57495 9.16662C1.57495 13.3594 4.97386 16.7583 9.16662 16.7583C10.9296 16.7583 12.5523 16.1573 13.8409 15.1491L16.8459 18.154C17.2071 18.5153 17.7928 18.5153 18.154 18.154C18.5153 17.7928 18.5153 17.2071 18.154 16.8459L15.1491 13.8409Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                    }
                    <div className={cls.langWrapper}>
                        <button className={activeLang=='ru'?`${cls.active}`: ''} onClick={()=>setActiveLang('ru')}>
                            <p>Рус</p>
                        </button>
                        <button onClick={()=>setActiveLang('kk')} className={activeLang=='kk'?`${cls.active}`: ''}>
                            <p>қаз</p>
                        </button>
                    </div>
                </div> 
                {!isMobile &&
                <div className={cls.headerRight}>
                    <ControlBtn nav='/account/favorites'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.8935 3.03755C8.89419 0.700133 5.56014 0.071376 3.05509 2.21175C0.550035 4.35212 0.197358 7.93071 2.16459 10.4621C3.80021 12.5668 8.75016 17.0058 10.3725 18.4426C10.554 18.6033 10.6447 18.6837 10.7506 18.7153C10.843 18.7428 10.9441 18.7428 11.0365 18.7153C11.1423 18.6837 11.2331 18.6033 11.4146 18.4426C13.0369 17.0058 17.9869 12.5668 19.6225 10.4621C21.5897 7.93071 21.2801 4.3296 18.732 2.21175C16.1839 0.0938905 12.8929 0.700133 10.8935 3.03755Z" stroke="#152429" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>Избранное</p>
                        {favorites.length!== 0 && <CounterBadge count={favorites.length}/>}
                        
                    </ControlBtn>
                    <ControlBtn nav='/cart'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                        <path d="M14.0629 7.90002V4.90002C14.0629 2.69089 12.272 0.900024 10.0629 0.900024C7.85373 0.900024 6.06287 2.69089 6.06287 4.90002V7.90002M1.65487 9.25199L1.05487 15.652C0.884275 17.4717 0.798977 18.3815 1.10092 19.0843C1.36617 19.7017 1.83099 20.2121 2.42089 20.5338C3.0924 20.9 4.00624 20.9 5.83392 20.9H14.2918C16.1195 20.9 17.0333 20.9 17.7048 20.5338C18.2947 20.2121 18.7596 19.7017 19.0248 19.0843C19.3268 18.3815 19.2415 17.4717 19.0709 15.652L18.4709 9.25199C18.3268 7.71537 18.2548 6.94706 17.9092 6.36619C17.6049 5.85461 17.1552 5.44514 16.6175 5.18987C16.0069 4.90003 15.2352 4.90003 13.6918 4.90003L6.43392 4.90002C4.89056 4.90002 4.11888 4.90002 3.50829 5.18987C2.97053 5.44513 2.52088 5.85461 2.21653 6.36619C1.87096 6.94706 1.79893 7.71537 1.65487 9.25199Z" stroke="#152429" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>Корзина</p>
                    </ControlBtn>
                    <ControlBtn onClick={loginHandler}>
                        {!isAuth ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#152429" strokeWidth="1.68" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#FF5302"/>
                        <path d="M12.2296 6C13.1824 6 14.0193 6.17683 14.7403 6.53049C15.4614 6.88415 16.015 7.38415 16.4013 8.03049C16.8004 8.67683 17 9.42683 17 10.2805V13.7195C17 14.5732 16.8004 15.3232 16.4013 15.9695C16.015 16.6159 15.4614 17.1159 14.7403 17.4695C14.0193 17.8232 13.1824 18 12.2296 18H8V6H12.2296ZM12.2876 16.4451C13.2146 16.4451 13.9292 16.2073 14.4313 15.7317C14.9335 15.2439 15.1846 14.561 15.1846 13.6829V10.3354C15.1846 9.45732 14.9335 8.77439 14.4313 8.28659C13.9292 7.79878 13.2146 7.55488 12.2876 7.55488H9.81545V16.4451H12.2876Z" fill="white"/>
                        </svg>
                        }
                        <p>{!isAuth ? `Войти` : `Профиль` }</p>
                    </ControlBtn>
                    {showProfileMenu && <SideBar isHeaderProfile={true} setShowProfileMenu={setShowProfileMenu} ordersCount={ordersCount}/>}
                </div>
                }
            </div>
        </header>
        {isOpen && <CatalogMenu />}
        {isMobile && 
        <div className={cls.mobileControlPanel}>
            <ControlBtn nav='/'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_594_15500)">
                    <rect x="7.69995" y="12" width="9" height="7" fill="#757575"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.95709 8.41504L11.4785 3.81859C11.7986 3.62297 12.2013 3.62297 12.5214 3.81859L20.0429 8.41504C20.6374 8.77835 21 9.42487 21 10.1216V19C21 20.1046 20.1046 21 19 21L4.99997 21C3.8954 21 2.99997 20.1046 2.99997 19L2.99999 10.1216C2.99999 9.42486 3.36258 8.77835 3.95709 8.41504ZM9.99999 12.9999C9.4477 12.9999 8.99999 13.4476 8.99999 13.9999V16.9999C8.99999 17.5522 9.4477 17.9999 9.99999 17.9999H14C14.5523 17.9999 15 17.5522 15 16.9999V13.9999C15 13.4476 14.5523 12.9999 14 12.9999H9.99999Z" fill="#B8B8B8"/>
                </g>
                <defs>
                    <clipPath id="clip0_594_15500">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
                <p>Главная</p>
            </ControlBtn>
            <ControlBtn >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_594_15500)">
                    <rect x="7.69995" y="12" width="9" height="7" fill="#757575"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.95709 8.41504L11.4785 3.81859C11.7986 3.62297 12.2013 3.62297 12.5214 3.81859L20.0429 8.41504C20.6374 8.77835 21 9.42487 21 10.1216V19C21 20.1046 20.1046 21 19 21L4.99997 21C3.8954 21 2.99997 20.1046 2.99997 19L2.99999 10.1216C2.99999 9.42486 3.36258 8.77835 3.95709 8.41504ZM9.99999 12.9999C9.4477 12.9999 8.99999 13.4476 8.99999 13.9999V16.9999C8.99999 17.5522 9.4477 17.9999 9.99999 17.9999H14C14.5523 17.9999 15 17.5522 15 16.9999V13.9999C15 13.4476 14.5523 12.9999 14 12.9999H9.99999Z" fill="#B8B8B8"/>
                </g>
                <defs>
                    <clipPath id="clip0_594_15500">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
                <p>Каталог</p>
            </ControlBtn>
            <ControlBtn nav='/account/favorites'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_594_15500)">
                    <rect x="7.69995" y="12" width="9" height="7" fill="#757575"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.95709 8.41504L11.4785 3.81859C11.7986 3.62297 12.2013 3.62297 12.5214 3.81859L20.0429 8.41504C20.6374 8.77835 21 9.42487 21 10.1216V19C21 20.1046 20.1046 21 19 21L4.99997 21C3.8954 21 2.99997 20.1046 2.99997 19L2.99999 10.1216C2.99999 9.42486 3.36258 8.77835 3.95709 8.41504ZM9.99999 12.9999C9.4477 12.9999 8.99999 13.4476 8.99999 13.9999V16.9999C8.99999 17.5522 9.4477 17.9999 9.99999 17.9999H14C14.5523 17.9999 15 17.5522 15 16.9999V13.9999C15 13.4476 14.5523 12.9999 14 12.9999H9.99999Z" fill="#B8B8B8"/>
                </g>
                <defs>
                    <clipPath id="clip0_594_15500">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
                <p>Избранное</p>
                <CounterBadge />
            </ControlBtn>
            <ControlBtn nav='/cart'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_594_15500)">
                    <rect x="7.69995" y="12" width="9" height="7" fill="#757575"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.95709 8.41504L11.4785 3.81859C11.7986 3.62297 12.2013 3.62297 12.5214 3.81859L20.0429 8.41504C20.6374 8.77835 21 9.42487 21 10.1216V19C21 20.1046 20.1046 21 19 21L4.99997 21C3.8954 21 2.99997 20.1046 2.99997 19L2.99999 10.1216C2.99999 9.42486 3.36258 8.77835 3.95709 8.41504ZM9.99999 12.9999C9.4477 12.9999 8.99999 13.4476 8.99999 13.9999V16.9999C8.99999 17.5522 9.4477 17.9999 9.99999 17.9999H14C14.5523 17.9999 15 17.5522 15 16.9999V13.9999C15 13.4476 14.5523 12.9999 14 12.9999H9.99999Z" fill="#B8B8B8"/>
                </g>
                <defs>
                    <clipPath id="clip0_594_15500">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
                <p>Корзина</p>
            </ControlBtn>
            <ControlBtn onClick={loginHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_594_15500)">
                    <rect x="7.69995" y="12" width="9" height="7" fill="#757575"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.95709 8.41504L11.4785 3.81859C11.7986 3.62297 12.2013 3.62297 12.5214 3.81859L20.0429 8.41504C20.6374 8.77835 21 9.42487 21 10.1216V19C21 20.1046 20.1046 21 19 21L4.99997 21C3.8954 21 2.99997 20.1046 2.99997 19L2.99999 10.1216C2.99999 9.42486 3.36258 8.77835 3.95709 8.41504ZM9.99999 12.9999C9.4477 12.9999 8.99999 13.4476 8.99999 13.9999V16.9999C8.99999 17.5522 9.4477 17.9999 9.99999 17.9999H14C14.5523 17.9999 15 17.5522 15 16.9999V13.9999C15 13.4476 14.5523 12.9999 14 12.9999H9.99999Z" fill="#B8B8B8"/>
                </g>
                <defs>
                    <clipPath id="clip0_594_15500">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
                <p>Профиль</p>
            </ControlBtn>
        </div>}
        {isAuthModalOpen && <AuthModal onClose={closeAuthModal}/>}
        </>
    )
}