import { apiGetMyReviews, apiGetReviews, apiPostReviews } from "../api/api.reviews";
import { create } from "zustand";


export const useReviewsStore = create((set, get) => ({
  reviewsList: [],
  reviewItem: {},
  accountReviews: null,

  loadingReviewsList: true,
  loadingReviewItem: true,
  loadingAccountReviews: null,

  errLoadingReviewsList: null,
  errLoadingReviewItem: null,
  errLoadingAccountReviews: null,

  loadReviews: async (slug) => {
    const { reviewsList, loadingReviews } = get();
    if (loadingReviews) return;
    if (reviewsList?.data?.length > 0) return;

    try {
      set({
        loadingReviews: true,
        errLoadingReviewsList: null,
      });

      const res = await apiGetReviews(slug);

      set({
        reviewsList: res?.data || [] ,
      });
    } catch (error) {
      set({
        errLoadingReviewsList:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingReviews: false,
      });
    }
  },

  loadAccountReviews: async()=>{
    const { accountReviews, loadingAccountReviews } = get();
    if (loadingAccountReviews) return;
    if (accountReviews?.data?.length > 0) return;

    try {
      set({
        loadingAccountReviews: true,
        errLoadingAccountReviews: null,
      });

      const res = await apiGetMyReviews();

      set({
        accountReviews: res?.data || [] ,
      });
    } catch (error) {
      set({
        errLoadingAccountReviews:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingAccountReviews: false,
      });
    }
  },

  // loadReviewItem: async (reviewId) => {
  //   const { reviewItem } = get();

  //   if (!reviewId) return;

  //   // if (String(orderItem?.order?.number) === String(orderId)) {
  //   //   return;
  //   // }

  //   try {
  //     set({
  //       loadingReviewItem: true,
  //       errLoadingReviewItem: null,
  //       reviewItem: null,
  //     });

  //     const res = await apiGetReviewItem(reviewItem);

  //     set({
  //       orderItem: res?.data || null,
  //     });
  //   } catch (error) {
  //     set({
  //       orderItem: null,
  //       errLoadingOrderItem:
  //         error?.response?.data?.message || error.message,
  //     });
  //   } finally {
  //     set({
  //       loadingOrderItem: false,
  //     });
  //   }
  // },

  addReview: async (slug,data) => {

    const prevReviews = get().reviewsList || [];

    set({
      loadingReviews: true,
      errLoadingReviewsList: null,
    });

    try {
      await apiPostReviews(slug, data);
      await get().loadReviews(true)
    } catch (error) {
      set({
        reviewsList: prevReviews,
        errLoadingReviewsList: error?.response?.data?.message 
        || error.message,
      });
    }
    finally {
      set({loadingReviews: false})
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