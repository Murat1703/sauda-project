import cls from './HomePage.module.css'
import { CategorysSection } from '../../components/HomePage/CategorysSection';
import { RecommendedSection } from '../../components/HomePage/RecommendedSection';
// import { useProducts } from '../../hooks/useProducts.js';
import { useProducts } from '../../stores/useProducts.js';
import { AdvantagesSection } from '../../components/HomePage/AdvantagesSection';
import { WatchedSection } from '../../components/HomePage/WatchedSection/WatchedSection.jsx';
import { DiscountSection } from '../../components/HomePage/DiscountSection';
import { AboutSection } from '../../components/HomePage/AboutSection';
import { BannerSection } from '../../components/HomePage/BannerSection/BannerSection.jsx';
import { useEffect } from 'react';
import { Loader } from '../../components/Loader/Loader.jsx';

export const HomePage = () =>{


    const {products, loadingProducts, loadProducts} = useProducts();

    useEffect(()=>{
        loadProducts();
    },[])

    console.log('homepage',products)

    const productsWithDiscount = products?.data?.filter(product => product.old_price !== null)

    if (loadingProducts) return null
 
    return(
        <>
        {loadingProducts && <Loader />}
        <div className={cls.homePageWrapper}>
            <BannerSection />
            <CategorysSection />
            <RecommendedSection products={products?.data}/>
            <AdvantagesSection />
            <WatchedSection products={products?.data}/>
            <DiscountSection productsWithDiscount={productsWithDiscount}/>
            <AboutSection />
        </div>
        </>
    )
}