import { http } from "./http";

export const apiGetOrders = () => http.get('/orders')

export const apiGetOrder = (orderId) => http.get(`/orders/${orderId}`)

export const apiPostOrder = (data) => http.post('/orders',data)