import cls from './ProductCard.module.css'
import { Link } from 'react-router-dom';
import { useState, memo } from 'react';
import {ProductCardSlider} from './ProductCardSlider'
import { FavoriteButton } from './FavoriteButton';
import { ProductCardBadgesList } from './ProductCardBadgesList';
import { ProductCardCartBtn } from './ProductCardCartBtn';
import {ProductCardPrice} from './ProductCardPrice';
import { ProductCardReviews } from './ProductCardReviews';

export const ProductCard = memo( function ProductCard({product}){

    const [stockError, setStockError] = useState(null);
    if (!product) return null;

    return(
        <div className={cls.productCard} >
            <ProductCardBadgesList 
                product={product}
                stockError={stockError || ""}
            />
            <div className={cls.productCardImagesWrapper}>
                <div className={cls.productCardImages}>
                    {product?.images?.length > 1 ?
                        <ProductCardSlider product={product}/>
                    : 
                    <img 
                        src={`${product?.primary_image_url || ""}`}
                        alt={`${product?.name || "Изображение товара"}`}
                        loading={"lazy"}
                    />}
                </div>
                <FavoriteButton 
                    product={product}
                />
            </div>
            <div className={cls.productCardInfo}>
                <Link to={`/products/${product?.slug}`} className={cls.productCardInfoTop}>
                    <ProductCardReviews product={product}/>
                    <h4>{product?.name}</h4>
                </Link>
                <div className={cls.productCardInfoPrice}>
                    <ProductCardPrice 
                        product={product}
                    />
                    <ProductCardCartBtn 
                        product={product}
                        setError={setStockError}
                    />
                </div>
            </div>
        </div>
    )
})