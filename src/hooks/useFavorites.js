import { create } from 'zustand';

export const useFavorites = create((set, get) => ({
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],

  toggleFavorites: (productId) => {
    const current = get().favorites;

    const updated = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];

    localStorage.setItem(
      'favorites',
      JSON.stringify(updated)
    );

    set({ favorites: updated });
  },
}));