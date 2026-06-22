import { AccountRatingStar } from "../../../../public/assets/icons/AccountRagingStar"
import { useDateFormat } from "../../../hooks/useDateFormat"
import { ReviewImagesModal } from "../ReviewImagesModal"
import cls from './ReviewItem.module.css'
import { useState } from "react"

export const ReviewItem = ({review}) =>{

    const {formatDate} = useDateFormat();

    const [showReviewImages, setShowReviewImages] = useState(false);

    const handleShowReviewImages = () =>{
        setShowReviewImages(true)
    }
    const handleCloseReviewImages = () =>{
        setShowReviewImages(false)
    }

    return(
        <>
        <div className={cls.reviewItem} key={review.id}>
            <div className={cls.reviewItemTop}>
                <div>
                    <p>{review?.author_name}</p>
                    <p>{formatDate(review?.published_at)}</p>
                </div>
                <div className={cls.accountReviewRating}>
                    {[1,2,3,4,5].map((ratingCount)=>{
                        return(
                            <AccountRatingStar 
                                key={ratingCount}
                                fill={ratingCount <= Number(review?.rating)? true 
                                : false}
                            />
                        )
                    })}
                </div>
            </div>
            <p>{review?.body}</p>
            {review?.images.length > 0 && 
                <div className={cls.reviewImagesList}>
                    {review?.images?.map((image)=>{
                        return(
                            <div key={image.id} onClick={handleShowReviewImages}>
                                <img 
                                    src={image.url}
                                    alt="review"
                                />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
        {showReviewImages && 
        <ReviewImagesModal onClose={handleCloseReviewImages} reviewImages={review?.images}/>}
        </>
    )
}