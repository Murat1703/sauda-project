import { Badge } from '../Badge'
import cls from './ProductCard.module.css'
import { useCart } from '../../stores/useCart.js';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ReviewItemStar } from '../../../public/assets/icons/ReviewIconStar';
import { CartIcon } from '../../../public/assets/icons/CartIcon';
import { SnackBar } from '../SnackBar';
import { useState, memo } from 'react';
import { CounterIncreaseIcon } from '../../../public/assets/icons/CounterIncreaseIcon.jsx';
import { CounterDecreaseIcon } from '../../../public/assets/icons/CounterDecreaseIcon.jsx';
import { CounterToCartIcon } from '../../../public/assets/icons/CounterToCartIcon.jsx';
import {ProductCardSlider} from './ProductCardSlider'
import { FavoriteButton } from './FavoriteButton.jsx';
import { ProductCardBadgesList } from './ProductCardBadgesList.jsx';

export const ProductCard = memo( function ProductCard({product}){

    const {addToCart} = useCart();

    const formatPrice = (price) => {
        return Number(price).toLocaleString('ru-RU', {
            maximumFractionDigits: 0,
        });
    };

    const [counter, setCounter] = useState(1);
    const [showCounter, setShowCounter] = useState(null)

    const handleShowCounter = (product_slug) =>{
        setShowCounter(product_slug);
    }
    const [stockError, setStockError] = useState(null);

    const handleIncreaseCounter = () =>{
        if (counter<product?.stock_quantity){
            setCounter((prev)=>prev + 1)
        } else{
            setStockError('Товар закончился')
        }
    }

    const handleDecreaseCounter = () =>{
        if (counter!=1){
            setCounter((prev)=>prev - 1)
            setStockError(null)
        } else{
          setShowCounter(null)
        }
    }

    return(
        <>
            <div className={cls.productCard} >
                <ProductCardBadgesList 
                    product={product}
                    stockError={stockError || ""}
                />
                <div className={cls.productCardImagesWrapper}>
                    <div className={cls.productCardImages}
                    >
                        {product?.images?.length > 1 ?
                            <ProductCardSlider product={product}/>
                        : 
                        <img 
                            src={`${product?.primary_image_url}`}
                            alt={`${product?.name}`}
                        />}

                    </div>
                    <FavoriteButton 
                        product={product}
                    />
                </div>
                <div className={cls.productCardInfo}>
                    <Link to={`/products/${product?.slug}`} className={cls.productCardInfoTop}>
                        <div className={cls.productCardInfoReviews}>
                            <ReviewItemStar />
                            <span>{product?.reviews_summary?.average_rating || "Нет оценок"}</span>
                            <span>· {product?.reviews_summary?.reviews_count || 0} отзывов</span>
                        </div>
                        <h4>{product?.name}</h4>
                    </Link>
                    <div className={cls.productCardInfoPrice}>
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
                        {product?.stock_quantity == 0 && <button className={`${cls.productCardBtn} ${cls.productCardBtnEmpty}`}><p>Нет в наличии</p></button>} 
                        {product?.stock_quantity !== 0 &&
                        <>
                            {showCounter !== product?.slug &&
                            <button 
                                className={cls.productCardBtn} 
                                onClick={()=>handleShowCounter(product?.slug)}
                            >
                                <CartIcon />
                                <p>В корзину</p>
                            </button>}
                            {showCounter == product?.slug &&
                            <div className={cls.counterBlock}>
                                <div className={cls.counterWrapper}>
                                    <button
                                        onClick={handleDecreaseCounter}
                                    >
                                        <CounterIncreaseIcon />
                                    </button>
                                    <p>{counter}</p>
                                    <button
                                        onClick={handleIncreaseCounter}
                                    >
                                        <CounterDecreaseIcon />
                                    </button>
                                </div>
                                <button 
                                    onClick={()=>{
                                        addToCart({
                                            product: product,
                                            product_slug: product?.slug,
                                            quantity: counter
                                        })
                                        toast(<SnackBar toCart={'/cart'} text={'Товар добавлен в корзину'}/>)
                                    }}
                                >
                                    <CounterToCartIcon />
                                </button>
                            </div>}
                        </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
})