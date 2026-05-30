import { Title } from '../../Title'
import cls from './CategorysSection.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useEffect } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import { useCategories } from '../../../stores/useCategories.js';
import { Link } from 'react-router-dom';

export const CategorysSection = () =>{

    const {
        categories,
        loadCategories,
        loadingCategories,
        errLoadingCategories
    } = useCategories();

    useEffect(() => {
        loadCategories();
    }, []);

    console.log(categories)


    const swiperRef = useRef(null);

    return(
        <section className={cls.categorySection}>
            <div className={cls.categorySectionContent}>
                <Title>Категории</Title>
                <div className={cls.categorysSlider}>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        loop
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        breakpoints={{
                            360: {
                                slidesPerView:2
                            },
                            640: {
                                slidesPerView:3
                            },
                            960: {
                                slidesPerView:5
                            }
                        }}
                    >
                        {categories?.map((item,index)=>{
                            return(
                                <SwiperSlide key={item.id}>
                                    <Link to={`/catalog/categories/${item.slug}`} className={cls.categoryCardItem}>
                                            <h4>{item.name}</h4>
                                            <img src={item.image_url} alt={`${item.name}`}/>
                                    </Link>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <button 
                        className={cls.prevBtn}
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M10.4392 17.3335L17.5912 24.4855L15.7056 26.3711L5.33464 16.0001L15.7056 5.62934L17.5912 7.51493L10.4392 14.6668L26.668 14.6668L26.668 17.3335L10.4392 17.3335Z" fill="#FF4D00"/>
                        </svg>
                    </button>
                    <button 
                        className={cls.nextBtn} 
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M21.5608 14.6665L14.4088 7.51452L16.2944 5.62891L26.6654 15.9999L16.2944 26.3707L14.4088 24.4851L21.5608 17.3332H5.33203V14.6665H21.5608Z" fill="#FF4D00"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}