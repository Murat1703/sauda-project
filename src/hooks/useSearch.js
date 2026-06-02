import { useEffect, useState, useCallback } from "react";
import { apiProducts } from "../api/api.products";
import { apiSearch } from "../api/api.search";



export const useSearch = (query) =>{

    const [searchProducts, setSearchProducts] = useState([]);;
    const [loading, setLoading] = useState(false);
    const[err, setErr] = useState(null)

    const loadSearchProducts = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            const res = await apiProducts(params);
            setSearchProducts(res.data || []);
        } catch (error) {
            setErr(error.data)
            console.error("Failed to load searc results:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const [searchData, setSearchData] = useState({});
    const [loadingSearchData, setLoadingSearchData] = useState(false);
    const [errLoadingSearchData, setErrLoadingSearchData]=useState(false)

    const loadSearchData = useCallback(async (params = {}) => {
        try {
            setLoadingSearchData(true);
            const res = await apiSearch(params);
            setSearchData(res.data || []);
        } catch (error) {
            setErrLoadingSearchData(error.data)
            console.error("Failed to load searc results:", error);
            throw error;
        } finally {
            setLoadingSearchData(false);
        }
    }, []);


    return{
        loadSearchProducts,
        searchProducts,
        loading,
        err, 

        loadSearchData,
        searchData,
        loadingSearchData,
        errLoadingSearchData
    }

}