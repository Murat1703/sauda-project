import cls from './MainLayout.module.css'
import { Suspense, useEffect, useState } from 'react'
import { Loader } from '../Loader'
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { ScrollToTop } from '../ScrollToTop';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';
import { AuthModal } from '../AuthModal';
import { useAuthModal } from '../../context/AuthModalContext.jsx';
import { useProducts } from '../../stores/useProducts.js';
import { useLanguage } from '../../stores/useLanguage.js';
import {useCart} from '../../stores/useCart.js'
import { useOrdersStore } from '../../stores/useOrdersStore.js';
import { useAuth } from '../../context/AuthContext.jsx';

export const MainLayout = ({setIsMobileScrolled}) =>{

    const {orders, loadingOrders, loadOrders} = useOrdersStore();

    const {pathname} = useLocation();
    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    const { 
        isAuthModalOpen, 
        openAuthModal, 
        closeAuthModal, 
    } = useAuthModal();

    useEffect(() => {
        const protectedRoutes = ['/account'];

        const isProtected = protectedRoutes.some(route =>
            pathname.startsWith(route)
        );

        if (!isProtected && isAuthModalOpen && isMobile) {
            closeAuthModal();
        }
    }, [pathname, isAuthModalOpen, closeAuthModal]);


    const {isAuth} = useAuth();
    useEffect(()=>{
        if (isAuth == true) loadOrders()
            else return
    },[isAuth]);


    const contentRef = useRef(null);

    const [isMobileScroll, setIsMobileScroll] = useState(false)
    useEffect(() => {
        const el = contentRef.current;

        if (!el || !isMobile) {
            setIsMobileScroll(false);
            setIsMobileScrolled(false);
            return;
        }

        const handleScroll = () => {
            const scrolled = el.scrollTop > 50;

            setIsMobileScroll(scrolled);
            setIsMobileScrolled(scrolled);
        };

        el.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => el.removeEventListener('scroll', handleScroll);
    }, [isMobile, setIsMobileScrolled]);

    const {lang} = useLanguage();

    const isHideFooter = (!isMobile ||(pathname!=='/cart') && (pathname !== '/account') && ((pathname!=='/account/reviews')) && ((pathname!=='/account/profile')) && ((pathname!=='/login')) && ((pathname!=='/account/favorites')) && (pathname!=='/account/new-order') )

    return(
        <>
            <ScrollToTop />
            <div className={cls.mainLayout}>
                <Header 
                    ordersCount={orders?.data?.length} 
                />
                <div 
                    className={cls.mainWrapper} 
                    id='main-scroll' 
                    ref={contentRef}
                >
                    <main className={cls.main}>
                        <Suspense fallback={<Loader/>}>
                            <Outlet  />
                        </Suspense>
                    </main>
                    { isHideFooter && <Footer />}                    
                </div>
            </div>
            {isAuthModalOpen && <AuthModal onClose={closeAuthModal}/>}
        </>
    )
}