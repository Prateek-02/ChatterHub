import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  const getToken = () => localStorage.getItem(import.meta.env.VITE_JWT_KEY);
  const [token, setToken] = useState(getToken());

  // Listen for token changes from other tabs/windows
  useEffect(() => {
    const onStorageChange = () => {
      setToken(getToken());
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  // Poll localStorage every 500ms to detect token changes in same tab
  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = getToken();
      if (currentToken !== token) setToken(currentToken);
    }, 500);
    return () => clearInterval(interval);
  }, [token]);

  // Connect or disconnect socket when token changes
  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
      return;
    }

    const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    const s = io(socketUrl, {
      transports: ["polling", "websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    s.on("connect", () => {
      console.log("✅ Socket connected:", s.id);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        s.userId = payload.id;
        s.username = payload.username ?? "";
      } catch {
        console.error("Failed to decode JWT token");
      }
    });

    s.on("disconnect", (reason) => {
      console.warn("🔌 Socket disconnected:", reason);
    });

    s.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    socketRef.current = s;
    setSocket(s);

    return () => {
      s.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [token]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
