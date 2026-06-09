import { useCallback, useState } from "react";
import { apiGetPage } from "../api/api.pages";

export const usePage = () =>{
    const [page, setPage] = useState(null);
    const [loadingPage, setLoadingPage] = useState(null);
    const [errLoadingPage, setErrLoadingPage] = useState(null);

    const loadPage = useCallback( async(slug) =>  {
        if (!slug) return
        try {
            setLoadingPage(true);
            const res = await apiGetPage(slug);
            setPage(res?.data || []);
        } catch (error) {
            setErrLoadingPage(error?.data?.response.message || error.message)
            throw error;
        } finally {
            setLoadingPage(false)
        }
    }, [])

    return {
        page, loadingPage, errLoadingPage, loadPage
    }
}