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
                                        isFavorite={favorites.includes(product.id)} 
                                        addToFavorite={() => toggleFavorites(product.id)} 
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <SliderControlBtn 
                        onClick={()=> swiperRef.current?.slidePrev()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M10.4392 17.3335L17.5912 24.4855L15.7056 26.3711L5.33464 16.0001L15.7056 5.62934L17.5912 7.51493L10.4392 14.6668L26.668 14.6668L26.668 17.3335L10.4392 17.3335Z" fill="#FF4D00"></path></svg>
                    </SliderControlBtn>
                    <SliderControlBtn 
                        onClick={()=>swiperRef.current?.slideNext()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M21.5608 14.6665L14.4088 7.51452L16.2944 5.62891L26.6654 15.9999L16.2944 26.3707L14.4088 24.4851L21.5608 17.3332H5.33203V14.6665H21.5608Z" fill="#FF4D00"></path></svg>
                    </SliderControlBtn>
                </div>
            </div>
        </section>
    )
}