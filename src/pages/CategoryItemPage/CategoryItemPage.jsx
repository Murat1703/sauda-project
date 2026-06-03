import { useParams } from 'react-router-dom'
import cls from './CategoryItemPage.module.css'
import { useCategories } from '../../stores/useCategories';
import { useProducts } from '../../stores/useProducts.js';
import { useEffect, useState } from 'react';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import { SortIcon } from '../../../public/assets/icons/SortIcon';
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx';
import { useFavorites } from '../../hooks/useFavorites.js';
import { useMediaQuery } from 'react-responsive';
import { MobileSortIcon } from '../../../public/assets/icons/MobileSortIcon.jsx';
import { MobileFiltersIcon } from '../../../public/assets/icons/MobileFiltersIcon.jsx';
import { FilterMoreIcon } from '../../../public/assets/icons/FilterMoreIcon.jsx';
import { CheckIcon } from '../../../public/assets/icons/CheckIcon.jsx';
import { ArrowBackMobile } from '../../../public/assets/icons/ArrowBackMobile.jsx';
import { Loader } from '../../components/Loader';
import { useCatalogFilters } from '../../hooks/useCatalogFilters.js';


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
        loadProducts,
        testLoadProductsBySlugs,
        testProductsBySlugs
    } = useProducts();

    const {
        categoryFiltersList,
        loadingCategoryFiltersList,
        errCategoryLoadingFiltersList,
        loadCategoryFiltersList
    } = useCatalogFilters();


    useEffect(()=>{
        loadCategoryItem(currentSlug);
        loadProducts({
            category_slug: currentSlug
        });
        loadCategoryFiltersList({
            category_slug: currentSlug
        })
    },[currentSlug])

    // console.log('currentSlug', currentSlug)

    // console.log('products CategoryItemPage, ', products)

    // console.log('categoryItemPage', categoryItem)

    const {favorites, toggleFavorites} = useFavorites();

    const handleMakeFavorite = (slug)=>{
        toggleFavorites(slug)
    }


    const isMobile = useMediaQuery({maxWidth: 768})

    const [sort, setSort] = useState(null);

    console.log(sort)

    const handlePriceSort = () =>{
        setSort(prev => 
            prev === 'price_desc'
                ? 'price_asc'
                : 'price_desc'
        );
    }


    useEffect(()=>{

        loadProducts({
            category_slug:currentSlug,
            sort
        })

    }, [sort, currentSlug])

    const[priceFilter,setPriceFilter] = useState(null);

    const [subCategoryCounter, setSubCategoryCounter] = useState(8);

    useEffect(()=>{
        categoryItem.children_count > 8 ? ()=>setSubCategoryCounter(8) : ()=>setSubCategoryCounter(categoryItem.children_count)
    },[])
    // console.log('categoryItemPageProducts,', products)

    const[showMobileSort, setShowMobileSort] = useState(false);


    const [showFilter, setShowFilter] = useState(false);

    const [showPriceFilter, setShowPriceFilter] = useState(false); 

    const [minPrice, setMinPrice] = useState(0);

    const [maxPrice, setMaxPrice] = useState(200000);

    const absoluteMin = categoryFiltersList?.price?.min || 0;
    const absoluteMax = categoryFiltersList?.price?.max || 2000;



    useEffect(()=>{
        setMinPrice(absoluteMin);
        setMaxPrice(absoluteMax);
    },[absoluteMin, absoluteMax])

    const [showAvailibility, setShowAvailibility] = useState(false);

    const [showCharateristicsFilters, setShowCharacteristicsFilters]= useState(false);
    const [showOptionId, setShowOptionId] = useState(null)
    
    const[filtersList, setShowFiltersList] = useState(false);



    console.log('categoryItemPage products', currentSlug)
    console.log('categoryItemPage filters', categoryFiltersList)
    console.log(products)
    return(
        <>
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
                    {isMobile && 
                        <div className={cls.catalogItemCounter}>
                            <p>Найдено:</p>
                            <p>{products?.total} товаров</p>
                        </div>
                    }
                </div>
                {categoryItem.category?.has_children && 
                <div className={cls.catalogItemChilds}>
                    {categoryItem.category?.has_children && 
                        categoryItem.children?.map((item)=>{
                            return(
                                <Link 
                                    to={`/catalog/categories/${categoryItem.category.slug}/${item.slug}`} 
                                    className={cls.categoryItemChild} 
                                    key={item.slug}
                                >
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
                }
            </div>
            <div className={cls.catalogItemPageContent}>
                <div className={cls.catalogItemPageFilters}>
                    {categoryItem.category?.has_children && 
                    <div className={cls.catalogItemPageFiltersTop}>
                        <h4>{categoryItem.category?.name}</h4>
                        <ul>
                            {categoryItem.category?.has_children && 
                                categoryItem.children?.slice(0, subCategoryCounter).map((item, index)=>{
                                    return(
                                        <li key={item.slug}>
                                            <Link 
                                                to={`/catalog/categories/${categoryItem.category.slug}/${item.slug}`} 
                                                className={cls.categoryItemChild} 
                                            >
                                                <div>
                                                    <p>{item.name}</p>
                                                    <span>{products?.total}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })                        
                            }
                        </ul>
                    </div>
                    }
                    <div className={cls.catalogItemPageFiltersBottom}>
                        <h4>Фильтры</h4>
                        <div className={cls.catalogItemPageFiltersContent}>
                            <div className={cls.priceFilter}>
                                <p>Со скидкой <span>8</span></p>
                                <div 
                                    onClick={()=>{
                                        if (priceFilter)setSort(null);else
                                        setSort('discount');
                                        setPriceFilter(!priceFilter)}}
                                    className={`${cls.switchBtn} ${priceFilter? cls.priceFilterActive: ""}`}
                                >
                                    <div></div>
                                </div>
                            </div>
                            <div 
                                className={cls.priceItem} 
                            >
                                <div 
                                    className={showCharateristicsFilters? cls.filtersShowed: ""}
                                    onClick={()=>setShowCharacteristicsFilters(!showCharateristicsFilters)}
                                >
                                    <h4>По характеристикам</h4>
                                    <FilterMoreIcon />
                                </div>
                                {showCharateristicsFilters &&
                                <div className={cls.characterisiticsItems}>
                                    {categoryFiltersList?.attributes?.map((characteristic, index)=>{
                                        return(
                                            <div 
                                                className={cls.characterisiticsItem} 
                                                key={characteristic.id}
                                                onClick={()=>  setShowOptionId(prev => prev === characteristic.id ? null : characteristic.id)}
                                            >
                                                {/* <div className={cls.characteristicCheckBoxWrapper}>
                                                </div> */}
                                                <p>{characteristic.name}</p>
                                                {characteristic.id == showOptionId && 
                                                <div 
                                                className={cls.characterisiticsItemOptions}
                                                >
                                                    {characteristic?.options?.map((option,index)=>{
                                                        return(
                                                            <div className={cls.characterisiticsItemOption}>
                                                                <p>{option.value}</p>
                                                                <span>{option.count}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                }
                                                {/* <input 
                                                    type="checkBox" 
                                                    id={characteristic.id}
                                                    name="characteristic" 
                                                    value="all" 
                                                /> */}

                                            </div>

                                        )
                                    })}
                                </div>
                                }
                            </div>
                            <div 
                                className={cls.priceItem} 
                            >
                                <div 
                                    className={showFilter? cls.filtersShowed: ""}
                                    onClick={()=>setShowFilter(!showFilter)}
                                >
                                    <h4>По наличию</h4>
                                    <FilterMoreIcon />
                                </div>
                                {showFilter &&
                                <div className={cls.priceFilterBottomAvailibility}>
                                    <div className={cls.availibilityItem}>
                                        <div className={cls.availibilityRadioBtnWrapper}>
                                        </div>
                                        <p>В наличии</p>
                                        <input 
                                            type="radio" 
                                            id="availibility1"
                                            name="availibility" 
                                            value="all" 
                                            defaultChecked 
                                        />

                                    </div>
                                    <div className={cls.availibilityItem}>
                                        <div className={cls.availibilityRadioBtnWrapper}>
                                        </div>
                                        <p>Ожидаем поступления</p>
                                        <input 
                                            type="radio" 
                                            id="availibility2" name="availibility" value="waiting"  
                                        />
                                    </div>
                                    <div className={cls.availibilityItem}>
                                        <div className={cls.availibilityRadioBtnWrapper}>
                                        </div>
                                        <p>Нет в наличии</p>
                                        <input 
                                            type="radio" 
                                            id="availibility3" name="availibility" value="out_of_stock"  
                                        />
                                    </div>
                                </div>
                                }
                            </div>
                            <div className={cls.filterItem}>
                                <div onClick={()=>setShowPriceFilter(!showPriceFilter)} className={`${showPriceFilter? cls.filtersShowed: ""}`}>
                                    <p>Стоимость, ₸ </p>
                                    <FilterMoreIcon />
                                </div>
                                {showPriceFilter &&
                                <div className={cls.priceFilterSliderWrapper}>
                                    <div className={cls.priceValuesWrapper}>
                                        <div>
                                            <p>{minPrice}</p>
                                        </div>
                                        <div>
                                            <p>{maxPrice}</p>
                                        </div>
                                    </div>
                                    <div className={cls.priceSliderWrapper}>
                                        <input 
                                            type="range" 
                                            min={absoluteMin}
                                            max={absoluteMax}
                                            step={1}
                                            value={minPrice}
                                            onChange={(e)=>setMinPrice(Math.min(Number(e.target.value), maxPrice)) }

                                        />
                                        <input 
                                            type="range" 
                                            min={absoluteMin}
                                            max={absoluteMax}
                                            value={maxPrice}
                                            step={1}
                                            onChange={(e)=>setMaxPrice(Math.max(Number(e.target.value), minPrice)) }
                                        />
                                    </div>

                                    {console.log('minPrice', minPrice)}
                                    {console.log('maxPrice', maxPrice)}
                                </div>
                                }
                            </div>
                            <div className={cls.filterItem}>
                                <div onClick={()=>setShowAvailibility(!showAvailibility)} className={`${showAvailibility? cls.filtersShowed: ""}`}>
                                    <p>В наличии в магазине</p>
                                    <FilterMoreIcon />
                                </div>
                                {showAvailibility &&
                                <div className={cls.availibilityList}>
                                    <div className={cls.availibilityInStore}>
                                        <div>
                                            <CheckIcon />
                                        </div>
                                        <p>ул. Магазин 1 адрес</p>
                                        <input type="checkbox" id="store1" name="store1" value="store1" />

                                    </div>
                                    <div className={cls.availibilityInStore}>
                                        <div>
                                            <CheckIcon />
                                        </div>
                                        <p>ул. Магазин 2 адрес</p>
                                        <input type="checkbox" id="store2" name="store2" value="store2" />
                                    </div>
                                    <div className={cls.availibilityInStore}>
                                        <div>
                                            <CheckIcon />
                                        </div>
                                        <p>ул. Магазин 3 адрес</p>
                                        <input type="checkbox" id="store3" name="store3" value="store3" />

                                    </div>
                                </div>
                                }
                            </div>
                            <button className={cls.resetFiltersBtn}>
                                <p>Сбросить фильтры</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cls.catalogItemPageProducts}>
                    <div className={cls.catalogItemPageProductsTop}>
                        <div className={cls.catalogItemPageSort}>
                            <div>
                                <p>Сортировка</p>
                                <div className={cls.sortList}>
                                    <button 
                                        className={`${cls.active} ${sort=='price_desc'? cls.descBtn: ""}`} 
                                        onClick={handlePriceSort}
                                    >
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
                    {isMobile && products?.data?.length !== 0  && 
                    <div className={cls.mobileCatalogItemPageProductsTop}>
                        <button onClick={()=>setShowMobileSort(true)}>
                            <MobileSortIcon /> 
                            <p>По популярности</p>
                        </button>
                        <button onClick={()=>setShowFiltersList(true)}>
                            <MobileFiltersIcon />
                            <p>Фильтры</p>
                        </button>
                    </div>
                    }
                    <div className={cls.catalogItemPageProductsList}>
                        {loadingProducts && <Loader />}
                        {products?.data?.length == 0 && <p>Товаров не найдено</p>}
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
        {showMobileSort &&
        <div 
            className={cls.mobileSortModal} 
            onClick={()=>setShowMobileSort(false)}
        >
            <div 
                onClick={(e)=>e.stopPropagation()}
                className={cls.mobileSortContent}
            >
                <h4>Сортировка</h4>
                <ul>
                    <li>
                        <div></div>
                        <p>По популярности</p>
                        <input type="radio" name="mobileSort" value="popularity" defaultChecked />
                    </li>
                    <li onClick={()=>setSort('price_asc')}>
                        <div></div>
                        <p>Цена по возрастанию</p>
                        <input type="radio" name="mobileSort" value="price_asc"  />
                    </li>
                    <li onClick={()=>setSort('price_desc')}>
                        <div></div>
                        <p>Цена по убыванию</p>
                        <input type="radio" name="mobileSort" value="price_desc"  />
                    </li>
                    <li>
                        <div></div>
                        <p>Рейтинг по убыванию</p>
                        <input type="radio" name="mobileSort" value="rating_desc"  />
                    </li>
                    <li>
                        <div></div>
                        <p>Отзывы по убыванию</p>
                        <input type="radio" name="mobileSort" value="rating_desc"  />
                    </li>
                </ul>
                <button onClick={()=>setShowMobileSort(false)}>
                    <p>Применить</p>
                </button>
            </div>
        </div>
        }
        {filtersList &&
        <div className={cls.filtersList}>
            <div className={cls.mobileFiltersTop}>
                <button onClick={()=>setShowFiltersList(false)}>
                    <ArrowBackMobile />
                </button>
                <h4>Фильтры</h4>
                <button >
                    <p>Сбросить</p>
                </button>
            </div>
            <div className={cls.catalogItemPageFiltersBottom}>
                <h4>Фильтры</h4>
                <div className={cls.catalogItemPageFiltersContent}>
                            <div className={cls.priceFilter}>
                                <p>Со скидкой <span>8</span></p>
                                <div 
                                    onClick={()=>{
                                        if (priceFilter)setSort(null);else
                                        setSort('discount');
                                        setPriceFilter(!priceFilter)}}
                                    className={`${cls.switchBtn} ${priceFilter? cls.priceFilterActive: ""}`}
                                >
                                    <div></div>
                                </div>
                            </div>
                            <div 
                                className={cls.priceItem} 
                            >
                                <div 
                                    className={showFilter? cls.filtersShowed: ""}
                                    onClick={()=>setShowFilter(!showFilter)}
                                >
                                    <h4>По наличию</h4>
                                    <FilterMoreIcon />
                                </div>
                                {showFilter &&
                                <div className={cls.priceFilterBottomAvailibility}>
                                    <div className={cls.availibilityItem}>
                                        <div className={cls.availibilityRadioBtnWrapper}>
                                        </div>
                                        <p>В наличии</p>
                                        <input 
                                            type="radio" 
                                            id="availibility1"
                                            name="availibility" 
                                            value="all" 
                                            defaultChecked 
                                        />

                                    </div>
                                    <div className={cls.availibilityItem}>
                                        <div className={cls.availibilityRadioBtnWrapper}>
                                        </div>
                                        <p>Ожидаем поступления</p>
                                        <input 
                                            type="radio" 
                                            id="availibility2" name="availibility" value="waiting"  
                                        />
                                    </div>
                                    <div className={cls.availibilityItem}>
                                        <div className={cls.availibilityRadioBtnWrapper}>
                                        </div>
                                        <p>Нет в наличии</p>
                                        <input 
                                            type="radio" 
                                            id="availibility3" name="availibility" value="out_of_stock"  
                                        />
                                    </div>
                                </div>
                                }
                            </div>
                            <div className={cls.filterItem}>
                                <div onClick={()=>setShowPriceFilter(!showPriceFilter)} className={`${showPriceFilter? cls.filtersShowed: ""}`}>
                                    <p>Стоимость, ₸ </p>
                                    <FilterMoreIcon />
                                </div>
                                {showPriceFilter &&
                                <div className={cls.priceFilterSliderWrapper}>
                                    <div className={cls.priceValuesWrapper}>
                                        <div>
                                            <p>{minPrice}</p>
                                        </div>
                                        <div>
                                            <p>{maxPrice}</p>
                                        </div>
                                    </div>
                                    <div className={cls.priceSliderWrapper}>
                                        <input 
                                            type="range" 
                                            min={absoluteMin}
                                            max={absoluteMax}
                                            step={1}
                                            value={minPrice}
                                            onChange={(e)=>setMinPrice(
                                                Math.min(Number(e.target.value), maxPrice)
                                            ) }
                                        />
                                        <input 
                                            type="range" 
                                            min={absoluteMin}
                                            max={absoluteMax}
                                            value={maxPrice}
                                            step={1}
                                            onChange={(e)=>setMaxPrice(
                                                Math.max(Number(e.target.value), minPrice)
                                            ) }
                                        />
                                    </div>

                                    {console.log('minPrice', minPrice)}
                                    {console.log('maxPrice', maxPrice)}
                                </div>
                                }
                            </div>
                            <div className={cls.filterItem}>
                                <div onClick={()=>setShowAvailibility(!showAvailibility)} className={`${showAvailibility? cls.filtersShowed: ""}`}>
                                    <p>В наличии в магазине</p>
                                    <FilterMoreIcon />
                                </div>
                                {showAvailibility &&
                                <div className={cls.availibilityList}>
                                    <div className={cls.availibilityInStore}>
                                        <div>
                                            <CheckIcon />
                                        </div>
                                        <p>ул. Магазин 1 адрес</p>
                                        <input type="checkbox" id="store1" name="store1" value="store1" />

                                    </div>
                                    <div className={cls.availibilityInStore}>
                                        <div>
                                            <CheckIcon />
                                        </div>
                                        <p>ул. Магазин 2 адрес</p>
                                        <input type="checkbox" id="store2" name="store2" value="store2" />
                                    </div>
                                    <div className={cls.availibilityInStore}>
                                        <div>
                                            <CheckIcon />
                                        </div>
                                        <p>ул. Магазин 3 адрес</p>
                                        <input type="checkbox" id="store3" name="store3" value="store3" />

                                    </div>
                                </div>
                                }
                            </div>
                            <button className={cls.sumbitMobileBtn} onClick={()=>setShowFiltersList(false)}>
                                <p>Применить</p>
                            </button>
                </div>
            </div>

        </div>
        }
        </>
    )
}