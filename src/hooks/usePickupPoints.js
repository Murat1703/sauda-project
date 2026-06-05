import { useState, useCallback } from "react";
import { apiGetPickupPoints } from "../api/api.pickup.points";

export const usePickupPoints = () =>{
    const [pickupPoints, setPickupPoints] = useState([]);
    const [loadingPoints, setLoadingPoints] = useState(false);
    const [errLoadingPoints, setErrLoadingPoints]= useState(null)

    const loadPoints = useCallback(async () => {
        try {
            setLoadingPoints(true);
            const res = await apiGetPickupPoints();
            setPickupPoints(res?.data?.pickup_points || []);
        } catch (error) {
            console.error("Failed to load products:", error);
            setErrLoadingPoints(error?.data?.message || error?.message)
            throw error;
        } finally {
            setLoadingPoints(false);
        }
    }, []);

    return {
        pickupPoints, loadPoints, errLoadingPoints, loadingPoints
    }
}