import cls from './FilersContainer.module.css';

export const FiltersContainer = ({children}) =>{
    return(
        <div className={cls.filtersContainer}>
            {children}
        </div>
    )
}