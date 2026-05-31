import cls from './SnackBar.module.css'
import { Link } from 'react-router-dom'

export const SnackBar = ({text, isDelete}) =>{
    return(
        <div className={cls.toastContent}>
            <div>
                <p>{text}</p>
            </div>
            {!isDelete &&
            <Link to='/account/favorites'>
                Нажмите, чтобы перейти
            </Link>
            }
        </div>
    )
}