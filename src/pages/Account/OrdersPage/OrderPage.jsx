import { BreadCrumbs } from '../../../components/AccountLayout'
import { AccountTitle } from '../../../components/AccountLayout'
import cls from './OrderPage.module.css'
import { useOrders } from '../../../hooks/useOrders'
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDateFormat } from '../../../hooks/useDateFormat.js';
import { Loader } from '../../../components/Loader/Loader.jsx';
import { useMediaQuery } from 'react-responsive';


export const OrderPage = () =>{

    const { id } = useParams();

    const { formatDate } = useDateFormat();
    
    const { order, loadingOrder, loadOrder } = useOrders(); 

    useEffect(()=>{
        loadOrder(id)
    },[id]);

    console.log(order)
    const isMobile = useMediaQuery({
        maxWidth: 768
    });

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

    const pricePerOne = () =>{

    }

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
                        {isMobile && <Link to="/account">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M19 12H5M12 5L5 12L12 19" stroke="#152429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>}
                        <AccountTitle>Заказ № {order?.orderNumber}</AccountTitle>
                        {isMobile && <div></div>}
                    </div>
                </div>
                <div className={cls.orderPageInfoBlock}>
                    {isMobile && <p>О Заказе</p>}
                    {isMobile && 
                    <div className={cls.orderPageInfoItem}>
                        <p>Статус:</p>
                        {status(order?.status)}
                    </div>
                    }
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
                {isMobile && <p>Состав заказа</p>}
                <div>
                    {loadingOrder && <Loader />}
                    {order?.itemsPreview.map((order)=>{
                        return(
                            <div className={cls.orderItem} key={order.id}>
                                <div className={cls.orderInfoLeftBlock}>
                                    <div className={cls.orderImg}>
                                        <img src={order?.image} alt={order?.title} />
                                    </div>
                                    <div className={cls.orderInfoTitle}>
                                        {isMobile && <span>Код: {order?.sku} 
                                            <p>x{order?.quantity}</p>    
                                        </span>}
                                        <p>{order?.title}</p>
                                        {!isMobile &&<span>Код: {order?.sku}</span>}
                                        {isMobile && <div className={cls.mobilePriceBlock}>
                                            <p>{order?.finalPrice} ₸</p>
                                            <p>{Math.round(order?.finalPrice /order.quantity)}  ₸/шт</p>
                                        </div>}
                                        {isMobile && <button><p>Оставить отзыв</p></button>}
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
            {isMobile && 
            <div className={cls.totalReceipt}>
                <p>Итоговый чек</p>
                <div className={cls.totalReceiptItems}>
                    <div className={cls.totalReceiptItem}>
                        <p>Всего товаров</p>
                        <p>{order?.itemsCount}</p>
                    </div>
                    <div className={cls.totalReceiptItem}>
                        <p>Всего</p>
                        <p>{order?.totalPrice} ₸</p>
                    </div>
                    <div className={cls.totalReceiptItem}>
                        <p>Скидка</p>
                        <p>{-200} ₸</p>
                    </div>
                    <div className={cls.totalReceiptItem}>
                        <p>Итого</p>
                        <p className={cls.orderTotalPriceModal}>{order?.totalPrice} ₸</p>
                    </div>
                </div>
                <div className={cls.mobileTotalReceiptButtons}>
                    <button>
                        <p>Скачать чек</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M11.6663 1.8913V5.33341C11.6663 5.80012 11.6663 6.03348 11.7572 6.21174C11.8371 6.36854 11.9645 6.49602 12.1213 6.57592C12.2996 6.66675 12.533 6.66675 12.9997 6.66675H16.4418M12.4997 12.5L9.99967 15L7.49967 12.5M9.99967 15L9.99967 10M11.6663 1.66669H7.33301C5.93288 1.66669 5.23281 1.66669 4.69803 1.93917C4.22763 2.17885 3.84517 2.56131 3.60549 3.03171C3.33301 3.56649 3.33301 4.26656 3.33301 5.66669V14.3334C3.33301 15.7335 3.33301 16.4335 3.60549 16.9683C3.84517 17.4387 4.22763 17.8212 4.69803 18.0609C5.23281 18.3334 5.93288 18.3334 7.33301 18.3334H12.6663C14.0665 18.3334 14.7665 18.3334 15.3013 18.0609C15.7717 17.8212 16.1542 17.4387 16.3939 16.9683C16.6663 16.4335 16.6663 15.7335 16.6663 14.3334V6.66669L11.6663 1.66669Z" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button>
                        <p>Повторить</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M17.0443 10.7442C16.8128 12.9191 15.5805 14.9572 13.5413 16.1345C10.1534 18.0905 5.82132 16.9298 3.86531 13.5419L3.65698 13.181M2.95527 9.25584C3.18677 7.08092 4.4191 5.04282 6.45825 3.86551C9.84616 1.90951 14.1783 3.07029 16.1343 6.45819L16.3426 6.81904M2.91113 15.055L3.52118 12.7783L5.79788 13.3884M14.2022 6.61167L16.4789 7.22172L17.0889 4.94501" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button>
                        <p>Оформить возврат</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M4.96647 0.800049L0.799805 4.96672L4.96647 9.13338M0.799805 4.96672H6.13314C8.9334 4.96672 10.3335 4.96672 11.4031 5.51168C12.3439 5.99105 13.1088 6.75595 13.5882 7.69676C14.1331 8.76632 14.1331 10.1665 14.1331 12.9667V14.1334" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

            </div>}
        </div>
    )
}