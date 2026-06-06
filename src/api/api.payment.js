import { http } from "./http";

export const apiGetPaymentMethods = () => http.get('/catalog/payment-methods')