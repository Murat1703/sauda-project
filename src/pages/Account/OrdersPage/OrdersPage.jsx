import cls from './OrdersPage.module.css';
import { AccountTitle, FiltersContainer } from '../../../components/AccountLayout';
import { BreadCrumbs } from '../../../components/AccountLayout';
import { act, useEffect, useState } from 'react';
import { Loader } from '../../../components/Loader';
import { NavLink } from 'react-router-dom';
import { useDateFormat } from '../../../hooks/useDateFormat.js';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useOrdersStore } from '../../../stores/useOrdersStore.js';
import { useAuthModal } from '../../../context/AuthModalContext.jsx';
import { Pagination } from '../../../components/Pagination/Pagination.jsx';
import { OrderItem } from './OrderItem.jsx';

export const OrdersPage = ({isAuth}) =>{

    const {orders, loadingOrders, loadOrders, loadOrderItem, orderItem} = useOrdersStore();
    const [orderId, setOrderId] = useState(null);

    console.log('ORDERS = ',orders)


    const [filter, setFilter] = useState('all');
    
    const status = (item) =>{
        switch (item) {
            case 'pending':
                return <span className={cls.pendingOrder}>Новый</span>;

            case 'confirmed':
                return <span className={cls.confirmed}>Потвержден</span>;

            case 'processing':
                return <span className={cls.processing}>В обработке</span>;

            case 'completed':
                return <span className={cls.completed}>Завершен</span>;

            case 'cancelled':
                return <span className={cls.cancelled}>Отменен</span>;

            case 'shipped':
                return <span className={cls.shipped}>Отправлен</span>;

            case 'finished':
                return <span className={cls.finished}>Завершен</span>;
        }
    }

    const {formatDate} = useDateFormat();

    const isMobile = useMediaQuery({
        maxWidth: 768
    });

    const { 
        isAuthModalOpen, 
        openAuthModal, 
        closeAuthModal, 
        step, 
        setStep } = 
    useAuthModal();

    const [activePage, setActivePage] = useState(1)


    useEffect(()=>{
        loadOrders({
            per_page: 5,
            page: activePage,
        })
    },[activePage]);


    return(
        <div className={cls.ordersPageWrapper}>
            <div className={cls.pageTop}>
                <div className={cls.breadCrumbsWrapper}>
                    <BreadCrumbs >Профиль</BreadCrumbs>
                    <BreadCrumbs >-</BreadCrumbs>
                    <BreadCrumbs >Заказы</BreadCrumbs>
                </div>
                {isMobile && 
                <Link to="/account">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 5L5 12L12 19" stroke="#152429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>

                }
                <div className={cls.pageTitleWrapper}>
                    <AccountTitle>Заказы</AccountTitle>
                </div>
                {isMobile && <div></div>}
            </div>
            {isAuth ?
            <>
            <div className={cls.pageBottom}>
                <FiltersContainer>
                    <button 
                        className={filter == 'all' 
                            ? cls.activeFilterBtn: ""} 
                            onClick={()=>setFilter('all')}
                    >
                        <p>Все</p>
                    </button>
                    <button
                        className={filter == 'delivered' ? cls.activeFilterBtn : ""} 
                        onClick={()=>setFilter('delivered')}
                    >
                        <p>{isMobile ? "Выполненные": "Выполненные заказы"}</p>
                    </button>
                    <button
                        className={filter == 'cancelled' ? cls.activeFilterBtn: ""} 
                        onClick={()=>setFilter('cancelled')}
                    >
                        <p>Отмененные</p>
                    </button>
                    <button
                        className={filter == 'returned' ? cls.activeFilterBtn : ""} onClick={()=>setFilter('returned')}
                    >
                        <p>Возвраты</p>
                    </button>
                </FiltersContainer>
                <div className={cls.ordersList}>
                    {loadingOrders && <Loader/>}
                    {orders?.data?.length == 0 && (
                        <div className={cls.orderItem}>
                            <div className={cls.emptyOrders}>
                                <div className={cls.emptyOrdersTop}>
                                    <div className={cls.emptyIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path d="M30.75 10.9165L18 17.9998M18 17.9998L5.24995 10.9165M18 17.9998L18 32.2499M31.5 24.0877V11.9121C31.5 11.3981 31.5 11.1411 31.4243 10.9119C31.3573 10.7091 31.2478 10.523 31.1031 10.366C30.9395 10.1885 30.7148 10.0637 30.2655 9.81407L19.1655 3.64741C18.7401 3.41107 18.5274 3.2929 18.3022 3.24657C18.1028 3.20557 17.8972 3.20557 17.6978 3.24657C17.4726 3.2929 17.2599 3.41107 16.8345 3.64741L5.73446 9.81408C5.28517 10.0637 5.06053 10.1885 4.89695 10.366C4.75224 10.523 4.64272 10.7091 4.57573 10.9119C4.5 11.1411 4.5 11.3981 4.5 11.9121V24.0877C4.5 24.6017 4.5 24.8587 4.57573 25.0879C4.64272 25.2906 4.75224 25.4767 4.89695 25.6338C5.06053 25.8113 5.28517 25.9361 5.73446 26.1857L16.8345 32.3524C17.2599 32.5887 17.4726 32.7069 17.6978 32.7532C17.8972 32.7942 18.1028 32.7942 18.3022 32.7532C18.5274 32.7069 18.7401 32.5887 19.1655 32.3524L30.2655 26.1857C30.7148 25.9361 30.9395 25.8113 31.1031 25.6338C31.2478 25.4767 31.3573 25.2906 31.4243 25.0879C31.5 24.8587 31.5 24.6017 31.5 24.0877Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M24.75 14.25L11.25 6.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className={cls.emptyOrdersTitle}>
                                        <h4>Вы пока не сделали ни одного заказа</h4>
                                        <p>Добавляйте товары из каталога, и оформляйте ее через “Корзина”</p>
                                    </div>
                                </div>
                                <NavLink to={'/'} className={cls.emptyOrdersBottom}>
                                    <p>Перейти в каталог</p>
                                </NavLink>
                            </div>
                            
                        </div>
                    )}
                    {orders?.data?.length !== 0 && orders?.data?.filter(order=>{if (filter=='all') return true; return order.status==filter}).map((order) =>(
                        <OrderItem 
                            order={order} 
                            status={status} 
                            key={order?.id} 
                            formatDate={formatDate}
                        />
                    ))}
                </div>

            </div>
            {orders?.last_page !==2 &&
            <Pagination links={orders?.links} setActivePage={setActivePage}/>}
            </>
            :
            <div className={cls.notAutorisedBlock}>
                <p>Для доступа к функционалу необходимо <a onClick={()=>openAuthModal()}>войти</a></p>
            </div>
            }
        </div>
    )
}