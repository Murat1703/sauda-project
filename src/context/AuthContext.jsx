import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiMe, apiLogout } from '../api/auth.api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const isAuth = Boolean(user);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setIsAuthLoading(false);
      return;
    }
    try {
      setIsAuthLoading(true);
      const res = await apiMe();  
      if (res.data?.message === 'Не вошли в систему') {
        setUser(null);
        return;
      }
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const loginUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isAuthLoading,
        setUser,
        loginUser,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }

  return context;
};