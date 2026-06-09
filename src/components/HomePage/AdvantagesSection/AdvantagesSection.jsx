import { AdvantagesAssortimentIcon } from '../../../../public/assets/icons/AdvantagesAssortimentIcon'
import { AdvantagesDeliveryIcon } from '../../../../public/assets/icons/AdvantagesDeliveryIcon'
import { AdvantagesGarantyIcon } from '../../../../public/assets/icons/AdvantagesGarantyIcon'
import { useLanguage } from '../../../stores/useLanguage'
import cls from './AdvantagesSection.module.css'

export const AdvantagesSection = () =>{

    const {lang} = useLanguage();

    const cards = [
        {
            lang: "ru",
            items: [
                {
                    icon: <AdvantagesDeliveryIcon />,
                    title: 'Доставка по всему Казахстану',
                    description: 'Привезём заказ в любой город и посёлок'
                },
                {
                    icon: <AdvantagesAssortimentIcon />,
                    title: 'Широкий ассортимент',
                    description: 'Всё для стройки и ремонта в одном месте'
                },
                {
                    icon: <AdvantagesGarantyIcon />,
                    title: 'Гарантия на всё',
                    description: 'Отвечаем за качество каждого товара'
                },
            ]
        },
        {
            lang:"kk",
            items: [
                {
                    icon: <AdvantagesDeliveryIcon />,
                    title: 'Қазақстан бойынша жеткізу',
                    description: 'Тапсырысты кез келген қалаға немесе елді мекенге жеткіземіз.'
                },
                {
                    icon: <AdvantagesAssortimentIcon />,
                    title: 'Кең ауқым',
                    description: 'Құрылысқа қажеттi таурлардың барлығы бір жерде'
                },
                {
                    icon: <AdvantagesGarantyIcon />,
                    title: 'Барлығына кепілдік',
                    description: 'Біз әрбір өнімнің сапасына жауаптымыз'
                },
            ]

        }
    ]
    return(
        <section className={cls.advantagesSection}>
            <div className={cls.advantagesSectionContent}>
                {cards
                    .filter((card) => card.lang === lang)
                    .map((card) =>
                        card?.items?.map((item) => (
                            <div 
                                className={cls.advantagesCard} 
                                key={item.title}
                            >
                                <div>
                                    {item.icon}
                                    <div className={cls.advantageCardTitle}>
                                        <p>{item.title}</p>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </section>
    )
}