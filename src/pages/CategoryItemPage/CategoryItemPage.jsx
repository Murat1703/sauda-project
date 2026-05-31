import { useParams } from 'react-router-dom'
import cls from './CategoryItemPage.module.css'
import { useCategories } from '../../stores/useCategories';
import { useProducts } from '../../stores/useProducts.js';
import { useEffect } from 'react';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import { SortIcon } from '../../../public/assets/icons/SortIcon';
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx';
import { useFavorites } from '../../hooks/useFavorites.js';

export const CategoryItemPage = ({isMobileScroll}) =>{
    const {slug} = useParams();
    const params = useParams();

    const path = params["*"]; 

    const slugs = path?.split("/") || [];

    const currentSlug = slugs.at(-1); 

    const {
        categoryItem, 
        loadCategoryItem, 
        loadingCategoryItem, 
        errLoadingCategoryItem
    } = useCategories();

    const {
        products,
        loadingProducts,
        errLoadingProducts,
        loadProducts
    } = useProducts();


    useEffect(()=>{
        loadCategoryItem(currentSlug);
        loadProducts({
            category_slug: currentSlug
        });
    },[currentSlug])

    console.log('currentSlug', currentSlug)

    console.log('products CategoryItemPage, ', products)

    console.log('categoryItemPage', categoryItem)

    const {favorites, toggleFavorites} = useFavorites();

    const handleMakeFavorite = (slug)=>{
        toggleFavorites(slug)
    }




    return(
        <div className={cls.catalogItemPageWrapper}>
            <div className={cls.catalogItemPageTop}>
                <div className={cls.catalogItemPageTitleBlock}>
                    <div className={cls.catalogItemPageBreadCrumbs}>
                        <Link to='/'>Каталог</Link>
                        <span>-</span>
                        {categoryItem?.breadcrumbs?.map((breadcrumbItem, index)=>{
                            return (
                                <div key={breadcrumbItem.slug}>
                                    <Link to={`/catalog/categories/${breadcrumbItem.slug}`} >{breadcrumbItem.name}</Link>
                                    <span>-</span>
                                </div>
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
            <div className={cls.catalogItemPageContent}>
                <div className={cls.catalogItemPageFilters}></div>
                <div className={cls.catalogItemPageProducts}>
                    <div className={cls.catalogItemPageProductsTop}>
                        <div className={cls.catalogItemPageSort}>
                            <div>
                                <p>Сортировка</p>
                                <div className={cls.sortList}>
                                    <button className={cls.active}>
                                        <SortIcon />
                                        <p>по цене</p>
                                    </button>
                                    <button>
                                        <p>по популярности</p>
                                    </button>
                                    <button>
                                        <p>по рейтингу</p>
                                    </button>
                                    <button>
                                        <p>по отзывам</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={cls.catalogItemCounter}>
                            <p>Найдено:</p>
                            <p>{products?.total} товаров</p>
                        </div>
                    </div>
                    <div className={cls.catalogItemPageProductsList}>
                        {products?.data?.map((product, index)=>{
                            return(
                            <ProductCard 
                                product={product} 
                                key={product?.slug}
                                isFavorite={favorites.includes(product.slug)} 
                                addToFavorite={() => handleMakeFavorite(product.slug)} 
                            />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}