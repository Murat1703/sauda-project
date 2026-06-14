import { create } from "zustand";
import { apiGetOrder, apiGetOrders, apiPostOrder } from "../api/api.orders.js";
import { useCart } from "./useCart.js";

export const useOrdersStore = create((set, get) => ({
  orders: [],
  orderItem: {},
  ordersByName:[],

  loadingOrders: false,
  loadingOrderItem: false,
  loadingOrderByName: false,

  errLoadingOrders: null,
  errLoadingOrderItem: null,
  errLoadingOrderByName: null,

  loadOrders: async (params = {}) => {
    const { orders, loadingOrders } = get();
    if (loadingOrders) return;
    if (orders.length > 0) return;

    try {
      set({
        loadingOrders: true,
        errLoadingOrders: null,
      });

      const res = await apiGetOrders(params);

      set({
        orders: res?.data || [] ,
      });
    } catch (error) {
      set({
        errLoadingOrders:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingOrders: false,
      });
    }
  },

  loadOrderItem: async (orderId) => {
    const { orderItem } = get();

    if (!orderId) return;

    // if (String(orderItem?.order?.number) === String(orderId)) {
    //   return;
    // }

    try {
      set({
        loadingOrderItem: true,
        errLoadingOrderItem: null,
        orderItem: null,
      });

      const res = await apiGetOrder(orderId);

      set({
        orderItem: res?.data || null,
      });
    } catch (error) {
      set({
        orderItem: null,
        errLoadingOrderItem:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingOrderItem: false,
      });
    }
  },

  addOrder: async (data) => {

    const prevOrders = get().orders || [];

    set({
      loadingOrders: true,
      errLoadingOrders: null,
    });

    try {
      await apiPostOrder( data);
      await useCart.getState().clearCart();

      set({
        loadingOrders: false
      })
      await get().loadOrders(true);


    } catch (error) {
      set({
        orders: prevOrders,
        errLoadingOrders: error?.response?.data?.message 
        || error.message,
      });
    }
    finally {
      set({loadingOrders: false})
    }
  },

  loadOrdersByName: async () =>{
    const prevOrders = get().orders || [];

    prevOrders?.data?.map((item, index)=>{

    })

  }

 
}));