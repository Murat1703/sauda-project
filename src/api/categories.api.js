import { http } from "./http";

export const apiCategories = (params = {}) => http.get('/catalog/categories',{params});
export const apiCategoriesTree = (params = {}) => http.get('/catalog/categories/tree', {params})
export const apiGetCategoryItem = (slug) => http.get(`/catalog/categories/${slug}/children`)