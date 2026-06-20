import cls from './Search.module.css'
import { useSearch } from '../../hooks/useSearch.js'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../Badge/Badge.jsx';
import { useMediaQuery } from 'react-responsive';
import { useLanguage } from '../../stores/useLanguage.js';

export const Search = ({text, onClose}) =>{
    const{searchProducts, loading, err, loadSearchProducts}= useSearch();

    const {searchData, loadingSearchData, errLoadingSearchData, loadSearchData} = useSearch();

    const isMobile = useMediaQuery({
        maxWidth: 768
    })

    useEffect(()=>{
        loadSearchData({
            q: text
        })
    },[text])


    const categoryItems = searchData?.suggestions?.filter((item)=>item.type=='category');

    const {lang} = useLanguage();
    const onlyProducts = searchData?.suggestions?.filter((item)=>item?.type!=='category')
    return(
        <div className={cls.searchWrapper} onClick={onClose}>
            <div className={cls.searchResults} onClick={(e)=>e.stopPropagation()}>
                {searchData?.query_suggestions?.length ==0 && searchData?.suggestions?.length==0 && 
                    <div>
                        {lang=='ru'?`По запросу ${text} не обнаружено ничего`:`${text} сұранысы бойынша ештеңе табылмады`}                        
                    </div>
                }
                {searchData?.query_suggestions?.length!==0 && 
                <div>
                    <p>{lang=='ru'?`Возможно вы имели в виду: `:`Мүмкін, сіз мынаны іздеген шығарсыз:`}</p>
                    {searchData?.query_suggestions?.map((item,index)=>{
                        return(
                            <div key={index}>
                                {item.text}
                                {item.text.includes(text)}
                            </div>
                        )
                    })}
                </div>
                }
                {searchData?.suggestions?.length>0 && 

                    <div 
                        className={cls.searchResultsItems}
                        style={{
                            paddingBottom: (!isMobile && searchData?.suggestions?.length>7) ? "24px": "0"
                        }}
                    >   
                    {categoryItems.length > 0 &&
                    <div>
                        <p className={cls.type}>
                            {lang=='ru'? `Категории по поиску`: `Іздеуге сәйкес санаттар`}                            
                        </p>
                        {categoryItems?.map((item)=>{
                            return(
                                <Link 
                                    onClick={onClose} 
                                    to={`/catalog/categories/${item.slug}`} 
                                    key={item.slug}
                                >
                                    <div className={cls.textContent}>
                                        <p>{item.name}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    }
                    {onlyProducts?.length!==0 && 
                        <p>{lang=='ru'?`Товары по поиску`:`Іздеуге сәйкес таурлар`}</p>}
                        {onlyProducts?.map((item)=>{
                            return(
                                <Link 
                                    onClick={onClose} 
                                    to={`/products/${item.slug}`} 
                                    key={item.slug}
                                >
                                    <div className={cls.imgWrapper}>
                                        <img 
                                            src={`${item.primary_image_url}`} 
                                            alt={`${item.name}`} 
                                        />
                                    </div>
                                    <div className={cls.textContent}>
                                        <p>{item.name}</p>
                                        <div className={cls.resultPrice}>
                                            <p>{item.price} ₸</p>
                                            {item.old_price && 
                                            <div className={cls.discountWrapper}>
                                                <p className={cls.oldPrice}>
                                                    {item.old_price} ₸
                                                </p>
                                                <Badge type={`discount`}>
                                                    -{item.discount_percent}%
                                                </Badge>
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