import cls from './ReviewsPage.module.css';
import { AccountTitle } from '../../../components/AccountLayout';
import { BreadCrumbs } from '../../../components/AccountLayout';
import { useState } from 'react';

export const ReviewsPage = () =>{

    const [reviewsFilter, setReviewsFilter] = useState('waiting');

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
            <div className={cls.reviewsPageContent}>
                <div className={cls.reviewsFiltersWrapper}>
                    <button
                        className={`${reviewsFilter == 'waiting'? `${cls.active}`: ""}`}
                        onClick={()=>setReviewsFilter('waiting')}
                    >
                        <p>Ожидают отзыва</p>
                    </button>
                    <button
                        className={`${reviewsFilter == 'reviews'? `${cls.active}`: ""}`}
                        onClick={()=>setReviewsFilter('reviews')}
                    >
                        <p>Ваши отзывы</p>
                    </button>
                </div>
                <div className={cls.reviewsList}>
                    
                </div>
            </div>
        </div>
    )
}