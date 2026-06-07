import { useEffect } from 'react'
import { Button } from '../../../components/Button'
import { Title } from '../../../components/Title'

import { useCart } from '../../../stores/useCart'
import { useState } from 'react'
import cls from './CartPage.module.css'
import { useMediaQuery } from 'react-responsive'
import { Badge } from '../../../components/Badge'
import { Link, useNavigate } from 'react-router-dom'
import { CartRemoveIcon } from '../../../../public/assets/icons/CartRemoveIcon'
import { CartAddIcon } from '../../../../public/assets/icons/CartAddIcon'
import { CheckGarrantyIcon } from '../../../../public/assets/icons/CheckGarrantyIcon'
import { CartRemoveIconMobile } from '../../../../public/assets/icons/CartRemoveIconMobile'
import { CartAddIconMobile } from '../../../../public/assets/icons/CartAddIconMobile'
import { CartShopIcon } from '../../../../public/assets/icons/CartShopIcon'
import { ArrowBackMobile } from '../../../../public/assets/icons/ArrowBackMobile'
import { ArrowRightOrderIcon } from '../../../../public/assets/icons/ArrowRightOrderIcon'
import { HeartIcon } from '../../../../public/assets/icons/HeartIcon'
import { HeartIconFilled } from '../../../../public/assets/icons/HeartIconFilled'
import { useFavoritesStore } from '../../../stores/useFavoritesStore'

