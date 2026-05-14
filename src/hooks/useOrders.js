import { useState, useEffect, useCallback } from "react"

// const ordersList = {
//   "orders": [
//     {
//       "id": 2001,
//       "orderNumber": "BUILD-2026-2001",
//       "status": "delivered",
//       "createdAt": "2026-05-12T10:25:00",
//       "totalPrice": 485000,
//       "currency": "KZT",
//       "itemsCount": 5,
//       "deliveryType": "courier",
//       "paymentStatus": "paid",
//       "canCancel": false,
//       "canRepeat": true,
//       "itemsPreview": [
//         {
//           "id": 11,
//           "title": "Газоблок D500",
//           "image": "/assets/images/products/cem.png",
//           "quantity": 40
//         },
//         {
//           "id": 12,
//           "title": "Цемент М500",
//           "image": "/assets/images/products/cem.png",
//           "quantity": 20
//         }
//       ]
//     },
//     {
//       "id": 2002,
//       "orderNumber": "BUILD-2026-2002",
//       "status": "processing",
//       "createdAt": "2026-05-11T15:40:00",
//       "totalPrice": 129000,
//       "currency": "KZT",
//       "itemsCount": 3,
//       "deliveryType": "pickup",
//       "paymentStatus": "paid",
//       "canCancel": true,
//       "canRepeat": false,
//       "itemsPreview": [
//         {
//           "id": 13,
//           "title": "Клей для плитки Ceresit CM11",
//           "image": "/assets/images/products/cem.png",
//           "quantity": 15
//         },
//         {
//           "id": 14,
//           "title": "Грунтовка Knauf",
//           "image": "/assets/images/products/cem.png",
//           "quantity": 5
//         }
//       ]
//     },
//     {
//       "id": 2003,
//       "orderNumber": "BUILD-2026-2003",
//       "status": "shipped",
//       "createdAt": "2026-05-09T09:10:00",
//       "totalPrice": 870000,
//       "currency": "KZT",
//       "itemsCount": 6,
//       "deliveryType": "courier",
//       "paymentStatus": "paid",
//       "canCancel": false,
//       "canRepeat": true,
//       "itemsPreview": [
//         {
//           "id": 15,
//           "title": "Металлочерепица Monterrey",
//           "image": "/assets/images/products/cem.png",
//           "quantity": 55
//         },
//         {
//           "id": 16,
//           "title": "Минеральная вата Технониколь",
//           "image": "/assets/images/products/cem.png",
//           "quantity": 30
//         }
//       ]
//     },
//     {
//       "id": 2004,
//       "orderNumber": "BUILD-2026-2004",
//       "status": "cancelled",
//       "createdAt": "2026-05-07T18:55:00",
//       "totalPrice": 64000,
//       "currency": "KZT",
//       "itemsCount": 2,
//       "deliveryType": "pickup",
//       "paymentStatus": "refunded",
//       "canCancel": false,
//       "canRepeat": true,
//       "itemsPreview": [
//         {
//           "id": 17,
//           "title": "Шпаклевка Sheetrock",
//           "image": "/assets/images/products/cem.png",
//           "quantity": 8
//         }
//       ]
//     }
//   ],
//   "pagination":{
//     "page": 1,
//     "limit": 4,
//     "totalItems": 24,
//     "totalPages": 6,
//     "hasNextPage": true,
//     "hasPrevPage": false
//   }
// }

