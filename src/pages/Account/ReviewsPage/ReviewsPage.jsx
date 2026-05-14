import cls from './ReviewsPage.module.css';
import { AccountTitle } from '../../../components/AccountLayout';
import { BreadCrumbs } from '../../../components/AccountLayout';

export const ReviewsPage = () =>{
    return(
        <div>
            <div className={cls.pageTop}>
                <div className={cls.breadCrumbsWrapper}>
                    <BreadCrumbs >Профиль</BreadCrumbs>
                    <BreadCrumbs >-</BreadCrumbs>
                    <BreadCrumbs >Отзывы</BreadCrumbs>
                </div>
                <div className={cls.pageTitleWrapper}>
                    <AccountTitle>Отзывы</AccountTitle>
                </div>
            </div>
        </div>
    )
}