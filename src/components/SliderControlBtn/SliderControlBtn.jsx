import cls from './SliderControlBtn.module.css'

export const SliderControlBtn = ({children, onClick}) =>{ 
    return(
        <button className={cls.sliderControlBtn} onClick={onClick}>
            {children}
        </button>
    )
}