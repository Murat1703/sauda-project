import { apiProducts, apiProduct } from "../api/api.products.js";
import { create } from "zustand";



export const useProducts = create((set, get) => ({
  products: [],
  product: {},
  productsBySlugs: [],

  loadingProducts: false,
  loadingProduct: false,
  loadingProductsBySlugs: false,

  errLoadingProducts: null,
  errLoadingProduct: null,
  errLoadingProductsBySlugs: null,

  loadProducts: async (params = {}) => {
    const { products, loadingProducts, loadedProducts } = get();

    if (loadingProducts) return;
    if (loadedProducts) return;
    if (products.length > 0) return;

    try {
      set({
        loadingProduct: true,
        errLoadingProduct: null,
      });

      const res = await apiProducts(params);

      set({
        products: res?.data || [],
      });
    } catch (error) {
      set({
        errLoadingProducts:
          error?.response?.data?.message || error.message,
      });

      console.error("Failed to load products:", error);
    } finally {
      set({
        loadingProducts: false,
      });
    }
  },

  loadProduct: async (slug) =>{

    const { product } = get();

    if (!slug) return;
    if (product?.product?.slug === slug) return;


    try {
      set({
        loadingProduct: true,
        errLoadingProduct: null,
        product: null
      });

      const res = await apiProduct(slug);

      set({
        product: res.data || {},
      });
    } catch (error) {
      set({
        errLoadingProduct:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingProduct: false,
      });
    }
  },

  loadProductsBySlugs: async (slugs) =>{

    const { productsBySlugs, loadingProductsBySlugs, loadedProductsBySlug } = get();

    if (loadingProductsBySlugs) return;
    if (loadedProductsBySlug) return;
    if (productsBySlugs.length > 0) return

    try {
      set({
        loadingProductsBySlugs: true,
        errLoadingProductsBySlugs: null,
      });

    const res = await Promise.all(
        slugs.map(slug => apiProduct(slug))
    );


      set({
        productsBySlugs: res || [],
      });
    } catch (error) {
      set({
        errLoadingProductsBySlugs:
          error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        loadingProductsBySlugs: false,
      });
    }
  },

  
}));