import { CloseReviewModal } from '../../../../public/assets/icons/CloseReviewModal'
import cls from './ReviewImagesModal.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import { SliderControlBtn } from '../../SliderControlBtn/SliderControlBtn';
import { ArrowPrev } from '../../../../public/assets/icons/ArrowPrev';
import { ArrowNext } from '../../../../public/assets/icons/ArrowNext';
import { useRef } from 'react';



export const ReviewImagesModal = ({onClose, reviewImages}) =>{

    const swiperRef = useRef(null);

    return(
        <div className={cls.reviewImagesModalWrapper}>
            <button 
                onClick={onClose} 
                className={cls.closeReviewModalBtn}
            >
                <CloseReviewModal />
            </button>

            <div className={cls.reviewImagesContentWrapper}>
                <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    style={{
                        '--swiper-pagination-bullet-inactive-color': '#919799',
                        '--swiper-pagination-color': '#fff',
                        '--swiper-pagination-bullet-size': '8px',
                        '--swiper-pagination-bullet-horizontal-gap': '6px',
                    }}
                >
                    {reviewImages.map((image)=>{
                        return (
                            <SwiperSlide key={image?.id}>
                                <img src={image?.url} alt='reviewImage'/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
            <SliderControlBtn
                onClick={()=> swiperRef.current?.slidePrev()}
            >
                <ArrowPrev />
            </SliderControlBtn>
            <SliderControlBtn
                onClick={()=> swiperRef.current?.slideNext()}
            >
                <ArrowNext />
            </SliderControlBtn>


        </div>
    )
}