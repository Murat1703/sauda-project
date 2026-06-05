import { http } from "./http";

export const apiGetPickupPoints = () => http.get('/catalog/pickup-points')