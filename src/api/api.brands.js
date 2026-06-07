import { http } from "./http";

export const apiGetBrands = () => http.get('/catalog/brands');
