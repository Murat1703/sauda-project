import { http } from "./http";

export const apiSearch = (params = {}) => http.get('/catalog/search/suggest', {params});
