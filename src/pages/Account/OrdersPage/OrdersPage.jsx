import cls from './OrdersPage.module.css';
import { AccountTitle, FiltersContainer } from '../../../components/AccountLayout';
import { EmtpyWhiteHeartIcon } from '../../../../public/assets/icons/EmtpyWhiteHeartIcon.jsx';
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
import { EmptyResults } from '../../../components/EmptyResults/EmptyResults.jsx';

export const OrdersPage = ({isAuth}) =>{

    const {orders, loadingOrders, loadOrders, loadOrderItem, orderItem} = useOrdersStore();
    const [orderId, setOrderId] = useState(null);

    // console.log('ORDERS = ',orders)
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
        // console.log(filter)

    useEffect(()=>{
        loadOrders({
            per_page: 5,
            page: activePage,
            status: filter=='all'? "": filter
        })
    },[activePage, filter]);


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
                        className={filter == 'shipped' ? cls.activeFilterBtn : ""} 
                        onClick={()=>setFilter('shipped')}
                    >
                        <p>{isMobile ? "Отправленные": "Отправленные заказы"}</p>
                    </button>
                    <button
                        className={filter == 'completed' ? cls.activeFilterBtn: ""} 
                        onClick={()=>setFilter('completed')}
                    >
                        <p>Выполненные</p>
                    </button>
                    <button
                        className={filter == 'cancelled' ? cls.activeFilterBtn: ""} 
                        onClick={()=>setFilter('cancelled')}
                    >
                        <p>Отмененные</p>
                    </button>
                </FiltersContainer>
                <div className={cls.ordersList}>
                    {loadingOrders && <Loader/>}
                    {orders?.data?.length == 0 && (
                        <div className={cls.orderItem}>
                            <EmptyResults
                                icon={<EmtpyWhiteHeartIcon />}
                                text={`По данным критеририям ничего не найдено`}
                                description={`Посмотрите в нашем каталоге `}
                            />
                        </div>
                    )}
                    {
                        orders?.data?.length !== 0 
                        && orders?.data?.filter(order=>{
                            if (filter=='all') return true; 
                            return order.status==filter})
                            .map((order) =>(
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