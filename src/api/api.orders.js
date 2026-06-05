import { http } from "./http";

export const apiGetOrders = () => http.get('/orders')

export const apiPostOrder = (data) => http.post('/orders',data)