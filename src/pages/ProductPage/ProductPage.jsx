import { useParams } from 'react-router-dom'
import cls from './ProductPage.module.css'
import { useProducts } from '../../stores/useProducts.js';
import { act, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../components/AccountLayout';
import { Title } from '../../components/Title';
import { Badge } from '../../components/Badge';
import { useCart } from '../../hooks/useCart';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFavorites } from '../../hooks/useFavorites.js';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import DOMPurify from 'dompurify'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
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



export const ProductPage = ({isMobileScroll}) =>{

    const {slug} = useParams();

    console.log(slug)

    const {product, loadProduct, loadingProduct, products, loadingProducts, loadProducts} = useProducts();

    const {addToCart, removeFromCart, decreaseQuantity } =useCart();

    useEffect(()=>{
        if (!slug) return;
        loadProduct(slug)
    },[slug])

    console.log(product)

    const [add, setAdd] = useState(false);

    const [counter, setCounter] = useState(0);

    const today = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
    });

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [active, setActive] = useState(0);

    const isMobile = useMediaQuery({
        maxWidth: 768
    });

    const {favorites, toggleFavorites} = useFavorites();

    const [showMoreGaranty, setShowMoreGaranty] = useState(false);


    loadingProduct &&  <Loader />

    console.log('productPage product = ',product)

    return(
        <div className={cls.productPageWrapper} >
            {!isMobile &&
            <div className={cls.productPageContent}>
                {/* {loadingProduct && <Loader />} */}
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
                                                <img src={`${item.url}`} alt="product-img"/>
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
                                                <img src={`${item.url}`} alt="product-img"/>
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
                                {product?.product?.attributes.slice(0,5).map((attr, index)=>{
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
                                        {product?.product?.attributes.map((attr, index)=>{
                                            return(
                                                <div className={cls.textItem}>
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
                        <div className={cls.productReviews}>
                            <div className={cls.productReviewsTitleBlock}>
                                <div className={cls.productReviewTitle}>
                                    <Title>Отзывы</Title>
                                    <p>{[].length} отзывов</p>
                                </div>
                            </div>
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
                    <div className={cls.right}>
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
                        <div className={cls.cartBtnBlock}>
                            {!add &&
                            <button onClick={()=>setAdd(true)}>
                                <CartIcon />
                                <p>Добавить в корзину</p>
                            </button>}
                            {add && 
                            <div className={cls.counter}>
                                <div className={cls.counterWrapper}>
                                    <button
                                        onClick={()=>{
                                            counter !== 0 &&
                                            (setCounter(counter - 1) )
                                            counter == 0? 
                                            removeFromCart(product.id):
                                            decreaseQuantity(product.id)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4.16699 10H15.8337" stroke="#152429" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    <p>{counter}</p>
                                    <button
                                        onClick={()=>{
                                            setCounter(counter + 1);
                                            addToCart(product?.id)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.0003 4.16669V15.8334M4.16699 10H15.8337" stroke="#152429" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
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
                                    modules={[FreeMode]}
                                >
                                    {product?.product?.images.map((item, index)=>{
                                        return(
                                        <SwiperSlide>
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
                                onClick={()=>{toggleFavorites(product?.product?.slug);
                                !favorites.includes(product?.product?.slug)&&
                                toast(
                                    <SnackBar text="Товар добавлен в избранное"/>
                                )}
                                }
                            >
                                {favorites.includes(product?.product?.slug)? 
                                    <HeartIconFilled /> :<HeartIcon/>
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
                            {product?.product?.old_price && <div className={cls.oldPrice}><p>{product?.product?.old_price} ₸</p>
                            <Badge type="discount">-{product?.product?.discount_percent}%</Badge></div>}
                            <p className={cls.mobileFinalPrice}>{product?.product?.price} ₸</p>
                        </div>
                        <div 
                            className={`${cls.mobileProductActionBtn} ${
                                counter > 0 ? cls.mobileProductActiveCartBtn : ''
                            }`}
                        >
                            <Button onClick={()=>setAdd(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M12.0003 6.75V4.5C12.0003 2.84315 10.6571 1.5 9.00028 1.5C7.34342 1.5 6.00028 2.84315 6.00028 4.5V6.75M2.69428 7.76397L2.24428 12.564C2.11633 13.9287 2.05236 14.6111 2.27881 15.1382C2.47775 15.6012 2.82637 15.984 3.26879 16.2253C3.77242 16.5 4.4578 16.5 5.82856 16.5H12.172C13.5428 16.5 14.2281 16.5 14.7318 16.2253C15.1742 15.984 15.5228 15.6012 15.7217 15.1382C15.9482 14.6111 15.8842 13.9287 15.7563 12.564L15.3063 7.76397C15.1982 6.61151 15.1442 6.03528 14.885 5.59962C14.6568 5.21594 14.3195 4.90883 13.9162 4.71738C13.4583 4.5 12.8795 4.5 11.722 4.5L6.27856 4.5C5.12104 4.5 4.54229 4.5 4.08434 4.71738C3.68103 4.90883 3.34378 5.21594 3.11552 5.59962C2.85634 6.03528 2.80232 6.61151 2.69428 7.76397Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p>{counter == 0?`В Корзину`:`В Корзине`}</p>
                            </Button>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4.16699 10H15.8337" stroke="#152429" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    <p>{counter}</p>
                                    <button
                                        onClick={()=>{
                                            setCounter(counter + 1);
                                            addToCart(product?.id)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.0003 4.16669V15.8334M4.16699 10H15.8337" stroke="#152429" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            }
                        </div>
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
                                    <p>{product?.brand}</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Напряжение аккумулятора, В</span>
                                    <div className={cls.line}></div>
                                    <p>20</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Максимальный крутящий момент, Н/м</span>
                                    <div className={cls.line}></div>
                                    <p>40</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Количество скоростей работы</span>
                                    <div className={cls.line}></div>
                                    <p>1350</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Тип двигателя 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_1020_761)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.00007 2.32801C4.86751 2.32801 2.32807 4.86745 2.32807 8.00001C2.32807 11.1326 4.86751 13.672 8.00007 13.672C11.1326 13.672 13.6721 11.1326 13.6721 8.00001C13.6721 4.86745 11.1326 2.32801 8.00007 2.32801ZM0.87207 8.00001C0.87207 4.06332 4.06338 0.872009 8.00007 0.872009C11.9368 0.872009 15.1281 4.06332 15.1281 8.00001C15.1281 11.9367 11.9368 15.128 8.00007 15.128C4.06338 15.128 0.87207 11.9367 0.87207 8.00001ZM7.27207 5.44001C7.27207 5.03795 7.59801 4.71201 8.00007 4.71201H8.00647C8.40853 4.71201 8.73447 5.03795 8.73447 5.44001C8.73447 5.84207 8.40853 6.16801 8.00647 6.16801H8.00007C7.59801 6.16801 7.27207 5.84207 7.27207 5.44001ZM8.00007 7.27201C8.40213 7.27201 8.72807 7.59795 8.72807 8.00001V10.56C8.72807 10.9621 8.40213 11.288 8.00007 11.288C7.59801 11.288 7.27207 10.9621 7.27207 10.56V8.00001C7.27207 7.59795 7.59801 7.27201 8.00007 7.27201Z" fill="#9DA5B2"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1020_761">
                                            <rect width="16" height="16" fill="white"/>
                                            </clipPath>
                                        </defs>
                                        </svg>

                                    </span>
                                    <div className={cls.line}></div>
                                    <p>Щеточный</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>
                                        Тип патрона 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_1020_761)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.00007 2.32801C4.86751 2.32801 2.32807 4.86745 2.32807 8.00001C2.32807 11.1326 4.86751 13.672 8.00007 13.672C11.1326 13.672 13.6721 11.1326 13.6721 8.00001C13.6721 4.86745 11.1326 2.32801 8.00007 2.32801ZM0.87207 8.00001C0.87207 4.06332 4.06338 0.872009 8.00007 0.872009C11.9368 0.872009 15.1281 4.06332 15.1281 8.00001C15.1281 11.9367 11.9368 15.128 8.00007 15.128C4.06338 15.128 0.87207 11.9367 0.87207 8.00001ZM7.27207 5.44001C7.27207 5.03795 7.59801 4.71201 8.00007 4.71201H8.00647C8.40853 4.71201 8.73447 5.03795 8.73447 5.44001C8.73447 5.84207 8.40853 6.16801 8.00647 6.16801H8.00007C7.59801 6.16801 7.27207 5.84207 7.27207 5.44001ZM8.00007 7.27201C8.40213 7.27201 8.72807 7.59795 8.72807 8.00001V10.56C8.72807 10.9621 8.40213 11.288 8.00007 11.288C7.59801 11.288 7.27207 10.9621 7.27207 10.56V8.00001C7.27207 7.59795 7.59801 7.27201 8.00007 7.27201Z" fill="#9DA5B2"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1020_761">
                                            <rect width="16" height="16" fill="white"/>
                                            </clipPath>
                                        </defs>
                                        </svg>
                                    </span>
                                    <div className={cls.line}></div>
                                    <p>Быстрозажимной</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Диаметр зажимаемой оснастки</span>
                                    <div className={cls.line}></div>
                                    <p>0.8-10 мм</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Тип аккумулятора</span>
                                    <div className={cls.line}></div>
                                    <p>Li-Ion</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Код товара</span>
                                    <div className={cls.line}></div>
                                    <p>{product?.id}</p>
                                </div>
                                <div>
                                    <a href="" className={cls.link}>Все характеристики</a>
                                </div>
                            </div>
                        }
                        {active == 1 && 
                            <div className={cls.textDescriptionItemsMobile}>
                                    <div className={cls.textDescriptionItem}>
                                        <p>Аккумуляторная дрель-шуруповёрт MTX MCDL-12-02 — компактный и универсальный инструмент для бытового ремонта, сборки мебели и монтажных работ. Модель работает от Li-Ion аккумулятора напряжением 12 В и развивает крутящий момент до 20 Н·м, что обеспечивает уверенное закручивание крепежа и сверление различных материалов. Инструмент подходит для работы с деревом, пластиком и металлом, позволяя сверлить отверстия диаметром до 20 мм в древесине и до 6 мм в металле.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Надежный инструмент</h4>
                                        <p>Двухскоростной редуктор и регулировка крутящего момента (18+1 ступеней) позволяют точно подобрать режим работы под конкретную задачу — от аккуратной сборки мебели до сверления отверстий. Частота вращения регулируется в диапазоне до 1350 об/мин, а функция реверса облегчает как монтаж, так и демонтаж крепежа.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Бесшумная работа</h4>
                                        <p>Инструмент оснащён быстрозажимным патроном, что позволяет быстро менять биты и сверла без дополнительных ключей. Для удобства работы предусмотрена подсветка рабочей зоны и эргономичная прорезиненная рукоятка, обеспечивающая надёжный хват даже при длительном использовании.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Экономично и выгодно</h4>
                                        <p>В комплект поставки входят два аккумулятора ёмкостью 2 А·ч, зарядное устройство и удобный кейс для хранения и транспортировки. Благодаря запасному аккумулятору можно работать практически без перерывов, меняя батарею по мере разрядки.</p>
                                    </div>
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
                            <span>157 отзываов</span>   
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
                <div className={cls.mobileGarantyWrapper}>
                    <Title>
                        Гарантия
                    </Title>
                    <div className={cls.mobileGarantyItems}>
                        <div className={cls.textDescriptionItem}>
                                        <p>Мы понимаем, что покупки в интернете требуют доверия. Поэтому мы обеспечиваем прозрачную и понятную систему гарантий для каждого клиента.</p>
                        </div>
                        <div className={cls.textDescriptionItem}>
                                        <h4>Гарантия подлинности товаров</h4>
                                        <p>Все продавцы проходят проверку перед размещением на платформе. Мы стремимся к тому, чтобы вы получали только оригинальную и качественную продукцию.</p>
                        </div>
                        <div className={cls.textDescriptionItem}>
                                        <h4>Возврат и обмен без лишних сложностей</h4>
                                        <p>Если товар не соответствует описанию, имеет дефекты или просто не подошёл — вы можете оформить возврат или обмен в установленный срок. Процесс максимально упрощён и не требует лишней бюрократии.</p>
                        </div>
                        {!showMoreGaranty &&
                        <a onClick={()=>setShowMoreGaranty(true)}>
                            <p>Читать полностью</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.35656 7.85653C4.71194 7.50115 5.28812 7.50115 5.64349 7.85653L10 12.2131L14.3566 7.85653C14.7119 7.50115 15.2881 7.50115 15.6435 7.85653C15.9989 8.21191 15.9989 8.78809 15.6435 9.14346L10.6435 14.1435C10.2881 14.4988 9.71194 14.4988 9.35656 14.1435L4.35656 9.14346C4.00118 8.78809 4.00118 8.21191 4.35656 7.85653Z" fill="#FF5302"/>
                            </svg>
                        </a>
                        }

                        {showMoreGaranty && 
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

                        </>}
                    </div>
                </div>


            </div>
            }
            {isMobileScroll && <div className={cls.fixedBottomWrapper}>
                <button 
                    className={cls.bottomFixedBtn} 
                    onClick={()=>setAdd(true)}
                >
                    <p>{counter == 0? `В Корзину`: `В корзине`}</p>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4.16699 10H15.8337" stroke="#152429" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                        </button>
                        <p>{counter}</p>
                        <button
                                        onClick={()=>{
                                            setCounter(counter + 1);
                                            addToCart(product?.id)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.0003 4.16669V15.8334M4.16699 10H15.8337" stroke="#152429" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                        </button>
                    </div>
                </div>
                }
            </div>}
        </div>
    )
}