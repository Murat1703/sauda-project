import cls from './MainLayout.module.css'
import { Suspense, useEffect } from 'react'
import { Loader } from '../Loader'
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useOrders } from '../../hooks/useOrders.js';
import { ScrollToTop } from '../ScrollToTop';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export const MainLayout = () =>{

    const {orders, loadingOrders, loadOrders} = useOrders();

    const {pathname} = useLocation();
    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    console.log(pathname)

    useEffect(()=>{
        loadOrders()
    },[]);

    console.log('mainLayoutOrders = ', orders)



    return(
        <>
            <ScrollToTop />
            <div className={cls.mainLayout} >
                <Header ordersCount={orders?.length} />
                <div className={cls.mainWrapper} id='main-scroll'>
                    <main className={cls.main}>
                        <Suspense fallback={<Loader/>}>
                            <Outlet />
                        </Suspense>
                    </main>
                   
                    { (!isMobile ||(pathname!=='/cart') && (pathname !== '/account') && ((pathname!=='/account/reviews')) && ((pathname!=='/account/profile')) && ((pathname!=='/login')) && ((pathname!=='/account/favorites')) )&& <Footer />}
                    
                </div>
            </div>
        </>
    )
}