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
    const { categories, loadingCategories } = get();

    if (loadingCategories) return;
    if (categories.length > 0) return

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
    } finally {
      set({
        loadingCategories: false,
      });
    }
  },

  loadCategoriesTree: async () => {
    const { categoriesTree, loadingCategoriesTree } = get();

    if (loadingCategoriesTree) return;
    if (categoriesTree.length > 0) return

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
    if (!slug) return;
    const { categoryItem, loadingCategoryItem } = get();

    if (loadingCategoryItem) return;
    if (categoryItem?.category?.slug === slug) return;


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