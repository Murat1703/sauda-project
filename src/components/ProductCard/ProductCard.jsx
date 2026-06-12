import { Badge } from '../Badge'
import cls from './ProductCard.module.css'
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
import { CounterIncreaseIcon } from '../../../public/assets/icons/CounterIncreaseIcon.jsx';
import { CounterDecreaseIcon } from '../../../public/assets/icons/CounterDecreaseIcon.jsx';
import { CounterToCartIcon } from '../../../public/assets/icons/CounterToCartIcon.jsx';


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

    const favoriteItem = favoritesList?.find((item)=>
        {return item?.product?.slug === product?.slug}
    )

    const handleToggleFavorite = () =>{
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
                toast(<SnackBar text={`Товар добавлен в избранное`}/>)
            }
        }
    }

    const [counter, setCounter] = useState(1);
    const [showCounter, setShowCounter] = useState(null)

    // useEffect(()=>{
    //     console.log(counter)
    // },[counter.count])

    const handleShowCounter = (product_slug) =>{
        setShowCounter(product_slug);
    }
    const [stockError, setStockError] = useState(null);

    const handleIncreaseCounter = () =>{
        if (counter<=product?.stock_quantity){
            setCounter((prev)=>prev + 1)
        } else{
            setStockError('Товар закончился')
        }
    }

    const handleDecreaseCounter = () =>{
        if (counter!=1){
            setCounter((prev)=>prev - 1)
            setStockError(null)
        } else{
          setShowCounter(null)
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
                    <div className={cls.badgesList}>
                        {product?.is_hit && <Badge type={`hit`}>Хит</Badge>}
                        {product?.is_new && <Badge type={`new`}>Новинка</Badge>}
                        {stockError && <Badge type={`error`}>{stockError}</Badge>}

                    </div>
                </div>
                <div className={cls.productCardInfo}>
                    <Link to={`/products/${product?.slug}`} className={cls.productCardInfoTop}>
                        <div className={cls.productCardInfoReviews}>
                            <ReviewItemStar />
                            <span>{reviewsList?.summary?.average_rating}</span>
                            <span>· {reviewsList?.summary?.reviews_count} отзвывов</span>
                        </div>
                        <h4>{product?.name}</h4>
                    </Link>
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
                        {product?.stock_quantity == 0 && <p>Нет в наличии</p>} 
                        {product?.stock_quantity !== 0 &&
                        <>
                        {showCounter !== product?.slug &&
                        <button 
                            className={cls.productCardBtn} 
                            // onClick={()=>{
                            //     addToCart({
                            //         product: product,
                            //         product_slug: product?.slug,
                            //         quantity: 1
                            //     })
                            //     toast(<SnackBar toCart={'/cart'} text={'Товар добавлен в корзину'}/>)
                            // }}
                            onClick={()=>handleShowCounter(product?.slug)}
                        >
                            <CartIcon />
                            <p>В корзину</p>
                        </button>}
                        {showCounter == product?.slug &&
                        <div className={cls.counterBlock}>
                            <div className={cls.counterWrapper}>
                                <button
                                    onClick={handleDecreaseCounter}
                                >
                                    <CounterIncreaseIcon />
                                </button>
                                <p>{counter}</p>
                                <button
                                    onClick={handleIncreaseCounter}
                                >
                                    <CounterDecreaseIcon />
                                </button>
                            </div>
                            <button 
                                onClick={()=>{
                                    addToCart({
                                        product: product,
                                        product_slug: product?.slug,
                                        quantity: counter
                                    })
                                    toast(<SnackBar toCart={'/cart'} text={'Товар добавлен в корзину'}/>)
                                }}
                            >
                                <CounterToCartIcon />
                            </button>
                        </div>}
                        </>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}