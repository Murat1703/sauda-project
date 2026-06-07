import cls from './SnackBar.module.css'
import { Link } from 'react-router-dom'

export const SnackBar = ({text, isDelete, toCart}) =>{
    return(
        <div className={cls.toastContent}>
            <div>
                <p>{text}</p>
            </div>
            {!isDelete && toCart && 
            <Link to={toCart}>
                Нажмите, чтобы перейти
            </Link>
            }
            {!isDelete && !toCart && 
            <Link to={'/account/favorites'}>
                Нажмите, чтобы перейти
            </Link>
            }
        </div>
    )
}