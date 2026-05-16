import cls from './Banner.module.css'
import img from './images/9c4f49d877fe9b384778f2d833497e1cfb8b3023.png'

export const Banner = ({title, dicsount}) =>{
    return(
        <div className={cls.bannerWrapper}>
            <p className={cls.bannerText}>{title}</p>
            <img src={img} alt='banner-img'/>
            <div className={cls.badge}>
                <p>до - {dicsount}%</p>
            </div>
        </div>
    )
}