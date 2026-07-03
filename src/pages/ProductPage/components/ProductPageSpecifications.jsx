import cls from '../ProductPage.module.css'

export const ProductPageSpecifications = ({product, limit}) =>{
    return(
        <>
            <div className={cls.textItem}>
                <span>Бренд</span>
                <div className={cls.line}></div>
                <p>{product?.product?.brand.name}</p>
            </div>
            {product?.product?.attributes.slice(0,limit).map((attr)=>{
                return(
                    <div className={cls.textItem} key={attr.id}>
                        <span>{attr.name}</span>
                        <div className={cls.line}></div>
                        <p>{attr.value}</p>
                    </div>
                )
            })}
        </>
    )
}