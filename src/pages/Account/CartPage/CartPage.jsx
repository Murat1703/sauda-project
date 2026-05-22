import { useEffect } from 'react'
import { Button } from '../../../components/Button'
import { Title } from '../../../components/Title'
import { useCart } from '../../../hooks/useCart'
import { useProducts } from '../../../hooks/useProducts'
import { useState } from 'react'
import cls from './CartPage.module.css'
import { useMediaQuery } from 'react-responsive'
import { Badge } from '../../../components/Badge'
import { useFavorites } from '../../../hooks/useFavorites'
import { Link } from 'react-router-dom'

export const CartPage = () =>{
    const {cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart} = useCart();

    
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

    const totalPrice = cartProducts?.reduce((sum, item) => {
        return sum + item.quantity * item.finalPrice;
    }, 0);



    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    const [mobileDetails, setMobileDetails] = useState(false)   
    const {favorites, toggleFavorites} = useFavorites();

    const isFavorite = (id) =>{
        return favorites.includes(id)
    }

    console.log(mobileDetails)

    useEffect(()=>{ 
        !isMobile && setMobileDetails(true)
    }, [isMobile])



    return(
        <>
        <div className={cls.cartPageWrapper}>
            <div className={cls.cartPageTitle}>
                {isMobile &&
                <Link to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 5L5 12L12 19" stroke="#152429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M13.0098 4H35.0098C35.6392 4 36.232 4.29638 36.6098 4.8L42.0098 12V42C42.0098 43.1046 41.1144 44 40.0098 44H8.00977C6.90521 44 6.00977 43.1046 6.00977 42V12L11.4098 4.8C11.7875 4.29638 12.3803 4 13.0098 4ZM37.0098 12L34.0098 8H14.0098L11.0098 12H37.0098ZM18.0098 20H14.0098V24C14.0098 29.5228 18.4869 34 24.0098 34C29.5326 34 34.0098 29.5228 34.0098 24V20H30.0098V24C30.0098 27.3138 27.3234 30 24.0098 30C20.696 30 18.0098 27.3138 18.0098 24V20Z" fill="#FF5302"/>
                                </svg>
                            </div>
                            <div className={cls.cartEmptyText}>
                                <p>В Корзине пока пусто</p>
                                <p>Ознакомьтесь с нашим каталогом, надеемся что вы найдете для себя что-то интересное</p>
                            </div>
                        </div>
                        <Link to="/">
                            <p>Перейти в каталог</p>
                        </Link>
                    </div>}
                    {cartItems?.length > 0 && 
                        productsArrByIds?.map((item,index)=>{
                            return (
                            <div className={cls.cartItem} key={item.id}>
                                <div className={cls.cartItemImgWrapper}>
                                    <img src={item.image} alt='cart-img'/>
                                </div>
                                {isMobile && <>
                                <div className={cls.cartItemMobileInfo}>
                                    <div className={cls.cartItemTitleBlock}>
                                        <p>{item.description}</p>
                                        <>
                                            <p>Код: {item.id}</p>
                                            <div className={cls.mobileCartItemButtons}>
                                                <button 
                                                    onClick={()=>toggleFavorites(item.id)}
                                                >
                                                    {!isFavorite(item.id)?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.99413 4.27985C8.328 2.332 5.54963 1.80804 3.46208 3.59168C1.37454 5.37532 1.08064 8.35748 2.72 10.467C4.08302 12.2209 8.20798 15.9201 9.55992 17.1174C9.71117 17.2513 9.7868 17.3183 9.87501 17.3446C9.95201 17.3676 10.0363 17.3676 10.1132 17.3446C10.2015 17.3183 10.2771 17.2513 10.4283 17.1174C11.7803 15.9201 15.9052 12.2209 17.2683 10.467C18.9076 8.35748 18.6496 5.35656 16.5262 3.59168C14.4028 1.8268 11.6603 2.332 9.99413 4.27985Z" stroke="#8F9596" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>:
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.32763 1.77985C6.6615 -0.168 3.88312 -0.691965 1.79558 1.09168C-0.291963 2.87532 -0.58586 5.85748 1.0535 7.967C2.41651 9.72092 6.54148 13.4201 7.89342 14.6174C8.04467 14.7513 8.1203 14.8183 8.20851 14.8446C8.2855 14.8676 8.36975 14.8676 8.44674 14.8446C8.53496 14.8183 8.61058 14.7513 8.76184 14.6174C10.1138 13.4201 14.2387 9.72092 15.6018 7.967C17.2411 5.85748 16.9831 2.85656 14.8597 1.09168C12.7362 -0.673202 9.99375 -0.168 8.32763 1.77985Z" fill="#FF4D00"/>
                                                    </svg>
                                                    }

                                                </button>
                                                <button onClick={()=>removeFromCart(item.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.29875 0.756593H10.7009C11.1382 0.756575 11.52 0.75656 11.8353 0.782323C12.1695 0.809628 12.5084 0.870347 12.8363 1.03743C13.3211 1.28447 13.7153 1.67865 13.9623 2.16348C14.1294 2.4914 14.1901 2.8303 14.2174 3.16449C14.239 3.42853 14.2425 3.73914 14.2431 4.08993H17.4998C18.0024 4.08993 18.4098 4.49735 18.4098 4.99993C18.4098 5.50251 18.0024 5.90993 17.4998 5.90993H16.7432V14.3704C16.7432 15.0389 16.7432 15.5952 16.7061 16.0494C16.6674 16.5225 16.584 16.9643 16.3715 17.3814C16.0446 18.023 15.5229 18.5447 14.8813 18.8716C14.4642 19.0841 14.0224 19.1675 13.5493 19.2062C13.0951 19.2433 12.5388 19.2433 11.8703 19.2433H8.12942C7.46091 19.2433 6.90457 19.2433 6.45041 19.2062C5.97726 19.1675 5.53546 19.0841 5.1184 18.8716C4.47677 18.5447 3.95511 18.023 3.62818 17.3814C3.41568 16.9643 3.33225 16.5225 3.29359 16.0494C3.25649 15.5952 3.2565 15.0389 3.25651 14.3704L3.25651 5.90993H2.49984C1.99726 5.90993 1.58984 5.50251 1.58984 4.99993C1.58984 4.49735 1.99726 4.08993 2.49984 4.08993H5.75661C5.75717 3.73914 5.76067 3.42853 5.78224 3.16449C5.80954 2.8303 5.87026 2.4914 6.03735 2.16348C6.28438 1.67865 6.67856 1.28447 7.16339 1.03743C7.49132 0.870347 7.83021 0.809628 8.16441 0.782323C8.47973 0.75656 8.86146 0.756575 9.29875 0.756593ZM5.07651 5.90993V14.3333C5.07651 15.0483 5.07722 15.5299 5.10755 15.9012C5.13701 16.2618 5.18983 16.4374 5.24981 16.5551C5.40225 16.8543 5.64549 17.0975 5.94466 17.25C6.06239 17.3099 6.23801 17.3628 6.59862 17.3922C6.96985 17.4226 7.45143 17.4233 8.16651 17.4233H11.8332C12.5483 17.4233 13.0298 17.4226 13.4011 17.3922C13.7617 17.3628 13.9373 17.3099 14.055 17.25C14.3542 17.0975 14.5974 16.8543 14.7499 16.5551C14.8099 16.4374 14.8627 16.2618 14.8921 15.9012C14.9225 15.5299 14.9232 15.0483 14.9232 14.3333V5.90993H5.07651ZM12.423 4.08993H7.57668C7.57735 3.74375 7.58063 3.50323 7.5962 3.3127C7.6143 3.09106 7.64441 3.01833 7.65898 2.98974C7.73153 2.84736 7.84728 2.73161 7.98966 2.65907C8.01825 2.6445 8.09097 2.61439 8.31262 2.59628C8.54488 2.5773 8.85145 2.57659 9.33318 2.57659H10.6665C11.1482 2.57659 11.4548 2.5773 11.6871 2.59628C11.9087 2.61439 11.9814 2.6445 12.01 2.65907C12.1524 2.73161 12.2682 2.84736 12.3407 2.98974C12.3553 3.01833 12.3854 3.09106 12.4035 3.3127C12.4191 3.50323 12.4223 3.74375 12.423 4.08993ZM8.33318 8.67326C8.83576 8.67326 9.24318 9.08068 9.24318 9.58326V13.7499C9.24318 14.2525 8.83576 14.6599 8.33318 14.6599C7.8306 14.6599 7.42318 14.2525 7.42318 13.7499V9.58326C7.42318 9.08068 7.8306 8.67326 8.33318 8.67326ZM11.6665 8.67326C12.1691 8.67326 12.5765 9.08068 12.5765 9.58326V13.7499C12.5765 14.2525 12.1691 14.6599 11.6665 14.6599C11.1639 14.6599 10.7565 14.2525 10.7565 13.7499V9.58326C10.7565 9.08068 11.1639 8.67326 11.6665 8.67326Z" fill="#8F9596"/>
                                                    </svg>
                                                </button>
                                            </div>

                                        </>
                                    </div>
                                    <div className={cls.cartItemPriceBlock}>
                                        <div className={cls.oldPriceWrapper}>
                                            {item.hasDiscount && <p className={cls.oldPrice}>
                                                <span>{item.oldPrice} ₸</span>
                                                <Badge type='dicount'>-{item.discountPercent}%</Badge>
                                                </p>}
                                            <p className={cls.finalPrice}>
                                            { 
                                                summaryPrice(item.quantity, item.finalPrice)
                                            } ₸</p>
                                        </div>
                                        <div className={cls.pricePerProduct}></div>
                                    </div>
                                    <div className={cls.cartItemCounter}>
                                        <button 
                                            className={cls.counterBtn}
                                            onClick={()=>{(item.quantity == 1) ? removeFromCart(item.id) :decreaseQuantity(item.id)}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M4.16602 10H15.8327" stroke="#FF5302" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <p>{item.quantity}</p>
                                        <button className={cls.counterBtn}
                                        onClick={()=>increaseQuantity(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M9.99935 4.16663V15.8333M4.16602 9.99996H15.8327" stroke="#FF5302" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                </>
                                }
                                {!isMobile && <>
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
                                        <path d="M4.16602 10H15.8327" stroke="#FF5302" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button className={cls.counterBtn}
                                    onClick={()=>increaseQuantity(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.99935 4.16663V15.8333M4.16602 9.99996H15.8327" stroke="#FF5302" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
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
                                </>}
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
                    </div>:
                    
                    <div className={cls.shortMobileDetails}>
                         <div>
                             <p>{totalPrice}₸</p>
                             <span>{cartItems.length} товара</span>
                         </div>
                         <button onClick={(e)=>e.stopPropagation()}>Оформить заказ</button>
                    </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}