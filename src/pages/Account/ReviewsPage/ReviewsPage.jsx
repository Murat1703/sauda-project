import cls from './ReviewsPage.module.css';
import { AccountTitle } from '../../../components/AccountLayout';
import { BreadCrumbs } from '../../../components/AccountLayout';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { ArrowBackMobile } from '../../../../public/assets/icons/ArrowBackMobile';
import { ReviewsEmptyIcon } from '../../../../public/assets/icons/ReviewsEmptyIcon';
import { useAuthModal } from '../../../context/AuthModalContext';
import { useReviewsStore } from '../../../stores/useReviewsStore';
import { useDateFormat } from '../../../hooks/useDateFormat';


export const ReviewsPage = ({isAuth}) =>{

    const [reviewsFilter, setReviewsFilter] = useState('waiting');
    const isMobile = useMediaQuery({
        maxWidth: 768
    })


    const {openAuthModal} = useAuthModal();
    const {accountReviews, loadAccountReviews} = useReviewsStore();

    useEffect(()=>{
        if (isAuth == true) {loadAccountReviews();}
    },[isAuth])

    const {formatDate}  = useDateFormat();


    console.log(accountReviews)

    const status = (item) =>{
        switch(item){
            case 'pending': 
                return <span className={cls.pending}>На модерации</span>;
            case 'approved': 
                return <span className={cls.approved}>Одобрен</span>;
            case 'rejected': 
                return <span className={cls.rejected}>Отклонен</span>;
        } 
    }

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
                {(!isMobile && accountReviews?.data?.length !== 0 && isAuth==true) && 
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
                    {accountReviews?.length == 0 && 
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
                    <div className={cls.accountReviewsList}>
                        {accountReviews?.data?.map((item)=>{
                            return(
                            <div className={cls.accountReviewBody} key={item.id}>
                                <div className={cls.accountReviewImg}>
                                    <img src={item?.product?.primary_image_url} alt={`${item?.product?.name}`}/>
                                </div>
                                <div className={cls.accountReviewTextContent}>
                                    <div className={cls.accountReviewTextContentTop}>
                                        <p>{item?.product?.name}</p>
                                        <div>
                                            <span>Код: {item?.product?.sku}</span>
                                            <span>Дата покупки: {formatDate(item?.published_at)} </span>
                                        </div>
                                    </div>
                                    {status(item?.status)}
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {isMobile && <div></div>}

        </div>
    )
}