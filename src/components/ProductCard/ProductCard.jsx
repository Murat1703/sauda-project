import { Badge } from '../Badge'
import cls from './ProductCard.module.css'
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
import { useCart } from '../../stores/useCart.js';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ReviewItemStar } from '../../../public/assets/icons/ReviewIconStar';
import { HeartIcon } from '../../../public/assets/icons/HeartIcon';
import { HeartIconFilled } from '../../../public/assets/icons/HeartIconFilled';
import { CartIcon } from '../../../public/assets/icons/CartIcon';
import { SnackBar } from '../SnackBar';
// import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../stores/useFavoritesStore.js';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore.js';
import { useReviewsStore } from '../../stores/useReviewsStore.js';
import { useAuth } from '../../context/AuthContext.jsx';


export const ProductCard = ({product, isFavorite, isDelete}) =>{

    const {addToCart, cartItems} = useCart();
    const{favoritesList, addToFavoritesList, deleteFromFavoritesList, addToLocalFavoritesList, deleteFromLocalFavoritesList} = useFavoritesStore();

    const navigate = useNavigate();

    const {isAuth} = useAuth();

    // console.log(isAuth)
    const [addFavorite, setAddFavorite] = useState(false);

    const {loadReviews, reviewsList} = useReviewsStore();

    useEffect(()=>{
        loadReviews(product?.slug)
    },[]);

    const formatPrice = (price) => {
        return Number(price).toLocaleString('ru-RU', {
            maximumFractionDigits: 0,
        });
    };

    console.log('favoritesList', favoritesList)
    console.log('product', product)


    const favoriteItem = favoritesList?.find((item)=>
        {return item?.product?.slug === product?.slug}
    )

    const isProductFavorite = Boolean(favoriteItem)
    // console.log(product);

    // console.log('favoriteItem, ',favoriteItem)
    const handleToggleFavorite = () =>{
        console.log(favoriteItem)
        console.log(product)
        if (isAuth == false) {
            if (favoriteItem?.product?.slug === product?.slug){
                deleteFromLocalFavoritesList(favoriteItem?.product?.id);
                toast(<SnackBar text={`Товар удален из избранного `} />)
            }else {
                addToLocalFavoritesList({
                    product_slug: product?.slug, 
                    product: product
                });
                toast(<SnackBar text={`Товар добавлен в избранное`} />)
            }
        }else{
            if (favoriteItem?.product?.slug === product?.slug){
                deleteFromFavoritesList(favoriteItem?.product?.id);
                toast.error(<SnackBar text={`Товар удален из избранного`} />)
            }else {
                addToFavoritesList({
                    product_slug: product?.slug, 
                    product: product
                });
                toast.error(<SnackBar text={`Товар добавлен в избранное`}/>)
            }
        }
    }


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
                        onClick={handleToggleFavorite}
                    >
                        {
                            favoriteItem?.product?.slug == product?.slug?
                            <HeartIconFilled />
                            :<HeartIcon />
                        }
                    </button>
                    {product?.is_hit && <Badge type={`hit`}>Хит</Badge>}
                    {product?.is_new && <Badge type={`new`}>Новинка</Badge>}
                </div>
                <div className={cls.productCardInfo}>
                    <div className={cls.productCardInfoTop}>
                        <div className={cls.productCardInfoReviews}>
                            <ReviewItemStar />
                            <span>{reviewsList?.summary?.average_rating}</span>
                            <span>· {reviewsList?.summary?.reviews_count} отзвывов</span>
                        </div>
                        <h4>{product?.name}</h4>
                    </div>
                    <div className={cls.productCardInfoPrice}>
                        <div className={cls.productCardPriceWrapper}>
                            <div className={cls.discountPrice}>
                                {
                                product?.old_price && 
                                <>
                                <span>{formatPrice(product?.old_price)} ₸</span>
                                <Badge 
                                    type={'discount'}
                                >
                                    -{product?.discount_percent}%
                                </Badge>
                                </>
                                }
                            </div>
                            <div className={cls.finalPrice}>
                                <span>{formatPrice(product?.price)} ₸</span>
                            </div>
                        </div>
                        {product?.stock_quantity == 0 ? <p>Нет в наличии</p> :
                        <button 
                            className={cls.productCardBtn} 
                            onClick={()=>{
                                addToCart({
                                    product: product,
                                    product_slug: product?.slug,
                                    quantity: 1
                                })
                                toast(<SnackBar toCart={'/cart'} text={'Товар добавлен в корзину'}/>)
                            }}
                        >
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