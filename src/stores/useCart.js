// import { apiGetCart, apiAddToCart, apiChangeCountCart, apiClearCart, apiDeleteFromCart } from "../api/api.cart.js";
// import { create } from "zustand";
// import { useAuthStore } from "./useAuthStore.js";

// export const useCart = create((set, get) => ({
//   cartItems: JSON.parse(localStorage.getItem('cart')) || [],
//   cartTotal: null,

//   loadingCart: false,

//   errLoadingCart: null,
//   errLoadingCartTotal: null,
  

//   loadCart: async (force = false) => {
//     const { cartItems, loadingCart, cartTotal } = get();

//     if (loadingCart) return;
//     if (!force && (cartItems.length > 0) && (cartTotal?.items?.length > 0)) return;

//     const {isAuth} = useAuthStore.getState();
//     const localCart = JSON.parse(localStorage.getItem("cart") || "[]")
//     if (!isAuth) {
//       // const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

//       set({
//         cartItems: localCart,
//         cartTotal: {
//           items: localCart,
//         },
//         loadingCart: false,
//       });

//       return;
//     }




//     try {
//       set({
//         loadingCart: true,
//         errLoadingCart: null,
//         errLoadingCartTotal: null,
//       });


//       const res = await apiGetCart()

//       const items = res?.data?.cart?.items || [];
//       const total = res?.data?.cart || {};

//       set({
//         cartItems: items,
//         cartTotal: total
//       });
//       localStorage.removeItem('cart');

//     } catch (error) {
//       set({
//         errLoadingCart:
//           error?.response?.data?.message || error.message,
//         errLoadingCartTotal: error?.response?.data?.message || error.message
//       });

//     } finally {
//       set({
//         loadingCart: false,
//       });
//     }
//   },

//   // addToCart: async (data) => {
//   //   const prevCart = get().cartItems || [];
    
//   //   const existingItem = prevCart.find(
//   //     (item) => item.product?.slug === data.product_slug
//   //   );

//   //   if (existingItem) {
//   //   const updatedCart = prevCart.map((item) =>
//   //       item.product?.slug === data.product_slug
//   //       ? {
//   //           ...item,
//   //           quantity: item.quantity + data.quantity,
//   //           }
//   //       : item
//   //   );

//   //   set({ cartItems: updatedCart, errLoadingCart: null });
//   //       localStorage.setItem(
//   //           'cart',
//   //           JSON.stringify(updatedCart)
//   //       );
//   //   } else{
//   //       set({ cartItems: prevCart, errLoadingCart: null });
//   //           localStorage.setItem(
//   //           'cart',
//   //           JSON.stringify(prevCart)
//   //       );
//   //   }

//   //   try {
//   //     await apiAddToCart(data);
//   //     await get().loadCart(true)
//   //   } catch (error) {
//   //     set({
//   //       cartItems: prevCart,
//   //       errLoadingCart: error?.response?.data?.message || error.message,
//   //     });
//   //   }
//   // },

//   addToCart: async (data) => {
//     const token = localStorage.getItem('token');
//     const isAuth = Boolean(token);

//     console.log('data = ', data)

//     const quantity = data.quantity || 1;

//     // Если пользователь авторизован — работаем только через API
//     if (isAuth) {
//       try {
//         set({ loadingCart: true, errLoadingCart: null });

//         await apiAddToCart(data);

//         // После успешного API обновляем корзину с сервера
//         await get().loadCart(true);
//       } catch (error) {
//         set({
//           errLoadingCart:
//             error?.response?.data?.message || error.message,
//         });
//       } finally {
//         set({ loadingCart: false });
//       }

//       return;
//     }

//     // Если НЕ авторизован — работаем только с localStorage
//     const prevCart = get().cartItems || [];

//     const existingItem = prevCart.find(
//       (item) =>
//         item.product?.slug === data.product_slug ||
//         item.product_slug === data.product_slug
//     );

//     let updatedCart;

//     if (existingItem) {
//       updatedCart = prevCart.map((item) =>
//         item.product?.slug === data.product_slug ||
//         item.product_slug === data.product_slug
//           ? {
//               ...item,
//               quantity: item.quantity + quantity,
//             }
//           : item
//       );
//     } else {
//       updatedCart = [
//         ...prevCart,
//         {
//           ...data,
//           product_slug: data.product_slug,
//           quantity,
//         },
//       ];
//     }

