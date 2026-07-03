import cls from './ProductCard.module.css'
import {HeartIcon}  from '../../../public/assets/icons/HeartIcon';
import {HeartIconFilled}  from '../../../public/assets/icons/HeartIconFilled';
import { SnackBar } from '../SnackBar';
import {useAuth} from '../../context/AuthContext.jsx';
import {toast} from 'react-toastify';
import {useFavoritesStore} from '../../stores/useFavoritesStore.js';

export const FavoriteButton = ({product}) =>{

    const{favoritesList, addToFavoritesList, deleteFromFavoritesList, addToLocalFavoritesList, deleteFromLocalFavoritesList} = useFavoritesStore();

    const {isAuth} = useAuth();

    const favoriteItem = favoritesList
        ?.find((item)=>
            {return item?.product?.slug === product?.slug}
        )


    const handleToggleFavorite = () =>{
        if (isAuth == false) {
            if (favoriteItem?.product?.slug === product?.slug){
                deleteFromLocalFavoritesList(favoriteItem?.product?.id);
                toast.error(
                    <SnackBar text={`Товар удален из избранного `} />
                )
            }else {
                addToLocalFavoritesList({
                    product_slug: product?.slug, 
                    product: product
                });
                toast(<SnackBar text={`Товар добавлен в избранное`} />)
            }
        }else{
            if (favoriteItem?.product?.slug === product?.slug){
                deleteFromFavoritesList(favoriteItem?.product?.id);
                toast.error(<SnackBar text={`Товар удален из избранного`} />)
            }else {
                addToFavoritesList({
                    product_slug: product?.slug, 
                    product: product
                });
                toast(<SnackBar text={`Товар добавлен в избранное`}/>)
            }
        }
    }
 

    return(
        <button 
            className={cls.favoriteBtn} 
            onClick={handleToggleFavorite}
        >
            {
                favoriteItem?.product?.slug == product?.slug?
                <HeartIconFilled />
                :<HeartIcon />
            }
        </button>
    )
}