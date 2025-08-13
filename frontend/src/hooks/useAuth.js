// frontend/src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";

export const useAuth = () => {
  const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem(import.meta.env.VITE_JWT_KEY, token);
  };

  const getToken = () => localStorage.getItem(import.meta.env.VITE_JWT_KEY);

  const fetchUser = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const { data } = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    }
  }, [api]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      storeToken(data.token);
      await fetchUser(); // ✅ fetch user profile right after login
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      storeToken(data.token);
      await fetchUser(); // ✅ fetch user profile right after register
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(import.meta.env.VITE_JWT_KEY);
    setUser(null);
    window.location.reload();
  };

  // ✅ Fetch user on first load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { login, register, logout, getToken, loading, error, user };
};
