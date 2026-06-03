import { http } from "./http";

export const apiCatalogFilters = (params = {}) =>http.get('/catalog/filters', {params})