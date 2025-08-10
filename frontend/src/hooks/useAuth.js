import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem(import.meta.env.VITE_JWT_KEY, token);
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      storeToken(data.token);
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
    window.location.reload(); // clears socket auth
  };

  const getToken = () => localStorage.getItem(import.meta.env.VITE_JWT_KEY);

  return { login, register, logout, getToken, loading, error };
};
