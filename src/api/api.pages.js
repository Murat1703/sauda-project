import { http } from "./http";

export const apiGetPage = (slug) => http.get(`/pages/${slug}`)