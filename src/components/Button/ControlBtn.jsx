import cls from './ControlBtn.module.css'
import { useNavigate } from 'react-router-dom'

export const ControlBtn = ({children, nav, onClick, onTouch}) =>{
    const navigate = useNavigate();
    return(
        <button 
            className={cls.controlBtn} 
            onClick={()=>{nav ? navigate(nav): onClick()}}
            onTouchStart={onTouch}
            // onTouchStart={()=>onClick()}
        >
            {children}
        </button>
    )
}