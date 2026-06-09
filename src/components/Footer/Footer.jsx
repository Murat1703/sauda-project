import cls from './Footer.module.css'
import logo from './images/logo.svg'
import { Button, ControlBtn } from '../Button'
import { useMediaQuery } from 'react-responsive'
import { YoutubeFooterIcon } from '../../../public/assets/icons/YoutubeFooterIcon'
import { InstagramFooterIcon } from '../../../public/assets/icons/InstagramFooterIcon'
import { useCategories } from '../../stores/useCategories.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSubscribe } from '../../hooks/useSubscribe.js'
import {Loader} from '../Loader'

export const Footer = () =>{

    const{
        categories, 
        loadCategories, 
        loadingCategories, 
        errLoadingCategories
    }= useCategories();

    useEffect(()=>{
        loadCategories();
    },[])

    const isMobile = useMediaQuery({maxWidth: 768})

    const [email, setEmail] = useState('')

    const {suscribeStatus, addToSubscribe, subscribeError, loadingSubscribe} = useSubscribe();

    const [inputError, setInputError] = useState(null)

    const handleToSubScribe = async(email) =>{
        if (email.length !== 0){
            await addToSubscribe({
                email: email
            })
        } else {
            setInputError('Введите email');
            return
        }
    }

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
                            <input 
                                type="email" 
                                placeholder='Электронная почта'
                                value={email}
                                onChange={(e)=>{
                                    setInputError(null)
                                    setEmail(e.target.value);
                                }}
                                style={{
                                    border: inputError ? "1px solid #FC4127": "1px solid rgba(255,255,255, .16)"
                                }}
                            />
                            <Button 
                                onClick={()=>handleToSubScribe(email)}
                            >
                                {loadingSubscribe && <Loader />}
                                {!loadingSubscribe &&<p>Подписаться</p>}
                            </Button>
                            {inputError && <p className={cls.newsLetterInfoStatus}>
                                {inputError}
                            </p>}
                            {subscribeError && 
                                <p className={cls.newsLetterInfoStatus}>{subscribeError}</p>
                            }
                            {suscribeStatus && 
                            <p className={cls.newsLetterInfoStatus}>
                                {suscribeStatus}
                            </p>}
                            
                        </div>
                    </div>
                </div>
                <div className={cls.footerLinksWrapper}>
                    <div className={cls.footerLinksContent}>
                        <ul>
                            <h4>Каталог</h4>
                            {errLoadingCategories && 
                            <li>
                                <a>
                                    {errLoadingCategories}
                                </a>
                            </li>}
                            {categories?.slice(0,5).map((item)=>{
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
                                <Link to={`/about`}>О нас</Link>
                            </li>
                            <li>
                                <Link>Адреса магазинов и ПВЗ</Link>
                            </li>
                            <li>
                                <Link>Новости</Link>
                            </li>
                            <li>
                                <Link to={`/contacts`}>Контакты</Link>
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
                        <Link to={`/terms-of-use`} >Пользовательское соглашение</Link>
                        <Link to={`/privacy-police`}>Политика конфединциальности</Link>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}