import cls from './ReviewsList.module.css'
import { Title } from '../../Title';
import { RatingStarYellow } from '../../../../public/assets/icons/RatingStarYellow';
import { ReviewItem } from '../ReviewItem';

export const ReviewsList = ({reviewsList}) =>{

    return(
        <div className={cls.reviewsListContent}>
            <div className={cls.productReviews}>
                <div className={cls.productReviewsTitleBlock}>
                    <div className={cls.productReviewTitle}>
                        <Title>Отзывы</Title>
                        <p>{reviewsList?.data?.length} отзывов</p>
                    </div>
                    <div className={cls.productReviewRating}>
                        <div className={cls.productReviewRatingContent}>
                            <RatingStarYellow />
                            <div className={cls.productRatingValue}>
                                <p>{reviewsList?.summary?.average_rating || 5}</p>
                                <p>/5</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cls.productReviewsInner}>
                    {reviewsList?.data?.length === 0 ? (
                        <p>Отзывов пока нет</p>
                    ) 
                    : (
                        <div className={cls.productPageReviews}>
                            {reviewsList?.data?.map((review) => {
                                return <ReviewItem review={review} key={review?.id}/>
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}