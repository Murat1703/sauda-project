// import { 
//   apiAddToFavorites, 
//   apiClearFavoritesList, 
//   apiDeleteFromFavorites, 
//   apiGetFavorites} from "../api/api.favorites";
// import { create } from "zustand";

// export const useFavoritesStore = create((set, get) => ({
  
//   favoritesList: !localStorage.getItem("token")
//   ? JSON.parse(localStorage.getItem("favorites") || "[]")
//   : JSON.parse(localStorage.getItem("wishlist") || "[]"),

//   loadingFavoritesList: false,

//   errLoadingFavoritesList: null,

//   loadFavoritesList: async (force = false) => {
//     const { favoritesList, loadingFavoritesList } = get();

//     if (loadingFavoritesList) return;
//     if (!force && (favoritesList.length > 0)) return;

//     try {
//       set({
//         loadingFavoritesList: true,
//         errLoadingFavoritesList: null,
//       });

//       const res = await apiGetFavorites();

//       const items = res?.data?.wishlist?.items || [];


//       set({
//         favoritesList: items,
//       });
//       localStorage.setItem('wishlist', JSON.stringify(items));

//     } catch (error) {
//       set({
//         errLoadingFavoritesList:
//           error?.response?.data?.message || error.message
//       });

//     } finally {
//       set({
//         loadingFavoritesList: false,
//       });
//     }
//   },  

//   addToFavoritesList: async (data) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       get().addToLocalFavoritesList(data);
//       return;
//     }


//     const prevFavoritesList = get().favoritesList || [];
    
//     const existingItem = prevFavoritesList.find(
//       (item) => item.slug === data.product_slug
//     );

//     if (existingItem) {
//         const updatedFavoritesList = prevFavoritesList.map((item) =>
//             item.product?.slug === data.product_slug
//             ? {
//                 ...item,
//                 product_slug: data.product_slug,
//             }
//             : item
//         );

//         set({ 
//           favoritesList: updatedFavoritesList, 
//           errLoadingFavoritesList: null 
//         });
//         localStorage.setItem(
//             'wishlist',
//             JSON.stringify(updatedFavoritesList)
//         );
//     } 
//     else{
//       set({ 
//         favoritesList: prevFavoritesList, 
//         errLoadingFavoritesList: null 
//       });
//       localStorage.setItem('wishlist',JSON.stringify(prevFavoritesList)
//       );
//     }

//     try {
//       await apiAddToFavorites(data);
//       await get().loadFavoritesList(true)
//     } catch (error) {
//       set({
//         favoritesList: prevFavoritesList,
//         errLoadingFavoritesList: error?.response?.data?.message 
//         || error.message,
//       });
//     }
//   },

//   deleteFromFavoritesList: async (id) =>{
//     const prevFavoritesList = get().favoritesList || [];
    
//     const updatedFavoritesList = prevFavoritesList.filter(
//       (item) => item.product.id === id
//     );

//     if (updatedFavoritesList) {

//         set({ 
//             favoritesList: updatedFavoritesList, 
//             errLoadingFavoritesList: null 
//         });
//         localStorage.setItem(
//             'wishlist',
//             JSON.stringify(updatedFavoritesList)
//         );
//     } 
//     else{
//         set({ 
//             favoritesList: prevFavoritesList, 
//             errLoadingFavoritesList: null 
//         });
//             localStorage.setItem('wishlist',JSON.stringify(prevFavoritesList)
//         );
//     }

//     try {
//       await apiDeleteFromFavorites(id);
//       await get().loadFavoritesList(true)
//     } catch (error) {
//       set({
//         favoritesList: prevFavoritesList,
//         errLoadingFavoritesList: error?.response?.data?.message || error.message,
//       });
//     }

//   },

//   clearFavoritesList: async () =>{
//     const prevFavoritesList = get().favoritesList || [];

//     set({
//         favoritesList: [],
//         errLoadingFavoritesList: null,
//     });

