import { Link, useNavigate } from 'react-router-dom';
import cls from './AccountLayout.module.css';
import { Outlet } from 'react-router-dom'; 
import {useEffect, useState} from 'react';
import { SideBar } from './SideBar';
import { useOrders } from '../../hooks/useOrders';
import { ScrollToTop } from '../ScrollToTop';

export const AccountLayout = () =>{

    const [link, setLink] = useState('')

    const {orders, loadingOrders, loadOrders} = useOrders();

    useEffect(()=>{
        loadOrders()
    },[]);


    return(
        <>
        <ScrollToTop />
        <div className={cls.accountLayout}>
            <SideBar setLink={setLink} link={link} ordersCount={orders?.length || 0}/> 
            <div>
                <Outlet />
            </div>
        </div>
        </>
    )
}   