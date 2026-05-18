import { useParams } from 'react-router-dom'
import cls from './ProductPage.module.css'
import { useProducts } from '../../hooks/useProducts';
import { act, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { BreadCrumbs } from '../../components/AccountLayout';
import { Title } from '../../components/Title';
import { Badge } from '../../components/Badge';
import { useCart } from '../../hooks/useCart';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';



export const ProductPage = () =>{
    const {id} = useParams();

    const {product, loadProduct, loadingProduct} = useProducts();

    const {addToCart, removeFromCart, decreaseQuantity } =useCart();

    useEffect(()=>{
        loadProduct(id)
    },[])

    const [add, setAdd] = useState(false);

    const [counter, setCounter] = useState(1);

    const today = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
    });

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [active, setActive] = useState(0);

    return(
        <div className={cls.productPageWrapper}>
            <div className={cls.productPageContent}>
                {loadingProduct && <Loader />}
                <div className={cls.productTitleBlock}>
                    <div>
                        <div className={cls.breadCrumbsBlock}>
                            <BreadCrumbs>
                                Каталог
                            </BreadCrumbs>
                            <BreadCrumbs>-</BreadCrumbs>
                            <BreadCrumbs>{product?.category}</BreadCrumbs>

                        </div>
                        <Title>
                            {product?.title}
                        </Title>

                    </div>
                    <span>Код: {product?.id}</span>
                </div>
                <div className={cls.productInfoBlock}>
                    <div className={cls.left}>
                        <div className={cls.productSpecifications}>
                            <div className={cls.productSpecificationsImages}>
                                <Swiper
                                    style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                    }}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-1.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-2.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-3.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-4.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-5.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-6.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-7.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-8.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-9.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-10.jpg" />
                                    </SwiperSlide>
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-1.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-2.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-3.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-4.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-5.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-6.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-7.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-8.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-9.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/abstract-10.jpg" />
                                    </SwiperSlide>
                                </Swiper>

                            </div>
                            <div className={cls.text}>
                                <div className={cls.textItem}>
                                    <span>Бренд</span>
                                    <div className={cls.line}></div>
                                    <p>{product?.brand}</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Напряжение аккумулятора, В</span>
                                    <div className={cls.line}></div>
                                    <p>20</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Максимальный крутящий момент, Н/м</span>
                                    <div className={cls.line}></div>
                                    <p>40</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Количество скоростей работы</span>
                                    <div className={cls.line}></div>
                                    <p>1350</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Тип двигателя 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <g clip-path="url(#clip0_1020_761)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00007 2.32801C4.86751 2.32801 2.32807 4.86745 2.32807 8.00001C2.32807 11.1326 4.86751 13.672 8.00007 13.672C11.1326 13.672 13.6721 11.1326 13.6721 8.00001C13.6721 4.86745 11.1326 2.32801 8.00007 2.32801ZM0.87207 8.00001C0.87207 4.06332 4.06338 0.872009 8.00007 0.872009C11.9368 0.872009 15.1281 4.06332 15.1281 8.00001C15.1281 11.9367 11.9368 15.128 8.00007 15.128C4.06338 15.128 0.87207 11.9367 0.87207 8.00001ZM7.27207 5.44001C7.27207 5.03795 7.59801 4.71201 8.00007 4.71201H8.00647C8.40853 4.71201 8.73447 5.03795 8.73447 5.44001C8.73447 5.84207 8.40853 6.16801 8.00647 6.16801H8.00007C7.59801 6.16801 7.27207 5.84207 7.27207 5.44001ZM8.00007 7.27201C8.40213 7.27201 8.72807 7.59795 8.72807 8.00001V10.56C8.72807 10.9621 8.40213 11.288 8.00007 11.288C7.59801 11.288 7.27207 10.9621 7.27207 10.56V8.00001C7.27207 7.59795 7.59801 7.27201 8.00007 7.27201Z" fill="#9DA5B2"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1020_761">
                                            <rect width="16" height="16" fill="white"/>
                                            </clipPath>
                                        </defs>
                                        </svg>

                                    </span>
                                    <div className={cls.line}></div>
                                    <p>Щеточный</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>
                                        Тип патрона 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <g clip-path="url(#clip0_1020_761)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00007 2.32801C4.86751 2.32801 2.32807 4.86745 2.32807 8.00001C2.32807 11.1326 4.86751 13.672 8.00007 13.672C11.1326 13.672 13.6721 11.1326 13.6721 8.00001C13.6721 4.86745 11.1326 2.32801 8.00007 2.32801ZM0.87207 8.00001C0.87207 4.06332 4.06338 0.872009 8.00007 0.872009C11.9368 0.872009 15.1281 4.06332 15.1281 8.00001C15.1281 11.9367 11.9368 15.128 8.00007 15.128C4.06338 15.128 0.87207 11.9367 0.87207 8.00001ZM7.27207 5.44001C7.27207 5.03795 7.59801 4.71201 8.00007 4.71201H8.00647C8.40853 4.71201 8.73447 5.03795 8.73447 5.44001C8.73447 5.84207 8.40853 6.16801 8.00647 6.16801H8.00007C7.59801 6.16801 7.27207 5.84207 7.27207 5.44001ZM8.00007 7.27201C8.40213 7.27201 8.72807 7.59795 8.72807 8.00001V10.56C8.72807 10.9621 8.40213 11.288 8.00007 11.288C7.59801 11.288 7.27207 10.9621 7.27207 10.56V8.00001C7.27207 7.59795 7.59801 7.27201 8.00007 7.27201Z" fill="#9DA5B2"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1020_761">
                                            <rect width="16" height="16" fill="white"/>
                                            </clipPath>
                                        </defs>
                                        </svg>
                                    </span>
                                    <div className={cls.line}></div>
                                    <p>Быстрозажимной</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Диаметр зажимаемой оснастки</span>
                                    <div className={cls.line}></div>
                                    <p>0.8-10 мм</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Тип аккумулятора</span>
                                    <div className={cls.line}></div>
                                    <p>Li-Ion</p>
                                </div>
                                <div className={cls.textItem}>
                                    <span>Код товара</span>
                                    <div className={cls.line}></div>
                                    <p>{product?.id}</p>
                                </div>
                                <div>
                                    <a href="" className={cls.link}>Все характеристики</a>
                                </div>
                            </div>
                        </div>
                        <div className={cls.productSpecificationsDesc}>
                            <div className={cls.productSpecificationsDescContent}>
                                <div className={cls.top}>
                                    <button
                                        onClick={()=>setActive(0)}
                                        className={active==0 ? `${cls.active}`: ""}
                                    >
                                        <p>Описание</p>
                                    </button>
                                    <button
                                        onClick={()=>setActive(1)}
                                        className={active==1 ? `${cls.active}`: ""}
                                    >
                                        <p>Гарантия</p>
                                    </button>
                                    <button
                                        onClick={()=>setActive(2)}
                                        className={active==2 ? `${cls.active}`: ""}
                                    >
                                        <p>Альтернатива</p>
                                    </button>
                                </div> 
                                <div className={cls.middle}>
                                    <div>
                                        <div className={cls.textItem}>
                                            <span>Бренд</span>
                                            <div className={cls.line}></div>
                                            <p>{product?.brand}</p>
                                        </div>
                                        <div className={cls.textItem}>
                                            <span>Страна производитель</span>
                                            <div className={cls.line}></div>
                                            <p>Япония</p>
                                        </div>
                                        <div className={cls.textItem}>
                                            <span>Напряжение аккумулятора, В</span>
                                            <div className={cls.line}></div>
                                            <p>40</p>
                                        </div>
                                        <div className={cls.textItem}>
                                            <span>Максимальный крутящий момент, Н/м</span>
                                            <div className={cls.line}></div>
                                            <p>20</p>
                                        </div>
                                        <div className={cls.textItem}>
                                            <span>Количество скоростей работы</span>
                                            <div className={cls.line}></div>
                                            <p>1350</p>
                                        </div>
                                        <div className={cls.textItem}>
                                            <span>Тип двигателя</span>
                                            <div className={cls.line}></div>
                                            <p>Щеточный</p>
                                        </div>
                                        <div className={cls.textItem}>
                                            <span>Тип патрона</span>
                                            <div className={cls.line}></div>
                                            <p>Быстрозажимной</p>
                                        </div> 
                             
                                    </div>
                                    <div>
                                        <div className={cls.textItem}>
                                            <span>Диаметр зажимаемой оснастки
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_157_48951)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00007 2.32801C4.86751 2.32801 2.32807 4.86745 2.32807 8.00001C2.32807 11.1326 4.86751 13.672 8.00007 13.672C11.1326 13.672 13.6721 11.1326 13.6721 8.00001C13.6721 4.86745 11.1326 2.32801 8.00007 2.32801ZM0.87207 8.00001C0.87207 4.06332 4.06338 0.872009 8.00007 0.872009C11.9368 0.872009 15.1281 4.06332 15.1281 8.00001C15.1281 11.9367 11.9368 15.128 8.00007 15.128C4.06338 15.128 0.87207 11.9367 0.87207 8.00001ZM7.27207 5.44001C7.27207 5.03795 7.59801 4.71201 8.00007 4.71201H8.00647C8.40853 4.71201 8.73447 5.03795 8.73447 5.44001C8.73447 5.84207 8.40853 6.16801 8.00647 6.16801H8.00007C7.59801 6.16801 7.27207 5.84207 7.27207 5.44001ZM8.00007 7.27201C8.40213 7.27201 8.72807 7.59795 8.72807 8.00001V10.56C8.72807 10.9621 8.40213 11.288 8.00007 11.288C7.59801 11.288 7.27207 10.9621 7.27207 10.56V8.00001C7.27207 7.59795 7.59801 7.27201 8.00007 7.27201Z" fill="#9DA5B2"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_157_48951">
                                                    <rect width="16" height="16" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                                </svg>
                                            </span>
                                            <div className={cls.line}></div>
                                            <p>0.8-10 мм</p>
                                        </div> 
                                        <div className={cls.textItem}>
                                            <span>
                                                Тип аккумулятора
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_157_48951)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00007 2.32801C4.86751 2.32801 2.32807 4.86745 2.32807 8.00001C2.32807 11.1326 4.86751 13.672 8.00007 13.672C11.1326 13.672 13.6721 11.1326 13.6721 8.00001C13.6721 4.86745 11.1326 2.32801 8.00007 2.32801ZM0.87207 8.00001C0.87207 4.06332 4.06338 0.872009 8.00007 0.872009C11.9368 0.872009 15.1281 4.06332 15.1281 8.00001C15.1281 11.9367 11.9368 15.128 8.00007 15.128C4.06338 15.128 0.87207 11.9367 0.87207 8.00001ZM7.27207 5.44001C7.27207 5.03795 7.59801 4.71201 8.00007 4.71201H8.00647C8.40853 4.71201 8.73447 5.03795 8.73447 5.44001C8.73447 5.84207 8.40853 6.16801 8.00647 6.16801H8.00007C7.59801 6.16801 7.27207 5.84207 7.27207 5.44001ZM8.00007 7.27201C8.40213 7.27201 8.72807 7.59795 8.72807 8.00001V10.56C8.72807 10.9621 8.40213 11.288 8.00007 11.288C7.59801 11.288 7.27207 10.9621 7.27207 10.56V8.00001C7.27207 7.59795 7.59801 7.27201 8.00007 7.27201Z" fill="#9DA5B2"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_157_48951">
                                                    <rect width="16" height="16" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                                </svg>
                                            </span>
                                            <div className={cls.line}></div>
                                            <p>Li-Ion</p>
                                        </div> 
                                        <div className={cls.textItem}>
                                            <span>
                                                Код товара
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_157_48951)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00007 2.32801C4.86751 2.32801 2.32807 4.86745 2.32807 8.00001C2.32807 11.1326 4.86751 13.672 8.00007 13.672C11.1326 13.672 13.6721 11.1326 13.6721 8.00001C13.6721 4.86745 11.1326 2.32801 8.00007 2.32801ZM0.87207 8.00001C0.87207 4.06332 4.06338 0.872009 8.00007 0.872009C11.9368 0.872009 15.1281 4.06332 15.1281 8.00001C15.1281 11.9367 11.9368 15.128 8.00007 15.128C4.06338 15.128 0.87207 11.9367 0.87207 8.00001ZM7.27207 5.44001C7.27207 5.03795 7.59801 4.71201 8.00007 4.71201H8.00647C8.40853 4.71201 8.73447 5.03795 8.73447 5.44001C8.73447 5.84207 8.40853 6.16801 8.00647 6.16801H8.00007C7.59801 6.16801 7.27207 5.84207 7.27207 5.44001ZM8.00007 7.27201C8.40213 7.27201 8.72807 7.59795 8.72807 8.00001V10.56C8.72807 10.9621 8.40213 11.288 8.00007 11.288C7.59801 11.288 7.27207 10.9621 7.27207 10.56V8.00001C7.27207 7.59795 7.59801 7.27201 8.00007 7.27201Z" fill="#9DA5B2"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_157_48951">
                                                    <rect width="16" height="16" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                                </svg>
                                            </span>
                                            <div className={cls.line}></div>
                                            <p>{product?.id}</p>
                                        </div>
                                        <div className={cls.textItem}>
                                            <span>
                                                Возможность быстрой смены патрона
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_157_48951)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00007 2.32801C4.86751 2.32801 2.32807 4.86745 2.32807 8.00001C2.32807 11.1326 4.86751 13.672 8.00007 13.672C11.1326 13.672 13.6721 11.1326 13.6721 8.00001C13.6721 4.86745 11.1326 2.32801 8.00007 2.32801ZM0.87207 8.00001C0.87207 4.06332 4.06338 0.872009 8.00007 0.872009C11.9368 0.872009 15.1281 4.06332 15.1281 8.00001C15.1281 11.9367 11.9368 15.128 8.00007 15.128C4.06338 15.128 0.87207 11.9367 0.87207 8.00001ZM7.27207 5.44001C7.27207 5.03795 7.59801 4.71201 8.00007 4.71201H8.00647C8.40853 4.71201 8.73447 5.03795 8.73447 5.44001C8.73447 5.84207 8.40853 6.16801 8.00647 6.16801H8.00007C7.59801 6.16801 7.27207 5.84207 7.27207 5.44001ZM8.00007 7.27201C8.40213 7.27201 8.72807 7.59795 8.72807 8.00001V10.56C8.72807 10.9621 8.40213 11.288 8.00007 11.288C7.59801 11.288 7.27207 10.9621 7.27207 10.56V8.00001C7.27207 7.59795 7.59801 7.27201 8.00007 7.27201Z" fill="#9DA5B2"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_157_48951">
                                                    <rect width="16" height="16" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                                </svg>
                                            </span>
                                            <div className={cls.line}></div>
                                            <p>Есть</p>
                                        </div>  
                                        <div className={cls.textItem}>
                                            <span>
                                                Количество аккумуляторов
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_157_48951)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00007 2.32801C4.86751 2.32801 2.32807 4.86745 2.32807 8.00001C2.32807 11.1326 4.86751 13.672 8.00007 13.672C11.1326 13.672 13.6721 11.1326 13.6721 8.00001C13.6721 4.86745 11.1326 2.32801 8.00007 2.32801ZM0.87207 8.00001C0.87207 4.06332 4.06338 0.872009 8.00007 0.872009C11.9368 0.872009 15.1281 4.06332 15.1281 8.00001C15.1281 11.9367 11.9368 15.128 8.00007 15.128C4.06338 15.128 0.87207 11.9367 0.87207 8.00001ZM7.27207 5.44001C7.27207 5.03795 7.59801 4.71201 8.00007 4.71201H8.00647C8.40853 4.71201 8.73447 5.03795 8.73447 5.44001C8.73447 5.84207 8.40853 6.16801 8.00647 6.16801H8.00007C7.59801 6.16801 7.27207 5.84207 7.27207 5.44001ZM8.00007 7.27201C8.40213 7.27201 8.72807 7.59795 8.72807 8.00001V10.56C8.72807 10.9621 8.40213 11.288 8.00007 11.288C7.59801 11.288 7.27207 10.9621 7.27207 10.56V8.00001C7.27207 7.59795 7.59801 7.27201 8.00007 7.27201Z" fill="#9DA5B2"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_157_48951">
                                                    <rect width="16" height="16" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                                </svg>
                                            </span>
                                            <div className={cls.line}></div>
                                            <p>2</p>
                                        </div> 
                                        <div className={cls.textItem}>
                                            <span>
                                                Дополнительные функции
                                            </span>
                                            <div className={cls.line}></div>
                                            <p>подсветка рабочей зоны</p>
                                        </div> 
                                    </div>
                                </div>
                                <div className={cls.bottom}>
                                    {active == 0 &&
                                    <>
                                    <div className={cls.textDescriptionItem}>
                                        <p>Аккумуляторная дрель-шуруповёрт MTX MCDL-12-02 — компактный и универсальный инструмент для бытового ремонта, сборки мебели и монтажных работ. Модель работает от Li-Ion аккумулятора напряжением 12 В и развивает крутящий момент до 20 Н·м, что обеспечивает уверенное закручивание крепежа и сверление различных материалов. Инструмент подходит для работы с деревом, пластиком и металлом, позволяя сверлить отверстия диаметром до 20 мм в древесине и до 6 мм в металле.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Надежный инструмент</h4>
                                        <p>Двухскоростной редуктор и регулировка крутящего момента (18+1 ступеней) позволяют точно подобрать режим работы под конкретную задачу — от аккуратной сборки мебели до сверления отверстий. Частота вращения регулируется в диапазоне до 1350 об/мин, а функция реверса облегчает как монтаж, так и демонтаж крепежа.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Бесшумная работа</h4>
                                        <p>Инструмент оснащён быстрозажимным патроном, что позволяет быстро менять биты и сверла без дополнительных ключей. Для удобства работы предусмотрена подсветка рабочей зоны и эргономичная прорезиненная рукоятка, обеспечивающая надёжный хват даже при длительном использовании.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Экономично и выгодно</h4>
                                        <p>В комплект поставки входят два аккумулятора ёмкостью 2 А·ч, зарядное устройство и удобный кейс для хранения и транспортировки. Благодаря запасному аккумулятору можно работать практически без перерывов, меняя батарею по мере разрядки.</p>
                                    </div>
                                    </>
                                    }
                                    {active == 1 &&
                                    <>
                                    <div className={cls.textDescriptionItem}>
                                        <p>Мы понимаем, что покупки в интернете требуют доверия. Поэтому мы обеспечиваем прозрачную и понятную систему гарантий для каждого клиента.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Гарантия подлинности товаров</h4>
                                        <p>Все продавцы проходят проверку перед размещением на платформе. Мы стремимся к тому, чтобы вы получали только оригинальную и качественную продукцию.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Возврат и обмен без лишних сложностей</h4>
                                        <p>Если товар не соответствует описанию, имеет дефекты или просто не подошёл — вы можете оформить возврат или обмен в установленный срок. Процесс максимально упрощён и не требует лишней бюрократии.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Защита платежей</h4>
                                        <p>Ваши деньги не передаются продавцу до момента подтверждения получения товара. Это гарантирует, что вы платите только за то, что действительно получили.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Поддержка на каждом этапе</h4>
                                        <p>Наша служба поддержки помогает решать любые спорные ситуации между покупателем и продавцом. Мы всегда на стороне справедливости.</p>
                                    </div>
                                    <div className={cls.textDescriptionItem}>
                                        <h4>Ответственность продавцов</h4>
                                        <p>Продавцы обязаны соблюдать стандарты качества и сроки доставки. За нарушения предусмотрены санкции вплоть до блокировки.</p>
                                    </div>
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={cls.productReviews}>
                            <div className={cls.productReviewsTitleBlock}>
                                <div className={cls.productReviewTitle}>
                                    <Title>Отзывы</Title>
                                    <p>{[].length} отзывов</p>
                                </div>
                            </div>
                            <div className={cls.productReviewRating}>
                                <div className={cls.productReviewRatingContent}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10.0008 15.2167L4.12295 18.5069L5.43573 11.8999L0.490234 7.32652L7.17943 6.5334L10.0008 0.416687L12.8222 6.5334L19.5113 7.32652L14.5659 11.8999L15.8787 18.5069L10.0008 15.2167Z" fill="#EDBA37"/>
                                    </svg>
                                    <div className={cls.productRatingValue}>
                                        <p>5.0</p>
                                        <p>/5</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cls.right}>
                        <div className={cls.badges}>
                            <Badge type={'new'}>
                                Новинка
                            </Badge>
                            <Badge type={'new'}>
                                Хит
                            </Badge>
                        </div>
                        <div className={cls.priceBlock}>
                            <div className={cls.priceDiscount}>
                                {product?.hasDiscount && 
                                    <>
                                        <span className={cls.oldPrice}>
                                            {product.oldPrice} ₸
                                        </span>
                                        <Badge type={'discount'}>
                                            -{product.discountPercent}%
                                        </Badge>
                                    </>
                                }
                            </div>
                            <div className={cls.finalPrice}>
                                <p>{product?.finalPrice} ₸</p>
                            </div>
                        </div>
                        <div className={cls.cartBtnBlock}>
                            {!add &&
                            <button onClick={()=>setAdd(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M13.334 7.50002V5.00002C13.334 3.15907 11.8416 1.66669 10.0006 1.66669C8.15968 1.66669 6.6673 3.15907 6.6673 5.00002V7.50002M2.99397 8.62666L2.49397 13.96C2.35181 15.4764 2.28072 16.2346 2.53234 16.8202C2.75338 17.3347 3.14073 17.7601 3.63232 18.0282C4.19191 18.3334 4.95344 18.3334 6.47651 18.3334H13.5248C15.0478 18.3334 15.8094 18.3334 16.369 18.0282C16.8605 17.7601 17.2479 17.3347 17.4689 16.8202C17.7205 16.2346 17.6495 15.4764 17.5073 13.96L17.0073 8.62666C16.8872 7.34614 16.8272 6.70588 16.5392 6.22182C16.2856 5.79551 15.9109 5.45428 15.4628 5.24156C14.954 5.00002 14.3109 5.00002 13.0248 5.00002L6.97651 5.00002C5.69038 5.00002 5.04731 5.00002 4.53848 5.24156C4.09035 5.45428 3.71564 5.79551 3.46202 6.22182C3.17404 6.70588 3.11402 7.34614 2.99397 8.62666Z" stroke="white" stroke-width="1.95556" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p>Добавить в корзину</p>
                            </button>}
                            {add && 
                            <div className={cls.counter}>
                                <div className={cls.counterWrapper}>
                                    <button
                                        onClick={()=>{
                                            counter !== 0 &&
                                            (setCounter(counter - 1) )
                                            counter == 0? removeFromCart(product.id):
                                            decreaseQuantity(product.id)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4.16699 10H15.8337" stroke="#152429" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <p>{counter !== 0 && counter}</p>
                                    <button
                                        onClick={()=>{
                                            setCounter(counter + 1);
                                            addToCart(product?.id)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.0003 4.16669V15.8334M4.16699 10H15.8337" stroke="#152429" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3.33301 10H16.6663M11.6663 15L16.6663 10L11.6663 5" stroke="#EEEFF0" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            }
                        </div>
                        <div className={cls.productDeliveryBlock}>
                            <div className={cls.productDeliveryItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M13.3337 11.1454C16.2768 11.724 18.3337 13.0456 18.3337 14.5833C18.3337 16.6544 14.6027 18.3333 10.0003 18.3333C5.39795 18.3333 1.66699 16.6544 1.66699 14.5833C1.66699 13.0456 3.72382 11.724 6.66699 11.1454M10.0003 14.1667V7.5M10.0003 7.5C11.381 7.5 12.5003 6.38071 12.5003 5C12.5003 3.61929 11.381 2.5 10.0003 2.5C8.61961 2.5 7.50033 3.61929 7.50033 5C7.50033 6.38071 8.61961 7.5 10.0003 7.5Z" stroke="#909596" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <div className={cls.productDeliveryItemText}>
                                    <p>Самовывоз: сегодня из <span>3 магазинов</span></p>
                                    <span>Бесплатно</span>
                                </div>
                            </div>
                            <div className={cls.productDeliveryItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M11.667 5.83331H13.6147C13.8185 5.83331 13.9204 5.83331 14.0164 5.85634C14.1014 5.87675 14.1827 5.91042 14.2572 5.95611C14.3413 6.00765 14.4134 6.07971 14.5575 6.22384L17.9431 9.60946C18.0873 9.75358 18.1593 9.82564 18.2109 9.90974C18.2565 9.9843 18.2902 10.0656 18.3106 10.1506C18.3337 10.2465 18.3337 10.3484 18.3337 10.5523V12.9166C18.3337 13.3049 18.3337 13.4991 18.2702 13.6522C18.1856 13.8564 18.0234 14.0186 17.8192 14.1032C17.6661 14.1666 17.4719 14.1666 17.0837 14.1666M12.917 14.1666H11.667M11.667 14.1666V5.99998C11.667 5.06656 11.667 4.59985 11.4853 4.24333C11.3255 3.92973 11.0706 3.67476 10.757 3.51497C10.4005 3.33331 9.93375 3.33331 9.00033 3.33331H4.33366C3.40024 3.33331 2.93353 3.33331 2.57701 3.51497C2.2634 3.67476 2.00844 3.92973 1.84865 4.24333C1.66699 4.59985 1.66699 5.06656 1.66699 5.99998V12.5C1.66699 13.4205 2.41318 14.1666 3.33366 14.1666M11.667 14.1666H8.33366M8.33366 14.1666C8.33366 15.5474 7.21437 16.6666 5.83366 16.6666C4.45295 16.6666 3.33366 15.5474 3.33366 14.1666M8.33366 14.1666C8.33366 12.7859 7.21437 11.6666 5.83366 11.6666C4.45295 11.6666 3.33366 12.7859 3.33366 14.1666M17.0837 14.5833C17.0837 15.7339 16.1509 16.6666 15.0003 16.6666C13.8497 16.6666 12.917 15.7339 12.917 14.5833C12.917 13.4327 13.8497 12.5 15.0003 12.5C16.1509 12.5 17.0837 13.4327 17.0837 14.5833Z" stroke="#909596" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <div className={cls.productDeliveryItemText}>
                                    <p>Доставка: сегодня, {today}</p>
                                    <span>Бесплатно в квадрате доставки</span>
                                </div>
                            </div>
                            <div className={cls.productDeliveryItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10.8325 9.16659L2.91588 17.0833M11.6812 2.94865C12.6962 3.62215 13.6718 4.41617 14.5835 5.32783C15.503 6.24735 16.3029 7.23193 16.9801 8.25638M7.71168 6.58004L5.31596 5.78147C5.04005 5.6895 4.73616 5.74802 4.51415 5.93588L2.13318 7.95054C1.64574 8.36299 1.78423 9.14791 2.38338 9.36865L4.63938 10.1998M9.73342 15.2937L10.5646 17.5497C10.7853 18.1488 11.5702 18.2873 11.9827 17.7999L13.9973 15.4189C14.1852 15.1969 14.2437 14.893 14.1518 14.6171L13.3532 12.2214M16.123 1.8922L12.0343 2.57365C11.5928 2.64723 11.1878 2.86424 10.8821 3.1911L5.37118 9.08205C3.94272 10.609 3.98245 12.9937 5.46099 14.4722C6.93953 15.9508 9.32418 15.9905 10.8512 14.562L16.7421 9.05114C17.069 8.74537 17.286 8.34041 17.3596 7.89891L18.041 3.81018C18.229 2.68215 17.2511 1.70419 16.123 1.8922Z" stroke="#909596" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <div className={cls.productDeliveryItemText}>
                                    <p>Экспресс-доставка: сегодня, {today}</p>
                                    <span>от 5 200 ₸</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}