import { useState, useCallback } from "react";
import { apiGetPaymentMethods } from "../api/api.payment.js";

export const usePaymentMethods = () =>{
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);
    const [errLoadingPaymentMethods, setErrLoadingPaymentMethods]= useState(null)

    const loadPaymentMethods = useCallback(async () => {
        try {
            setLoadingPaymentMethods(true);
            const res = await apiGetPaymentMethods();
            setPaymentMethods(res || []);
        } catch (error) {
            console.error("Failed to load products:", error);
            setErrLoadingPaymentMethods(error?.data?.message || error?.message)
            throw error;
        } finally {
            setLoadingPaymentMethods(false);
        }
    }, []);

    return {
        paymentMethods, 
        loadPaymentMethods, 
        errLoadingPaymentMethods, 
        loadingPaymentMethods
    }
}