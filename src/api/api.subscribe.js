import { http } from "./http";

export const apiSubscribe = (data) => http.post('/newsletter/subscribe', data)