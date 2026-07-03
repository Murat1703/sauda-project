import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';

export const ProductCardSlider = ({product}) =>{
    return(
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#FF4D00',
                    '--swiper-pagination-bullet-size': '4px',
                    '--swiper-pagination-bullet-horizontal-gap': '6px',
                }}
                pagination={true}
                modules={[Pagination]}
                nested={true}
                touchMoveStopPropagation={true}
            >
                {product?.images?.map((img, index)=>{
                    return(
                        <SwiperSlide key={index}>
                            <img 
                                src={`${img?.url}`} 
                                alt={`${product?.name}`}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                style={{
                                    opacity: product?.stock_quantity ==0 ? "0.5": "1"
                                }}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}