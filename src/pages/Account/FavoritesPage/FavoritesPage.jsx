import { AccountTitle } from '../../../components/AccountLayout'
import { BreadCrumbs } from '../../../components/AccountLayout'
import cls from './FavoritesPage.module.css'
import { useFavorites } from '../../../hooks/useFavorites'

export const FavoritesPage = () =>{
    const {favorites} = useFavorites();
    console.log(favorites)
    return(
        <div>
            <div className={cls.pageTop}>
                <div className={cls.breadCrumbsWrapper}>
                    <BreadCrumbs >Профиль</BreadCrumbs>
                    <BreadCrumbs >-</BreadCrumbs>
                    <BreadCrumbs >Избранное</BreadCrumbs>
                </div>
                <div className={cls.pageTitleWrapper}>
                    <AccountTitle>Избранное</AccountTitle>
                </div>
            </div>
        </div>
    )
}