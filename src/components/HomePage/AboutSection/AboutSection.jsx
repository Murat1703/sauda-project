import cls from './AboutSection.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import logo1 from './images/9aa4f0f3d8ac353de44dd002ec63c471367aa77e.png'
import logo2 from './images/c0b415724c2af494a425297fef1c4e9ded0e0212.png'
import logo3 from './images/21d8bc9b51037b9463faa39b60f4e538102dbafd.png'
import logo4 from './images/181c6ec575498bb2eea094890c78670b0d443647.png'
import logo5 from './images/40d7ff5690924f53ea6df124a5d30ee3d1c58c2a.png'
import logo6 from './images/4d90c09036e8c5b35ecc2d9a0de066c7ac14cf0f.png'
import { Title } from '../../Title';

export const AboutSection = () =>{
    return(
        <section className={cls.aboutSectionWrapper}>
            <div className={cls.aboutSectionContent}>
                <div className={cls.aboutSectionLogoSlider}>
                    <Swiper 
                        slidesPerView={7}
                        spaceBetween={15}
                        loop
                    >
                        <SwiperSlide>
                            <div className={cls.logoSliderItem}>
                                <img src={logo1} alt='logo-phillips'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cls.logoSliderItem}>
                                <img src={logo2} alt='logo-phillips'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cls.logoSliderItem}>
                                <img src={logo3} alt='logo-phillips'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cls.logoSliderItem}>
                                <img src={logo4} alt='logo-phillips'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cls.logoSliderItem}>
                                <img src={logo5} alt='logo-phillips'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cls.logoSliderItem}>
                                <img src={logo6} alt='logo-phillips'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cls.logoSliderItem}>
                                <img src={logo1} alt='logo-phillips'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cls.logoSliderItem}>
                                <img src={logo1} alt='logo-phillips'/>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
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
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.47846 6.19672C3.76745 5.90773 4.23599 5.90773 4.52498 6.19672L8.00172 9.67346L11.4785 6.19672C11.7674 5.90773 12.236 5.90773 12.525 6.19672C12.814 6.48571 12.814 6.95425 12.525 7.24324L8.52498 11.2432C8.23599 11.5322 7.76745 11.5322 7.47846 11.2432L3.47846 7.24324C3.18947 6.95425 3.18947 6.48571 3.47846 6.19672Z" fill="#FF5302"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}