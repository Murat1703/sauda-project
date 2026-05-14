import cls from './Button.module.css'

export const Button = ({children, type, onClick}) =>{
    return(
        <button 
            onClick={onClick}
            className={`${cls.btn}`}
        >
            {children}
        </button>
    )
}