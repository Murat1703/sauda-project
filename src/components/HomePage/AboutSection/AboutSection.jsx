import cls from './AboutSection.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Title } from '../../Title';
import { useBrands } from '../../../stores/useBrands';
import { useEffect } from 'react';


export const AboutSection = () =>{

    const {brands, loadBrands, loadingBrands, errLoadingBrands} = useBrands();

    useEffect(()=>{
        loadBrands()
    },[])

    return(
        <section className={cls.aboutSectionWrapper}>
            <div className={cls.aboutSectionContent}>
                {errLoadingBrands ? <p className={cls.errText}>{errLoadingBrands}</p> :
                <div className={cls.aboutSectionLogoSlider}>
                    <Swiper 
                        slidesPerView={7}
                        spaceBetween={15}
                        loop
                        breakpoints={{
                            360:{
                                slidesPerView: 2
                            },
                            480:{
                                slidesPerView : 4
                            }, 
                            768: {
                                slidesPerView: 7
                            }
                        }}
                    >
                        {brands?.map((brand, index)=>{
                            return(
                                <SwiperSlide>
                                    <div className={cls.logoSliderItem}>
                                        <img 
                                            src={`${brand.logo_url}`} 
                                            alt={`${brand.name}`}
                                            lazy={`true`}
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>}
                <div className={cls.aboutSectionInfo}>
                    <Title>Интернет-маркетплейс Sauda</Title>
                    <div className={cls.aboutSectionInfoTextContent}>
                        <div className={cls.top}>
                            <p>Но убеждённость некоторых оппонентов выявляет срочную потребность соответствующих условий активизации. Не следует, однако, забывать, что консультация с широким активом влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений. Учитывая ключевые сценарии поведения, дальнейшее развитие различных форм деятельности играет важную роль в формировании экспериментов, поражающих по своей масштабности и грандиозности. </p>
                            <p>В целом, конечно, перспективное планирование не оставляет шанса для прогресса профессионального сообщества. С другой стороны, высококачественный прототип будущего проекта представляет собой интересный эксперимент проверки системы обучения кадров, соответствующей насущным потребностям.</p>
                        </div>
                        <a className={cls.moreLink}>
                            <p>Читать подробнее</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.47846 6.19672C3.76745 5.90773 4.23599 5.90773 4.52498 6.19672L8.00172 9.67346L11.4785 6.19672C11.7674 5.90773 12.236 5.90773 12.525 6.19672C12.814 6.48571 12.814 6.95425 12.525 7.24324L8.52498 11.2432C8.23599 11.5322 7.76745 11.5322 7.47846 11.2432L3.47846 7.24324C3.18947 6.95425 3.18947 6.48571 3.47846 6.19672Z" fill="#FF5302"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}