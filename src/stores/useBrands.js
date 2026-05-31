import { apiBrands } from "../api/api.brands.js";
import { create } from "zustand";

export const useBrands = create((set, get) => ({
  brands: [],

  loadingBrands: false,

  errLoadingBrands: null,

  loadBrands: async () => {
    const { brands, loadingBrands } = get();

    if (loadingBrands) return;
    if (brands.length > 0) return

    try {
      set({
        loadingBrands: true,
        errLoadingBrands: null,
      });

      const res = await apiBrands();

      set({
        brands: res?.data?.brands || [],
      });
    } catch (error) {
      set({
        errLoadingBrands:
          error?.response?.data?.message || error.message,
      });

      console.error("Failed to load brands:", error);
    } finally {
      set({
        loadingBrands: false,
      });
    }
  },

  
}));