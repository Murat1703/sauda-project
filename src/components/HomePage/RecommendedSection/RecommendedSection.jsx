import cls from './RecommendedSection.module.css'
import { Title } from '../../Title'
import { ProductCard } from '../../ProductCard'
import {  useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { SliderControlBtn } from '../../SliderControlBtn';
import { ArrowPrev } from '../../../../public/assets/icons/ArrowPrev';
import { ArrowNext } from '../../../../public/assets/icons/ArrowNext';
import { useFavoritesStore } from '../../../stores/useFavoritesStore';
import { useProducts } from '../../../stores/useProducts';
import { useLanguage } from '../../../stores/useLanguage';



export const RecommendedSection = ({products}) =>{
    const swiperRef = useRef();

    const {favoritesList} = useFavoritesStore();

    const {lang} = useLanguage();

    const {errLoadingProducts} = useProducts();

    return(
        <section className={cls.recommendedSection}>
            <div className={cls.recommendedSectionContent}>
                <Title>
                    {lang == 'ru' && `Рекомендуемые товары`}
                    {lang == 'kk' && `Ұсынылатын тауарлар`}
                </Title>
                {errLoadingProducts ? <p>{errLoadingProducts}</p>: 
                <div className={cls.recommendedSlider}>
                    <Swiper 
                        slidesPerView={5}
                        spaceBetween={15}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        touchReleaseOnEdges={true}
                        breakpoints={{
                            360:{
                                slidesPerView : 2
                            },
                            640:{
                                slidesPerView : 3
                            },
                            768:{
                                slidesPerView : 5
                            }
                        }}
                    >
                        {products?.map((product)=>{
                            return (
                            <SwiperSlide key={product.id}>
                                <ProductCard 
                                    product={product} 
                                    isFavorite={
                                        favoritesList?.find(item=> item?.product?.slug === product?.slug)
                                    } />
                            </SwiperSlide>)
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
                </div>
                }
            </div>
        </section>
    )
}