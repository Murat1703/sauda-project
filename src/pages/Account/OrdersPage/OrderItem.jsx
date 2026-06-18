import { useMediaQuery } from 'react-responsive'
import cls from './OrderItem.module.css'
import { Link } from 'react-router'
import { useEffect } from 'react'
import { useOrdersStore } from '../../../stores/useOrdersStore'
import { PaymentCardIcon } from '../../../../public/assets/icons/PaymentCardIcon'
import { PaymentCashIcon } from '../../../../public/assets/icons/PaymentCashIcon'

export const OrderItem = ({order, formatDate})=>{

    const {isMobile} = useMediaQuery({
        maxWidth: 768
    })

    const {loadOrderItem, orderItem} = useOrdersStore();


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

    return(
        <div className={cls.orderItem} key={order.number}>
            <div className={cls.orderItemTop}>
                <div className={cls.orderStatus}>
                                    <p>№{order.number}
                                        {isMobile && <span>{formatDate(order.placed_at)}</span>}
                                    </p>
                                    {status(order?.status)}
                </div>
                <div className={cls.orderInformation}>
                    <div className={cls.orderInformationItem}>
                        <p>Создан:</p>
                        <p>{formatDate(order.placed_at)}</p>
                    </div>
                    <div className={cls.orderInformationItem}>
                        <p>Сумма:</p>
                        <p>{order.total} ₸</p>
                    </div>
                    <div className={cls.orderInformationItem}>
                        <p>Оплата:</p>
                        <p>
                            {order?.payment_method?.code == 'cash' ? 
                            <PaymentCashIcon />:<PaymentCardIcon />}
                            {order?.payment_method?.code == 'kaspi' && `Каспий QR` }
                            {order?.payment_method?.code == 'card' && `Оплата картой` }
                            {order?.payment_method?.code == 'cash' && `Оплата при получении` }
                        </p>
                    </div>
                    <div className={cls.orderInformationItem}>
                        <p>
                            Вид доставки
                        </p>
                        <p>
                            {order?.delivery_method_name}
                        </p>
                    </div>
                </div>
            </div>
            <div className={cls.orderItemBottom}>
                <div className={cls.orderItemPreviewsList}>
                    {order?.items?.map((item, index) =>(
                        <div 
                            className={cls.orderItemPreview} 
                            key={index}
                        >
                            <div className={cls.orderItemPreviewImage}>
                                <img 
                                    src={item.primary_image_url} 
                                    alt={`${item.name}`} 
                                    loading='lazy'
                                />
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
                                        <Link to={`/account/orders/${order?.number}`}>
                                            {isMobile && 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M11.6663 9.16666H6.66634M8.33301 12.5H6.66634M13.333 5.83332H6.66634M16.6663 5.66666V14.3333C16.6663 15.7335 16.6663 16.4335 16.3939 16.9683C16.1542 17.4387 15.7717 17.8212 15.3013 18.0608C14.7665 18.3333 14.0665 18.3333 12.6663 18.3333H7.33301C5.93288 18.3333 5.23281 18.3333 4.69803 18.0608C4.22763 17.8212 3.84517 17.4387 3.60549 16.9683C3.33301 16.4335 3.33301 15.7335 3.33301 14.3333V5.66666C3.33301 4.26653 3.33301 3.56646 3.60549 3.03168C3.84517 2.56128 4.22763 2.17882 4.69803 1.93914C5.23281 1.66666 5.93288 1.66666 7.33301 1.66666H12.6663C14.0665 1.66666 14.7665 1.66666 15.3013 1.93914C15.7717 2.17882 16.1542 2.56128 16.3939 3.03168C16.6663 3.56646 16.6663 4.26653 16.6663 5.66666Z" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            }
                                            <p>Детали заказа</p>
                                        </Link>:
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M16.6654 10.4167V5.66667C16.6654 4.26654 16.6654 3.56647 16.3929 3.0317C16.1532 2.56129 15.7707 2.17884 15.3003 1.93916C14.7656 1.66667 14.0655 1.66667 12.6654 1.66667H7.33203C5.9319 1.66667 5.23183 1.66667 4.69705 1.93916C4.22665 2.17884 3.8442 2.56129 3.60451 3.0317C3.33203 3.56647 3.33203 4.26654 3.33203 5.66667V14.3333C3.33203 15.7335 3.33203 16.4335 3.60451 16.9683C3.8442 17.4387 4.22665 17.8212 4.69705 18.0609C5.23183 18.3333 5.93186 18.3333 7.33191 18.3333H10.4154M11.6654 9.16667H6.66536M8.33203 12.5H6.66536M13.332 5.83334H6.66536M17.4987 15.8333L14.9987 18.3333L12.4987 15.8333M14.9987 18.3333V13.3333" stroke="#152429" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p>Скачать чек</p>
                                        </button>
                                        } 

                    </div>
                    {order.status == 'processing' && (
                        <button className={cls.cancelOrderBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10.0013 18.3334C5.39893 18.3334 1.66797 14.6024 1.66797 10C1.66797 5.39764 5.39893 1.66669 10.0013 1.66669C14.6036 1.66669 18.3346 5.39764 18.3346 10C18.3346 14.6024 14.6036 18.3334 10.0013 18.3334ZM10.0013 16.6667C13.6832 16.6667 16.668 13.6819 16.668 10C16.668 6.31812 13.6832 3.33335 10.0013 3.33335C6.3194 3.33335 3.33464 6.31812 3.33464 10C3.33464 13.6819 6.3194 16.6667 10.0013 16.6667ZM10.0013 8.82152L12.3583 6.46449L13.5368 7.64299L11.1798 10L13.5368 12.357L12.3583 13.5355L10.0013 11.1785L7.64428 13.5355L6.46577 12.357L8.8228 10L6.46577 7.64299L7.64428 6.46449L10.0013 8.82152Z" fill="#8F9596"/>
                            </svg>
                            <p>Отменить заказ</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}