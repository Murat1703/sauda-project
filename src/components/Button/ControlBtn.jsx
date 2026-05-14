import cls from './ControlBtn.module.css'
import { useNavigate } from 'react-router-dom'

export const ControlBtn = ({children, nav, onClick}) =>{
    const navigate = useNavigate();
    return(
        <button className={cls.controlBtn} onClick={()=>{nav ? navigate(nav): onClick()}}>
            {children}
        </button>
    )
}