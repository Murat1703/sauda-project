import { useState, useCallback } from "react";
import { apiCategories, apiCategoriesTree } from "../api/categories.api.js";
import { create } from "zustand";

// export const useCategories = () =>{
//     const [categories, setCategories] = useState([]);
//     const [loadingCategories, setLoadingCategories] = useState(false);
//     const [errLoadingCategories, setErrLoadingCategories] = useState(null)
    
//     const loadCategories = useCallback(async () => {
//         try {
//             setLoadingCategories(true);
//             const res = await apiCategories();
//             setCategories(res?.data || []);
//         } catch (error) {
//             setErrLoadingCategories(error?.response.message)
//             console.error("Failed to load orders:", error);
//             throw error;
//         } finally {
//             setLoadingCategories(false);
//         }
//     }, []);

    
//     const [categoriesTree, setCategoriesTree] = useState([]);
//     const [loadingCategoriesTree, setLoadingCategoriesTree]= useState(false);
//     const [errLoadingCategoriesTree, setErrLoadingCategoriesTree] = useState(null)

//     const loadCategoriesTree = useCallback(async () => {
//         try {
//             setLoadingCategoriesTree(true);
//             const res = await apiCategoriesTree();
//             setCategoriesTree(res?.data || []);
//         } catch (error) {
//             setErrLoadingCategoriesTree(error?.response.message)
//             console.error("Failed to load orders:", error);
//             throw error;
//         } finally {
//             setLoadingCategoriesTree(false);
//         }
//     }, []);


//     return{
//         categories,
//         loadingCategories,
//         errLoadingCategories,
//         loadCategories,

//         categoriesTree,
//         loadingCategoriesTree,
//         errLoadingCategoriesTree,
//         loadCategoriesTree
//     }


// }

export const useCategories = create((set, get) => ({
  categories: [],
  categoriesTree: [],

  loadingCategories: false,
  loadingCategoriesTree: false,

  errLoadingCategories: null,
  errLoadingCategoriesTree: null,

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

      console.error("Failed to load categories tree:", error);
    } finally {
      set({
        loadingCategoriesTree: false,
      });
    }
  },
}));