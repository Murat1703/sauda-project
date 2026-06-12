import { apiCategories, apiCategoriesTree, apiGetCategoryItem } from "../api/categories.api.js";
import { create } from "zustand";

export const useCategories = create((set, get) => ({
  categories: [],
  categoriesTree: [],
  categoryItem: {},
  categoriesLocale: null,


  loadingCategories: false,
  loadingCategoriesTree: false,
  loadingCategoryItem: false,

  errLoadingCategories: null,
  errLoadingCategoriesTree: null,
  errLoadingCategoryItem: null,

  loadCategories: async (params = {}) => {
    const { loadingCategories, categoriesLocale } = get();

    if (loadingCategories) return;
    const locale = params?.locale;

    if (categoriesLocale === locale) return;

    try {
      set({
        loadingCategories: true,
        errLoadingCategories: null,
      });

      const res = await apiCategories(params);

      set({
        categories: res?.data.categories || [],
        categoriesLocale: locale,
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

  loadCategoriesTree: async (params = {}) => {
    const { categoriesTree, loadingCategoriesTree, categoriesTreeLocale } = get();

    if (loadingCategoriesTree) return;
    if (categoriesTree.length > 0) return
    const locale = params?.locale;

    if (categoriesTreeLocale === locale) return;

    try {
      set({
        loadingCategoriesTree: true,
        errLoadingCategoriesTree: null,
      });

      const res = await apiCategoriesTree(params);

      set({
        categoriesTree: res?.data.tree || [],
        categoriesTreeLocale: locale
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

  loadCategoryItem: async (slug, params = {}) =>{
    if (!slug) return;
    const { categoryItem, loadingCategoryItem, categoryItemLocale } = get();


      const locale = params?.locale || 'ru';
      const currentSlug = categoryItem?.category?.slug;
      if (loadingCategoryItem) return;


      if (currentSlug === slug && categoryItemLocale === locale) return;

    // const locale = params?.locale;

    // if (categoryItemLocale === locale) return;

    try {
      set({
        loadingCategoryItem: true,
        errLoadingCategoryItem: null,
      });

      const res = await apiGetCategoryItem(slug, params);

      set({
        categoryItem: res?.data || {},
        categoryItemLocale: locale
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