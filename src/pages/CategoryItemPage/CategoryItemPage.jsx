import { useParams } from 'react-router-dom'
import cls from './CategoryItemPage.module.css'
import { useCategories } from '../../stores/useCategories';
import { useEffect } from 'react';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';

export const CategoryItemPage = ({isMobileScroll}) =>{
    const {slug} = useParams();
    const params = useParams();

    const path = params["*"]; 

    const slugs = path?.split("/") || [];

    const currentSlug = slugs.at(-1); 

    const {categoryItem, loadCategoryItem, loadingCategoryItem, errLoadingCategoryItem} = useCategories();

    useEffect(()=>{
        loadCategoryItem(currentSlug)
    },[currentSlug])

    console.log(categoryItem)
    return(
        <div className={cls.catalogItemPageWrapper}>
            <div className={cls.catalogItemPageTop}>
                <div className={cls.catalogItemPageTitleBlock}>
                    <div className={cls.catalogItemPageBreadCrumbs}>
                        <Link to='/'>Каталог </Link>
                        <span> - </span>
                        {categoryItem?.breadcrumbs?.map((breadcrumbItem, index)=>{
                            return (<>
                            <Link to={`/catalog/categories/${breadcrumbItem.slug}`} key={index}>{breadcrumbItem.name}</Link>
                            <span>-</span>

                            </>
                            )
                        })}
                        <Link >{categoryItem.category?.name}</Link>
                    </div>
                    <Title>
                        {categoryItem.category?.name}
                    </Title>
                </div>
                <div className={cls.catalogItemChilds}>
                    {categoryItem.category?.has_children && 
                        categoryItem.children?.map((item, index)=>{
                            return(
                                <Link 
                                    to={`/catalog/categories/${categoryItem.category.slug}/${item.slug}`} 
                                    className={cls.categoryItemChild} key={item.id}>
                                    <div>
                                        <div className={cls.categoryItemChildImg}>
                                            <img 
                                                src={`${item.image_url}`} 
                                                alt={`${item.name}`}
                                                lazy={`true`}
                                            />
                                        </div>
                                        <p>{item.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                        
                    }

                </div>
            </div>
            <div className={cls.catalogItemPageContent}></div>
        </div>
    )
}