import { BreadCrumbs } from '../../../components/AccountLayout'
import { AccountTitle } from '../../../components/AccountLayout'
import cls from './OrderPage.module.css'
import { useOrders } from '../../../hooks/useOrders'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDateFormat } from '../../../hooks/useDateFormat.js';
import { Loader } from '../../../components/Loader/Loader.jsx';


export const OrderPage = () =>{

    const { id } = useParams();

    const { formatDate } = useDateFormat();
    
    const { order, loadingOrder, loadOrder } = useOrders(); 

    useEffect(()=>{
        loadOrder(id)
    },[id]);

    console.log(order)

    return(
        <div className={cls.orderPageWrapper}>
            <div className={cls.orderPageTop}>
                <div className={cls.orderPageTitleBlock}>
                    <div>
                        <BreadCrumbs>Профиль</BreadCrumbs>
                        <BreadCrumbs> - </BreadCrumbs>
                        <BreadCrumbs>Заказы</BreadCrumbs>
                    </div>
                    <div>
                        <AccountTitle>Заказ № {order?.orderNumber}</AccountTitle>
                    </div>
                </div>
                <div className={cls.orderPageInfoBlock}>
                    <div className={cls.orderPageInfoItem}>
                        <p>Создан:</p>
                        <span>{formatDate(order?.createdAt)}</span>
                    </div>
                    <div className={cls.orderPageInfoItem}>
                        <p>Сумма:</p>
                        <span>{order?.totalPrice} ₸</span>
                    </div>
                    <div className={cls.orderPageInfoItem}>
                        <p>Оплата:</p>
                        <span>Банковской картой</span>
                    </div>
                    <div className={cls.orderPageInfoItem}>
                        <p>Доставка по адресу:</p>
                        <span>{order?.deliveryType !== 'pickup' ?`г.Алматы, ул. Достык 32`: `Самовывоз`}</span>
                    </div>
                    <div className={cls.orderPageInfoItem}>
                        <p>Доставлено:</p>
                        <span>12 сентября 2026</span>
                    </div>
                </div>
            </div>
            <div className={cls.orderItemsList}>
                <div>
                    {loadingOrder && <Loader />}
                    {order?.itemsPreview.map((order)=>{
                        return(
                            <div className={cls.orderItem}>
                                <div className={cls.orderInfoLeftBlock}>
                                    <div className={cls.orderImg}>
                                        <img src={order?.image} alt={order?.title} />
                                    </div>
                                    <div className={cls.orderInfoTitle}>
                                        <p>{order?.title}</p>
                                        <span>Код: {order?.sku}</span>
                                    </div>
                                </div>

                                <div className={cls.orderCountBlock}>
                                    {order?.quantity} 
                                </div>
                                <div className={cls.orderPriceBlock}>
                                    {order?.hasDiscount && <span className={cls.oldPrice}>{order?.oldPrice} ₸</span>}
                                    <span className={cls.finalPrice}>{order?.finalPrice} ₸</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button className={cls.orderReceipt}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.6654 10.4167V5.66666C16.6654 4.26653 16.6654 3.56646 16.3929 3.03168C16.1532 2.56128 15.7707 2.17882 15.3003 1.93914C14.7656 1.66666 14.0655 1.66666 12.6654 1.66666H7.33203C5.9319 1.66666 5.23183 1.66666 4.69705 1.93914C4.22665 2.17882 3.8442 2.56128 3.60451 3.03168C3.33203 3.56646 3.33203 4.26653 3.33203 5.66666V14.3333C3.33203 15.7335 3.33203 16.4335 3.60451 16.9683C3.8442 17.4387 4.22665 17.8212 4.69705 18.0608C5.23183 18.3333 5.93186 18.3333 7.33191 18.3333H10.4154M11.6654 9.16666H6.66536M8.33203 12.5H6.66536M13.332 5.83332H6.66536M17.4987 15.8333L14.9987 18.3333L12.4987 15.8333M14.9987 18.3333V13.3333" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>Скачать чек</p>
                </button>
            </div>
        </div>
    )
}