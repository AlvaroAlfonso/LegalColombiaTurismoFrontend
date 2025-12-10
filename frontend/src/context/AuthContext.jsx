import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api';

const AuthContext = createContext(null);

const LOCAL_TOKEN_KEY = 'auth_token';
const LOCAL_USER_KEY = 'auth_user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(LOCAL_TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(LOCAL_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = !!token;
  const role = user?.role || user?.rol || null;

  const persistSession = (nextToken, nextUser) => {
    if (nextToken) {
      localStorage.setItem(LOCAL_TOKEN_KEY, nextToken);
      setToken(nextToken);
    }
    if (nextUser) {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    }
  };

  const clearSession = () => {
    localStorage.removeItem(LOCAL_TOKEN_KEY);
    localStorage.removeItem(LOCAL_USER_KEY);
    setToken(null);
    setUser(null);
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authApi.login(credentials);
      persistSession(data.token, data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authApi.register(formData);
      // Algunos backends devuelven token al registrar.
      if (data.token) {
        persistSession(data.token, data.user);
      }
      return data;
    } catch (err) {
      setError(err.response?.data || 'Error al registrarse');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (!token) return null;
    try {
      const { data } = await authApi.getProfile();
      persistSession(token, data);
      return data;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    // Al montar, opcionalmente refrescamos el perfil si hay token
    if (token && !user) {
      refreshProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      role,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      refreshProfile,
      logout: clearSession,
    }),
    [token, user, role, isAuthenticated, loading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

