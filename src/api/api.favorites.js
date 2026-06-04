import { http } from "./http";

export const apiGetFavorites = () => http.get('/wishlist')

export const apiAddToFavorites = (data) => http.post('/wishlist/items', data);

export const apiDeleteFromFavorites = (id) => http.delete(`/wishlist/items/${id}`) 