//     set({
//       cartItems: updatedCart,
//       errLoadingCart: null,
//     });

//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   },

//   changeCount: async (id, data) =>{
//     const prevCart = get().cartItems || [];
//     const updatedCart = prevCart.map((item) =>
//         item.id === id
//         ? {
//             ...item,
//             quantity: data,
//           }
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
//     const isAuth = useAuthStore.getState();

//     set({
//         cartItems: [],
//         cartTotal: null,
//         errLoadingCart: null,
//     });
//     localStorage.removeItem("cart");
//     if (isAuth == true){
//       try{
        
//           await apiClearCart();
//       } catch(error){
//           set({
//               cartItems: prevCart,
//               errLoadingCart: error?.response?.data?.message || error.message
//           })
//       }
//     }
//   },

//   syncLocalCartWithAccount : async () => {
//     const localCart = JSON.parse(localStorage.getItem('cart')) || [];

//     if (!localCart.length) return;

//     try {
//       for (const item of localCart) {
//         await get().addToCart({
//           product_slug: item.product.slug,
//           quantity: item.quantity,
//         });
//       }

//       localStorage.removeItem('cart');
//     } catch (error) {
//       console.error('Ошибка синхронизации корзины:', error);
//     }
//   },


//   loadCartLocal: async (force = false) => {
//     const { cartItems, loadingCart, cartTotal } = get();

//     if (loadingCart) return;
//     if (!force && (cartItems.length > 0) && (cartTotal?.items?.length > 0)) return;

//     try {
//       set({
//         loadingCart: true,
//         errLoadingCart: null,
//         errLoadingCartTotal: null,
//       });

//       const res = await apiGetCart();

//       const items = res?.data?.cart?.items || [];
//       const total = res?.data?.cart || {};


//       set({
//         cartItems: items,
//         cartTotal: total
//       });
//       localStorage.setItem('cart', JSON.stringify(items));

//     } catch (error) {
//       set({
//         errLoadingCart:
//           error?.response?.data?.message || error.message,
//         errLoadingCartTotal: error?.response?.data?.message || error.message
//       });

//     } finally {
//       set({
//         loadingCart: false,
//       });
//     }
//   },

//   addToLocalCart: async (data) => {
//     const prevCart = get().cartItems || [];
    
//     const existingItem = prevCart.find(
//       (item) => item?.product?.slug === data?.product_slug
//     );

//     if (existingItem) {
//     const updatedCart = prevCart.map((item) =>
//         item.product?.slug === data.product_slug
//         ? {
//             ...item,
//             quantity: item.quantity + data.quantity,
//             }
//         : item
//     );

//     set({ cartItems: updatedCart, errLoadingCart: null });
//         localStorage.setItem(
//             'basket',
//             JSON.stringify(updatedCart)
//         );
//     } else{
//         set({ cartItems: prevCart, errLoadingCart: null });
//             localStorage.setItem(
//             'cart',
//             JSON.stringify(prevCart)
//         );
//     }

//     try {
//       // await apiAddToCart(data);
//       await get().loadCartLocal(true)
//     } catch (error) {
//       set({
//         cartItems: prevCart,
//         errLoadingCart: error?.response?.data?.message || error.message,
//       });
//     }
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


// import {
//   apiGetCart,
//   apiAddToCart,
//   apiChangeCountCart,
//   apiClearCart,
//   apiDeleteFromCart,
// } from "../api/api.cart.js";

// import { create } from "zustand";
// import { useAuthStore } from "./useAuthStore.js";

// const getLocalCart = () => {
//   try {
//     return JSON.parse(localStorage.getItem("cart") || "[]");
//   } catch {
//     return [];
//   }
// };

// const calcLocalTotal = (items) => {
//   return {
//     items,
//     items_quantity: items.reduce((sum, item) => {
//       return sum + Number(item.quantity || 0);
//     }, 0),
//     subtotal: items.reduce((sum, item) => {
//       const price =
//         Number(item.product?.price) ||
//         Number(item.product?.final_price) ||
//         Number(item.price) ||
//         0;

//       return sum + price * Number(item.quantity || 1);
//     }, 0),
//   };
// };

// export const useCart = create((set, get) => ({
//   cartItems: getLocalCart(),
//   cartTotal: calcLocalTotal(getLocalCart()),

