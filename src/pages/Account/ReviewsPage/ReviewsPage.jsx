import cls from './ReviewsPage.module.css';
import { AccountTitle } from '../../../components/AccountLayout';
import { BreadCrumbs } from '../../../components/AccountLayout';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { ArrowBackMobile } from '../../../../public/assets/icons/ArrowBackMobile';
import { ReviewsEmptyIcon } from '../../../../public/assets/icons/ReviewsEmptyIcon';
import { useAuthModal } from '../../../context/AuthModalContext';
import { useAuth } from '../../../context/AuthContext';


export const ReviewsPage = ({isAuth}) =>{

    const [reviewsFilter, setReviewsFilter] = useState('waiting');
    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    const reviewsList = [];

    const {openAuthModal} = useAuthModal();

    return(
        <div className={cls.reviewsPageWrapper}>
            <div className={cls.pageTop}>
                <div className={cls.breadCrumbsWrapper}>
                    <BreadCrumbs >Профиль</BreadCrumbs>
                    <BreadCrumbs >-</BreadCrumbs>
                    <BreadCrumbs >Отзывы</BreadCrumbs>
                </div>
                {isMobile &&
                <Link to='/account'>
                    <ArrowBackMobile />
                </Link>
                }
                <div className={cls.pageTitleWrapper}>
                    <AccountTitle>Отзывы</AccountTitle>
                </div>
                {isMobile && <div></div>}
                
            </div>
            <div className={cls.reviewsPageContent}>
                {(!isMobile && reviewsList.length !== 0 && isAuth==true) && 
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
                }
                <div className={cls.reviewsList}>
                    {reviewsList.length == 0 && 
                    <div className={cls.emptyReviews}>
                        <div className={cls.emptyIcon}>
                            <ReviewsEmptyIcon />
                        </div>
                        <div className={cls.emptyText}>
                            <p>У вас пока нет отзывов</p>
                            {isAuth == true && 
                            <span>
                                Отзывы можно добавить на товары в ваших завершенных заказах.
                            </span>
                            }
                            {isAuth==false &&
                            <span>
                                Чтобы написать отзыв надо будет <a onClick={()=>openAuthModal()}>войти</a>
                            </span>
                            }
                        </div>
                    
                    </div>}
                </div>
            </div>
            {isMobile && <div></div>}

        </div>
    )
}