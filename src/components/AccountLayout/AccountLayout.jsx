import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import cls from './AccountLayout.module.css';
import { Outlet } from 'react-router-dom'; 
import {useEffect, useState} from 'react';
import { SideBar } from './SideBar';
import { useOrders } from '../../hooks/useOrders';
import { useOrdersStore } from '../../stores/useOrdersStore';
import { ScrollToTop } from '../ScrollToTop';
import { useReviewsStore } from '../../stores/useReviewsStore';

export const AccountLayout = () =>{

    const [link, setLink] = useState('')

    // const {orders, loadingOrders, loadOrders} = useOrders();
    const {orders, loadingOrders, loadOrders} = useOrdersStore();

    const {accountReviews, loadAccountReviews, loadingAccountReviews} = useReviewsStore();

    useEffect(()=>{
        loadOrders();
        loadAccountReviews();
    },[]);

    const{pathname} = useLocation();

    console.log('accountReviews , ', accountReviews)
    return(
        <>
        <ScrollToTop />
        <div className={cls.accountLayout}>
            {pathname !== '/account/new-order' &&
            <SideBar 
                setLink={setLink} 
                link={link} 
                ordersCount={orders?.data?.length || 0}
                reviews={accountReviews}
            /> 
            }
            <div>
                <Outlet />
            </div>
        </div>
        </>
    )
}   