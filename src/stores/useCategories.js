import { apiCategories, apiCategoriesTree, apiGetCategoryItem } from "../api/categories.api.js";
import { create } from "zustand";



export const useCategories = create((set, get) => ({
  categories: [],
  categoriesTree: [],
  categoryItem: {},

  loadingCategories: false,
  loadingCategoriesTree: false,
  loadingCategoryItem: false,

  errLoadingCategories: null,
  errLoadingCategoriesTree: null,
  errLoadingCategoryItem: null,

  loadCategories: async () => {
    try {
      set({
        loadingCategories: true,
        errLoadingCategories: null,
      });

      const res = await apiCategories();

      set({
        categories: res?.data.categories || [],
      });
    } catch (error) {
      set({
        errLoadingCategories:
          error?.response?.data?.message || error.message,
      });

      console.error("Failed to load categories:", error);
    } finally {
      set({
        loadingCategories: false,
      });
    }
  },

  loadCategoriesTree: async () => {
    try {
      set({
        loadingCategoriesTree: true,
        errLoadingCategoriesTree: null,
      });

      const res = await apiCategoriesTree();

      set({
        categoriesTree: res?.data.tree || [],
      });
    } catch (error) {
      set({
        errLoadingCategoriesTree:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingCategoriesTree: false,
      });
    }
  },

  loadCategoryItem: async (slug) =>{
    try {
      set({
        loadingCategoryItem: true,
        errLoadingCategoryItem: null,
      });

      const res = await apiGetCategoryItem(slug);

      set({
        categoryItem: res?.data || {},
      });
    } catch (error) {
      set({
        errLoadingCategoryItem:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingCategoryItem: false,
      });
    }
  },

  
}));