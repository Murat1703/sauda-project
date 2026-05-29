import cls from './Footer.module.css'
import logo from './images/logo.svg'
import { Button, ControlBtn } from '../Button'
import { useMediaQuery } from 'react-responsive'
import { YoutubeFooterIcon } from '../../../public/assets/icons/YoutubeFooterIcon'
import { InstagramFooterIcon } from '../../../public/assets/icons/InstagramFooterIcon'

export const Footer = () =>{

    const Menu = [
        {
            label: "Каталог",
            link: '/catalog',
            children : [
                {
                    label: "Инструменты",
                    link: "/"
                },
                {
                    label: "Смеси",
                    link: "/"
                },
                {
                    label: "Электрика",
                    link: "/"
                },
                {
                    label: "Крепеж и фурнитура",
                    link: "/"
                },
                {
                    label: "Полный каталог",
                    link: "/catalog"
                }
            ]
        },
        {
            label: "Покупателям",
            link: '/customers',
            children: [
                {
                    label: 'Акции',
                    link: '/akciy'
                },
                {
                    label: 'Доставка и оплата',
                    link: '/delivery'
                },
                {
                    label: 'Отследить заказ',
                    link: '/delivery'
                },
                {
                    label: 'Помощь 24/7',
                    link: '/help'
                }
            ]
        },
        {
            label: "Компания",
            link: '/company',
            children: [
                {
                    label: 'О Нас',
                    link: '/about'
                },
                {
                    label: 'Адреса магазинов и ПВЗ',
                    link: '/adress'
                },
                {
                    label: 'Новости',
                    link: '/news'
                },
                {
                    label: 'Контакты',
                    link: '/contacts'
                }
            ]
        }
    ]

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
                        {
                            Menu.map((item, index)=>{
                                return(
                                    <ul key={index}>
                                        <h4>{item.label}</h4>
                                        {item.children && item.children.map((children, index)=>(
                                            <li key={index}>
                                                <a href={children.link}>{children.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                )
                            })
                        }
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