//     try {
//       await apiClearFavoritesList();
//       await get().loadFavoritesList(true)
//       localStorage.removeItem("wishlist");

//     } catch (error) {
//       set({
//         favoritesList: prevFavoritesList,
//         errLoadingFavoritesList: error?.response?.data?.message || error.message,
//       });
//     }
//     finally{
//       await get().loadFavoritesList(true)
//     }

//   },

//   addToLocalFavoritesList: async (data) => {
//     const favorites = JSON.parse(
//       localStorage.getItem("favorites") || "[]"
//     );

//     const exists = favorites.some(
//       item => item.product_slug === data.product_slug
//     );

//     const updatedFavorites = exists
//       ? favorites.filter(
//           item => item.product_slug !== data.product_slug
//         )
//       : [...favorites, data];

//     localStorage.setItem(
//       "favorites",
//       JSON.stringify(updatedFavorites)
//     );
    

//     set({
//       favoritesList: updatedFavorites
//     });
//     await get().loadFavoritesList(true)

//   },

//   deleteFromLocalFavoritesList: async (id) =>{
//     const prevFavoritesList = get().favoritesList || [];
    
//     const updatedFavoritesList = prevFavoritesList.filter(
//       (item) => item.product?.id !== id
//     );

//     if (updatedFavoritesList) {
//         set({ 
//             favoritesList: updatedFavoritesList, 
//             errLoadingFavoritesList: null 
//         });
//         localStorage.setItem(
//             'favorites',
//             JSON.stringify(updatedFavoritesList)
//         );
//     } 
//     else{
//         set({ 
//             favoritesList: prevFavoritesList, 
//             errLoadingFavoritesList: null 
//         });
//             localStorage.setItem('favorites',JSON.stringify(prevFavoritesList)
//         );
//     }

//     try {
//       // await apiDeleteFromFavorites(id);
//       await get().loadFavoritesList(true)
//     } catch (error) {
//       set({
//         favoritesList: prevFavoritesList,
//         errLoadingFavoritesList: error?.response?.data?.message 
//         || error.message,
//       });
//     }

//   },

//   syncLocalFavorites: async () => {
//     const localFavorites = JSON.parse(
//       localStorage.getItem("favorites") || "[]"
//     );

//     if (!localFavorites.length) {
//       await get().loadFavoritesList(true);
//       return;
//     }

//     try {
//       await Promise.all(
//         localFavorites.map((item) =>
//           apiAddToFavorites({
//             product_slug: item.product_slug,
//           })
//         )
//       );

//       localStorage.removeItem("favorites");

//       await get().loadFavoritesList(true);
//     } catch (error) {
//       set({
//         errLoadingFavoritesList:
//           error?.response?.data?.message || error.message,
//       });
//     }
//     finally{
//       localStorage.removeItem('favorites')
//     }
//   },
  
// }));

import {
  apiAddToFavorites,
  apiClearFavoritesList,
  apiDeleteFromFavorites,
  apiGetFavorites,
} from "../api/api.favorites";

import { create } from "zustand";

const getToken = () => localStorage.getItem("token");

const getStorageArray = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const getFavoriteSlug = (item) => {
  return item?.product?.slug || item?.product_slug || item?.slug;
};

const getFavoriteProductId = (item) => {
  return item?.product?.id || item?.product_id;
};

