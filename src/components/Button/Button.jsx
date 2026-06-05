import cls from './Button.module.css'

export const Button = ({children, type, onClick, disabled}) =>{
    return(
        <button 
            onClick={onClick}
            className={`${cls.btn}`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}