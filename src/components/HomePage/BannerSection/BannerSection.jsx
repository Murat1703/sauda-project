import cls from './BannerSection.module.css'
import { Banner } from '../Banner';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation} from "swiper/modules";
import { useEffect, useRef } from 'react';
import "swiper/css";
import "swiper/css/navigation";

export const BannerSection = () =>{
    const swiperRef = useRef(null);




    return(
        <section className={cls.banner}>
                <button 
                    className={cls.prevBtn}
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M10.4392 17.3335L17.5912 24.4855L15.7056 26.3711L5.33464 16.0001L15.7056 5.62934L17.5912 7.51493L10.4392 14.6668L26.668 14.6668L26.668 17.3335L10.4392 17.3335Z" fill="#FF4D00"/>
                    </svg>
                </button>
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
                <button 
                    className={cls.nextBtn} 
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M21.5608 14.6665L14.4088 7.51452L16.2944 5.62891L26.6654 15.9999L16.2944 26.3707L14.4088 24.4851L21.5608 17.3332H5.33203V14.6665H21.5608Z" fill="#FF4D00"/>
                    </svg>
                </button>
        </section>

    )
}