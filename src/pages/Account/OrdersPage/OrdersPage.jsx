import cls from './OrdersPage.module.css';
import { AccountTitle, FiltersContainer } from '../../../components/AccountLayout';
import { BreadCrumbs } from '../../../components/AccountLayout';
import { useEffect, useState } from 'react';
import { useOrders } from '../../../hooks/useOrders.js';
import { Loader } from '../../../components/Loader';
import { NavLink } from 'react-router-dom';

export const OrdersPage = () =>{

    const {orders, loadingOrders, loadOrders} = useOrders();

    useEffect(()=>{
        loadOrders()
    },[]);

    console.log('ordersPage = ',orders)
    
    const status = (item) =>{
        switch (item) {
            case 'delivered':
                return <span className={cls.delivered}>Доставлен</span>;

            case 'processing':
                return <span className={cls.processing}>В обработке</span>;

            case 'cancelled':
                return <span className={cls.cancelled}>Отменен</span>;

            case 'shipped':
                return <span className={cls.shipped}>На доставке</span>;
        }
    }


    const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',

    });
    };


    return(
        <div className={cls.ordersPageWrapper}>
            <div className={cls.pageTop}>
                <div className={cls.breadCrumbsWrapper}>
                    <BreadCrumbs >Профиль</BreadCrumbs>
                    <BreadCrumbs >-</BreadCrumbs>
                    <BreadCrumbs >Заказы</BreadCrumbs>
                </div>
                <div className={cls.pageTitleWrapper}>
                    <AccountTitle>Заказы</AccountTitle>
                </div>
            </div>
            <div className={cls.pageBottom}>
                <FiltersContainer>
                    <button>
                        <p>Все</p>
                    </button>
                    <button>
                        <p>Выполненные заказы</p>
                    </button>
                    <button>
                        <p>Отмененные</p>
                    </button>
                    <button>
                        <p>Возвраты</p>
                    </button>
                </FiltersContainer>
                <div className={cls.ordersList}>
                    {loadingOrders && <Loader/>}
                    {orders?.length == 0 && (
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
                    {orders?.length !== 0 && orders?.map((order, index) =>(
                        <div className={cls.orderItem} key={order.id}>
                            <div className={cls.orderItemTop}>
                                <div className={cls.orderStatus}>
                                    <p>№{order.orderNumber}</p>
                                    {status(order.status)}
                                </div>
                                <div className={cls.orderInformation}>
                                    <div className={cls.orderInformationItem}>
                                        <p>Создан:</p>
                                        <p>{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div className={cls.orderInformationItem}>
                                        <p>Сумма:</p>
                                        <p>{order.totalPrice} ₸</p>
                                    </div>
                                    <div className={cls.orderInformationItem}>
                                        <p>Оплата:</p>
                                        <p><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M12.8346 5.83321V11.6666C12.8346 11.9887 12.5735 12.2499 12.2513 12.2499H1.7513C1.42914 12.2499 1.16797 11.9887 1.16797 11.6666V5.83321H12.8346ZM12.8346 4.66654H1.16797V2.33321C1.16797 2.01104 1.42914 1.74988 1.7513 1.74988H12.2513C12.5735 1.74988 12.8346 2.01104 12.8346 2.33321V4.66654ZM8.75132 9.33322V10.4999H11.0846V9.33322H8.75132Z" fill="#FF4D00"/>
                                        </svg>
                                        оплата картой</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cls.orderItemBottom}>
                                <div className={cls.orderItemPreviewsList}>
                                    {order.itemsPreview?.map((item) =>(
                                        <div className={cls.orderItemPreview} key={item.id}>
                                            <div className={cls.orderItemPreviewImage}>
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={cls.orderActionButtons}>
                                    <div className={cls.orderActionButtonsLeft}>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M17.0433 10.7442C16.8118 12.9191 15.5795 14.9572 13.5404 16.1345C10.1524 18.0905 5.82035 16.9298 3.86434 13.5419L3.656 13.181M2.95429 9.25584C3.1858 7.08092 4.41812 5.04282 6.45728 3.86551C9.84518 1.90951 14.1773 3.07029 16.1333 6.45819L16.3416 6.81904M2.91016 15.055L3.5202 12.7783L5.79691 13.3884M14.2012 6.61167L16.4779 7.22172L17.0879 4.94501" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p>Повторить</p>
                                        </button>
                                        {order.status  !== 'delivered' ?    
                                        <NavLink to={`/account/orders/${order.id}`}>
                                            <p>Детали заказа</p>
                                        </NavLink>:
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M16.6654 10.4167V5.66667C16.6654 4.26654 16.6654 3.56647 16.3929 3.0317C16.1532 2.56129 15.7707 2.17884 15.3003 1.93916C14.7656 1.66667 14.0655 1.66667 12.6654 1.66667H7.33203C5.9319 1.66667 5.23183 1.66667 4.69705 1.93916C4.22665 2.17884 3.8442 2.56129 3.60451 3.0317C3.33203 3.56647 3.33203 4.26654 3.33203 5.66667V14.3333C3.33203 15.7335 3.33203 16.4335 3.60451 16.9683C3.8442 17.4387 4.22665 17.8212 4.69705 18.0609C5.23183 18.3333 5.93186 18.3333 7.33191 18.3333H10.4154M11.6654 9.16667H6.66536M8.33203 12.5H6.66536M13.332 5.83334H6.66536M17.4987 15.8333L14.9987 18.3333L12.4987 15.8333M14.9987 18.3333V13.3333" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p>Скачать чек</p>
                                        </button>
                                        } 

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}