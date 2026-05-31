import cls from './RecommendedSection.module.css'
import { Title } from '../../Title'
import { ProductCard } from '../../ProductCard'
import {  useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { SliderControlBtn } from '../../SliderControlBtn';
import { useFavorites } from '../../../hooks/useFavorites';
import { ArrowPrev } from '../../../../public/assets/icons/ArrowPrev';
import { ArrowNext } from '../../../../public/assets/icons/ArrowNext';



export const RecommendedSection = ({products}) =>{
    const swiperRef = useRef();

    const {favorites, toggleFavorites} = useFavorites();


    const handleMakeFavorite = (productId) => {
        toggleFavorites(productId)
    };
    console.log('recomendedprodducts',products)


    return(
        <section className={cls.recommendedSection}>
            <div className={cls.recommendedSectionContent}>
                <Title>
                    Рекомендуемые товары
                </Title>
                <div className={cls.recommendedSlider}>
                    <Swiper 
                        slidesPerView={5}
                        spaceBetween={15}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
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
                                    isFavorite={favorites.includes(product?.slug)} 
                                    addToFavorite={() => handleMakeFavorite(product?.slug)} />
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
            </div>
        </section>
    )
}