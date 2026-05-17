import { useEffect } from 'react'
import { Button } from '../../../components/Button'
import { Title } from '../../../components/Title'
import { useCart } from '../../../hooks/useCart'
import { useProducts } from '../../../hooks/useProducts'
import { useState } from 'react'
import cls from './CartPage.module.css'
import { ScrollToTop } from '../../../components/ScrollToTop'

export const CartPage = () =>{
    const {cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity} = useCart();
    console.log(cartItems)

    const {
        productsArrByIds: cartProducts,
        loadingProductsByIds,
        productsArrByIds,
        loadCartProducts
    } = useProducts();

    useEffect(() => {
        loadCartProducts(cartItems);
    }, [cartItems, loadCartProducts]);

    const summaryPrice = (quantity, price) =>{
        let sum;
        return sum = quantity * price
    }

    console.log(cartProducts)



    const totalPrice = cartProducts?.reduce((sum, item) => {
        return sum + item.quantity * item.finalPrice;
    }, 0);






    


    return(
        <>
        <ScrollToTop />
        <div className={cls.cartPageWrapper}>
            <div className={cls.cartPageTitle}>
                <Title>
                    Корзина
                </Title>
            </div>
            <div className={cls.cartPageBody}>
                <div className={cls.cartContent} style={{padding: cartItems.length > 0 && "24px 12px"}}>
                    {cartItems?.length == 0 &&
                    <div className={cls.cartContentInfo}>
                        <div className={cls.cartContentTextEmpty}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M13.0098 4H35.0098C35.6392 4 36.232 4.29638 36.6098 4.8L42.0098 12V42C42.0098 43.1046 41.1144 44 40.0098 44H8.00977C6.90521 44 6.00977 43.1046 6.00977 42V12L11.4098 4.8C11.7875 4.29638 12.3803 4 13.0098 4ZM37.0098 12L34.0098 8H14.0098L11.0098 12H37.0098ZM18.0098 20H14.0098V24C14.0098 29.5228 18.4869 34 24.0098 34C29.5326 34 34.0098 29.5228 34.0098 24V20H30.0098V24C30.0098 27.3138 27.3234 30 24.0098 30C20.696 30 18.0098 27.3138 18.0098 24V20Z" fill="#FF5302"/>
                                </svg>
                            </div>
                            <div className={cls.cartEmptyText}>
                                <p>В Корзине пока пусто</p>
                                <p>Ознакомьтесь с нашим каталогом, надеемся что вы найдете для себя что-то интересное</p>
                            </div>
                        </div>
                        <Button>
                            <p>Перейти в каталог</p>
                        </Button>
                    </div>}
                    {cartItems?.length > 0 && 
                        productsArrByIds?.map((item,index)=>{
                            return (
                            <div className={cls.cartItem}>
                                <div className={cls.cartItemImgWrapper}>
                                    <img src={item.image} alt='cart-img'/>
                                </div>
                                <div className={cls.cartItemTitleBlock}>
                                    <p>{item.title}</p>
                                    <p>Код: {item.id}</p>
                                </div>
                                <div className={cls.cartItemCounter}>
                                    <button 
                                        className={cls.counterBtn}
                                        onClick={()=>{(item.quantity == 1) ? removeFromCart(item.id) :decreaseQuantity(item.id)}}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4.16602 10H15.8327" stroke="#FF5302" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button className={cls.counterBtn}
                                    onClick={()=>increaseQuantity(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.99935 4.16663V15.8333M4.16602 9.99996H15.8327" stroke="#FF5302" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className={cls.cartItemPriceBlock}>
                                    <div className={cls.oldPriceWrapper}>
                                        {item.hasDiscount && <p className={cls.oldPrice}>{item.oldPrice} ₸</p>}
                                        <p className={cls.finalPrice}>
                                        { 
                                            summaryPrice(item.quantity, item.finalPrice)
                                        } ₸</p>
                                    </div>
                                    <div className={cls.pricePerProduct}></div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                <div className={cls.cartDetails}>
                    <h4>Детали заказа</h4>
                    <div className={cls.detailsInfo}>
                        <div className={cls.detailsItems}>
                            <div className={cls.detailItem}>
                                <p>Всего товаров</p>
                                <div className={cls.line}>
                                    <hr />
                                </div>
                                <span>{cartItems.length}</span>
                            </div>
                            <div className={cls.detailItem}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M15.6112 7.05714L14.52 5.9661C14.261 5.70711 14.0488 5.19531 14.0488 4.82827V3.28527C14.0488 2.55127 13.4492 1.95165 12.7154 1.95126H11.1717C10.8051 1.95126 10.2927 1.73864 10.0337 1.47984L8.94267 0.388806C8.42426 -0.129602 7.57545 -0.129602 7.05704 0.388806L5.96601 1.48062C5.70678 1.73961 5.1938 1.95165 4.82798 1.95165H3.28498C2.55195 1.95165 1.95155 2.55127 1.95155 3.28527V4.82831C1.95155 5.1939 1.73936 5.70731 1.48033 5.96614L0.389099 7.05718C-0.1297 7.57559 -0.1297 8.42439 0.389099 8.94362L1.48033 10.0347C1.73952 10.2936 1.95155 10.8069 1.95155 11.1725V12.7155C1.95155 13.4487 2.55195 14.0492 3.28498 14.0492H4.82801C5.19462 14.0492 5.70702 14.2613 5.96604 14.5202L7.05708 15.6116C7.57549 16.1296 8.4243 16.1296 8.9427 15.6116L10.0337 14.5202C10.293 14.2612 10.8052 14.0492 11.1718 14.0492H12.7154C13.4492 14.0492 14.0488 13.4487 14.0488 12.7155V11.1725C14.0488 10.8053 14.2612 10.2935 14.52 10.0347L15.6113 8.94362C16.1293 8.42439 16.1293 7.57555 15.6112 7.05714ZM6.94145 11.0002L3.9996 8.05798L4.94243 7.11534L6.94169 9.1146L11.0572 5.00011L11.9998 5.94274L6.94145 11.0002Z" fill="#FF5302"/>
                                    </svg>
                                    <p>Гарантия подлинности</p>
                                </div>
                                <div className={cls.line}>
                                    <hr />
                                </div>
                                <span>Бесплатно</span>
                            </div>
                            <div className={cls.detailItem}>
                                <p>Всего</p>
                                <div className={cls.line}>
                                    <hr />
                                </div>
                                <span>0₸</span>
                            </div>
                            <div className={cls.detailItem}>
                                <p>Скидка</p>
                                <div className={cls.line}>
                                    <hr />
                                </div>
                                <span>0₸</span>
                            </div>
                        </div>
                        <div className={`${cls.detailItem} ${cls.totalPrice}`}>
                            <p>Итого</p>
                            <div className={cls.line}>
                                <hr />
                            </div>
                            <span>
                                {totalPrice}₸
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}