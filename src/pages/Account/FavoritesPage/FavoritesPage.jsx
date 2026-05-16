import { AccountTitle } from '../../../components/AccountLayout'
import { BreadCrumbs } from '../../../components/AccountLayout'
import cls from './FavoritesPage.module.css'
import { useFavorites } from '../../../hooks/useFavorites'
import { ProductCard } from '../../../components/ProductCard'
import { useProducts } from '../../../hooks/useProducts'
import { useEffect } from 'react'
import { Loader } from '../../../components/Loader'

export const FavoritesPage = () =>{
    const {favorites, toggleFavorites} = useFavorites();

    const {loadProductsByIds, productsArrByIds, loadingProductsByIds} = useProducts();

    console.log(productsArrByIds)

    useEffect(()=>{
        if (favorites.length > 0) {
            loadProductsByIds(favorites);
        }

    },[favorites]);

    return(
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
                {favorites.length == 0 && 
                    <div className={cls.favoritesPageEmpty}>
                        <div className={cls.favoritesInfoBlock}>
                            <div className={cls.titleBlock}>
                                <div className={cls.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9897 7.70372C14.9907 4.1976 9.98962 3.25446 6.23204 6.46502C2.47447 9.67558 1.94545 15.0435 4.8963 18.8406C7.34973 21.9977 14.7747 28.6561 17.2082 30.8112C17.4804 31.0524 17.6165 31.1729 17.7753 31.2203C17.9139 31.2616 18.0655 31.2616 18.2041 31.2203C18.3629 31.1729 18.499 31.0524 18.7713 30.8112C21.2048 28.6561 28.6297 21.9977 31.0832 18.8406C34.034 15.0435 33.5696 9.6418 29.7474 6.46502C25.9252 3.28824 20.9888 4.1976 17.9897 7.70372Z" fill="white"/>
                                    </svg>
                                </div>
                                <div className={cls.text}>
                                    <p>У вас пока нет избранных товаров</p>
                                    <p>Добавляйте товары из каталога, нажав по сердечку в углу</p>
                                </div>
                            </div>
                            <button className={cls.backBtn}>
                                <p>Перейти в каталог</p>
                            </button>
                        </div>
                    </div>
                }
                {loadingProductsByIds && <Loader />}
                {favorites.length > 0 && 
                <>
                    <div className={cls.favoritesFilters}>
                        <div className={cls.favoriteFilterItem}>
                            <p>Сортировать</p>
                            <div className={cls.filterWrapper}>
                                <div className={cls.filterLeft}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M1.125 3.125H14.875V4.875H1.125V3.125ZM1.125 7.125H9.875V8.875H1.125V7.125ZM5.875 11.125H1.125V12.875H5.875V11.125Z" fill="#8F9596"/>
                                    </svg>
                                    <p>По дате добавления</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.35638 7.85656C4.71175 7.50118 5.28793 7.50118 5.64331 7.85656L9.99984 12.2131L14.3564 7.85656C14.7118 7.50118 15.2879 7.50118 15.6433 7.85656C15.9987 8.21194 15.9987 8.78812 15.6433 9.14349L10.6433 14.1435C10.2879 14.4989 9.71175 14.4989 9.35638 14.1435L4.35638 9.14349C4.001 8.78812 4.001 8.21194 4.35638 7.85656Z" fill="#FF4D00"/>
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
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.35638 7.85656C4.71175 7.50118 5.28793 7.50118 5.64331 7.85656L9.99984 12.2131L14.3564 7.85656C14.7118 7.50118 15.2879 7.50118 15.6433 7.85656C15.9987 8.21194 15.9987 8.78812 15.6433 9.14349L10.6433 14.1435C10.2879 14.4989 9.71175 14.4989 9.35638 14.1435L4.35638 9.14349C4.001 8.78812 4.001 8.21194 4.35638 7.85656Z" fill="#FF4D00"/>
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
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.35638 7.85656C4.71175 7.50118 5.28793 7.50118 5.64331 7.85656L9.99984 12.2131L14.3564 7.85656C14.7118 7.50118 15.2879 7.50118 15.6433 7.85656C15.9987 8.21194 15.9987 8.78812 15.6433 9.14349L10.6433 14.1435C10.2879 14.4989 9.71175 14.4989 9.35638 14.1435L4.35638 9.14349C4.001 8.78812 4.001 8.21194 4.35638 7.85656Z" fill="#FF4D00"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={cls.favoritesList}>
                        {productsArrByIds?.map((favoriteItem, index)=>{
                            return(
                                <ProductCard 
                                    key={favoriteItem.id} 
                                    product={favoriteItem} 
                                    isFavorite={favorites.includes(favoriteItem.id)}
                                    addToFavorite={() => toggleFavorites(favoriteItem.id)}
                                />
                            )
                        })}
                    </div>
                </>
                }
            </div>
        </div>
    )
}