export const CartPage = ({isAuth}) =>{

    const {cartItems, loadCart, addToCart, cartTotal, changeCount, removeFromCart, clearCart} = useCart();

    useEffect(()=>{
        if (isAuth == true) loadCart(); 
        else return;
    },[isAuth])

    const navigate = useNavigate();

    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    const [mobileDetails, setMobileDetails] = useState(false)   

    const {favoritesList, loadFavoritesList, addToFavoritesList} = useFavoritesStore();

    useEffect(()=>{
        loadFavoritesList();
    },[])

    const isFavorite = (id) =>{
        return favoritesList.includes(id)
    }

    useEffect(()=>{ 
        !isMobile && setMobileDetails(true)
    }, [isMobile])


    return(
        <>
        <div className={cls.cartPageWrapper}>
            <div className={cls.cartPageTitle}>
                {isMobile &&
                <Link to={'/'}>
                    <ArrowBackMobile />
                </Link>}
                <Title>
                    Корзина
                </Title>
                {isMobile &&
                <button onClick={()=>clearCart()}>
                    <p>Очистить</p>
                </button>}
            </div>
            <div className={cls.cartPageBody}>
                <div className={cls.cartContent} style={{padding: cartItems.length > 0 && "24px 12px"}}>
                    {cartItems?.length == 0 &&
                    <div className={cls.cartContentInfo}>
                        <div className={cls.cartContentTextEmpty}>
                            <div>
                                <CartShopIcon />
                            </div>
                            <div className={cls.cartEmptyText}>
                                <p>
                                    {!isAuth ? `Чтобы начать покупки войдите в аккаунт` : `В Корзине пока пусто `}
                                </p>
                                <p>Ознакомьтесь с нашим каталогом, надеемся что вы найдете для себя что-то интересное</p>
                            </div>
                        </div>
                        <Link to="/">
                            <p>Перейти в каталог</p>
                        </Link>
                    </div>}
                    {cartItems?.length > 0 && 
                        cartItems.map((item)=>{
                            return(
                                <div className={cls.cartItem} key={item.id}>
                                    <div className={cls.cartItemImgWrapper}>
                                        <img 
                                            src={item.product.primary_image_url} 
                                            alt={`${item.product.name}`}
                                        />
                                    </div>
                                    {isMobile && <>
                                    <div className={cls.cartItemMobileInfo}>
                                        <Link 
                                            to={`/products/${item?.product?.slug}`} 
                                            className={cls.cartItemTitleBlock}
                                        >
                                            <p>{item.product?.name}</p>
                                            <>
                                                <p>Код: {item.product.sku}</p>
                                                <div className={cls.mobileCartItemButtons}>
                                                    <button 
                                                        onClick={
                                                            ()=>{
                                            addToFavoritesList({
                                                product_slug: item?.product?.slug, 
                                                product: item.product
                                            });
                                                            }
                                                        }
                                                    >
                                                        {!isFavorite(item.id)?
                                                        <HeartIcon/>:
                                                        <HeartIconFilled />
                                                        }

                                                    </button>
                                                    <button onClick={()=>removeAllFromCart(item.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.29875 0.756593H10.7009C11.1382 0.756575 11.52 0.75656 11.8353 0.782323C12.1695 0.809628 12.5084 0.870347 12.8363 1.03743C13.3211 1.28447 13.7153 1.67865 13.9623 2.16348C14.1294 2.4914 14.1901 2.8303 14.2174 3.16449C14.239 3.42853 14.2425 3.73914 14.2431 4.08993H17.4998C18.0024 4.08993 18.4098 4.49735 18.4098 4.99993C18.4098 5.50251 18.0024 5.90993 17.4998 5.90993H16.7432V14.3704C16.7432 15.0389 16.7432 15.5952 16.7061 16.0494C16.6674 16.5225 16.584 16.9643 16.3715 17.3814C16.0446 18.023 15.5229 18.5447 14.8813 18.8716C14.4642 19.0841 14.0224 19.1675 13.5493 19.2062C13.0951 19.2433 12.5388 19.2433 11.8703 19.2433H8.12942C7.46091 19.2433 6.90457 19.2433 6.45041 19.2062C5.97726 19.1675 5.53546 19.0841 5.1184 18.8716C4.47677 18.5447 3.95511 18.023 3.62818 17.3814C3.41568 16.9643 3.33225 16.5225 3.29359 16.0494C3.25649 15.5952 3.2565 15.0389 3.25651 14.3704L3.25651 5.90993H2.49984C1.99726 5.90993 1.58984 5.50251 1.58984 4.99993C1.58984 4.49735 1.99726 4.08993 2.49984 4.08993H5.75661C5.75717 3.73914 5.76067 3.42853 5.78224 3.16449C5.80954 2.8303 5.87026 2.4914 6.03735 2.16348C6.28438 1.67865 6.67856 1.28447 7.16339 1.03743C7.49132 0.870347 7.83021 0.809628 8.16441 0.782323C8.47973 0.75656 8.86146 0.756575 9.29875 0.756593ZM5.07651 5.90993V14.3333C5.07651 15.0483 5.07722 15.5299 5.10755 15.9012C5.13701 16.2618 5.18983 16.4374 5.24981 16.5551C5.40225 16.8543 5.64549 17.0975 5.94466 17.25C6.06239 17.3099 6.23801 17.3628 6.59862 17.3922C6.96985 17.4226 7.45143 17.4233 8.16651 17.4233H11.8332C12.5483 17.4233 13.0298 17.4226 13.4011 17.3922C13.7617 17.3628 13.9373 17.3099 14.055 17.25C14.3542 17.0975 14.5974 16.8543 14.7499 16.5551C14.8099 16.4374 14.8627 16.2618 14.8921 15.9012C14.9225 15.5299 14.9232 15.0483 14.9232 14.3333V5.90993H5.07651ZM12.423 4.08993H7.57668C7.57735 3.74375 7.58063 3.50323 7.5962 3.3127C7.6143 3.09106 7.64441 3.01833 7.65898 2.98974C7.73153 2.84736 7.84728 2.73161 7.98966 2.65907C8.01825 2.6445 8.09097 2.61439 8.31262 2.59628C8.54488 2.5773 8.85145 2.57659 9.33318 2.57659H10.6665C11.1482 2.57659 11.4548 2.5773 11.6871 2.59628C11.9087 2.61439 11.9814 2.6445 12.01 2.65907C12.1524 2.73161 12.2682 2.84736 12.3407 2.98974C12.3553 3.01833 12.3854 3.09106 12.4035 3.3127C12.4191 3.50323 12.4223 3.74375 12.423 4.08993ZM8.33318 8.67326C8.83576 8.67326 9.24318 9.08068 9.24318 9.58326V13.7499C9.24318 14.2525 8.83576 14.6599 8.33318 14.6599C7.8306 14.6599 7.42318 14.2525 7.42318 13.7499V9.58326C7.42318 9.08068 7.8306 8.67326 8.33318 8.67326ZM11.6665 8.67326C12.1691 8.67326 12.5765 9.08068 12.5765 9.58326V13.7499C12.5765 14.2525 12.1691 14.6599 11.6665 14.6599C11.1639 14.6599 10.7565 14.2525 10.7565 13.7499V9.58326C10.7565 9.08068 11.1639 8.67326 11.6665 8.67326Z" fill="#8F9596"/>
                                                        </svg>
                                                    </button>
                                                </div>

                                            </>
                                        </Link>
                                        <div className={cls.cartItemPriceBlock}>
                                            <div className={cls.oldPriceWrapper}>
                                                {item.old_price && <p className={cls.oldPrice}>
                                                    <span>{item.old_price} ₸</span>
                                                    <Badge type='dicount'>-{item.discount_percent}%</Badge>
                                                    </p>}
                                                <p className={cls.finalPrice}>
                                                { 
                                                    cartTotal?.subtotal
                                                } ₸</p>
                                            </div>
                                            <div className={cls.pricePerProduct}></div>
                                        </div>
                                        <div className={cls.cartItemCounter}>
                                            <button 
                                                className={cls.counterBtn}
                                                onClick={()=>{
                                                    item.quantity <=1 
                                                    ?removeFromCart(item.id)
                                                    :changeCount(item.id, (item.quantity - 1))
                                                }}
                                            >
                                                <CartRemoveIconMobile />
                                            </button>
                                            <p>{item.quantity}</p>
                                            <button 
                                                className={cls.counterBtn}
                                                onClick={()=>changeCount(item.id, (item.quantity + 1))}
                                            >
                                                <CartAddIconMobile />
                                            </button>
                                        </div>
                                    </div>
                                    </>
                                    }
                                    {!isMobile && 
                                    <div className={cls.cartItemTextInfo}>
                                        <Link 
                                            to={`/products/${item?.product?.slug}`} 
                                            className={cls.cartItemTitleBlock}
                                        >
                                            <p>{item.product.name}</p>
                                            <p>Код: {item.product.sku}</p>
                                        </Link>
                                        <div className={cls.cartItemCounter}>
                                            <button 
                                                className={cls.counterBtn}
                                                onClick={()=>{
                                                    if (item.quantity <= 1){
                                                        removeFromCart(item.id);
                                                        return
                                                    }
                                                    changeCount(item.id, (item.quantity - 1));

                                                }}
                                            >
                                                <CartRemoveIcon />
                                            </button>
                                            <p>{item.quantity}</p>
                                            <button 
                                                className={cls.counterBtn}
                                            onClick={()=>changeCount(item.id, (item.quantity + 1))}>
                                                <CartAddIcon />
                                            </button>
                                        </div>
                                        <div className={cls.cartItemPriceBlock}>
                                            <div className={cls.oldPriceWrapper}>
                                                {item.product.old_price && <p className={cls.oldPrice}>{item.product.old_price} ₸</p>}
                                                <p className={cls.finalPrice}>
                                                { 
                                                    item.line_total
                                                } ₸</p>
                                            </div>
                                            <div className={cls.pricePerProduct}></div>
                                        </div>
                                    </div>}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`${cls.cartDetails} `} onClick={()=>{isMobile && setMobileDetails(!mobileDetails)}} >
                    <h4>Детали заказа</h4>
                    {mobileDetails ? 
                    <div className={cls.detailsInfo}>
                        <div className={cls.detailsItems}>
                            <div className={cls.detailItem}>
                                <p>Всего товаров</p>
                                <div className={cls.line}>
                                    <hr />
                                </div>
                                <span>{cartTotal?.items_quantity}</span>
                            </div>
                            <div className={cls.detailItem}>
                                <div>
                                    <CheckGarrantyIcon />
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
                                {cartTotal?.subtotal}₸
                            </span>
                        </div>
                        <button 
                            className={cls.orderBtn}
                            onClick={()=>navigate('/account/new-order')}
                            disabled={isAuth==false}
                        >
                            <p>Перейти к оформлению</p>
                            <ArrowRightOrderIcon />
                        </button>
                    </div>:
                    
                    <div className={cls.shortMobileDetails}>
                         <div>
                             <p>{cartTotal?.subtotal}₸</p>
                             <span>{cartTotal?.items_quantity} товара</span>
                         </div>
                         <button 
                            onClick={()=>navigate('/account/new-order')}
                        >
                            Оформить заказ
                        </button>
                    </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}