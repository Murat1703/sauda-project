import cls from './ProductCard.module.css'
import { Badge } from '../Badge';

export const ProductCardBadgesList = ({product, stockError}) =>{
    return(
        <div className={cls.badgesList}>
            {product?.is_hit && <Badge type={`hit`}>Хит</Badge>}
            {product?.is_new && <Badge type={`new`}>Новинка</Badge>}
            {stockError && <Badge type={`error`}>{stockError}</Badge>}
        </div> 
    )
}