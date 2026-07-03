import {Badge} from '../Badge/Badge'
import cls from './ProductCard.module.css'
import {usePriceFormat} from '../../hooks/usePriceFormat.js';

export const ProductCardPrice = ({product}) =>{

    const formatPrice = usePriceFormat();

    return(
        <div className={cls.productCardPriceWrapper}>
            <div className={cls.discountPrice}>
                {
                    product?.old_price && 
                    <>
                        <span>{formatPrice(product?.old_price)} ₸</span>
                        <Badge 
                            type={'discount'}
                        >
                            -{product?.discount_percent}%
                        </Badge>
                    </>
                }
            </div>
            <div className={cls.finalPrice}>
                <span>{formatPrice(product?.price)} ₸</span>
            </div>
        </div>
    )
}