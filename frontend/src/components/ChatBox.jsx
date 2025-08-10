import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { MessageItem } from "./MessageItem";
import { fetchHistory } from "../services/api";

export const ChatBox = () => {
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const endRef = useRef(null);

  // ── Extract username from the JWT ──
  useEffect(() => {
    const token = localStorage.getItem(import.meta.env.VITE_JWT_KEY);
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username ?? payload.id);
    } catch (e) {
      console.error("Bad token", e);
    }
  }, []);

  // ── Load historic messages once ──
  useEffect(() => {
    (async () => {
      try {
        const hist = await fetchHistory(100);
        setMessages(hist);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // ── Listen for live messages ──
  useEffect(() => {
    if (!socket) return;
    const handler = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on("chatMessage", handler);
    return () => socket.off("chatMessage", handler);
  }, [socket]);

  // ── Auto‑scroll to latest ──
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [
    messages,
  ]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    socket.emit("chatMessage", input.trim(), (ack) => {
      if (ack?.status !== "ok") console.error("Send error:", ack?.message);
    });
    setInput("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border-l border-r border-gray-200">
      {/* Header */}
      <header className="bg-primary text-white p-4 text-center">
        <h1 className="text-lg font-semibold">
          MERN Chat – {username || "…"}
        </h1>
      </header>

      {/* Message list */}
      <section className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
        {messages.map((msg) => (
          <MessageItem
            key={msg._id}
            message={msg}
            isOwn={
              msg.sender?.username === username ||
              msg.sender === username
            }
          />
        ))}
        <div ref={endRef} />
      </section>

      {/* Input area */}
      <footer className="p-4 border-t bg-gray-50 flex space-x-2">
        <input
          type="text"
          placeholder="Write a message…"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          onClick={sendMessage}
        >
          Send
        </button>
      </footer>
    </div>
  );
};