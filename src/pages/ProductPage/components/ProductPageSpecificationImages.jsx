import cls from '../ProductPage.module.css'
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ProductPagePrevArrow } from '../../../../public/assets/icons/ProductPagePrevArrow.jsx';
import { ProductPageNextArrow } from '../../../../public/assets/icons/ProductPageNextArrow.jsx';
import {useRef, useState} from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


export const ProductPageSpecificationImages = ({product}) =>{

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return(
        <div className={cls.productSpecificationsImages}>
            {product?.product?.images 
            && 
            <>
                <Swiper
                                        style={{
                                            '--swiper-navigation-color': '#fff',
                                            '--swiper-pagination-color': '#fff',
                                        }}
                                        spaceBetween={10}
                                        navigation={{
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        }}
                                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        // className="mySwiper2"
                                    >
                                        {product?.product?.images?.map((item, index)=>{
                                            return(
                                                <SwiperSlide key={index}>
                                                    <img 
                                                        src={`${item?.url}`} 
                                                        alt={`${product?.product?.name}`}
                                                        loading={`lazy`}
                                                    />
                                                </SwiperSlide>
                                            )
                                        })}
                </Swiper>
                <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={7}
                                        slidesPerView={5}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Thumbs]}
                                        // className="mySwiper"
                                    >
                                        {product?.product?.images?.map((item, index)=>{
                                            return(
                                                <SwiperSlide key={index}>
                                                    <img 
                                                        src={`${item?.url}`} 
                                                        alt={`${product?.product?.name}`}
                                                        loading={`lazy`}
                                                    />
                                                </SwiperSlide>
                                            )
                                        })}
                </Swiper>                                
            </>}
            <button 
                ref={prevRef}
                className={cls.prevControlBtn}
            >
                <ProductPagePrevArrow />
            </button>
            <button 
                ref={nextRef}
                className={cls.nextControlBtn}
            >
                <ProductPageNextArrow />
            </button>
        </div>
    )
}