import { http } from "./http";

export const apiCategories = () => http.get('/catalog/categories');
export const apiCategoriesTree = () => http.get('/catalog/categories/tree')
export const apiGetCategoryItem = (slug) => http.get(`/catalog/categories/${slug}/children`)