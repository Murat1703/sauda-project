import cls from './EmptyResults.module.css'
import { Link } from 'react-router-dom'

export const EmptyResults = ({icon, text, description}) =>{
    return(
        <div className={cls.emptyResults}>
            <div className={cls.emptyResultsInfo}>
                <div className={cls.titleBlock}>
                    <div className={cls.icon}>
                        {icon}
                    </div>
                    <div className={cls.text}>
                        <p>{text}</p>
                        <p>{description}</p>
                    </div>
                </div>
                <Link to='/'>
                    <button className={cls.backBtn}>
                        <p>На главную</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}