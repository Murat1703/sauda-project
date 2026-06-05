import { create } from "zustand";
import { apiGetOrders, apiPostOrder } from "../api/api.orders.js";



export const useOrdersStore = create((set, get) => ({
  orders: [],

  loadingOrders: true,

  errLoadingOrders: null,

  loadOrders: async () => {
    const { orders, loadingOrders } = get();
    if (!loadingOrders) return;
    if (orders.length > 0) return;

    try {
      set({
        loadingOrders: true,
        errLoadingOrders: null,
      });

      const res = await apiGetOrders();

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

  addOrder: async (data) => {

    const prevOrders = get().orders || [];

    set({
      loadingOrders: true,
      errLoadingOrders: null,
    });

    try {
      await apiPostOrder(data);
      await get().loadOrders(true)
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

//   loadProduct: async (slug) =>{

//     const { product } = get();

//     if (!slug) return;
//     if (product?.product?.slug === slug){
//         set({loadingProduct: false});
//         return
//     };


//     try {
//       set({
//         loadingProduct: true,
//         errLoadingProduct: null,
//         product: null
//       });

//       const res = await apiProduct(slug);

//       set({
//         product: res.data || {},
//       });
//     } catch (error) {
//       set({
//         errLoadingProduct:
//           error?.response?.data?.message || error.message,
//       });
//     } finally {
//       set({
//         loadingProduct: false,
//       });
//     }
//   },

//   loadProductsBySlugs: async (slugs) =>{

//     const { productsBySlugs, loadingProductsBySlugs, loadedProductsBySlug } = get();

//     if (loadingProductsBySlugs) return;
//     if (loadedProductsBySlug) return;
//     if (productsBySlugs.length > 0) return

//     try {
//       set({
//         loadingProductsBySlugs: true,
//         errLoadingProductsBySlugs: null,
//       });

//     const res = await Promise.all(
//         slugs.map(slug => apiProduct(slug))
//     );


//       set({
//         productsBySlugs: res || [],
//       });
//     } catch (error) {
//       set({
//         errLoadingProductsBySlugs:
//           error?.response?.data?.message || error.message,
//       });
//     } finally {
//       set({
//         loadingProductsBySlugs: false,
//       });
//     }
//   },

//   testLoadProductsBySlugs: async (slugs)=>{
//     const { testProductsBySlugs, testLoadingProductsBySlugs } = get();

//     if (testLoadingProductsBySlugs) return;

//     const missingSlugs = slugs.filter((slug) => !testProductsBySlugs[slug]);

//     if (missingSlugs.length === 0) return;

//     try {
//       set({
//         testLoadingProductsBySlugs: true,
//         errLoadingTestProductsBySlugs: null,
//       });

//       const res = await Promise.all(
//         missingSlugs.map(async (slug) => {
//           const data = await apiProduct(slug);

//           return [slug, data];
//         })
//       );

//       set((state) => ({
//         productsBySlugs: {
//           ...state.productsBySlugs,
//           ...Object.fromEntries(res),
//         },
//       }));
//     } catch (error) {
//       set({
//         errLoadingTestProductsBySlugs:
//           error?.response?.data?.message || error.message,
//       });
//     } finally {
//       set({
//         testLoadingProductsBySlugs: false,
//       });
//     }

//   }

  
}));