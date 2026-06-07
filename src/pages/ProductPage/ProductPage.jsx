import { useParams } from 'react-router-dom'
import cls from './ProductPage.module.css'
import { useProducts } from '../../stores/useProducts.js';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../components/AccountLayout';
import { Title } from '../../components/Title';
import { Badge } from '../../components/Badge';
// import { useCart } from '../../hooks/useCart';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import { Button } from '../../components/Button';
import { ProductCard } from '../../components/ProductCard';
import { TextInfo } from '../../components/TextInfo/TextInfo.jsx';
import { CartIcon } from '../../../public/assets/icons/CartIcon.jsx';
import { PickUpIcon } from '../../../public/assets/icons/PickUpIcon.jsx';
import { StandartDeliveryIcon } from '../../../public/assets/icons/StandartDeliveryIcon.jsx';
import { ExpressDeliveryIcon } from '../../../public/assets/icons/ExpressDeliveryIcon.jsx';
import { ReviewItemStar } from '../../../public/assets/icons/ReviewIconStar.jsx';
import { SnackBar } from '../../components/SnackBar/SnackBar.jsx';
import { HeartIcon } from '../../../public/assets/icons/HeartIcon.jsx';
import { HeartIconFilled } from '../../../public/assets/icons/HeartIconFilled.jsx';
import { RepostIcon } from '../../../public/assets/icons/RepostIcon.jsx';
import { useCart } from '../../stores/useCart.js';
import { useFavoritesStore } from '../../stores/useFavoritesStore.js';
import { useAuth } from '../../context/AuthContext.jsx';
import {CartRemoveIconMobile} from '../../../public/assets/icons/CartRemoveIconMobile.jsx'
import { CartRemoveIconMobileDark } from '../../../public/assets/icons/CartRemoveIconMobileDark.jsx';
import { CartAddIconMobileDark } from '../../../public/assets/icons/CartAddMobileIconDark.jsx';
import { toast } from 'react-toastify';
import { useReviewsStore } from '../../stores/useReviewsStore.js';
import { ProductPageDecreaseCounterIcon } from '../../../public/assets/icons/ProductPageDecreaseCounterIcon.jsx';
import { ProductPageIncreaseIcon } from '../../../public/assets/icons/ProductPageIncreaseIcon.jsx';


