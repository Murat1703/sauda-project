import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    console.log(pathname)

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        const scrollContainer = document.querySelector('#main-scroll');
        scrollContainer?.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    }, [pathname]);

    return null;
};