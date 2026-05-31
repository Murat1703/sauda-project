import { create } from 'zustand';

export const useFavorites = create((set, get) => ({
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],

  toggleFavorites: (productSlug) => {
    const current = get().favorites;

    const updated = current.includes(productSlug)
      ? current.filter((slug) => slug !== productSlug)
      : [...current, productSlug];

    localStorage.setItem(
      'favorites',
      JSON.stringify(updated)
    );

    set({ favorites: updated });
  },
}));