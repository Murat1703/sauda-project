import { http } from "./http";

export const apiGetCart = () => http.get('/cart?reconcile=1');

export const apiAddToCart = (data) => http.post('/cart/items', data);

export const apiChangeCountCart = (id, quantity) => http.patch(`/cart/items/${id}`, {quantity})

export const apiDeleteFromCart = (id) => http.delete(`/cart/items/${id}`)

export const apiClearCart = () => http.delete(`/cart`)

