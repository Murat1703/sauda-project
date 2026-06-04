import { apiAddToFavorites, apiDeleteFromFavorites, apiGetFavorites } from "../api/api.favorites";
import { create } from "zustand";



export const useFavoritesStore = create((set, get) => ({
  favoritesList: JSON.parse(localStorage.getItem('wishlist')) || [],

  loadingFavoritesList: false,

  errLoadingFavoritesList: null,

  loadFavoritesList: async (force = false) => {
    const { favoritesList, loadingFavoritesList, errLoadingFavoritesList } = get();

    if (loadingFavoritesList) return;
    if (!force && (favoritesList.length > 0)) return;

    try {
      set({
        loadingFavoritesList: true,
        errLoadingFavoritesList: null,
      });

      const res = await apiGetFavorites();

      const items = res?.data?.wishlist?.items || [];


      set({
        favoritesList: items,
      });
      localStorage.setItem('wishlist', JSON.stringify(items));

    } catch (error) {
      set({
        errLoadingFavoritesList:
          error?.response?.data?.message || error.message
      });

    } finally {
      set({
        loadingFavoritesList: false,
      });
    }
  },

//   addToFavorite: async (data) => {
//     const prevFavoritesList = get().favoritesList || [];
    
//     const existingItem = prevFavoritesList.find(
//       (item) => item.slug === data.product_slug
//     );

//     if (existingItem) {
//     const updatedCart = prevFavoritesList.map((item) =>
//         item.slug === data.product_slug
//         ? {
//             ...item,
//             product_slug: data.product_slug,
//             }
//         : item
//     );

//     set({ cartItems: updatedCart, errLoadingCart: null });
//         localStorage.setItem(
//             'wishlist',
//             JSON.stringify(updatedCart)
//         );
//     } else{
//         set({ cartItems: prevCart, errLoadingCart: null });
//             localStorage.setItem(
//             'wishlist',
//             JSON.stringify(prevCart)
//         );
//     }

//     try {
//       await apiAddToFavorites(data);
//       await get().loadCart(true)
//     } catch (error) {
//       set({
//         cartItems: prevCart,
//         errLoadingCart: error?.response?.data?.message || error.message,
//       });
//     }
//   },

  addToFavoritesList: async (data) => {
    const prevFavoritesList = get().favoritesList || [];
    
    const existingItem = prevFavoritesList.find(
      (item) => item.slug === data.product_slug
    );

    if (existingItem) {
        const updatedFavoritesList = prevFavoritesList.map((item) =>
            item.product?.slug === data.product_slug
            ? {
                ...item,
                product_slug: data.product_slug,
            }
            : item
        );

        set({ favoritesList: updatedFavoritesList, errLoadingFavoritesList: null });
        localStorage.setItem(
            'wishlist',
            JSON.stringify(updatedFavoritesList)
        );
    } 
    else{
        set({ favoritesList: prevFavoritesList, errLoadingFavoritesList: null });
            localStorage.setItem('wishlist',JSON.stringify(prevFavoritesList)
        );
    }

    try {
      await apiAddToFavorites(data);
      await get().loadFavoritesList(true)
    } catch (error) {
      set({
        favoritesList: prevFavoritesList,
        errLoadingFavoritesList: error?.response?.data?.message || error.message,
      });
    }
  },

  deleteFromFavoritesList: async (id) =>{
    const prevFavoritesList = get().favoritesList || [];
    
    const updatedFavoritesList = prevFavoritesList.filter(
      (item) => item.product.id === id
    );

    if (updatedFavoritesList) {

        set({ 
            favoritesList: updatedFavoritesList, 
            errLoadingFavoritesList: null 
        });
        localStorage.setItem(
            'wishlist',
            JSON.stringify(updatedFavoritesList)
        );
    } 
    else{
        set({ 
            favoritesList: prevFavoritesList, 
            errLoadingFavoritesList: null 
        });
            localStorage.setItem('wishlist',JSON.stringify(prevFavoritesList)
        );
    }

    try {
      await apiDeleteFromFavorites(id);
      await get().loadFavoritesList(true)
    } catch (error) {
      set({
        favoritesList: prevFavoritesList,
        errLoadingFavoritesList: error?.response?.data?.message || error.message,
      });
    }

  }


//   addToCart: async (data) => {
//     const prevFavoritesList = get().cartItems || [];

    
//     const existingItem = prevFavoritesList.find(
//       (item) => item.product?.slug === data.product_slug
//     );

//     if (existingItem) {
//     const updatedFavoritesList = prevFavoritesList.map((item) =>
//         item.product?.slug === data.product_slug
//         ? {
//             ...item,
//             product_slug: data.product_slug,
//         }
//         : item
//     );

//     set({ favoritesList: updatedFavoritesList, errLoadingFavoritesList: null });
//         localStorage.setItem(
//             'wishlist',
//             JSON.stringify(updatedFavoritesList)
//         );
//     } else{
//         set({ favoritesList: prevFavoritesList, errLoadingFavoritesList: null });
//             localStorage.setItem(
//             'wishlist',
//             JSON.stringify(prevFavoritesList)
//         );
//     }

//     try {
//       await apiAddToFavorites(data);
//       await get().loadFavoritesList(true)
//     } catch (error) {
//       set({
//         favoritesList: prevFavoritesList,
//         errLoadingFavoritesList: error?.response?.data?.message || error.message,
//       });
//     }
//   },

//   changeCount: async (id, data) =>{
//     const prevCart = get().cartItems || [];
//     const updatedCart = prevCart.map((item) =>
//         item.id === id
//         ? {
//             ...item,
//             quantity: data,
//             }
//         : item
//     );

//   set({
//     cartItems: updatedCart,
//     errLoadingCart: null,
//   });

//   localStorage.setItem("cart", JSON.stringify(updatedCart));

//   try {
//     await apiChangeCountCart(id, data);
//     await get().loadCart(true);
//   } catch (error) {
//     set({
//       cartItems: prevCart,
//       errLoadingCart: error?.response?.data?.message || error.message,
//     });

//     localStorage.setItem("cart", JSON.stringify(prevCart));
//   }

    
//   },

//   removeFromCart: async(id) =>{
//     const prevCart = get().cartItems || [];
//     const updatedCart = prevCart.filter((item) =>
//         item.id !== id
//     );

//     set({
//         cartItems: updatedCart,
//         errLoadingCart: null,
//     });

//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//   try {
//     await apiDeleteFromCart(id);
//     await get().loadCart(true);
//   } catch (error) {
//     set({
//       cartItems: prevCart,
//       errLoadingCart: error?.response?.data?.message || error.message,
//     });

//     localStorage.setItem("cart", JSON.stringify(prevCart));
//   }


//   },


//   clearCart: async()=>{
//     const prevCart = get().cartItems;

//     set({
//         cartItems: [],
//         cartTotal: null,
//         errLoadingCart: null,
//     });
//     localStorage.removeItem("cart");

//     try{
//         await apiClearCart();
//     } catch(error){
//         set({
//             cartItems: prevCart,
//             errLoadingCart: error?.response?.data?.message || error.message
//         })
//     }
//   }

  





  
}));