//   loadingCart: false,
//   errLoadingCart: null,
//   errLoadingCartTotal: null,

//   loadCart: async (force = false) => {
//     const { cartItems, loadingCart } = get();

//     if (loadingCart) return;
//     if (!force && cartItems.length > 0) return;

//     const { isAuth } = useAuthStore.getState();

//     if (!isAuth) {
//       const localCart = getLocalCart();

//       set({
//         cartItems: localCart,
//         cartTotal: calcLocalTotal(localCart),
//         loadingCart: false,
//         errLoadingCart: null,
//       });

//       return;
//     }

//     try {
//       set({
//         loadingCart: true,
//         errLoadingCart: null,
//         errLoadingCartTotal: null,
//       });

//       const res = await apiGetCart();

//       const items = res?.data?.cart?.items || [];
//       const total = res?.data?.cart || {};

//       set({
//         cartItems: items,
//         cartTotal: total,
//       });

//       // ВАЖНО:
//       // Тут НЕ удаляем localStorage.
//       // Удалять надо только после syncLocalCartWithAccount.
//     } catch (error) {
//       set({
//         errLoadingCart: error?.response?.data?.message || error.message,
//         errLoadingCartTotal: error?.response?.data?.message || error.message,
//       });
//     } finally {
//       set({
//         loadingCart: false,
//       });
//     }
//   },

//   addToCart: async (data) => {
//     const { isAuth } = useAuthStore.getState();

//     const quantity = Number(data.quantity || 1);
//     const product_slug = data.product?.slug;

//     if (!product_slug) {
//       set({
//         errLoadingCart: "Не найден product_slug для добавления в корзину",
//       });
//       return;
//     }

//     if (isAuth) {
//       try {
//         set({
//           errLoadingCart: null,
//         });

//         await apiAddToCart({
//           ...data,
//           product_slug,
//           quantity,
//         });

//         await get().loadCart(true);
//       } catch (error) {
//         set({
//           errLoadingCart: error?.response?.data?.message || error.message,
//         });
//       }

//       return;
//     }

//     const prevCart = getLocalCart();

//     const existingItem = prevCart.find((item) => {
//       const itemSlug = item.product_slug || item.product?.slug;
//       return itemSlug === product_slug;
//     });

//     let updatedCart;

//     if (existingItem) {
//       updatedCart = prevCart.map((item) => {
//         const itemSlug = item.product?.slug;

//         if (itemSlug === product_slug) {
//           return {
//             ...item,
//             product: item?.product,
//             quantity: Number(item.quantity || 0) + quantity,
//           };
//         }

//         return item;
//       });
//     } else {
//       updatedCart = [
//         ...prevCart,
//         {
//           ...data,
//           product: data?.product,
//           id: data.id || data.product?.id || product_slug,
//           product_slug,
//           quantity,
//         },
//       ];
//     }

//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//     set({
//       cartItems: updatedCart,
//       cartTotal: calcLocalTotal(updatedCart),
//       errLoadingCart: null,
//     });
//   },

//   changeCount: async (id, quantity) => {
//     const { isAuth } = useAuthStore.getState();

//     const nextQuantity = Number(quantity);

//     if (nextQuantity <= 0) {
//       await get().removeFromCart(id);
//       return;
//     }

//     if (isAuth) {
//       try {
//         set({
//           errLoadingCart: null,
//         });

//         await apiChangeCountCart(id, nextQuantity);
//         await get().loadCart(true);
//       } catch (error) {
//         set({
//           errLoadingCart: error?.response?.data?.message || error.message,
//         });
//       }

//       return;
//     }

//     const prevCart = getLocalCart();

//     const updatedCart = prevCart.map((item) => {
//       if (item.id === id || item.product_slug === id || item.product?.slug === id) {
//         return {
//           ...item,
//           quantity: nextQuantity,
//         };
//       }

//       return item;
//     });

//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//     set({
//       cartItems: updatedCart,
//       cartTotal: calcLocalTotal(updatedCart),
//       errLoadingCart: null,
//     });
//   },

//   removeFromCart: async (id) => {
//     const { isAuth } = useAuthStore.getState();

//     if (isAuth) {
//       try {
//         set({
//           errLoadingCart: null,
//         });

//         await apiDeleteFromCart(id);
//         await get().loadCart(true);
//       } catch (error) {
//         set({
//           errLoadingCart: error?.response?.data?.message || error.message,
//         });
//       }

