import { AccountTitle } from '../../../components/AccountLayout'
import { BreadCrumbs } from '../../../components/AccountLayout'
import cls from './FavoritesPage.module.css'
import { useFavorites } from '../../../hooks/useFavorites'
import { ProductCard } from '../../../components/ProductCard'
// import { useProducts } from '../../../hooks/useProducts'
import { useEffect } from 'react'
import { Loader } from '../../../components/Loader'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useProducts } from '../../../stores/useProducts'
import { useFavoritesStore } from '../../../stores/useFavoritesStore'
import { useAuth } from '../../../context/AuthContext'

export const FavoritesPage = () =>{
    const {favorites, toggleFavorites} = useFavorites();

    const {isAuth} = useAuth();

    const {favoritesList, deleteFromFavoritesList, loadingFavoritesList} = useFavoritesStore();


    const isMobile = useMediaQuery({
        maxWidth: 768
    })


    const [sortFilter, setSortFilter] = useState('По дате добавления');
    const [showFilter, setShowFilter] = useState(false);

    const sortItems = ["По дате добавления", "Цена по возрастанию", "Цена по убыванию", "Рейтинг по убыванию", "Отзывы по убыванию"];

    const [sortItemId, setSortItemId] = useState(0);

    const [filter, setFilter] = useState('Все варианты');
    const [filterId, setFilterId] = useState(0);

    const filtersList = ["Все варианты", "В наличии", "Нет в наличии"]

    const handleReset = () =>
    {
        setFilter('Все варианты');
        console.log(filter)
    }
    
    
    console.log(favoritesList)

    return(
        <>
        <div className={cls.favoritesPageWrapper}>
            <div className={cls.pageTop}>
                <div className={cls.breadCrumbsWrapper}>
                    <BreadCrumbs >Профиль</BreadCrumbs>
                    <BreadCrumbs >-</BreadCrumbs>
                    <BreadCrumbs >Избранное</BreadCrumbs>
                </div>
                <div className={cls.pageTitleWrapper}>
                    <AccountTitle>Избранное</AccountTitle>
                </div>
            </div>
            <div className={cls.pageBottom}>
                {favoritesList.length == 0 && 
                    <div className={cls.favoritesPageEmpty}>
                        <div className={cls.favoritesInfoBlock}>
                            <div className={cls.titleBlock}>
                                <div className={cls.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.9897 7.70372C14.9907 4.1976 9.98962 3.25446 6.23204 6.46502C2.47447 9.67558 1.94545 15.0435 4.8963 18.8406C7.34973 21.9977 14.7747 28.6561 17.2082 30.8112C17.4804 31.0524 17.6165 31.1729 17.7753 31.2203C17.9139 31.2616 18.0655 31.2616 18.2041 31.2203C18.3629 31.1729 18.499 31.0524 18.7713 30.8112C21.2048 28.6561 28.6297 21.9977 31.0832 18.8406C34.034 15.0435 33.5696 9.6418 29.7474 6.46502C25.9252 3.28824 20.9888 4.1976 17.9897 7.70372Z" fill="white"/>
                                    </svg>
                                </div>
                                <div className={cls.text}>
                                    <p>У вас пока нет избранных товаров</p>
                                    <p>Добавляйте товары из каталога, нажав по сердечку в углу</p>
                                </div>
                            </div>
                            <Link to='/'>
                                <button className={cls.backBtn}>
                                    <p>Перейти в каталог</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                }
                {loadingFavoritesList && <Loader />}
                {favoritesList.length > 0 && 
                <>
                
                    {!isMobile &&
                    <div className={cls.favoritesFilters}>
                        <div className={cls.favoriteFilterItem}>
                            <p>Сортировать</p>
                            <div className={cls.filterWrapper}>
                                <div className={cls.filterLeft}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M1.125 3.125H14.875V4.875H1.125V3.125ZM1.125 7.125H9.875V8.875H1.125V7.125ZM5.875 11.125H1.125V12.875H5.875V11.125Z" fill="#8F9596"/>
                                    </svg>
                                    <p>{sortFilter}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.35638 7.85656C4.71175 7.50118 5.28793 7.50118 5.64331 7.85656L9.99984 12.2131L14.3564 7.85656C14.7118 7.50118 15.2879 7.50118 15.6433 7.85656C15.9987 8.21194 15.9987 8.78812 15.6433 9.14349L10.6433 14.1435C10.2879 14.4989 9.71175 14.4989 9.35638 14.1435L4.35638 9.14349C4.001 8.78812 4.001 8.21194 4.35638 7.85656Z" fill="#FF4D00"/>
                                </svg>
                            </div>
                        </div>
                        <div className={cls.favoriteFilterItem}>
                            <p>Наличие</p>
                            <div className={cls.filterWrapper}>
                                <div className={cls.filterLeft}>
                                    <p>Все варианты</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.35638 7.85656C4.71175 7.50118 5.28793 7.50118 5.64331 7.85656L9.99984 12.2131L14.3564 7.85656C14.7118 7.50118 15.2879 7.50118 15.6433 7.85656C15.9987 8.21194 15.9987 8.78812 15.6433 9.14349L10.6433 14.1435C10.2879 14.4989 9.71175 14.4989 9.35638 14.1435L4.35638 9.14349C4.001 8.78812 4.001 8.21194 4.35638 7.85656Z" fill="#FF4D00"/>
                                </svg>
                            </div>
                        </div>
                        <div className={cls.favoriteFilterItem}>
                            <p>Категории</p>
                            <div className={cls.filterWrapper}>
                                <div className={cls.filterLeft}>
                                    <p>Все категории</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.35638 7.85656C4.71175 7.50118 5.28793 7.50118 5.64331 7.85656L9.99984 12.2131L14.3564 7.85656C14.7118 7.50118 15.2879 7.50118 15.6433 7.85656C15.9987 8.21194 15.9987 8.78812 15.6433 9.14349L10.6433 14.1435C10.2879 14.4989 9.71175 14.4989 9.35638 14.1435L4.35638 9.14349C4.001 8.78812 4.001 8.21194 4.35638 7.85656Z" fill="#FF4D00"/>
                                </svg>
                            </div>
                        </div>
                    </div>}
                    {isMobile && 
                    <div className={cls.mobileFilters}>
                        <button 
                            className={cls.mobileFilterItem}
                            onClick={()=>setShowFilter('sort')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M1.125 3.125H14.875V4.875H1.125V3.125ZM1.125 7.125H9.875V8.875H1.125V7.125ZM5.875 11.125H1.125V12.875H5.875V11.125Z" fill="#152429"/>
                            </svg>
                            <p>{sortFilter}</p>
                        </button>
                        <button 
                            className={cls.mobileFilterItem}
                            onClick={()=>setShowFilter('filters')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.125 5.8749H3.761C3.94686 6.45532 4.31229 6.96169 4.80458 7.32096C5.29686 7.68023 5.89055 7.87383 6.5 7.87383C7.10945 7.87383 7.70314 7.68023 8.19542 7.32096C8.68771 6.96169 9.05314 6.45532 9.239 5.8749H14.875V4.1249H9.239C9.05314 3.54449 8.68771 3.03812 8.19542 2.67885C7.70314 2.31958 7.10945 2.12598 6.5 2.12598C5.89055 2.12598 5.29686 2.31958 4.80458 2.67885C4.31229 3.03812 3.94686 3.54449 3.761 4.1249H1.125V5.8749ZM6.5 3.8749C6.35226 3.8749 6.20597 3.904 6.06948 3.96054C5.93299 4.01708 5.80897 4.09994 5.7045 4.20441C5.60004 4.30888 5.51717 4.43289 5.46064 4.56939C5.4041 4.70588 5.375 4.85217 5.375 4.9999C5.375 5.14764 5.4041 5.29393 5.46064 5.43042C5.51717 5.56692 5.60004 5.69093 5.7045 5.7954C5.80897 5.89987 5.93299 5.98273 6.06948 6.03927C6.20597 6.09581 6.35226 6.1249 6.5 6.1249C6.79837 6.1249 7.08452 6.00638 7.2955 5.7954C7.50647 5.58442 7.625 5.29827 7.625 4.9999C7.625 4.70154 7.50647 4.41539 7.2955 4.20441C7.08452 3.99343 6.79837 3.8749 6.5 3.8749ZM1.125 11.8749H6.761C6.94686 12.4553 7.31229 12.9617 7.80458 13.321C8.29686 13.6802 8.89055 13.8738 9.5 13.8738C10.1094 13.8738 10.7031 13.6802 11.1954 13.321C11.6877 12.9617 12.0531 12.4553 12.239 11.8749H14.875V10.1249H12.239C12.0531 9.54449 11.6877 9.03812 11.1954 8.67885C10.7031 8.31958 10.1094 8.12598 9.5 8.12598C8.89055 8.12598 8.29686 8.31958 7.80458 8.67885C7.31229 9.03812 6.94686 9.54449 6.761 10.1249H1.125V11.8749ZM9.5 9.8749C9.20163 9.8749 8.91548 9.99343 8.7045 10.2044C8.49353 10.4154 8.375 10.7015 8.375 10.9999C8.375 11.2983 8.49353 11.5844 8.7045 11.7954C8.91548 12.0064 9.20163 12.1249 9.5 12.1249C9.79837 12.1249 10.0845 12.0064 10.2955 11.7954C10.5065 11.5844 10.625 11.2983 10.625 10.9999C10.625 10.7015 10.5065 10.4154 10.2955 10.2044C10.0845 9.99343 9.79837 9.8749 9.5 9.8749Z" fill="#152429"/>
                            </svg>
                            <p>Фильтры</p>
                        </button>
                    </div>}
                    <div className={cls.favoritesList}>
                        {/* {!isAuth && 
                        favoritesList?.map((favoriteItem)=>{
                            return(
                                <ProductCard 
                                    key={favoriteItem.product_slug} 
                                    product={favoriteItem.product} 
                                    // isFavorite={favoritesList.find((item) => item.product_slug == favoriteItem.product.slug)}
                                    isDelete={true}
                                />
                            )
                        })                        } */}
                        {favoritesList?.map((favoriteItem)=>{
                            return(
                                <ProductCard 
                                    key={favoriteItem.product.slug} 
                                    product={favoriteItem.product} 
                                    isFavorite={
                                        favoritesList.find((item) => item.product.slug == favoriteItem.product.slug)
                                    }
                                    isDelete={true}
                                />
                            )
                        })}
                    </div>
                </>
                }
            </div>
        </div>
        {showFilter == 'sort' && 
        <div className={cls.sortModal} onClick={()=>setShowFilter(null)}>
            <div className={cls.sortModalContent} onClick={(e)=>e.stopPropagation()}>
                <div className={cls.mobileCloseIcon} onClick={()=>setShowFilter(null)}></div>
                <div className={cls.mobileSortItems}>
                    <p>Cортировка</p>
                    <div className={cls.sortItemsList}>
                        {sortItems.map((item, index)=>{
                            return(
                            <div className={cls.sortItem} key={index} onClick={()=>{setSortFilter(item);setSortItemId(index) }}>
                                <input type="radio" name="sort" defaultChecked={index == sortItemId}/>
                                <div className={cls.iconCircle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                    <circle cx="3" cy="3" r="3" fill="white"/>
                                    </svg>
                                </div>
                                <p>{item}</p>
                            </div>)

                        })}
                    </div>
                    <button className={cls.sortFilterBtn}>
                        <p>Применить</p>
                    </button>
                </div>
            </div>
        </div>}
        {showFilter == 'filters' && 
        <div className={cls.filterWrapperMobile}>
            <div className={cls.filterContentMobile}>
                <div>
                    <div className={cls.filtersTopMobile}>
                        <button onClick={()=>setShowFilter(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M12 5L5 12L12 19" stroke="#152429" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <p>Фильтры</p>
                        <button onClick={handleReset}>
                            <p>Сбросить</p>
                        </button>
                    </div>
                    <div className={cls.availibility}>
                        <p className={cls.filterItemTitle}>По наличию</p>
                        <div className={cls.availibilityList}>
                            {filtersList.map((item,index)=>{
                                return(
                                    <div 
                                        className={cls.filterItemMobile}
                                        key={index}
                                        onClick={()=>{setFilter(item); setFilterId(index)}}
                                    >
                                        <input 
                                            type='radio'
                                            name="availibility" defaultChecked={index == filterId}
                                        />
                                        <div className={cls.iconCircle}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                            <circle cx="3" cy="3" r="3" fill="white"/>
                                            </svg>
                                        </div>
                                        <p>{item}</p>
                                        <span></span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={cls.categoryFilter}>
                        <p className={cls.filterItemTitle}>Категория</p>
                        <div className={cls.categoryFilterList}>
                            {categoryItems.map((categoryItem, index)=>{
                                return(
                                    <div className={cls.categoryFilterItem}>
                                        <input type="checkbox" />
                                        <div className={cls.categoryFilterIcon}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>

                                        </div>
                                        <p>{categoryItem}</p>
                                        <span></span>
                                    </div>

                                )}
                            )}
                        </div>
                    </div>
                </div>
                <button>
                    <p>Показать</p>
                </button>
            </div>
        </div>
        }
        </>
    )
}