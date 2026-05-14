import cls from './AccountTitle.module.css';

export const AccountTitle = ({children})=>{
    return(
        <h4 className={cls.accountTitle}>
            {children}
        </h4>
    )
}