//       return;
//     }

//     const prevCart = getLocalCart();

//     const updatedCart = prevCart.filter((item) => {
//       return item.id !== id && item.product_slug !== id && item.product?.slug !== id;
//     });

//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//     set({
//       cartItems: updatedCart,
//       cartTotal: calcLocalTotal(updatedCart),
//       errLoadingCart: null,
//     });
//   },

//   clearCart: async () => {
//     const { isAuth } = useAuthStore.getState();

//     const prevCart = get().cartItems;

//     set({
//       cartItems: [],
//       cartTotal: calcLocalTotal([]),
//       errLoadingCart: null,
//     });

//     localStorage.removeItem("cart");

//     if (!isAuth) return;

//     try {
//       await apiClearCart();
//       await get().loadCart(true);
//     } catch (error) {
//       set({
//         cartItems: prevCart,
//         cartTotal: calcLocalTotal(prevCart),
//         errLoadingCart: error?.response?.data?.message || error.message,
//       });
//     }
//   },

//   syncLocalCartWithAccount: async () => {
//     const { isAuth } = useAuthStore.getState();

//     if (!isAuth) return;

//     const localCart = getLocalCart();

//     if (!localCart.length) {
//       await get().loadCart(true);
//       return;
//     }

//     try {
//       set({
//         errLoadingCart: null,
//       });

//       for (const item of localCart) {
//         const product_slug = item.product_slug || item.product?.slug;
//         const quantity = Number(item.quantity || 1);

//         if (!product_slug) continue;

//         await apiAddToCart({
//           product_slug,
//           quantity,
//         });
//       }

//       localStorage.removeItem("cart");

//       await get().loadCart(true);
//     } catch (error) {
//       set({
//         errLoadingCart: error?.response?.data?.message || error.message,
//       });

//       console.error("Ошибка синхронизации корзины:", error);
//     }
//   },
// }));


import {
  apiGetCart,
  apiAddToCart,
  apiChangeCountCart,
  apiClearCart,
  apiDeleteFromCart,
} from "../api/api.cart.js";

import { create } from "zustand";

const isLoggedIn = () => {
  return Boolean(localStorage.getItem("token"));
};

const getLocalCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
};

const getItemSlug = (item) => {
  return item?.product_slug || item?.product?.slug;
};

const getItemId = (item) => {
  return item?.id || item?.product_id || item?.product?.id || item?.product_slug;
};

const calcLocalTotal = (items) => {
  return {
    items,
    items_quantity: items.reduce((sum, item) => {
      return sum + Number(item.quantity || 0);
    }, 0),

    subtotal: items.reduce((sum, item) => {
      const price = Number(
        item.product?.final_price ??
        item.product?.price ??
        item.final_price ??
        item.price ??
        0
      );

      return sum + price * Number(item.quantity || 1);
    }, 0),
  };
};

