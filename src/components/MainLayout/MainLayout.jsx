import cls from './MainLayout.module.css'
import { Suspense, useEffect } from 'react'
import { Loader } from '../Loader'
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useOrders } from '../../hooks/useOrders.js';

export const MainLayout = () =>{

    const {orders, loadingOrders, loadOrders} = useOrders();

    useEffect(()=>{
        loadOrders()
    },[]);

    console.log('mainLayoutOrders = ', orders)

    return(
        <>
            <div className={cls.mainLayout}>
                <Header ordersCount={orders?.length} />
                <div className={cls.mainWrapper}>
                    <main className={cls.main}>
                        <Suspense fallback={<Loader/>}>
                            <Outlet />
                        </Suspense>
                    </main>
                    <Footer />

                </div>
            </div>
        </>
    )
}