import cls from './Search.module.css'
import { useSearch } from '../../hooks/useSearch.js'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../Badge/Badge.jsx';

export const Search = ({text, onClose}) =>{
    const{searchProducts, loading, err, loadSearchProducts}= useSearch();
    console.log(text)
    useEffect(()=>{
        loadSearchProducts({
            search: text
        })
    },[text])

    console.log(searchProducts)

    return(
        <div className={cls.searchWrapper} onClick={onClose}>
            <div className={cls.searchResults} onClick={(e)=>e.stopPropagation()}>
                {searchProducts?.data?.length ==0 && 
                    <div>
                        По запросу {text} не обнаружено ничего
                    </div>
                }
                {searchProducts?.data?.length>0 && 
                    <div className={cls.searchResultsItems}>
                        <p>Товары по поиску</p>
                        {searchProducts?.data?.map((item)=>{
                            return(
                                <Link onClick={onClose} to={`/products/${item.slug}`} key={item.slug}>
                                    <div className={cls.imgWrapper}>
                                        <img src={`${item.primary_image_url}`} alt={`${item.name}`} />
                                    </div>
                                    <div className={cls.textContent}>
                                        <p>{item.name}</p>
                                        <div className={cls.resultPrice}>
                                            <p>{item.price} ₸</p>
                                            {item.old_price && 
                                            <div className={cls.discountWrapper}>
                                                <p className={cls.oldPrice}>{item.old_price} ₸</p>
                                                <Badge type={`discount`}>-{item.discount_percent}%</Badge>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}