export const useCart = create((set, get) => ({
  cartItems: getLocalCart(),
  cartTotal: calcLocalTotal(getLocalCart()),

  cartLoaded: false,

  loadingCart: false,
  errLoadingCart: null,
  errLoadingCartTotal: null,

  loadCart: async (force = false) => {
    const { loadingCart, cartLoaded } = get();

    if (loadingCart) return;

    const token = isLoggedIn();

    if (!token) {
      const localCart = getLocalCart();

      set({
        cartItems: localCart,
        cartTotal: calcLocalTotal(localCart),
        cartLoaded: true,
        loadingCart: false,
        errLoadingCart: null,
        errLoadingCartTotal: null,
      });

      return;
    }

    if (!force && cartLoaded) return;

    try {
      set({
        loadingCart: true,
        errLoadingCart: null,
        errLoadingCartTotal: null,
      });

      const res = await apiGetCart();

      const cart = res?.data?.cart || {};
      const items = cart?.items || [];

      set({
        cartItems: items,
        cartTotal: cart,
        cartLoaded: true,
      });
    } catch (error) {
      set({
        errLoadingCart:
          error?.response?.data?.message || error.message,

        errLoadingCartTotal:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingCart: false,
      });
    }
  },

  addToCart: async (data) => {
    const token = isLoggedIn();

    const quantity = Number(data.quantity || 1);
    const product_slug = data.product_slug || data.product?.slug;

    if (!product_slug) {
      set({
        errLoadingCart: "Не найден product_slug для добавления в корзину",
      });

      return;
    }

    if (token) {
      try {
        set({
          errLoadingCart: null,
        });

        await apiAddToCart({
          product_slug,
          quantity,
        });

        await get().loadCart(true);
      } catch (error) {
        set({
          errLoadingCart:
            error?.response?.data?.message || error.message,
        });
      }

      return;
    }

    const prevCart = getLocalCart();

    const existingItem = prevCart.find((item) => {
      return getItemSlug(item) === product_slug;
    });

    let updatedCart;

    if (existingItem) {
      updatedCart = prevCart.map((item) => {
        if (getItemSlug(item) === product_slug) {
          return {
            ...item,
            quantity: Number(item.quantity || 0) + quantity,
          };
        }

        return item;
      });
    } else {
      updatedCart = [
        ...prevCart,
        {
          ...data,
          id: data.id || data.product?.id || product_slug,
          product_slug,
          quantity,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    set({
      cartItems: updatedCart,
      cartTotal: calcLocalTotal(updatedCart),
      cartLoaded: true,
      errLoadingCart: null,
    });
  },

  changeCount: async (id, quantity) => {
    const token = isLoggedIn();

    const nextQuantity = Number(quantity);

    if (nextQuantity <= 0) {
      await get().removeFromCart(id);
      return;
    }

    if (token) {
      try {
        set({
          errLoadingCart: null,
        });

        await apiChangeCountCart(id, nextQuantity);

        await get().loadCart(true);
      } catch (error) {
        set({
          errLoadingCart:
            error?.response?.data?.message || error.message,
        });
      }

      return;
    }

    const prevCart = getLocalCart();

    const updatedCart = prevCart.map((item) => {
      if (
        item.id === id ||
        item.product_slug === id ||
        item.product?.slug === id ||
        item.product?.id === id
      ) {
        return {
          ...item,
          quantity: nextQuantity,
        };
      }

      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    set({
      cartItems: updatedCart,
      cartTotal: calcLocalTotal(updatedCart),
      cartLoaded: true,
      errLoadingCart: null,
    });
  },

  removeFromCart: async (id) => {
    const token = isLoggedIn();

    if (token) {
      try {
        set({
          errLoadingCart: null,
        });

        await apiDeleteFromCart(id);

        await get().loadCart(true);
      } catch (error) {
        set({
          errLoadingCart:
            error?.response?.data?.message || error.message,
        });
      }

      return;
    }

    const prevCart = getLocalCart();

    const updatedCart = prevCart.filter((item) => {
      return (
        item.id !== id &&
        item.product_slug !== id &&
        item.product?.slug !== id &&
        item.product?.id !== id
      );
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    set({
      cartItems: updatedCart,
      cartTotal: calcLocalTotal(updatedCart),
      cartLoaded: true,
      errLoadingCart: null,
    });
  },

  clearCart: async () => {
    const token = isLoggedIn();

    const prevCart = get().cartItems;

    set({
      cartItems: [],
      cartTotal: calcLocalTotal([]),
      cartLoaded: true,
      errLoadingCart: null,
    });

    localStorage.removeItem("cart");

    if (!token) return;

    try {
      await apiClearCart();

      await get().loadCart(true);
    } catch (error) {
      set({
        cartItems: prevCart,
        cartTotal: calcLocalTotal(prevCart),
        errLoadingCart:
          error?.response?.data?.message || error.message,
      });
    }
  },

  syncLocalCartWithAccount: async () => {
    const token = isLoggedIn();

    if (!token) return;

    const localCart = getLocalCart();

    if (!localCart.length) {
      await get().loadCart(true);
      return;
    }

    try {
      set({
        loadingCart: true,
        errLoadingCart: null,
      });

      for (const item of localCart) {
        const product_slug = item.product_slug || item.product?.slug;
        const quantity = Number(item.quantity || 1);

        if (!product_slug) continue;

        await apiAddToCart({
          product_slug,
          quantity,
        });
      }

      localStorage.removeItem("cart");

      await get().loadCart(true);
    } catch (error) {
      set({
        errLoadingCart:
          error?.response?.data?.message || error.message,
      });

      console.error("Ошибка синхронизации корзины:", error);
    } finally {
      set({
        loadingCart: false,
      });
    }
  },
}));