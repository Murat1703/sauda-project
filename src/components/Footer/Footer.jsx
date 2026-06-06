import cls from './Footer.module.css'
import logo from './images/logo.svg'
import { Button, ControlBtn } from '../Button'
import { useMediaQuery } from 'react-responsive'
import { YoutubeFooterIcon } from '../../../public/assets/icons/YoutubeFooterIcon'
import { InstagramFooterIcon } from '../../../public/assets/icons/InstagramFooterIcon'
import { useCategories } from '../../stores/useCategories.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Footer = () =>{

    const{categories, loadCategories, loadingCategories, errLoadingCategories}= useCategories();

    useEffect(()=>{
        loadCategories();
    },[])

    const isMobile = useMediaQuery({maxWidth: 768})

    return(
        <>
        <footer>
            <div className={cls.footerContent}>
                <div className={cls.newsLetterWrapper}>
                    <div className={cls.footerLogo}>
                        <img src={logo} alt='footer-logo'/>
                    </div>
                    <div className={cls.newsLetterContent}>
                        <p>Сэкономьте на покупке с нашей рассылкой о спецпредложениях, акциях и скидках</p>
                        <div className={cls.newsLetterInput}>
                            <input type="text" placeholder='Электронная почта'/>
                            <Button>
                                <p>Подписаться</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cls.footerLinksWrapper}>
                    <div className={cls.footerLinksContent}>
                        <ul>
                            <h4>Каталог</h4>
                            {categories?.slice(0,5).map((item,index)=>{
                                return(
                                    <li key={item.id}>
                                        <Link to={`/catalog/categories/${item.slug}`}>{item.name}</Link>
                                    </li>
                                )
                            })}
                            <li><a>Полный каталог</a></li>
                        </ul>
                        <ul>
                            <h4>Покупателям</h4>
                            <li>
                                <Link>Акции</Link>
                            </li>
                            <li>
                                <Link>Доставка и оплата</Link>
                            </li>
                            <li>
                                <Link>Отследить заказ</Link>
                            </li>
                            <li>
                                <Link>Помощь 24/7</Link>
                            </li>
                        </ul>
                        <ul>
                            <h4>Компания</h4>
                            <li>
                                <Link>О нас</Link>
                            </li>
                            <li>
                                <Link>Адреса магазинов и ПВЗ</Link>
                            </li>
                            <li>
                                <Link>Новости</Link>
                            </li>
                            <li>
                                <Link>Контакты</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cls.footerContacts}>
                        <div>
                            <a href="tel:+77013993558" target='_blank'>+7 701 399 35 38</a>
                            <p>9:00 – 21:00, без выходных</p>
                        </div>
                        <div>
                            <Button>
                                <p>Перезвонить мне</p>
                            </Button>
                            <Button>
                                <YoutubeFooterIcon />
                            </Button>
                            <Button>
                                <InstagramFooterIcon />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cls.footerLegal}>
                    <p>© 2026 TOO «Sauda.market». Все права защищены.</p>
                    <div>
                        <a href="/agreement">Пользовательское соглашение</a>
                        <a href="/policy">Политика конфединциальности</a>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}