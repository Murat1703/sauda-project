import cls from './CounterBadge.module.css'

export const CounterBadge = ({count}) =>{
    return(
        <span className={cls.counterBadge}>{count}</span>
    )
}