import { http } from "./http";

export const apiProducts = (params = {}) => http.get('/catalog/products', {params});
export const apiProduct = (slug) => http.get(`/catalog/products/${slug}`)