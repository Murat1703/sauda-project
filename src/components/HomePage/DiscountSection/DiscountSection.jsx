import cls from './DiscountSection.module.css'
import { Title } from '../../Title'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SliderControlBtn } from '../../SliderControlBtn';
import { useFavorites } from '../../../hooks/useFavorites';
import { ProductCard } from '../../ProductCard';
import { ArrowPrev } from '../../../../public/assets/icons/ArrowPrev';
import { ArrowNext } from '../../../../public/assets/icons/ArrowNext';


export const DiscountSection = ({productsWithDiscount}) =>{

    const {favorites, toggleFavorites} = useFavorites();
    const swiperRef = useRef();


    return(
        <section className={cls.dicountSection}>
            <div className={cls.discountSectionContent}>
                <div className={cls.discountSectionTitleBlock}>
                    <Title>Мега🔥скидки</Title>
                    <p>Горящие товары со скидкой до 70%</p>
                </div>
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
                        {productsWithDiscount?.map((product,index)=>{
                            return(
                                <SwiperSlide key={product.id}>
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