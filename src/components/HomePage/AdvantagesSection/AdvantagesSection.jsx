import { AdvantagesAssortimentIcon } from '../../../../public/assets/icons/AdvantagesAssortimentIcon'
import { AdvantagesDeliveryIcon } from '../../../../public/assets/icons/AdvantagesDeliveryIcon'
import { AdvantagesGarantyIcon } from '../../../../public/assets/icons/AdvantagesGarantyIcon'
import cls from './AdvantagesSection.module.css'

export const AdvantagesSection = () =>{
    return(
        <section className={cls.advantagesSection}>
            <div className={cls.advantagesSectionContent}>
                <div className={cls.advantagesCard}>
                    <div>
                        <AdvantagesDeliveryIcon />
                        <div className={cls.advantageCardTitle}>
                            <p>Доставка по всему Казахстану</p>
                            <p>Привезём заказ в любой город и посёлок</p>
                        </div>
                    </div>
                </div>
                <div className={cls.advantagesCard}>
                    <div>
                        <AdvantagesAssortimentIcon />
                        <div className={cls.advantageCardTitle}>
                            <p>Широкий ассортимент</p>
                            <p>Всё для стройки и ремонта в одном месте</p>
                        </div>
                    </div>
                </div>
                <div className={cls.advantagesCard}>
                    <div>
                        <AdvantagesGarantyIcon />
                        <div className={cls.advantageCardTitle}>
                            <p>Гарантия на всё</p>
                            <p>Отвечаем за качество каждого товара</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}