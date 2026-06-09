import { Outlet } from 'react-router-dom'
import cls from './CMSPageLayout.module.css'

export const CMSPageLayout = () =>{
    return(
        <div className={cls.cmsPageLayoutContent}> 
            <Outlet />
        </div>
    )
}