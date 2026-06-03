import { useState, useCallback } from "react";
import { apiCatalogFilters } from "../api/api.catalogFilters";

export const useCatalogFilters = () =>{
    const [categoryFiltersList, setCategoryFiltersList] = useState({});
    const [loadingCategoryFiltersList, setCategoryLoadingFiltersList] = useState(false);
    const [errCategoryLoadingFiltersList, setCategoryErrFiltersList]= useState(false);

    const loadCategoryFiltersList = useCallback(async (params = {}) => {
        try {
            setCategoryLoadingFiltersList(true);
            const res = await apiCatalogFilters(params);
            setCategoryFiltersList(res?.data || {});
        } catch (error) {
            setCategoryErrFiltersList(error.message)
            throw error;
        } finally {
            setCategoryLoadingFiltersList(false)
        }
    }, []);

    return{
        categoryFiltersList,
        loadingCategoryFiltersList,
        errCategoryLoadingFiltersList,
        loadCategoryFiltersList
    }

}