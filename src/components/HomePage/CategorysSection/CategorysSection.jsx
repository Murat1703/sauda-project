import { Title } from '../../Title'
import cls from './CategorysSection.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useEffect } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import { useCategories } from '../../../stores/useCategories.js';
import { Link } from 'react-router-dom';
import { SliderControlBtn } from '../../SliderControlBtn/SliderControlBtn.jsx';
import { ArrowPrev } from '../../../../public/assets/icons/ArrowPrev.jsx';
import { ArrowNext } from '../../../../public/assets/icons/ArrowNext.jsx';

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