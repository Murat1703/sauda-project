import { Children } from 'react'
import cls from './Title.module.css'

export const Title = ({children}) =>{
    return(
        <h3 className={cls.title}>{children}</h3>
    )
}