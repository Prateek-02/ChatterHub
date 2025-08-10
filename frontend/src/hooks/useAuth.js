import axios from "axios";

export const useAuth = () => {
  const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

  const storeToken = (token) => {
    localStorage.setItem(import.meta.env.VITE_JWT_KEY, token);
  };

  const login = async (username, password) => {
    const { data } = await api.post("/auth/login", { username, password });
    storeToken(data.token);
    return data;
  };

  const register = async (username, password) => {
    const { data } = await api.post("/auth/register", { username, password });
    storeToken(data.token);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(import.meta.env.VITE_JWT_KEY);
    // reload to clear socket auth
    window.location.reload();
  };

  const getToken = () => localStorage.getItem(import.meta.env.VITE_JWT_KEY);

  return { login, register, logout, getToken };
};