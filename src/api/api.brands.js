import { http } from "./http";

export const apiBrands = () => http.get('/catalog/brands');
