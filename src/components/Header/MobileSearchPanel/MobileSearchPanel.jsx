import cls from './MobileSearchPanel.module.css'
import { MobileSearchIcon } from '../../../../public/assets/icons/MobileSearchIcon'

export const MobileSearchPanel = ({searchString, setSearchString, lang})=>{
    return(
        <div className={cls.mobileSearchPanel}>
            <MobileSearchIcon />
            <input 
                className={cls.mobileSearch} 
                value={searchString}
                onChange={(e)=>setSearchString(e.target.value)} 
                placeholder={lang=='ru'?`Ищите все для стройки и ремонта `:`Құрылыс пен жөндеуге қажеттінің бәрін іздеңіз`}
            />
        </div>
    )
}