export const useFavoritesStore = create((set, get) => ({
  favoritesList: getToken()
    ? getStorageArray("wishlist")
    : getStorageArray("favorites"),

  loadingFavoritesList: false,
  errLoadingFavoritesList: null,

  loadFavoritesList: async (force = false) => {
    const token = getToken();

    if (!token) {
      const localFavorites = getStorageArray("favorites");

      set({
        favoritesList: localFavorites,
        loadingFavoritesList: false,
        errLoadingFavoritesList: null,
      });

      return;
    }

    const { favoritesList, loadingFavoritesList } = get();

    if (loadingFavoritesList && !force) return;
    if (!force && favoritesList.length > 0) return;

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

      localStorage.setItem("wishlist", JSON.stringify(items));
    } catch (error) {
      set({
        errLoadingFavoritesList:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingFavoritesList: false,
      });
    }
  },

  addToFavoritesList: async (data) => {
    const token = getToken();

    if (!token) {
      get().addToLocalFavoritesList(data);
      return;
    }

    const prevFavoritesList = get().favoritesList || [];

    const exists = prevFavoritesList.some(
      (item) => getFavoriteSlug(item) === data.product_slug
    );

    if (exists) return;

    try {
      set({
        loadingFavoritesList: true,
        errLoadingFavoritesList: null,
      });

      await apiAddToFavorites(data);

      await get().loadFavoritesList(true);
    } catch (error) {
      set({
        favoritesList: prevFavoritesList,
        errLoadingFavoritesList:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingFavoritesList: false,
      });
    }
  },

  deleteFromFavoritesList: async (id) => {
    const token = getToken();

    if (!token) {
      get().deleteFromLocalFavoritesList(id);
      return;
    }

    const prevFavoritesList = get().favoritesList || [];

    const updatedFavoritesList = prevFavoritesList.filter(
      (item) => getFavoriteProductId(item) !== id
    );

    set({
      favoritesList: updatedFavoritesList,
      errLoadingFavoritesList: null,
    });

    localStorage.setItem("wishlist", JSON.stringify(updatedFavoritesList));

    try {
      await apiDeleteFromFavorites(id);

      await get().loadFavoritesList(true);
    } catch (error) {
      set({
        favoritesList: prevFavoritesList,
        errLoadingFavoritesList:
          error?.response?.data?.message || error.message,
      });

      localStorage.setItem("wishlist", JSON.stringify(prevFavoritesList));
    }
  },

  clearFavoritesList: async () => {
    const token = getToken();

    if (!token) {
      localStorage.removeItem("favorites");

      set({
        favoritesList: [],
        errLoadingFavoritesList: null,
      });

      return;
    }

    const prevFavoritesList = get().favoritesList || [];

    set({
      favoritesList: [],
      errLoadingFavoritesList: null,
    });

    localStorage.removeItem("wishlist");

    try {
      await apiClearFavoritesList();

      await get().loadFavoritesList(true);
    } catch (error) {
      set({
        favoritesList: prevFavoritesList,
        errLoadingFavoritesList:
          error?.response?.data?.message || error.message,
      });

      localStorage.setItem("wishlist", JSON.stringify(prevFavoritesList));
    }
  },

  addToLocalFavoritesList: (data) => {
    const favorites = getStorageArray("favorites");

    const exists = favorites.some(
      (item) => item.product_slug === data.product_slug
    );

    const updatedFavorites = exists
      ? favorites.filter((item) => item.product_slug !== data.product_slug)
      : [...favorites, data];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    set({
      favoritesList: updatedFavorites,
      errLoadingFavoritesList: null,
    });
  },

  deleteFromLocalFavoritesList: (id) => {
    const prevFavoritesList = get().favoritesList || [];

    const updatedFavoritesList = prevFavoritesList.filter(
      (item) => getFavoriteProductId(item) !== id
    );

    localStorage.setItem("favorites", JSON.stringify(updatedFavoritesList));

    set({
      favoritesList: updatedFavoritesList,
      errLoadingFavoritesList: null,
    });
  },

  syncLocalFavorites: async () => {
    const token = getToken();

    if (!token) return;

    const localFavorites = getStorageArray("favorites");

    if (!localFavorites.length) {
      await get().loadFavoritesList(true);
      return;
    }

    try {
      set({
        loadingFavoritesList: true,
        errLoadingFavoritesList: null,
      });

      await Promise.all(
        localFavorites.map((item) =>
          apiAddToFavorites({
            product_slug: item.slug || item?.product?.slug,
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
    } finally {
      set({
        loadingFavoritesList: false,
      });
    }
  },
}));