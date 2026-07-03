import cls from './AboutSection.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Title } from '../../Title';
import { useBrands } from '../../../stores/useBrands';
import { useEffect, useState } from 'react';
import { ShowMoreIcon } from '../../../../public/assets/icons/ShowMoreIcon';
import { useLanguage } from '../../../stores/useLanguage';
import { Loader } from '../../Loader';


export const AboutSection = () =>{

    const {brands, loadBrands, loadingBrands, errLoadingBrands} = useBrands();

    useEffect(()=>{
        loadBrands()
    },[])

    const [showMore, setShowMore] = useState(false);

    const {lang} = useLanguage();

    return(
        <section className={cls.aboutSectionWrapper}>
            {loadingBrands ? <Loader /> :
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
                    <Title>
                        {lang=='ru'?
                        `Интернет-маркетплейс Sauda`
                        :`Sauda онлайн сауда алаңы`}
                    </Title>
                    <div className={cls.aboutSectionInfoTextContent}>
                        {lang=='ru'?
                            <div className={cls.top}>
                                <p>Но убеждённость некоторых оппонентов выявляет срочную потребность соответствующих условий активизации. Не следует, однако, забывать, что консультация с широким активом влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений. Учитывая ключевые сценарии поведения, дальнейшее развитие различных форм деятельности играет важную роль в формировании экспериментов, поражающих по своей масштабности и грандиозности. </p>
                                <p>В целом, конечно, перспективное планирование не оставляет шанса для прогресса профессионального сообщества. С другой стороны, высококачественный прототип будущего проекта представляет собой интересный эксперимент проверки системы обучения кадров, соответствующей насущным потребностям.</p>
                            </div>
                            :
                            <div className={cls.top}>
                                <p>Алайда кейбір оппоненттердің берік ұстанымы белсендіру үшін тиісті жағдайлардың шұғыл қажеттілігін көрсетеді. Дегенмен, кең белсенді топпен кеңесу терең ойлы пайымдауларды енгізу және жаңғырту процесіне алып келетінін ұмытпаған жөн. Мінез-құлықтың негізгі сценарийлерін ескере отырып, әртүрлі қызмет түрлерін одан әрі дамыту өзінің ауқымдылығы мен маңыздылығымен таңғалдыратын тәжірибелерді қалыптастыруда маңызды рөл атқарады. </p>
                                <p>Жалпы алғанда, әрине, перспективалық жоспарлау кәсіби қауымдастықтың ілгерілеуіне мүмкіндік қалдырмайды. Екінші жағынан, болашақ жобаның жоғары сапалы прототипі өзекті қажеттіліктерге сәйкес келетін кадрларды оқыту жүйесін тексерудің қызықты тәжірибесі болып табылады.</p>
                            </div>
                        }

                        {showMore == true && lang =='ru' &&
                        <div className={cls.top}>
                            <p>Но убеждённость некоторых оппонентов выявляет срочную потребность соответствующих условий активизации. Не следует, однако, забывать, что консультация с широким активом влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений. Учитывая ключевые сценарии поведения, дальнейшее развитие различных форм деятельности играет важную роль в формировании экспериментов, поражающих по своей масштабности и грандиозности. </p>
                            <p>В целом, конечно, перспективное планирование не оставляет шанса для прогресса профессионального сообщества. С другой стороны, высококачественный прототип будущего проекта представляет собой интересный эксперимент проверки системы обучения кадров, соответствующей насущным потребностям.</p>
                        </div>
                        }
                        {showMore == true && lang =='kk' &&
                        <div className={cls.top}>
                            <p>Алайда кейбір оппоненттердің берік ұстанымы белсендіру үшін тиісті жағдайлардың шұғыл қажеттілігін көрсетеді. Дегенмен, кең белсенді топпен кеңесу терең ойлы пайымдауларды енгізу және жаңғырту процесіне алып келетінін ұмытпаған жөн. Мінез-құлықтың негізгі сценарийлерін ескере отырып, әртүрлі қызмет түрлерін одан әрі дамыту өзінің ауқымдылығы мен маңыздылығымен таңғалдыратын тәжірибелерді қалыптастыруда маңызды рөл атқарады. </p>
                            <p>Жалпы алғанда, әрине, перспективалық жоспарлау кәсіби қауымдастықтың ілгерілеуіне мүмкіндік қалдырмайды. Екінші жағынан, болашақ жобаның жоғары сапалы прототипі өзекті қажеттіліктерге сәйкес келетін кадрларды оқыту жүйесін тексерудің қызықты тәжірибесі болып табылады.</p>
                        </div>
                        }
                        {!showMore && lang =='ru' &&
                        <a 
                            className={cls.moreLink}
                            onClick={()=>setShowMore(true)}
                        >
                            <p>Читать подробнее</p>
                            <ShowMoreIcon />
                        </a>}
                        {showMore && lang =='ru' &&
                        <a 
                            className={cls.moreLink}
                            onClick={()=>setShowMore(false)}
                        >
                            <p>Cвернуть</p>
                            <ShowMoreIcon hide={showMore}/>
                        </a>}
                        {!showMore && lang=='kk' &&
                        <a 
                            className={cls.moreLink}
                            onClick={()=>setShowMore(true)}
                        >
                            <p>Толығырақ оқу</p>
                            <ShowMoreIcon />
                        </a>
                        }
                        {showMore && lang=='kk' &&
                        <a 
                            className={cls.moreLink}
                            onClick={()=>setShowMore(false)}
                        >
                            <p>Жасыру</p>
                            <ShowMoreIcon hide={showMore}/>
                        </a>
                        }
                    </div>
                </div>
            </div>
            }
        </section>
    )
}