import { create } from 'zustand';
import { apiMe, apiLogout } from '../api/auth.api.js';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthLoading: true,
  authError: null,
  isAuth: false,

  setUser: (user) => {
    set({
      user,
      authError: null,
      isAuth: true,
    });
  },

  loginUser: (userData) => {
    set({
      user: userData,
      authError: null,
      isAuth: Boolean(userData),
    });
  },

  fetchUser: async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      set({
        user: null,
        isAuthLoading: false,
        authError: null,
      });
      return;
    }

    try {
      set({
        isAuthLoading: true,
        authError: null,
      });

      const res = await apiMe();

      const userData = res.data?.user ?? res.data;

      set({
        user: userData,
        authError: null,
        isAuth: Boolean(userData),
      });
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
      }

      set({
        user: null,
        authError: err?.response?.data?.message || err.message,
        isAuth: false,
      });
    } finally {
      set({
        isAuthLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem('token');

      set({
        user: null,
        authError: null,
        isAuthLoading: false,
        isAuth: false
      });
    }
  },
}));