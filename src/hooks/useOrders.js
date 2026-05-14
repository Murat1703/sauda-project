import { useState, useEffect, useCallback } from "react"

const ordersList = {
  "orders": [
    {
      "id": 2001,
      "orderNumber": "BUILD-2026-2001",
      "status": "delivered",
      "createdAt": "2026-05-12T10:25:00",
      "totalPrice": 485000,
      "currency": "KZT",
      "itemsCount": 5,
      "deliveryType": "courier",
      "paymentStatus": "paid",
      "canCancel": false,
      "canRepeat": true,
      "itemsPreview": [
        {
          "id": 11,
          "title": "Газоблок D500",
          "image": "/assets/images/products/cem.png",
          "quantity": 40
        },
        {
          "id": 12,
          "title": "Цемент М500",
          "image": "/assets/images/products/cem.png",
          "quantity": 20
        }
      ]
    },
    {
      "id": 2002,
      "orderNumber": "BUILD-2026-2002",
      "status": "processing",
      "createdAt": "2026-05-11T15:40:00",
      "totalPrice": 129000,
      "currency": "KZT",
      "itemsCount": 3,
      "deliveryType": "pickup",
      "paymentStatus": "paid",
      "canCancel": true,
      "canRepeat": false,
      "itemsPreview": [
        {
          "id": 13,
          "title": "Клей для плитки Ceresit CM11",
          "image": "/assets/images/products/cem.png",
          "quantity": 15
        },
        {
          "id": 14,
          "title": "Грунтовка Knauf",
          "image": "/assets/images/products/cem.png",
          "quantity": 5
        }
      ]
    },
    {
      "id": 2003,
      "orderNumber": "BUILD-2026-2003",
      "status": "shipped",
      "createdAt": "2026-05-09T09:10:00",
      "totalPrice": 870000,
      "currency": "KZT",
      "itemsCount": 6,
      "deliveryType": "courier",
      "paymentStatus": "paid",
      "canCancel": false,
      "canRepeat": true,
      "itemsPreview": [
        {
          "id": 15,
          "title": "Металлочерепица Monterrey",
          "image": "/assets/images/products/cem.png",
          "quantity": 55
        },
        {
          "id": 16,
          "title": "Минеральная вата Технониколь",
          "image": "/assets/images/products/cem.png",
          "quantity": 30
        }
      ]
    },
    {
      "id": 2004,
      "orderNumber": "BUILD-2026-2004",
      "status": "cancelled",
      "createdAt": "2026-05-07T18:55:00",
      "totalPrice": 64000,
      "currency": "KZT",
      "itemsCount": 2,
      "deliveryType": "pickup",
      "paymentStatus": "refunded",
      "canCancel": false,
      "canRepeat": true,
      "itemsPreview": [
        {
          "id": 17,
          "title": "Шпаклевка Sheetrock",
          "image": "/assets/images/products/cem.png",
          "quantity": 8
        }
      ]
    }
  ],
  "pagination":{
    "page": 1,
    "limit": 4,
    "totalItems": 24,
    "totalPages": 6,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}

const getOrders = () =>{
    return ordersList.orders
}

export const useOrders = () =>{
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    const loadOrders = useCallback(async () => {
        try {
        setLoadingOrders(true);
        const res = await getOrders();
        setOrders(res || []);
        } catch (error) {
        console.error("Failed to load orders:", error);
        throw error;
        } finally {
        setLoadingOrders(false);
        }
    }, []);

    return {orders, loadingOrders, loadOrders}
}