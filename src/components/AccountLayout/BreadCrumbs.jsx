import cls from './BreadCrumbs.module.css';

export const BreadCrumbs = ({children}) =>{
    return(
        <span className={cls.BreadCrumbs}>
            {children}
        </span>
    )
}