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
    if (!slug) return;

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
  
}));