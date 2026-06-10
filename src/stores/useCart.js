import { apiGetCart, apiAddToCart, apiChangeCountCart, apiClearCart, apiDeleteFromCart } from "../api/api.cart.js";
import { create } from "zustand";



export const useCart = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  cartTotal: null,

  loadingCart: false,

  errLoadingCart: null,
  errLoadingCartTotal: null,

  loadCart: async (force = false) => {
    const { cartItems, loadingCart, cartTotal } = get();

    if (loadingCart) return;
    if (!force && (cartItems.length > 0) && (cartTotal?.items?.length > 0)) return;

    try {
      set({
        loadingCart: true,
        errLoadingCart: null,
        errLoadingCartTotal: null,
      });

      const res = await apiGetCart();

      const items = res?.data?.cart?.items || [];
      const total = res?.data?.cart || {};


      set({
        cartItems: items,
        cartTotal: total
      });
      localStorage.setItem('cart', JSON.stringify(items));

    } catch (error) {
      set({
        errLoadingCart:
          error?.response?.data?.message || error.message,
        errLoadingCartTotal: error?.response?.data?.message || error.message
      });

    } finally {
      set({
        loadingCart: false,
      });
    }
  },

  addToCart: async (data) => {
    const prevCart = get().cartItems || [];
    
    const existingItem = prevCart.find(
      (item) => item.product?.slug === data.product_slug
    );

    if (existingItem) {
    const updatedCart = prevCart.map((item) =>
        item.product?.slug === data.product_slug
        ? {
            ...item,
            quantity: item.quantity + data.quantity,
            }
        : item
    );

    set({ cartItems: updatedCart, errLoadingCart: null });
        localStorage.setItem(
            'cart',
            JSON.stringify(updatedCart)
        );
    } else{
        set({ cartItems: prevCart, errLoadingCart: null });
            localStorage.setItem(
            'cart',
            JSON.stringify(prevCart)
        );
    }

    try {
      await apiAddToCart(data);
      await get().loadCart(true)
    } catch (error) {
      set({
        cartItems: prevCart,
        errLoadingCart: error?.response?.data?.message || error.message,
      });
    }
  },

  changeCount: async (id, data) =>{
    const prevCart = get().cartItems || [];
    const updatedCart = prevCart.map((item) =>
        item.id === id
        ? {
            ...item,
            quantity: data,
          }
        : item
    );

  set({
    cartItems: updatedCart,
    errLoadingCart: null,
  });

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  try {
    await apiChangeCountCart(id, data);
    await get().loadCart(true);
  } catch (error) {
    set({
      cartItems: prevCart,
      errLoadingCart: error?.response?.data?.message || error.message,
    });

    localStorage.setItem("cart", JSON.stringify(prevCart));
  }

    
  },

  removeFromCart: async(id) =>{
    const prevCart = get().cartItems || [];
    const updatedCart = prevCart.filter((item) =>
        item.id !== id
    );

    set({
        cartItems: updatedCart,
        errLoadingCart: null,
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));

  try {
    await apiDeleteFromCart(id);
    await get().loadCart(true);
  } catch (error) {
    set({
      cartItems: prevCart,
      errLoadingCart: error?.response?.data?.message || error.message,
    });

    localStorage.setItem("cart", JSON.stringify(prevCart));
  }


  },

  clearCart: async()=>{
    const prevCart = get().cartItems;

    set({
        cartItems: [],
        cartTotal: null,
        errLoadingCart: null,
    });
    localStorage.removeItem("cart");

    try{
        await apiClearCart();
    } catch(error){
        set({
            cartItems: prevCart,
            errLoadingCart: error?.response?.data?.message || error.message
        })
    }
  },


  loadCartLocal: async (force = false) => {
    const { cartItems, loadingCart, cartTotal } = get();

    if (loadingCart) return;
    if (!force && (cartItems.length > 0) && (cartTotal?.items?.length > 0)) return;

    try {
      set({
        loadingCart: true,
        errLoadingCart: null,
        errLoadingCartTotal: null,
      });

      const res = await apiGetCart();

      const items = res?.data?.cart?.items || [];
      const total = res?.data?.cart || {};


      set({
        cartItems: items,
        cartTotal: total
      });
      localStorage.setItem('cart', JSON.stringify(items));

    } catch (error) {
      set({
        errLoadingCart:
          error?.response?.data?.message || error.message,
        errLoadingCartTotal: error?.response?.data?.message || error.message
      });

    } finally {
      set({
        loadingCart: false,
      });
    }
  },

  addToLocalCart: async (data) => {
    const prevCart = get().cartItems || [];
    
    const existingItem = prevCart.find(
      (item) => item?.product?.slug === data?.product_slug
    );

    if (existingItem) {
    const updatedCart = prevCart.map((item) =>
        item.product?.slug === data.product_slug
        ? {
            ...item,
            quantity: item.quantity + data.quantity,
            }
        : item
    );

    set({ cartItems: updatedCart, errLoadingCart: null });
        localStorage.setItem(
            'basket',
            JSON.stringify(updatedCart)
        );
    } else{
        set({ cartItems: prevCart, errLoadingCart: null });
            localStorage.setItem(
            'cart',
            JSON.stringify(prevCart)
        );
    }

    try {
      // await apiAddToCart(data);
      await get().loadCartLocal(true)
    } catch (error) {
      set({
        cartItems: prevCart,
        errLoadingCart: error?.response?.data?.message || error.message,
      });
    }
  },

  deleteFromLocalFavoritesList: async (id) =>{
    const prevFavoritesList = get().favoritesList || [];
    
    const updatedFavoritesList = prevFavoritesList.filter(
      (item) => item.product?.id !== id
    );

    if (updatedFavoritesList) {
        set({ 
            favoritesList: updatedFavoritesList, 
            errLoadingFavoritesList: null 
        });
        localStorage.setItem(
            'favorites',
            JSON.stringify(updatedFavoritesList)
        );
    } 
    else{
        set({ 
            favoritesList: prevFavoritesList, 
            errLoadingFavoritesList: null 
        });
            localStorage.setItem('favorites',JSON.stringify(prevFavoritesList)
        );
    }

    try {
      // await apiDeleteFromFavorites(id);
      await get().loadFavoritesList(true)
    } catch (error) {
      set({
        favoritesList: prevFavoritesList,
        errLoadingFavoritesList: error?.response?.data?.message 
        || error.message,
      });
    }

  },

  syncLocalFavorites: async () => {
    const localFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (!localFavorites.length) {
      await get().loadFavoritesList(true);
      return;
    }

    try {
      await Promise.all(
        localFavorites.map((item) =>
          apiAddToFavorites({
            product_slug: item.product_slug,
          })
        )
      );

      localStorage.removeItem("favorites");

      await get().loadFavoritesList(true);
    } catch (error) {
      set({
        errLoadingFavoritesList:
          error?.response?.data?.message || error.message,
      });
    }
    finally{
      localStorage.removeItem('favorites')
    }
  },


  





  
}));