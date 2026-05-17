import { Badge } from '../Badge'
import cls from './ProductCard.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



export const ProductCard = ({product, addToFavorite, isFavorite}) =>{

    const {addToCart} = useCart();

    return(
        <>
        <div className={cls.productCard}>
            <div className={cls.productCardImagesWrapper}>
                <Swiper>
                    <SwiperSlide>
                        <img src={product?.image} alt={product?.title}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={product?.image} alt={product?.title}/>
                    </SwiperSlide>
                </Swiper>
                <button className={cls.favoriteBtn} onClick={addToFavorite}>
                    {!isFavorite? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99559 4.27985C8.32947 2.332 5.55109 1.80804 3.46355 3.59168C1.37601 5.37532 1.08211 8.35748 2.72147 10.467C4.08448 12.2209 8.20945 15.9201 9.56139 17.1174C9.71264 17.2513 9.78827 17.3183 9.87648 17.3446C9.95347 17.3676 10.0377 17.3676 10.1147 17.3446C10.2029 17.3183 10.2786 17.2513 10.4298 17.1174C11.7817 15.9201 15.9067 12.2209 17.2697 10.467C18.9091 8.35748 18.6511 5.35656 16.5276 3.59168C14.4042 1.8268 11.6617 2.332 9.99559 4.27985Z" stroke="#8F9596" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>:
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.32763 1.77985C6.6615 -0.168 3.88312 -0.691965 1.79558 1.09168C-0.291963 2.87532 -0.58586 5.85748 1.0535 7.967C2.41651 9.72092 6.54148 13.4201 7.89342 14.6174C8.04467 14.7513 8.1203 14.8183 8.20851 14.8446C8.2855 14.8676 8.36975 14.8676 8.44674 14.8446C8.53496 14.8183 8.61058 14.7513 8.76184 14.6174C10.1138 13.4201 14.2387 9.72092 15.6018 7.967C17.2411 5.85748 16.9831 2.85656 14.8597 1.09168C12.7362 -0.673202 9.99375 -0.168 8.32763 1.77985Z" fill="#FF4D00"/>
                    </svg>
                    }
                </button>
            </div>
            <div className={cls.productCardInfo}>
                <div className={cls.productCardInfoTop}>
                    <div className={cls.productCardInfoReviews}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M5.24042 0.366137C5.44704 -0.122051 6.1389 -0.12205 6.34552 0.366138L7.52421 3.15109C7.61086 3.35582 7.80361 3.49586 8.0251 3.51501L11.038 3.77541C11.5661 3.82106 11.7799 4.47906 11.3795 4.82642L9.09507 6.80803C8.92713 6.9537 8.85351 7.18029 8.90375 7.39685L9.58712 10.3428C9.70691 10.8592 9.14718 11.2658 8.69307 10.9923L6.10253 9.43205C5.91209 9.31736 5.67384 9.31736 5.48341 9.43205L2.89286 10.9923C2.43876 11.2658 1.87903 10.8592 1.99882 10.3428L2.68219 7.39685C2.73243 7.18029 2.65881 6.9537 2.49087 6.80803L0.206458 4.82642C-0.193987 4.47906 0.0198097 3.82106 0.547953 3.77541L3.56084 3.51501C3.78233 3.49586 3.97507 3.35582 4.06172 3.15109L5.24042 0.366137Z" fill="#FF4D00"/>
                        </svg>
                        <span>5.0</span>
                        <span>· 157 отзвывов</span>
                    </div>
                    <h4>{product?.description}</h4>
                </div>
                <div className={cls.productCardInfoPrice}>
                    <div className={cls.productCardPriceWrapper}>
                        <div className={cls.discountPrice}>
                            {product?.hasDiscount && 
                            <><span>{product?.oldPrice} ₸</span>
                            <Badge type={'discount'}>-{product?.discountPercent}%</Badge></>
                            }
                        </div>
                        <div className={cls.finalPrice}>
                            <span>{product?.finalPrice} ₸</span>
                        </div>
                    </div>
                    <button className={cls.productCardBtn} onClick={()=>{
                        addToCart(product.id);
                        toast(
                            <div className={cls.toastContent}>
                                <div>
                                    <p>Товар добавлен в корзину</p>
                                </div>
                                <Link to='/cart'>
                                    Нажмите, чтобы перейти
                                </Link>
                            </div>
                        )
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clip-path="url(#clip0_871_9594)">
                            <path d="M12.0008 6.75V4.5C12.0008 2.84315 10.6576 1.5 9.00077 1.5C7.34391 1.5 6.00077 2.84315 6.00077 4.5V6.75M2.69477 7.76397L2.24477 12.564C2.11682 13.9287 2.05285 14.6111 2.2793 15.1382C2.47824 15.6012 2.82685 15.984 3.26928 16.2253C3.77291 16.5 4.45829 16.5 5.82905 16.5H12.1725C13.5432 16.5 14.2286 16.5 14.7323 16.2253C15.1747 15.984 15.5233 15.6012 15.7222 15.1382C15.9487 14.6111 15.8847 13.9287 15.7568 12.564L15.3068 7.76397C15.1987 6.61151 15.1447 6.03528 14.8855 5.59962C14.6573 5.21594 14.32 4.90883 13.9167 4.71738C13.4588 4.5 12.88 4.5 11.7225 4.5L6.27905 4.5C5.12153 4.5 4.54277 4.5 4.08483 4.71738C3.68151 4.90883 3.34427 5.21594 3.11601 5.59962C2.85683 6.03528 2.80281 6.61151 2.69477 7.76397Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_871_9594">
                            <rect width="18" height="18" fill="white"/>
                            </clipPath>
                        </defs>
                        </svg>
                        <p>В корзину</p>
                    </button>
                </div>
            </div>
        </div>

        </>
    )
}