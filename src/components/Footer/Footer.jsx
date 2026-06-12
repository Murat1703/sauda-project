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
import { useLanguage } from '../../stores/useLanguage.js'

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

    const {
        subscribeStatus, 
        addToSubscribe, 
        subscribeError, 
        loadingSubscribe
    } = useSubscribe();

    const [inputError, setInputError] = useState(null)

    const [status, setStatus] = useState(null)

    const handleToSubScribe = async(email) =>{
        if (email.length !== 0){
            await addToSubscribe({
                email: email
            })
        } else {
            setInputError('Введите email');
            return
        }
        setStatus(subscribeStatus?.status)
    }

    const {lang} = useLanguage();

    return(
        <>
        <footer>
            <div className={cls.footerContent}>
                <div className={cls.newsLetterWrapper}>
                    <div className={cls.footerLogo}>
                        <img src={logo} alt='footer-logo'/>
                    </div>
                    <div className={cls.newsLetterContent}>
                        {lang=='ru' ?
                        <p>Сэкономьте на покупке с нашей рассылкой о спецпредложениях, акциях и скидках</p>
                        :<p>Арнайы ұсыныстар, акциялар мен жеңілдіктер туралы хабарламаларға жазылып, тиімді сатып алыңыз.</p>
                        }
                        <div className={cls.newsLetterInput}>
                            <input 
                                type="email" 
                                placeholder={`${lang == 'ru'?`Электронная почта`: `Электрондық пошта`}`}
                                value={email}
                                onChange={(e)=>{
                                    setInputError(null)
                                    setEmail(e.target.value);
                                    setStatus(null)
                                }}
                                style={{
                                    border: inputError ? "1px solid #FC4127": "1px solid rgba(255,255,255, .16)"
                                }}
                            />
                            <Button 
                                onClick={()=>handleToSubScribe(email)}
                            >
                                {loadingSubscribe && <Loader />}
                                {!loadingSubscribe &&
                                    <p>
                                        {lang=='ru'? `Подписаться`: `Жазылу`}
                                    </p>}
                            </Button>
                            {inputError && <p className={cls.newsLetterInfoStatus}>
                                {inputError}
                            </p>}
                            {subscribeError && 
                                <p className={cls.newsLetterInfoStatus}>{subscribeError}</p>
                            }
                            {status && 
                            <p className={cls.newsLetterInfoStatus}>
                                {status}
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
                            <li><a>{lang=='ru'? `Полный каталог`: `Толық каталог`}</a></li>
                        </ul>
                        <ul>
                            <h4>
                                {lang=='ru'? `Покупателям`:`Сатып алушыларға`}
                            </h4>
                            <li>
                                <Link>
                                    {lang=='ru'? `Акции`:`Акциялар`}
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    {lang=='ru'? `Доставка и оплата`:`Жеткізу және төлем`}
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    {lang=='ru'? `Отследить заказ`:`Тапсырысты қадағалау`}
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    {lang=='ru'? `Помощь 24/7`:`Тәулік бойы көмек.`}
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <h4>Компания</h4>
                            <li>
                                <Link to={`/about`}>
                                    {lang=='ru'? `о нас`:`Біз туралы.`}
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    {lang=='ru'? `Адреса магазинов и ПВЗ`:`Дүкендер мен тапсырысты алу пункттері`}
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    {lang=='ru'? `Новости`:`Жаңалықтар`}
                                </Link>
                            </li>
                            <li>
                                <Link to={`/contacts`}>
                                    {lang=='ru'? `Контакты`:`Байланыс`}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cls.footerContacts}>
                        <div>
                            <a href="tel:+77013993558" target='_blank'>+7 701 399 35 38</a>
                            <p>9:00 – 21:00, {lang=='ru' ? `без выходных`:`демалыссыз`}</p>
                        </div>
                        <div>
                            <Button>
                                <p>{lang=='ru' ? `Перезвонить мне`:`Маған қайта қоңырау шалу`}</p>
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
                    <p>{lang == 'ru'?`© 2026 TOO «Sauda.market». Все права защищены.`:`© 2026 «Sauda.market» ЖШС. Барлық құқықтар қорғалған.`}</p>
                    <div>
                        <Link to={`/terms-of-use`} >
                        {lang == 'ru'?`Пользовательское соглашение`:` Пайдаланушы келісімі`}</Link>
                        <Link to={`/privacy-police`}>
                        {lang == 'ru'?`Политика конфединциальности`:` Құпиялылық саясаты`}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}