import {ReviewItemStar} from '../../../public/assets/icons/ReviewIconStar';
import cls from './ProductCard.module.css'

export const ProductCardReviews = ({product}) =>{
    return(
        <div className={cls.productCardInfoReviews}>
            <ReviewItemStar />
            <span>{product?.reviews_summary?.average_rating ?? "Нет оценок"}</span>
            <span>· {product?.reviews_summary?.reviews_count || 0} отзывов</span>
        </div>
    )
}