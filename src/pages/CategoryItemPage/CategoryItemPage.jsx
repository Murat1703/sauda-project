import { useParams } from 'react-router-dom'
import cls from './CategoryItemPage.module.css'
import { useCategories } from '../../stores/useCategories';
import { useProducts } from '../../stores/useProducts.js';
import { useEffect, useState } from 'react';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import { SortIcon } from '../../../public/assets/icons/SortIcon';
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx';
import { useMediaQuery } from 'react-responsive';
import { MobileSortIcon } from '../../../public/assets/icons/MobileSortIcon.jsx';
import { MobileFiltersIcon } from '../../../public/assets/icons/MobileFiltersIcon.jsx';
import { FilterMoreIcon } from '../../../public/assets/icons/FilterMoreIcon.jsx';
import { CheckIcon } from '../../../public/assets/icons/CheckIcon.jsx';
import { ArrowBackMobile } from '../../../public/assets/icons/ArrowBackMobile.jsx';
import { Loader } from '../../components/Loader';
import { useCatalogFilters } from '../../hooks/useCatalogFilters.js';
import { usePickupPoints } from '../../hooks/usePickupPoints.js';
import { Pagination } from '../../components/Pagination';
import { useFavoritesStore } from '../../stores/useFavoritesStore.js';
import { EmptyResults } from '../../components/EmptyResults';
import { EmtpyWhiteHeartIcon } from '../../../public/assets/icons/EmtpyWhiteHeartIcon.jsx';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop.jsx';
import { useLanguage } from '../../stores/useLanguage.js';


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

    const [activePage, setActivePage]= useState(1)

    const {lang} = useLanguage();

    useEffect(()=>{
        loadCategoryItem(currentSlug, {locale: lang});
        loadProducts({
            locale: lang,
            category_slug: currentSlug,
            page: activePage
        });
        loadCategoryFiltersList({
            category_slug: currentSlug
        })
    },[currentSlug, activePage])


    const {favoritesList} = useFavoritesStore();

    const isMobile = useMediaQuery({maxWidth: 768})

    const [sort, setSort] = useState(null);

    const handlePriceSort = () =>{
        setSort(prev => 
            prev === 'price_desc'
                ? 'price_asc'
                : 'price_desc'
        );
    }

    const[priceFilter,setPriceFilter] = useState(null);

    const [subCategoryCounter, setSubCategoryCounter] = useState(8);

    useEffect(()=>{
        categoryItem.children_count > 8 ? ()=>setSubCategoryCounter(8) : ()=>setSubCategoryCounter(categoryItem.children_count)
    },[])

    const[showMobileSort, setShowMobileSort] = useState(false);


    const [showFilter, setShowFilter] = useState(false);

    const [showPriceFilter, setShowPriceFilter] = useState(false); 

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200000);

    const absoluteMin = categoryFiltersList?.price?.min || 0;
    const absoluteMax = categoryFiltersList?.price?.max || 200000;

    useEffect(()=>{
        setMinPrice(absoluteMin);
        setMaxPrice(absoluteMax);
    },[absoluteMin, absoluteMax])

    const [showAvailibility, setShowAvailibility] = useState(false);

    const [showCharateristicsFilters, setShowCharacteristicsFilters]= useState(false);
    const [showOptionId, setShowOptionId] = useState(null)
    
    const[filtersList, setShowFiltersList] = useState(false);

    const [sortOptions, setSortOptions] = useState({
        sort_discount: null,
        sort_price: null,
        sort_popular: null,
        sort_new: null,
        sort_reviews: null
    });
    useEffect(()=>{
        loadProducts({
            locale: lang,
            category_slug:currentSlug,
            sort: sortOptions.sort_discount || sortOptions.sort_price,
            ...(sortOptions.sort_popular && {
                is_hit: sortOptions.sort_popular
            }),
            ...(sortOptions.sort_new && {
                is_new: sortOptions.sort_new
            }),
        })

    }, [sortOptions,  currentSlug])



    const handleReset = () =>{
        setSortOptions({
            sort_discount: null,
            sort_price: null,
            sort_popular: null,
            sort_new: null,
            sort_reviews: null
        })
    }

    const {pickupPoints, loadingPickupPoints, loadPoints} = usePickupPoints();

    useEffect(()=>{
        loadPoints();
    },[])

    return(
        <>
        {errLoadingCategoryItem && <p>{errLoadingCategoryItem}</p>}
        {errLoadingProducts && <p>{errLoadingProducts}</p>}
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
                                                    <span>{item?.products_count}</span>
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
                                            setSortOptions((prev)=>({
                                                ...prev,
                                                sort_discount: prev.sort_discount == null? "discount": null,
                                                sort_price: null,
                                                sort_new: null,
                                                sort_popular: null
                                            }))
                                        }}
                                    className={`${cls.switchBtn} ${sortOptions.sort_discount? cls.priceFilterActive: ""}`}
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
                                                            <div className={cls.characterisiticsItemOption} key={index}>
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
                                    {pickupPoints?.map((point)=>{
                                        return(
                                            <div 
                                                className={cls.availibilityInStore}
                                                key={point.id}
                                            >
                                                <div>
                                                    <CheckIcon />
                                                </div>
                                                <p>ул. Магазин 1 адрес</p>
                                                <input type="checkbox" id="store1" name="store1" value="store1" />

                                            </div>
                                        )
                                    })}
                                </div>
                                }
                            </div>
                            <button className={cls.resetFiltersBtn} onClick={handleReset}>
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
                                        className={`${
                                            cls.active}
                                            ${sortOptions.sort_price=='price_desc'? cls.descBtn: ""}`} 
                                        onClick={()=>setSortOptions((prev)=>({...prev, sort_price: prev.sort_price == "price_asc"? "price_desc": "price_asc"}))}
                                    >
                                        <SortIcon />
                                        <p>по цене</p>
                                    </button>
                                    <button 
                                        className={`${sortOptions.sort_popular? cls.active: ""}`}
                                        onClick={()=>setSortOptions((prev)=>({...prev, sort_popular: prev.sort_popular == 1? 0: 1}))}>
                                        <p>по популярности</p>
                                    </button>
                                    <button 
                                        className={`${sortOptions.sort_new? cls.active: ""}`}

                                        onClick={()=>setSortOptions((prev)=>({
                                            ...prev, 
                                            sort_new: prev.sort_new == 1? 0: 1,
                                            }))}>
                                        <p>по новизне</p>
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
                            <p>
                                {sortOptions.sort_price == 'price_asc' && "Цена по возрастанию"}
                                {sortOptions.sort_price == 'price_desc' && "Цена по убыванию"}
                                {sortOptions.sort_popular == 1 && "По популярности"}
                                {sortOptions.sort_popular == 1 || sortOptions.sort_price ==null && "По популярности"}
                            </p>
                        </button>
                        <button onClick={()=>setShowFiltersList(true)}>
                            <MobileFiltersIcon />
                            <p>Фильтры</p>
                        </button>
                    </div>
                    }
                    {loadingProducts && <Loader />}
                    {products?.data?.length == 0 && 
                        <EmptyResults 
                            icon={<EmtpyWhiteHeartIcon/>} 
                            text={`Товары не найдены`}
                            description={`Соответствия не обнаружены`}
                        />
                    }
                    {products?.data?.length !== 0 &&
                    <div className={cls.catalogItemPageProductsList}>
                        {products?.data?.map((product, index)=>{
                            return(
                            <ProductCard 
                                product={product} 
                                key={product?.slug}
                                isFavorite={
                                    favoritesList?.find(item=> item?.product?.slug === product?.slug)
                                }
                            />
                            )
                        })}
                    </div>}
                    {(products?.links?.length >3)  && 
                        
                        <Pagination 
                            links={products?.links} 
                            setActivePage={setActivePage}
                        />
                    }
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
                    <li onClick={()=>
                        setSortOptions((prev)=>({
                            ...prev, 
                            sort_popular: 1,
                            sort_price: null
                        }))
                    }>
                        <div></div>
                        <p>По популярности</p>
                        <input type="radio" name="mobileSort" value="popularity" defaultChecked />
                    </li>
                    <li onClick={()=>
                        setSortOptions((prev)=>({
                            ...prev, 
                            sort_popular: null,
                            sort_price: "price_asc"
                        }))
                    }>
                        <div></div>
                        <p>Цена по возрастанию</p>
                        <input 
                            type="radio" 
                            name="mobileSort" 
                            value="price_asc"  
                        />
                    </li>
                    <li onClick={()=>
                        setSortOptions((prev)=>({
                            ...prev, 
                            sort_popular: null,
                            sort_price: "price_desc"
                        }))
                    }>
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
                <button onClick={handleReset}>
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
                                        setSortOptions((prev)=>(
                                            {
                                                ...prev,
                                                sort_discount: prev.sort_discount===null ?"discount": null,
                                                sort_popular: null,
                                                sort_price: null,
                                                sort_new: null,
                                                sort_reviews: null
                                            }
                                        ))
                                       }}
                                    className={`${cls.switchBtn}
                                    ${sortOptions.sort_discount == 'discount'? cls.priceFilterActive: ""}`}
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
                                                            <div 
                                                            className={cls.characterisiticsItemOption}
                                                            key={index}
                                                            >
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
                                        <input 
                                            type="checkbox" 
                                            id="store1" 
                                            name="store1" 
                                            value="store1" 
                                        />

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