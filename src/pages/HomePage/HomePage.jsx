import cls from './HomePage.module.css'
import { Banner } from '../../components/HomePage/Banner'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CategorysSection } from '../../components/HomePage/CategorysSection';
import { RecommendedSection } from '../../components/HomePage/RecommendedSection';
import { useProducts } from '../../hooks/useProducts.js';
import { AdvantagesSection } from '../../components/HomePage/AdvantagesSection';
import { WatchedSection } from '../../components/HomePage/WatchedSection/WatchedSection.jsx';
import { DiscountSection } from '../../components/HomePage/DiscountSection';
import { AboutSection } from '../../components/HomePage/AboutSection';

export const HomePage = () =>{

    const swiperRef = useRef(null);

    const {products, loadingProducts, loadProducts} = useProducts();

    useEffect(()=>{
        loadProducts();
    },[])

    const productsWithDiscount = products.filter(product => product.hasDiscount== true)
 
    return(
        <div className={cls.homePageWrapper}>
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
                    modules={[Navigation, Pagination]}
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
                <button className={cls.nextBtn} onClick={() => swiperRef.current?.slideNext()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M21.5608 14.6665L14.4088 7.51452L16.2944 5.62891L26.6654 15.9999L16.2944 26.3707L14.4088 24.4851L21.5608 17.3332H5.33203V14.6665H21.5608Z" fill="#FF4D00"/>
                    </svg>
                </button>
            </section>
            <CategorysSection />
            <RecommendedSection products={products}/>
            <AdvantagesSection />
            <WatchedSection products={products}/>
            <DiscountSection productsWithDiscount={productsWithDiscount}/>
            <AboutSection />
        </div>
    )
}