import { Badge } from '../Badge'
import cls from './ProductCard.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { ReviewItemStar } from '../../../public/assets/icons/ReviewIconStar';
import { HeartIcon } from '../../../public/assets/icons/HeartIcon';
import { HeartIconFilled } from '../../../public/assets/icons/HeartIconFilled';
import { CartIcon } from '../../../public/assets/icons/CartIcon';
import { SnackBar } from '../SnackBar';



export const ProductCard = ({product, isFavorite}) =>{

    const {addToCart} = useCart();
    const {toggleFavorites} = useFavorites();

    // console.log(product,'productCard')
    
    return(
        <>
            <div className={cls.productCard}>
                <div className={cls.productCardImagesWrapper}>
                    {/* <Swiper>
                        <SwiperSlide>
                            <img src={product?.image} alt={product?.title}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={product?.image} alt={product?.title}/>
                        </SwiperSlide>
                    </Swiper> */}
                    {/* <div className={cls.productCardImages}> */}
                        <img 
                            src={`${product?.primary_image_url 
                                    ? product?.primary_image_url
                                    : product?.images?.[0].url}`
                            } 
                            alt={`${product?.name}`}
                            lazy={`true`}
                        />
                    {/* </div> */}
                    <button 
                        className={cls.favoriteBtn} 
                        onClick={()=>{
                            toggleFavorites(product?.slug);
                            {!isFavorite ? toast(
                                <SnackBar text={'Товар добавлен в избранное'}/>
                            ):toast.error(
                                <SnackBar text={'Товар удален из избранного'} isDelete={true}/>
                            )
                        
                            }            
                        }}
                    >
                        {!isFavorite? 
                        <HeartIcon />:<HeartIconFilled />
                        }
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
                                <Badge type={'discount'}>-{product?.discount_percent}%</Badge>
                                </>
                                }
                            </div>
                            <div className={cls.finalPrice}>
                                <span>{product?.price} ₸</span>
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
                            <CartIcon />
                            <p>В корзину</p>
                        </button>
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