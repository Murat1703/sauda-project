import { useState, useEffect } from 'react'
import { ReviewAddIcon } from '../../../public/assets/icons/ReviewAddIcon'
import { Title } from '../Title'
import cls from './AddReviewModal.module.css'
import { useReviewsStore } from '../../stores/useReviewsStore'
import { ReviewsSuccessIcon } from '../../../public/assets/icons/ReviewsSuccessIcon'
import { AddImagesIcon } from '../../../public/assets/icons/AddImagesIcon'
import { CloseIconDesktop } from '../../../public/assets/icons/CloseIconDesktop.jsx';

export const AddReviewModal = ({orderItem, onClose}) =>{

    const [review,setReview] = useState({
        rating: null,
        body: null, 
        images: [],
    })

    const [step, setStep] = useState(null);

    const {addReview, errLoadingReviewsList} = useReviewsStore();

    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);


    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);

        if (!files.length) return;

        setImages((prev) => [...prev, ...files]);
        if (images.length >=5) {
            window.alert('Не более 5 файлов');
            return
        }

        const previewUrls = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setPreviews((prev) => [...prev, ...previewUrls]);

        e.target.value = "";
    };

    useEffect(() => {
        return () => {
            previews.forEach((preview) => {
                URL.revokeObjectURL(preview.url);
            });
        };
    }, [previews]);



    const handleSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('rating', review.rating);
        formData.append('body', review.body);
        images.forEach((file) => {
            formData.append('images[]', file);
        });
        if ((review.rating !==null) && (review.body!==null)) {setStep('success_modal'); addReview(orderItem.slug, formData)} else{
            window.alert('Не заполнены поля')
        }
        

    }

    return(
        <div className={cls.addReviewModalWrapper} onClick={onClose}>

            {step !=='success_modal' && 
            <div className={cls.addReviewModalInner} onClick={(e)=>e.stopPropagation()}>
                <button className={cls.addReviewCloseBtn} onClick={onClose}>
                    <CloseIconDesktop />
                </button>
                <div className={cls.reviewItemTitleBlock}>
                    <Title>Добавить новый отзыв</Title>
                    <div className={cls.orderItemWrapper}>
                        <div className={cls.orderItemImgWrapper}>
                            <img src={`${orderItem?.primary_image_url}`} alt={`${orderItem?.name}`}/>
                        </div>
                        <p>{orderItem?.name}</p>
                    </div>
                </div>
                <div className={cls.ratingInformation}>
                    <div className={cls.ratingWrapper}>
                        <div className={cls.ratingText}>
                            <p>Оцените товар</p>
                            <p>Установите оценку от 1 до 5</p>
                        </div>
                        <div className={cls.reviewRating}>
                            {[1,2,3,4,5].map((item, index)=>{
                                return(
                                    <div 
                                        key={index} 
                                        onClick={
                                            ()=>setReview((prev)=>(
                                                {
                                                    ...prev,
                                                    rating: item
                                                }
                                            ))
                                        }
                                    >
                                        <ReviewAddIcon 
                                            fill={item <=review.rating ? "#FF4D00": ""}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={cls.uploadWrapper}>
                        <div className={cls.ratingText}>
                            <p>Загрузите фотографии</p>
                            <p>До 5 фотографий (каждая не более 5 мб) и 1 видео до 100 мб</p>
                        </div>
                        <div className={cls.ratingUploadItems}>
                            {previews.length > 0 && 
                            <div className={cls.uploadImagesListWrapper}>
                            {previews.map((url, index)=>{
                                return(
                                        <div
                                            key={index}
                                            style={{
                                                marginLeft: index!==0 ? "-10px" : ""
                                            }}
                                        >                                   <img 
                                                src={url?.url}    alt='review-img'
                                            />
                                        </div>
                                )
                            })}
                            </div>
                            }
                            <div className={cls.ratingUploadImagesInputWrapper}>
                                <button>
                                    <AddImagesIcon />
                                </button>
                                <img />
                                <input 
                                    type="file" 
                                    // multiple 
                                    onChange={handleImagesChange}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className={cls.top}>
                    <p>Место для отзыва</p>
                    <textarea 
                        className={cls.reviewText}
                        onChange={(e)=>{
                            setReview((prev)=>({
                                ...prev,
                                body: e.target.value
                            }))
                        }}
                    />
                    <button 
                        className={cls.reviewAddBtn} 
                        onClick={
                            (e)=>{
                                handleSubmit(e)
                                // addReview(orderItem.slug, review);
                                
                            }
                        }   
                    >
                        <p>Оставить отзыв</p>
                    </button>
                </div>
            </div>}
            {(step == 'success_modal' && !errLoadingReviewsList)&&
            <div 
                className={cls.successModal} 
                onClick={(e)=>e.stopPropagation()}>
                    <div>
                        <div>
                            <ReviewsSuccessIcon />
                        </div>
                        <h3>Спасибо за отзыв!</h3>
                        <p>После прохождения модерации отзыв будет отпубликован на сервисе.</p>
                    </div>
                    <button 
                        className={cls.successBtn}
                        onClick={onClose}
                    >
                        <p>Продолжить</p>
                    </button>
            </div>}
            {(step == 'success_modal' && errLoadingReviewsList)&&
            <div 
                className={cls.successModal} 
                onClick={(e)=>e.stopPropagation()}>
                    <div>
                        <div>
                            <ReviewsSuccessIcon />
                        </div>
                        <h3>Вы уже оставляли отзыв!</h3>
                        <p>Вы уже оставляли отзыв по товару</p>
                    </div>
                    <button 
                        className={cls.successBtn}
                        onClick={onClose}
                    >
                        <p>Продолжить</p>
                    </button>
            </div>}
        </div>
    )
}