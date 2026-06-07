import { useState, useEffect, act } from 'react';
import cls from './CatalogMenu.module.css'
import { useCategories } from '../../stores/useCategories.js';
import { ShowSubCategoryIcon } from '../../../public/assets/icons/ShowSubCategoryIcon.jsx';
import { Link } from 'react-router-dom';
import { useProducts } from '../../stores/useProducts.js';
import { useMediaQuery } from 'react-responsive';
import { ArrowBackMobile } from '../../../public/assets/icons/ArrowBackMobile.jsx';
import { CloseIconMobile } from '../../../public/assets/icons/CloseIconMobile.jsx';
import { SearchIcon } from '../../../public/assets/icons/SearchIcon.jsx';
import { SearchMobileIcon } from '../../../public/assets/icons/SearchMobileIcon.jsx';
import { Search } from '../Search/Search.jsx';



export const CatalogMenu = ({onClose}) =>{

    const {
      categoriesTree, 
      loadingCategoriesTree, 
      errLoadingCategoriesTree, 
      loadCategoriesTree
    } = useCategories();

    useEffect(()=>{
      loadCategoriesTree();
    },[])

    const [activeID, setActiveID] = useState(null);
    useEffect(() => {
      if (categoriesTree.length > 0 && !activeID) {
        setActiveID(categoriesTree[0].id);
      }
    }, [categoriesTree, activeID]);

    const activeCategory = categoriesTree?.find(cat => cat.id === activeID);

    const chunkByPattern = (arr, pattern) => {
        let result = [];
        let index = 0;

        pattern.forEach(size => {
            result.push(arr.slice(index, index + size));
            index += size;
        });

        return result;
    };

    const columns = chunkByPattern(activeCategory?.children || [], [2, 3, 2]);


    const isMobile = useMediaQuery({
      maxWidth: 768
    })

    const [openSubMenu, setOpenSubMenu] = useState(false);

    const [searchString, setSearchString] = useState("");

    return(
        <>
        <div className={cls.catalogMenuWrapper}>
            <div className={cls.catalogMenuInner}>
                {!isMobile && errLoadingCategoriesTree && <p>{errLoadingCategoriesTree}</p>}
                {isMobile && 
                <div className={cls.catalogMenuMobileTop}>
                  <div>
                    <button 
                      onClick={openSubMenu ?()=>{setOpenSubMenu(false)}: onClose}
                    >
                      <ArrowBackMobile />
                    </button>
                    <p>{openSubMenu ? `${activeCategory?.name}`: "Каталог"}</p>
                    <button onClick={onClose}>
                      <CloseIconMobile />
                    </button>
                  </div>
                  <div>
                    <SearchMobileIcon />
                    <input 
                      type="text"  
                      placeholder='Поиск' 
                      value={searchString} 
                      onChange={(e)=>setSearchString(e.target.value)}
                    />
                  </div>
                  {errLoadingCategoriesTree && <p className={cls.errorText `errorText`}>{errLoadingCategoriesTree}</p>}
                </div>
                }
                <div className={`${cls.catalogMenuLeft} ${isMobile && openSubMenu ? `${cls.openSubMenu}` : '' }`}>
                    <ul>
                        {categoriesTree?.map((item, index)=>(
                            <li 
                              key={item.id} 
                              onMouseEnter={()=>setActiveID(item.id)} 
                              className={item.id == activeID ? `${cls.activeItem}`: ""}
                              onClick={(e)=>{
                                e.stopPropagation();
                                setActiveID(item.id);
                                setOpenSubMenu(true)
                              }}
                            >
                                <div>
                                    <img src={item.icon_url} alt={`${item.name}`}/>
                                    <p>{item.name}</p>
                                    <ShowSubCategoryIcon />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <nav 
                  className={`${cls.catalogMenuRight} ${isMobile && openSubMenu ? `${cls.openSubMenu}` : '' } `}
                >
                    {!isMobile ?<Link to={`/catalog/categories/${activeCategory?.slug}`} onClick={onClose}>
                    <h4 
                      className={cls.activeCategoryTitle}
                    >{activeCategory?.name}</h4>
                    </Link> : 
                    <a href={`/catalog/categories/${activeCategory?.slug}`}>
                      <p>Перейти в категорию</p>
                      <ShowSubCategoryIcon />
                    </a>
                    }
                    <ul>
                      {activeCategory?.children.map((child,index)=>{
                        return(
                          <li key={child.slug}>
                            <a href={`/catalog/categories/${activeCategory.slug}/${child.slug}`}>
                              {child.name}
                            </a>
                            {isMobile && <ShowSubCategoryIcon />}
                            
                            {/* <span>{products?.data?.length}</span> */}
                          </li>

                        )
                      })}
                    </ul>


                </nav>
            </div>
        </div>
        <div className={cls.bg}></div>
        {isMobile && searchString && 
        <Search 
          text={searchString} 
          onClose={()=>setSearchString("")}
        />}
        </>
    )
}