export const ProductPage = ({isMobileScroll}) =>{

    const {slug} = useParams();

    const {product, loadProduct, loadingProduct, products, loadingProducts, loadProducts} = useProducts();

    useEffect(()=>{
        if (!slug) return;
        loadProduct(slug)
    },[slug])

    const [add, setAdd] = useState(false);

    const [counter, setCounter] = useState(0);
    useEffect(()=>{
    },[counter])

    const today = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
    });

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [active, setActive] = useState(0);

    const isMobile = useMediaQuery({
        maxWidth: 768
    });

    const{favoritesList, addToFavoritesList, deleteFromFavoritesList, addToLocalFavoritesList, deleteFromLocalFavoritesList} = useFavoritesStore();

    const [addToFavorite, setAddToFavorite] = useState(false);

    const [showMoreGaranty, setShowMoreGaranty] = useState(false);

    const [mobileCount, setMobileCount] = useState(5);

    const handleShowAll = () =>{
        setMobileCount(product?.product?.attributes.length)
    }

    const {cartItems, loadCart, addToCart, cartTotal, changeCount, removeFromCart, clearCart, errLoadingCart} = useCart();

    const {isAuth} = useAuth();

    const {reviewsList, loadReviews, addReview} = useReviewsStore();
    
    console.log('product page.=  slug', slug)
    console.log('reviews = ',reviewsList)


    useEffect(()=>{
        if (!slug) return;
        loadReviews(slug)
    },[slug])

    const cartItem = cartItems?.find(
        (item) => item?.product?.id === item.product_id
    );

    const favoriteItem = favoritesList?.find((item)=>
        item?.product?.slug === product?.product?.slug
    )

    console.log('isAuth', isAuth)

    return(
    <>
        {loadingProduct && <Loader />}
        <div className={cls.productPageWrapper} >
            {!isMobile &&
            <div className={cls.productPageContent}>
                <div className={cls.productTitleBlock}>
                    <div>
                        <div className={cls.breadCrumbsBlock}>
                            <BreadCrumbs>
                                Каталог
                            </BreadCrumbs>
                            {product?.product?.breadcrumbs?.map((breadcrumbItem, index)=>{
                                console.log(breadcrumbItem)
                                return (
                                    <div key={breadcrumbItem.slug}>
                                        <span>-</span>

                                        <Link to={`/catalog/categories/${breadcrumbItem.slug}`} >{breadcrumbItem.name}</Link>
                                    </div>
                                )
                            })}

                        </div>
                        <Title>
                            {product?.product?.name}
                        </Title>
                    </div>
                    <span>Код: {product?.product?.sku}</span>
                </div>
                <div className={cls.productInfoBlock}>
                    <div className={cls.left}>
                        <div className={cls.productSpecifications}>
                            <div className={cls.productSpecificationsImages}>
                                <Swiper
                                    style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                    }}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    {product?.product?.images.map((item, index)=>{
                                        return(
                                            <SwiperSlide key={index}>
                                                <img 
                                                    src={`${item.url}`} 
                                                    alt={`${item.name}`}
                                                    lazy={`true`}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Thumbs]}
                                    className="mySwiper"
                                >
                                    {product?.product?.images.map((item, index)=>{
                                        return(
                                            <SwiperSlide key={index}>
                                                <img 
                                                    src={`${item.url}`} alt={`${item.name}`}
                                                    lazy={`true`}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>

                            </div>
                            <div className={cls.text}>
                                <div className={cls.textItem}>
                                            <span>Бренд</span>
                                            <div className={cls.line}></div>
                                            <p>{product?.product?.brand.name}</p>
                                </div>
                                {product?.product?.attributes.slice(0,5).map((attr)=>{
                                    return(
                                        <div className={cls.textItem} key={attr.id}>
                                            <span>{attr.name}</span>
                                            <div className={cls.line}></div>
                                            <p>{attr.value}</p>
                                        </div>
                                    )
                                })}
                                <a href='#specifications'>Все характеристики</a>
                            </div>
                        </div>
                        <div className={cls.productSpecificationsDesc}>
                            <div className={cls.productSpecificationsDescContent}>
                                <div className={cls.top}>
                                    <button
                                        onClick={()=>setActive(0)}
                                        className={active==0 ? `${cls.active}`: ""}
                                    >
                                        <p>Описание</p>
                                    </button>
                                    <button
                                        onClick={()=>setActive(1)}
                                        className={active==1 ? `${cls.active}`: ""}
                                    >
                                        <p>Гарантия</p>
                                    </button>
                                    <button
                                        onClick={()=>setActive(2)}
                                        className={active==2 ? `${cls.active}`: ""}
                                    >
                                        <p>Альтернатива</p>
                                    </button>
                                </div> 
                                <div className={cls.middle} id='specifications'>
                                    <div>
                                        <div className={cls.textItem}>
                                            <span>Бренд</span>
                                            <div className={cls.line}></div>
                                            <p>{product?.product?.brand.name}</p>
                                        </div>
                                        {product?.product?.attributes.map((attr)=>{
                                            return(
                                                <div className={cls.textItem} key={attr.id}>
                                                    <span>{attr.name}</span>
                                                    <div className={cls.line}></div>
                                                    <p>{attr.value}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={cls.bottom}>
                                    {active == 0 &&
                                    <>
                                    <TextInfo html={product?.product?.description}/>
                                    </>
                                    }
                                    {active == 1 &&
                                    <>
                                    <TextInfo html={product?.product?.warranty_text}/>
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={cls.reviewsListContent}>
                            <div className={cls.productReviews}>
                                <div className={cls.productReviewsTitleBlock}>
                                    <div className={cls.productReviewTitle}>
                                        <Title>Отзывы</Title>
                                        <p>{reviewsList?.data?.length} отзывов</p>
                                    </div>
                                </div>
                                <div>
                                <div className={cls.productReviewRating}>
                                    <div className={cls.productReviewRatingContent}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.0008 15.2167L4.12295 18.5069L5.43573 11.8999L0.490234 7.32652L7.17943 6.5334L10.0008 0.416687L12.8222 6.5334L19.5113 7.32652L14.5659 11.8999L15.8787 18.5069L10.0008 15.2167Z" fill="#EDBA37"/>
                                        </svg>
                                        <div className={cls.productRatingValue}>
                                            <p>5.0</p>
                                            <p>/5</p>
                                        </div>
                                    </div>
                                </div>

                                </div>
                            </div>
                            <div className={cls.productReviewsInner}>
                                {reviewsList?.data?.length == 0 ? <p>Отзывов пока нет</p>:
                                <div className={cls.reviewItem}>

                                </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cls.right}>
                        <div className={cls.productPageInfoTop}>
                            <div className={cls.badges}>
                                {product?.product?.is_new &&
                                <Badge type={'new'}>
                                    Новинка
                                </Badge>}
                                {product?.product?.is_hit &&
                                <Badge type={'new'}>
                                    Хит
                                </Badge>}
                            </div>
                            <button 
                                onClick={()=>{
                                    const flagIsAdd = !addToFavorite;
                                    setAddToFavorite(flagIsAdd);
                                    if (isAuth == false) {
                                        if (favoriteItem?.product?.slug === product?.product?.slug){
                                            deleteFromLocalFavoritesList(product?.product?.id);
                                            <SnackBar text={`Товар удален из избранного `} />
                                        }else {
                                            addToLocalFavoritesList({
                                                product_slug: product?.product?.slug, 
                                                product: product.product
                                            });
                                            <SnackBar text={`Товар добавлен в избранное`} />
                                        }
                                    }else{
                                        if (favoriteItem?.product?.slug === product?.product?.slug){
                                            deleteFromFavoritesList(product?.product?.id);
                                            <SnackBar text={`Товар удален из избранного`} />

                                        }else {
                                            addToFavoritesList({
                                                product_slug: product?.product?.slug, 
                                                product: product.product
                                            });
                                            toast(
                                            <SnackBar text={`Товар добавлен в избранное`}/>
                                            )
                                        }
                                    }
                                }}
                            >
                                {favoriteItem?.product?.slug == product?.product?.slug
                                ?<HeartIconFilled />
                                :<HeartIcon />
                                }
                            </button>
                        </div>
                        <div className={cls.priceBlock}>
                            <div className={cls.priceDiscount}>
                                {product?.product?.old_price && 
                                    <>
                                        <span className={cls.oldPrice}>
                                            {product?.product?.old_price} ₸
                                        </span>
                                        <Badge type={'discount'}>
                                            -{product.product?.discount_percent}%
                                        </Badge>
                                    </>
                                }
                            </div>
                            <div className={cls.finalPrice}>
                                <p>{product?.product?.price} ₸</p>
                            </div>
                        </div>
                        {product?.product?.stock_quantity ==0 ? 
                        <p>Нет в наличии</p>
                        :<div className={cls.cartBtnBlock}>
                            {!add &&
                            <button 
                                disabled={cartItem?.product?.slug == product?.product?.slug? true: false}
                                onClick={()=>{
                                    setAdd(true); 
                                    addToCart(
                                        {
                                            product_slug: product?.product.slug,
                                            quantity: 1
                                    })
                                    setCounter(counter + 1);
                                }}
                            >
                                <CartIcon />
                                <p>{cartItem? `Товар в корзине`: `Добавить в корзину`}</p>
                            </button>}
                            {add && 
                            <div className={cls.counter}>
                                <div className={cls.counterWrapper}>
                                    <button
                                        onClick={()=>{
                                            counter !== 0 &&
                                            (setCounter(counter - 1) )
                                            counter == 0? 
                                            removeFromCart(cartItem.id):
                                            changeCount(cartItem.id, counter)
                                        }}
                                    >
                                        <ProductPageDecreaseCounterIcon />
                                    </button>
                                    <p>{counter}</p>
                                    <button
                                        onClick={()=>{
                                            setCounter(counter + 1);
                                            const cartItemQuantityCount = counter + 1;
                                            setCounter(cartItemQuantityCount)
                                            changeCount(cartItem.id, (cartItemQuantityCount))
                                        }}
                                    >
                                        <ProductPageIncreaseIcon />
                                    </button>
                                </div>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3.33301 10H16.6663M11.6663 15L16.6663 10L11.6663 5" stroke="#EEEFF0" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            }
                        </div>
                        }
                        <div className={cls.productDeliveryBlock}>
                            {product?.product?.delivery.pickup.available && 
                            <div className={cls.productDeliveryItem}>
                                <PickUpIcon />
                                <div className={cls.productDeliveryItemText}>
                                    <p>Самовывоз: {product?.product?.delivery.pickup.note} <span>3 магазинов</span></p>
                                    <span>{product?.product?.delivery.pickup.cost_label}</span>
                                </div>
                            </div>
                            }
                            {product?.product?.delivery.standard.available &&
                            <div className={cls.productDeliveryItem}>
                                <StandartDeliveryIcon />
                                <div className={cls.productDeliveryItemText}>
                                    <p>Доставка: {product?.product?.delivery.standard.note}</p>
                                    <span>{product?.product?.delivery.standard.cost_label}</span>
                                </div>
                            </div>
                            }
                            {product?.product?.delivery.express.available && 
                            <div className={cls.productDeliveryItem}>
                                <ExpressDeliveryIcon />
                                <div className={cls.productDeliveryItemText}>
                                    <p>Экспресс-доставка:  {today}</p>
                                    <span>{product?.product?.delivery.express.cost_label} ₸</span>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>}
            {isMobile && 
            <div className={cls.mobileProductPageContent}>
                {loadingProduct && <Loader />}
                <div className={cls.mobileBreadCrumbs}>
                    <BreadCrumbs>
                        Каталог
                    </BreadCrumbs>
                    {product?.product?.breadcrumbs?.map((breadcrumbItem, index)=>{
                        return (
                        <div key={breadcrumbItem.slug}>
                            <span>-</span>
                            <Link to={`/catalog/categories/${breadcrumbItem.slug}`} >{breadcrumbItem.name}</Link>
                        </div>
                        )
                    })}

                </div>
                <div className={cls.mobileProductImgWrapper}>
                    <div className={cls.mobileProductImgSlider}>
                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#FF4D00',
                            }}
                            pagination={true}
                            spaceBetween={10}
                            modules={[FreeMode, Pagination]}
                        >
                            {product?.product?.images.map((item)=>{
                                return(
                                <SwiperSlide key={item.sku}>
                                    <img 
                                        src={item.url} 
                                        alt={`${product?.product?.name}`} 
                                        lazy={`true`}
                                    />
                                </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
                <div className={cls.mobileProductInfoWrapper}>
                    <div className={cls.mobileProductInfoWrapperTop}>
                        <div className={cls.mobileRating}>
                            <div>
                                <ReviewItemStar />
                                <p>5.0</p>
                            </div>
                            <span>157 отзывов</span>
                        </div>
                        <div className={cls.mobileTopButtons}>
                            <button 
                                onClick={()=>{
                                    const flagIsAdd = !addToFavorite;
                                    setAddToFavorite(flagIsAdd);
                                    if (isAuth == false) {
                                        if (favoriteItem?.product?.slug === product?.product?.slug){
                                            deleteFromLocalFavoritesList(product?.product?.id);
                                            <SnackBar text={`Товар удален из избранного `} />
                                        }else {
                                            addToLocalFavoritesList({
                                                product_slug: product?.product?.slug, 
                                                product: product.product
                                            });
                                            <SnackBar text={`Товар добавлен в избранное`} />
                                        }
                                    }else{
                                        if (favoriteItem?.product?.slug === product?.product?.slug){
                                            deleteFromFavoritesList(product?.product?.id);
                                            toast(
                                            <SnackBar text={`Товар удален из избранного`} />
                                            )
                                        }else {
                                            addToFavoritesList({
                                                product_slug: product?.product?.slug, 
                                                product: product.product
                                            });
                                            toast(
                                            <SnackBar text={`Товар добавлен в избранное`}/>
                                            )
                                        }
                                    }
                                }}
                            >
                                {favoriteItem?.product?.slug == product?.product?.slug
                                ?<HeartIconFilled />
                                :<HeartIcon />
                                }
                            </button>
                            <button>
                                <RepostIcon />
                            </button>
                        </div>
                    </div>
                    <div className={cls.mobileProductTitleBlock}>
                        <Title>{product?.product?.name}</Title>
                        <span>Код: {product?.product?.sku}</span>
                    </div>
                    <div className={cls.mobileProductPriceBlock}>
                        <div className={cls.mobileProductPriceValue}>
                            {product?.product?.old_price && 
                            <div className={cls.oldPrice}>
                                <p>{product?.product?.old_price} ₸</p>
                                <Badge type="discount">-{product?.product?.discount_percent}%</Badge>
                            </div>}
                            <p className={cls.mobileFinalPrice}>
                                {product?.product?.price} ₸
                            </p>
                        </div>
                        {product?.product?.stock_quantity == 0? <p>Нет в наличии</p>:
                        <div 
                            className={`${cls.mobileProductActionBtn} ${
                                counter > 0 ? cls.mobileProductActiveCartBtn : ''
                            }`}
                        >
                            <Button 
                                disabled={cartItem?.product?.slug == product?.product?.slug? true: false}
                                onClick={()=>{
                                    setAdd(true);
                                    addToCart({
                                        product_slug: product?.product?.slug,
                                        quantity: 1,
                                    })
                                    setCounter(counter + 1)
                                }}
                            >
                                <CartIcon />
                                <p>
                                    {counter == 0 || cartItem?.product?.slug == product?.product?.slug ? `В корзине`: `В корзину`}
                                </p>
                            </Button>
                            {add && 
                            <div className={cls.counter}>
                                <div className={cls.counterWrapper}>
                                    <button
                                        onClick={()=>{
                                            const checkCounter = counter;
                                            checkCounter !== 0 &&
                                            (setCounter(checkCounter - 1) )
                                            counter == 0? removeFromCart(product.id):
                                            changeCount(product.id, (counter));
                                            counter == 0 && setAdd(false)
                                        }}
                                    >
                                        <CartRemoveIconMobileDark />
                                    </button>
                                    <p>{counter}</p>
                                    <button
                                        onClick={()=>{
                                            if (!errLoadingCart){
                                            setCounter(counter + 1);
                                            changeCount(cartItem.id, counter);} else return null
                                        }}
                                    >
                                        <CartAddIconMobileDark />
                                    </button>
                                </div>
                            </div>
                            }
                        </div>
                        }
                        <div className={cls.mobileProductDeliveryItems}>
                            <div className={cls.productDeliveryBlock}>
                                <div className={cls.productDeliveryItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M13.3337 11.1454C16.2768 11.724 18.3337 13.0456 18.3337 14.5833C18.3337 16.6544 14.6027 18.3333 10.0003 18.3333C5.39795 18.3333 1.66699 16.6544 1.66699 14.5833C1.66699 13.0456 3.72382 11.724 6.66699 11.1454M10.0003 14.1667V7.5M10.0003 7.5C11.381 7.5 12.5003 6.38071 12.5003 5C12.5003 3.61929 11.381 2.5 10.0003 2.5C8.61961 2.5 7.50033 3.61929 7.50033 5C7.50033 6.38071 8.61961 7.5 10.0003 7.5Z" stroke="#909596" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div className={cls.productDeliveryItemText}>
                                        <p>Самовывоз: сегодня из <span>3 магазинов</span></p>
                                        <span>Бесплатно</span>
                                    </div>
                                </div>
                                <div className={cls.productDeliveryItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M11.667 5.83331H13.6147C13.8185 5.83331 13.9204 5.83331 14.0164 5.85634C14.1014 5.87675 14.1827 5.91042 14.2572 5.95611C14.3413 6.00765 14.4134 6.07971 14.5575 6.22384L17.9431 9.60946C18.0873 9.75358 18.1593 9.82564 18.2109 9.90974C18.2565 9.9843 18.2902 10.0656 18.3106 10.1506C18.3337 10.2465 18.3337 10.3484 18.3337 10.5523V12.9166C18.3337 13.3049 18.3337 13.4991 18.2702 13.6522C18.1856 13.8564 18.0234 14.0186 17.8192 14.1032C17.6661 14.1666 17.4719 14.1666 17.0837 14.1666M12.917 14.1666H11.667M11.667 14.1666V5.99998C11.667 5.06656 11.667 4.59985 11.4853 4.24333C11.3255 3.92973 11.0706 3.67476 10.757 3.51497C10.4005 3.33331 9.93375 3.33331 9.00033 3.33331H4.33366C3.40024 3.33331 2.93353 3.33331 2.57701 3.51497C2.2634 3.67476 2.00844 3.92973 1.84865 4.24333C1.66699 4.59985 1.66699 5.06656 1.66699 5.99998V12.5C1.66699 13.4205 2.41318 14.1666 3.33366 14.1666M11.667 14.1666H8.33366M8.33366 14.1666C8.33366 15.5474 7.21437 16.6666 5.83366 16.6666C4.45295 16.6666 3.33366 15.5474 3.33366 14.1666M8.33366 14.1666C8.33366 12.7859 7.21437 11.6666 5.83366 11.6666C4.45295 11.6666 3.33366 12.7859 3.33366 14.1666M17.0837 14.5833C17.0837 15.7339 16.1509 16.6666 15.0003 16.6666C13.8497 16.6666 12.917 15.7339 12.917 14.5833C12.917 13.4327 13.8497 12.5 15.0003 12.5C16.1509 12.5 17.0837 13.4327 17.0837 14.5833Z" stroke="#909596" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div className={cls.productDeliveryItemText}>
                                        <p>Доставка: сегодня, {today}</p>
                                        <span>Бесплатно в квадрате доставки</span>
                                    </div>
                                </div>
                                <div className={cls.productDeliveryItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10.8325 9.16659L2.91588 17.0833M11.6812 2.94865C12.6962 3.62215 13.6718 4.41617 14.5835 5.32783C15.503 6.24735 16.3029 7.23193 16.9801 8.25638M7.71168 6.58004L5.31596 5.78147C5.04005 5.6895 4.73616 5.74802 4.51415 5.93588L2.13318 7.95054C1.64574 8.36299 1.78423 9.14791 2.38338 9.36865L4.63938 10.1998M9.73342 15.2937L10.5646 17.5497C10.7853 18.1488 11.5702 18.2873 11.9827 17.7999L13.9973 15.4189C14.1852 15.1969 14.2437 14.893 14.1518 14.6171L13.3532 12.2214M16.123 1.8922L12.0343 2.57365C11.5928 2.64723 11.1878 2.86424 10.8821 3.1911L5.37118 9.08205C3.94272 10.609 3.98245 12.9937 5.46099 14.4722C6.93953 15.9508 9.32418 15.9905 10.8512 14.562L16.7421 9.05114C17.069 8.74537 17.286 8.34041 17.3596 7.89891L18.041 3.81018C18.229 2.68215 17.2511 1.70419 16.123 1.8922Z" stroke="#909596" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div className={cls.productDeliveryItemText}>
                                        <p>Экспресс-доставка: сегодня, {today}</p>
                                        <span>от 5 200 ₸</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={cls.mobileProductDescriptionBlock}>
                    <div className={cls.mobileProductDescriptionType}>
                        <button
                            onClick={()=>setActive(0)}
                            className={active == 0 ? `${cls.active}`: null}
                        >
                            <p>Характеристики</p>
                        </button>
                        <button 
                            onClick={()=>setActive(1)}
                            className={active == 1 ? `${cls.active}`: null}
                        >
                            <p>Описание</p>
                        </button>
                    </div>
                    <div className={cls.mobileProductDescriptionWrapper}>
                        {active == 0 && 
                            <div className={cls.text}>
                                <div className={cls.textItem}>
                                            <span>Бренд</span>
                                            <div className={cls.line}></div>
                                            <p>{product?.product?.brand.name}</p>
                                </div>
                                {product?.product?.attributes.slice(0,mobileCount).map((attr)=>{
                                    return(
                                        <div 
                                            className={cls.textItem} 
                                            key={attr.id}
                                        >
                                            <span>{attr.name}</span>
                                            <div className={cls.line}></div>
                                            <p>{attr.value}</p>
                                        </div>
                                    )
                                })}

                                {mobileCount !== product?.product?.attributes.length &&
                                <div>
                                    <a 
                                        className={cls.link}
                                        onClick={handleShowAll}
                                    >Все характеристики</a>
                                </div>
                                }
                            </div>
                        }
                        {active == 1 && 
                            <div className={cls.textDescriptionItemsMobile}>
                                <TextInfo html={product?.product?.description}/>
                            </div>
                        }
                    </div>
                </div>
                <div className={cls.mobileAlternativeWrapper}>
                    <Title>Альтернатива</Title>
                    {/* <Swiper 
                        slidesPerView={2.2}
                        spaceBetween={8}
                    >
                    {products.map((item, index)=>{
                        if (item.id !==id)
                        return(
                            <SwiperSlide>
                                <ProductCard product={item} isFavorite={favorites.includes(item.id)}/>
                            </SwiperSlide>
                        )
                    })}
                    </Swiper> */}

                </div>
                <div className={cls.mobileReviewsWrapper}>
                    <div className={cls.mobileReviewsTop}>
                        <div>
                            <Title>Отзывы</Title>
                            <span>{reviewsList?.data?.length} отзывов</span>   
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10.2939 15.3807C10.1118 15.2788 9.88984 15.2788 9.70776 15.3807L5.25802 17.8715C4.81125 18.1216 4.27668 17.7332 4.37646 17.231L5.37027 12.2294C5.41094 12.0247 5.34235 11.8136 5.18915 11.6719L1.44526 8.2097C1.06936 7.86208 1.27355 7.23364 1.78199 7.17336L6.84592 6.57295C7.05313 6.54838 7.2327 6.41791 7.32011 6.22843L9.45599 1.59789C9.67044 1.13296 10.3312 1.13297 10.5457 1.59789L12.6815 6.22843C12.7689 6.41791 12.9485 6.54838 13.1557 6.57295L18.2196 7.17336C18.728 7.23365 18.9322 7.86207 18.5563 8.2097L14.8125 11.6719C14.6593 11.8136 14.5907 12.0247 14.6314 12.2293L15.6252 17.231C15.7249 17.7332 15.1904 18.1216 14.7436 17.8715L10.2939 15.3807Z" fill="#FF4D00"/>
                            </svg>
                            <p>5.0</p>
                        </div>
                    </div>
                    <div className={cls.mobileReviewsSlider}></div>
                    <button className={cls.showReviews}>
                        <p>Смотреть все отзывы</p>
                    </button>
                </div>
                {product?.product?.warranty_text && 
                <div className={cls.mobileGarantyWrapper}>
                    <Title>
                        Гарантия
                    </Title>
                    <div className={cls.mobileGarantyItems}>
                        <div className={cls.textDescriptionItem}>
                            <TextInfo html={product?.product?.warranty_text}/>
                        </div>
                        {/* {!showMoreGaranty &&
                        <a onClick={()=>setShowMoreGaranty(true)}>
                            <p>Читать полностью</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.35656 7.85653C4.71194 7.50115 5.28812 7.50115 5.64349 7.85653L10 12.2131L14.3566 7.85653C14.7119 7.50115 15.2881 7.50115 15.6435 7.85653C15.9989 8.21191 15.9989 8.78809 15.6435 9.14346L10.6435 14.1435C10.2881 14.4988 9.71194 14.4988 9.35656 14.1435L4.35656 9.14346C4.00118 8.78809 4.00118 8.21191 4.35656 7.85653Z" fill="#FF5302"/>
                            </svg>
                        </a>
                        } */}

                        {/* {showMoreGaranty && 
                        <>

                        <div className={cls.textDescriptionItem}>
                                        <h4>Защита платежей</h4>
                                        <p>Ваши деньги не передаются продавцу до момента подтверждения получения товара. Это гарантирует, что вы платите только за то, что действительно получили.</p>
                        </div>
                        <div className={cls.textDescriptionItem}>
                                        <h4>Поддержка на каждом этапе</h4>
                                        <p>Наша служба поддержки помогает решать любые спорные ситуации между покупателем и продавцом. Мы всегда на стороне справедливости.</p>
                        </div>
                        <div className={cls.textDescriptionItem}>
                                        <h4>Ответственность продавцов</h4>
                                        <p>Продавцы обязаны соблюдать стандарты качества и сроки доставки. За нарушения предусмотрены санкции вплоть до блокировки.</p>
                        </div>

                        </>} */}
                    </div>
                </div>
                }

            </div>
            }
            {isMobileScroll && product?.product?.stock_quantity>0 && <div className={cls.fixedBottomWrapper}>
                <button 
                    disabled={cartItem?.product?.slug == product?.product?.slug? true: false}
                    className={cls.bottomFixedBtn} 
                    onClick={()=>setAdd(true)}
                >
                    <p>{counter == 0 || cartItem?.product?.slug == product?.product?.slug ? `В корзине`: `В корзину`}</p>
                </button>
                
                {add && 
                <div className={cls.counter}>
                    <div className={cls.counterWrapper}>
                        <button
                                        onClick={()=>{
                                            counter !== 0 &&
                                            (setCounter(counter - 1) )
                                            counter == 0? removeFromCart(product.id):
                                            decreaseQuantity(product.id);
                                            counter == 0 && setAdd(false)
                                        }}
                                    >
                                        <CartRemoveIconMobileDark />
                        </button>
                        <p>{counter}</p>
                        <button
                                        onClick={()=>{
                                            setCounter(counter + 1);
                                            changeCount(cartItem.id, (counter))
                                        }}
                                    >
                                        <CartRemoveIconMobileDark />
                        </button>
                    </div>
                </div>
                }
            </div>}
        </div>
    </>
    )
}