import { useEffect, useState } from 'react'
import cls from './Pagination.module.css'

export const Pagination = ({links, setActivePage}) =>{

    const [page, setPage] = useState(1);

    useEffect(()=>{
        setActivePage(page)
    },[page])
    
    return(
        <div className={cls.paginationWrapper}>
        {links.map((link, index)=>{
            return(
                <button 
                    key={index}
                    className={link.active==true ? cls.activePage: ""}
                    onClick={()=>setPage(Number(link?.label))}
                >
                    {link.label}
                </button>
            )
        })}
        </div>
    )
}