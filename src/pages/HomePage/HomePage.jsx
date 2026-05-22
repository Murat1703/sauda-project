import cls from './HomePage.module.css'
import { CategorysSection } from '../../components/HomePage/CategorysSection';
import { RecommendedSection } from '../../components/HomePage/RecommendedSection';
import { useProducts } from '../../hooks/useProducts.js';
import { AdvantagesSection } from '../../components/HomePage/AdvantagesSection';
import { WatchedSection } from '../../components/HomePage/WatchedSection/WatchedSection.jsx';
import { DiscountSection } from '../../components/HomePage/DiscountSection';
import { AboutSection } from '../../components/HomePage/AboutSection';
import { BannerSection } from '../../components/HomePage/BannerSection/BannerSection.jsx';
import { useEffect } from 'react';

export const HomePage = () =>{


    const {products, loadingProducts, loadProducts} = useProducts();

    useEffect(()=>{
        loadProducts();
    },[])

    const productsWithDiscount = products.filter(product => product.hasDiscount== true)
 
    return(
        <div className={cls.homePageWrapper}>
            <BannerSection />
            <CategorysSection />
            <RecommendedSection products={products}/>
            <AdvantagesSection />
            <WatchedSection products={products}/>
            <DiscountSection productsWithDiscount={productsWithDiscount}/>
            <AboutSection />
        </div>
    )
}