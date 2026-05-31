import cls from './WatchedSection.module.css'
import { Title } from '../../Title'
import { ProductCard } from '../../ProductCard'
import {  useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SliderControlBtn } from '../../SliderControlBtn';
import { useFavorites } from '../../../hooks/useFavorites';
import { ArrowPrev } from '../../../../public/assets/icons/ArrowPrev';
import { ArrowNext } from '../../../../public/assets/icons/ArrowNext';


export const WatchedSection = ({products}) =>{

    const swiperRef = useRef();

    const {favorites, toggleFavorites} = useFavorites();

    return(
        <section className={cls.watchedSectionWrapper}>
            <div className={cls.watchedSectionContent}>
                <Title>Вы ранее смотрели</Title>
                <div className={cls.watchedSectionList}>
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
                        {products?.map((product, index)=>{
                            return(
                            <SwiperSlide                                     key={product.id}>                            
                                    <ProductCard 
                                        product={product} 
                                        isFavorite={favorites.includes(product.slug)} 
                                        addToFavorite={() => toggleFavorites(product.slug)} 
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
                </div>
            </div>
        </section>
    )
}