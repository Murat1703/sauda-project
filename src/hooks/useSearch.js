import { useEffect, useState, useCallback } from "react";
import { apiProducts } from "../api/api.products";



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

    return{
        loadSearchProducts,
        searchProducts,
        loading,
        err
    }

}