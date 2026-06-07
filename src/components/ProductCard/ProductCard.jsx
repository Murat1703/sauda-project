import { Badge } from '../Badge'
import cls from './ProductCard.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useCart } from '../../stores/useCart.js';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ReviewItemStar } from '../../../public/assets/icons/ReviewIconStar';
import { HeartIcon } from '../../../public/assets/icons/HeartIcon';
import { HeartIconFilled } from '../../../public/assets/icons/HeartIconFilled';
import { CartIcon } from '../../../public/assets/icons/CartIcon';
import { SnackBar } from '../SnackBar';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../stores/useFavoritesStore.js';
import { useEffect, useState } from 'react';


export const ProductCard = ({product, isFavorite, isDelete}) =>{

    const {addToCart, cartItems} = useCart();
    const 
        {
            favoritesList, 
            addToFavoritesList, 
            loadFavoritesList, 
            deleteFromFavoritesList, 
            addToLocalFavoritesList, 
            deleteFromLocalFavoritesList        
        } 
    = useFavoritesStore();

    const navigate = useNavigate();

    const {isAuth} = useAuth();
    const [addFavorite, setAddFavorite] = useState(false);

    return(
        <>
            <div className={cls.productCard}>
                <div className={cls.productCardImagesWrapper}>
                    <div className={cls.productCardImages}>
                        <img 
                            src={`${product?.primary_image_url 
                                    ? product?.primary_image_url
                                    : product?.images?.[0].url}`
                            } 
                            alt={`${product?.name}`}
                            lazy={`true`}
                            style={{
                                opacity: product?.stock_quantity ==0 ? "0.5": "1"
                            }}
                        />
                    </div>
                    <button 
                        className={cls.favoriteBtn} 
                        onClick={()=>{
                            const shouldAdd = !addFavorite
                            setAddFavorite(shouldAdd);
                            if ((isDelete==true) && (isAuth == true)) {
                                deleteFromFavoritesList(product?.id)
                                toast.error(
                                    <SnackBar 
                                        text={'Товар удален из избранного'}
                                    />
                                );
                                return;
                            }
                            if ((isDelete==true) && (isAuth == false)){
                                deleteFromLocalFavoritesList(product?.id)
                                toast.error(
                                    <SnackBar 
                                        text={'Товар удален из избранного'}
                                    />
                                );
                                return;
                            }
                            if (isAuth == true && !isDelete){
                                if (shouldAdd == true){
                                    addToFavoritesList({
                                        product_slug: product?.slug
                                    });
                                    toast(
                                        <SnackBar 
                                            text={'Товар добавлен в избранное'}
                                        />
                                    )
                                } else{
                                    deleteFromFavoritesList(product?.id)
                                    toast.error(
                                        <SnackBar 
                                            text={'Товар удален из избранного'}
                                        />
                                    )
                                }
                            }  
                            if (isAuth == false && !isDelete){
                                if (shouldAdd == true){
                                    addToLocalFavoritesList({
                                        product_slug: product?.slug,
                                        product: product
                                    });
                                    toast(
                                        <SnackBar text={'Товар добавлен в избранное'}/>
                                    )
                                } else{
                                    deleteFromLocalFavoritesList(product?.id)
                                    toast.error(
                                        <SnackBar text={'Товар удален из избранного'}/>
                                    )
                                }
                            }                          
                        }}
                    >
                        {!isFavorite?<HeartIcon />:<HeartIconFilled />}
                    </button>
                    {product?.is_hit && <Badge type={`hit`}>Хит</Badge>}
                    {product?.is_new && <Badge type={`new`}>Новинка</Badge>}
                </div>
                <div className={cls.productCardInfo}>
                    <div className={cls.productCardInfoTop}>
                        <div className={cls.productCardInfoReviews}>
                            <ReviewItemStar />
                            <span>5.0</span>
                            <span>· 157 отзвывов</span>
                        </div>
                        <h4>{product?.name}</h4>
                    </div>
                    <div className={cls.productCardInfoPrice}>
                        <div className={cls.productCardPriceWrapper}>
                            <div className={cls.discountPrice}>
                                {
                                product?.old_price && 
                                <>
                                <span>{product?.old_price} ₸</span>
                                <Badge 
                                    type={'discount'}
                                >
                                    -{product?.discount_percent}%
                                </Badge>
                                </>
                                }
                            </div>
                            <div className={cls.finalPrice}>
                                <span>{product?.price} ₸</span>
                            </div>
                        </div>
                        {product?.stock_quantity == 0 ? <p>Нет в наличии</p> :
                        <button 
                            className={cls.productCardBtn} 
                            onClick={()=>{
                                if (isAuth == true) {
                                    addToCart({
                                        product_slug: product?.slug,
                                        quantity: 1
                                    });
                                    toast(
                                        <SnackBar 
                                            text={'Товар добавлен в корзину'}
                                            toCart={'/cart'}
                                        />
                                    )
                                } else{
                                    navigate('/cart')
                                }
                        }}>
                            <CartIcon />
                            <p>В корзину</p>
                        </button>}
                    </div>
                    <Link 
                        className={cls.productCardLink} 
                        to={`/products/${product.slug}`} 
                    />
                </div>
            </div>
        </>
    )
}