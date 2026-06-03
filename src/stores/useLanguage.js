import { create } from "zustand";

export const useLanguage = create((set, get) => ({
  lang: localStorage.getItem("lang") || 'ru',

  setLang: (lang) => {
    localStorage.setItem("lang", lang);
    set({ lang });
  },
  
}));