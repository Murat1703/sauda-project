import cls from './DiscountSection.module.css'
import { Title } from '../../Title'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SliderControlBtn } from '../../SliderControlBtn';
import { useFavoritesStore } from '../../../stores/useFavoritesStore';
import { ProductCard } from '../../ProductCard';
import { ArrowPrev } from '../../../../public/assets/icons/ArrowPrev';
import { ArrowNext } from '../../../../public/assets/icons/ArrowNext';
import { useProducts } from '../../../stores/useProducts';

export const DiscountSection = ({productsWithDiscount}) =>{

    const {favoritesList} = useFavoritesStore();
    const swiperRef = useRef();

    const {errLoadingProducts} = useProducts();

    return(
        <section className={cls.dicountSection}>
            <div className={cls.discountSectionContent}>
                <div className={cls.discountSectionTitleBlock}>
                    <Title>Мега🔥скидки</Title>
                    <p>Горящие товары со скидкой до 70%</p>
                </div>
                {errLoadingProducts ? <p className={cls.errText}>{errLoadingProducts}</p> :
                <div className={cls.discountedProducts}>
                    <Swiper 
                        slidesPerView={5}
                        spaceBetween={15}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        breakpoints={{
                            360:{
                                slidesPerView: 2
                            },
                            480:{
                                slidesPerView: 3
                            },
                            768:{
                                slidesPerView: 5
                            }
                        }}
                    >
                        {productsWithDiscount?.map((discountItem)=>{
                            console.log(
favoritesList
                            )
                            return(
                                <SwiperSlide key={discountItem.id}>
                                    <ProductCard 
                                        product={discountItem}
                                        isFavorite={
                                            favoritesList?.find(item=> item?.product?.slug === discountItem?.slug)
                                        }
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <SliderControlBtn 
                        onClick={()=> swiperRef.current?.slidePrev()}
                    >
                        <ArrowPrev />
                    </SliderControlBtn>
                    <SliderControlBtn 
                        onClick={()=>swiperRef.current?.slideNext()}
                    >
                        <ArrowNext />
                    </SliderControlBtn>
                </div>}
            </div>
        </section>
    )
}