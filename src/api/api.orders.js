import { http } from "./http";

export const apiGetOrders = (params = {}) => http.get('/orders' , {params})

export const apiGetOrder = (orderId) => http.get(`/orders/${orderId}`)

export const apiPostOrder = (data) => http.post('/orders',data)