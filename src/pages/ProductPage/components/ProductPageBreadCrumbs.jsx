import cls from '../ProductPage.module.css'
import {BreadCrumbs} from '../../../components/AccountLayout'
import {Link} from 'react-router-dom'

export const ProductPageBreadCrumbs = ({product}) =>{
    return(
        <div className={cls.breadCrumbsBlock}>
            <BreadCrumbs>
                Каталог
            </BreadCrumbs>
            {product?.product?.breadcrumbs?.map((breadcrumbItem)=>{
                return (
                    <div key={breadcrumbItem.slug}>
                        <span>-</span>
                        <Link to={`/catalog/categories/${breadcrumbItem.slug}`} >
                            {breadcrumbItem.name}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}