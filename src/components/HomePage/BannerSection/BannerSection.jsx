import cls from './BannerSection.module.css'
import { Banner } from '../Banner';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation} from "swiper/modules";
import { useEffect, useRef } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import { SliderControlBtn } from '../../SliderControlBtn';
import { ArrowPrev } from '../../../../public/assets/icons/ArrowPrev';
import { ArrowNext } from '../../../../public/assets/icons/ArrowNext';

export const BannerSection = () =>{
    const swiperRef = useRef(null);




    return(
        <section className={cls.banner}>
            <SliderControlBtn 
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <ArrowPrev />
            </SliderControlBtn>
            <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    loop
                >
                    <SwiperSlide>
                        <Banner title={'Весенние скидки на кирпичи'} dicsount={50}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Banner title={'Весенние скидки на стройматериалы'} dicsount={30}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Banner title={'Скидки на электро оборудование'} dicsount={40}/>
                    </SwiperSlide>
            </Swiper>
            <SliderControlBtn
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <ArrowNext />
            </SliderControlBtn>
        </section>
    )
}