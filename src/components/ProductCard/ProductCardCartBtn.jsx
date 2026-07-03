import cls from './ProductCard.module.css'
import { CounterIncreaseIcon } from '../../../public/assets/icons/CounterIncreaseIcon.jsx';
import { CounterDecreaseIcon } from '../../../public/assets/icons/CounterDecreaseIcon.jsx';
import {useCart} from '../../stores/useCart.js';
import {useState} from 'react';
import {CartIcon} from '../../../public/assets/icons/CartIcon.jsx';
import {toast} from 'react-toastify';
import {SnackBar} from '../SnackBar';
import {CounterToCartIcon} from '../../../public/assets/icons/CounterToCartIcon.jsx';


export const ProductCardCartBtn = ({product, setError}) =>{

    const {addToCart, errLoadingCart} = useCart();

    const [counter, setCounter] = useState(1);
    const [showCounter, setShowCounter] = useState(null)

    const handleShowCounter = (product_slug) =>{
        setShowCounter(product_slug);
    }
    const handleIncreaseCounter = () =>{
        if (counter<product?.stock_quantity){
            setCounter((prev)=>prev + 1)
        } else{
            setError('Товар закончился')
        }
    }

    const handleDecreaseCounter = () =>{
        if (counter!=1){
            setCounter((prev)=>prev - 1)
            setError(null)
        } else{
          setShowCounter(null)
        }
    }

    return(
        <>
        {product?.stock_quantity == 0 
        && 
            <button 
                className={`${cls.productCardBtn} 
                ${cls.productCardBtnEmpty}`}>
                <p>Нет в наличии</p>
            </button>
        } 
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
                        <CounterDecreaseIcon />
                    </button>
                    <p>{counter}</p>
                    <button
                        onClick={handleIncreaseCounter}
                    >
                        <CounterIncreaseIcon />
                    </button>
                </div>
                <button 
                    onClick={()=>{
                        addToCart({
                            product: product,
                            product_slug: product?.slug,
                            quantity: counter
                        })
                        if (!errLoadingCart){
                            toast(
                                <SnackBar toCart={'/cart'} text={'Товар добавлен в корзину'}/>
                            )
                        } 
                        else{
                            toast.error(
                                <SnackBar toCart={'/cart'} text={'Ошибка при добавлении'}/>
                            )
                        }
                    }}
                >
                    <CounterToCartIcon />
                </button>
            </div>}
        </>
        }   
        </>
    )
}