const ordersList = {
  orders: [
    {
      id: 2001,
      orderNumber: "BUILD-2026-2001",
      status: "delivered",
      createdAt: "2026-05-12T10:25:00",
      totalPrice: 485000,
      currency: "KZT",
      itemsCount: 5,
      deliveryType: "courier",
      paymentStatus: "paid",
      canCancel: false,
      canRepeat: true,
      itemsPreview: [
        {
          id: 11,
          sku: "GB5X2A",
          title: "Газоблок D500",
          image: "/assets/images/products/cem.png",
          quantity: 40,
          price: 4500,
          hasDiscount: true,
          discountPercent: 10,
          oldPrice: 5000,
          finalPrice: 4500
        },
        {
          id: 12,
          sku: "CM8LQ1",
          title: "Цемент М500",
          image: "/assets/images/products/cem.png",
          quantity: 20,
          price: 3200,
          hasDiscount: false,
          finalPrice: 3200
        }
      ]
    },

    {
      id: 2002,
      orderNumber: "BUILD-2026-2002",
      status: "processing",
      createdAt: "2026-05-11T15:40:00",
      totalPrice: 129000,
      currency: "KZT",
      itemsCount: 3,
      deliveryType: "pickup",
      paymentStatus: "paid",
      canCancel: true,
      canRepeat: false,
      itemsPreview: [
        {
          id: 13,
          sku: "CR11PK",
          title: "Клей для плитки Ceresit CM11",
          image: "/assets/images/products/cem.png",
          quantity: 15,
          price: 2800,
          hasDiscount: true,
          discountPercent: 15,
          oldPrice: 3300,
          finalPrice: 2800
        },
        {
          id: 14,
          sku: "KN4D8R",
          title: "Грунтовка Knauf",
          image: "/assets/images/products/cem.png",
          quantity: 5,
          price: 5400,
          hasDiscount: false,
          finalPrice: 5400
        }
      ]
    },

    {
      id: 2003,
      orderNumber: "BUILD-2026-2003",
      status: "shipped",
      createdAt: "2026-05-09T09:10:00",
      totalPrice: 870000,
      currency: "KZT",
      itemsCount: 6,
      deliveryType: "courier",
      paymentStatus: "paid",
      canCancel: false,
      canRepeat: true,
      itemsPreview: [
        {
          id: 15,
          sku: "MN7TZX",
          title: "Металлочерепица Monterrey",
          image: "/assets/images/products/cem.png",
          quantity: 55,
          price: 12500,
          hasDiscount: true,
          discountPercent: 8,
          oldPrice: 13600,
          finalPrice: 12500
        },
        {
          id: 16,
          sku: "TX9QWE",
          title: "Минеральная вата Технониколь",
          image: "/assets/images/products/cem.png",
          quantity: 30,
          price: 8900,
          hasDiscount: false,
          finalPrice: 8900
        }
      ]
    },

    {
      id: 2004,
      orderNumber: "BUILD-2026-2004",
      status: "cancelled",
      createdAt: "2026-05-07T18:55:00",
      totalPrice: 64000,
      currency: "KZT",
      itemsCount: 2,
      deliveryType: "pickup",
      paymentStatus: "refunded",
      canCancel: false,
      canRepeat: true,
      itemsPreview: [
        {
          id: 17,
          sku: "SH3LKP",
          title: "Шпаклевка Sheetrock",
          image: "/assets/images/products/cem.png",
          quantity: 8,
          price: 7600,
          hasDiscount: true,
          discountPercent: 5,
          oldPrice: 8000,
          finalPrice: 7600
        }
      ]
    }
  ],

  pagination: {
    page: 1,
    limit: 4,
    totalItems: 24,
    totalPages: 6,
    hasNextPage: true,
    hasPrevPage: false
  }
}
const getOrders = () =>{
    return ordersList.orders
}

const getOrder = (id) =>{
    return ordersList.orders.find(order => order.id === Number(id));
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

    const [order, setOrder] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(false);

    const loadOrder = useCallback(async(id)=>{
        try {
        setLoadingOrder(true);
        const res = await getOrder(id);
        setOrder(res || []);
        } catch (error) {
        console.error("Failed to load order:", error);
        throw error;
        } finally {
        setLoadingOrder(false);
        }
    },[])

    return {orders, loadingOrders, loadOrders, order, loadingOrder, loadOrder}
}