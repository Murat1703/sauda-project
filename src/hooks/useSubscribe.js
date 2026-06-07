import { useState, useCallback } from "react";
import { apiSubscribe } from "../api/api.subscribe";

export const useSubscribe = () =>{
    const [subscribeStatus, setSubscribeStatus] = useState(null);
    const [loadingSubscribe, setLoadingSubscribe] = useState(false);
    const [subscribeError, setSubscribeError] = useState(null)

    const addToSubscribe = useCallback(async (data) => {
        try {
            setLoadingSubscribe(true);
            const res = await apiSubscribe(data);
            setSubscribeStatus(res?.data || null);
        } catch (error) {
            setSubscribeError(error?.response?.data?.message || error.message)
            throw error;
        } finally {
            setLoadingSubscribe(false);
        }
    }, []);

    return{
        subscribeStatus, 
        loadingSubscribe, 
        subscribeError,
        addToSubscribe
    }
}