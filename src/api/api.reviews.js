import { http } from "./http";

export const apiGetReviews = (slug) => http.get(`/catalog/products/${slug}/reviews`)

export const apiGetMyReviews = () => http.get(`/me/reviews`)

export const apiPostReviews = (slug, data) => http.post(`/catalog/products/${slug}/reviews`, data)