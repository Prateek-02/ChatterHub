import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { fetchHistory } from "../services/api";

export const ChatBox = () => {
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const endRef = useRef(null);

  // Extract username from JWT
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

  // Load history
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

  // Live messages
  useEffect(() => {
    if (!socket) return;
    const handler = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on("chatMessage", handler);

    const typingHandler = (user) => {
      if (user !== username) {
        setTypingUsers((prev) => [...new Set([...prev, user])]);
        setTimeout(() => {
          setTypingUsers((prev) => prev.filter((u) => u !== user));
        }, 2000);
      }
    };
    socket.on("userTyping", typingHandler);

    return () => {
      socket.off("chatMessage", handler);
      socket.off("userTyping", typingHandler);
    };
  }, [socket, username]);

  // Auto-scroll
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
    else socket.emit("typing", username);
  };

  const reactToMessage = (msgId, emoji) => {
    alert(`Reacted to ${msgId} with ${emoji}`);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border-l border-r border-purple-300 bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white p-4 text-center shadow-lg z-10">
        <h1 className="text-lg font-bold tracking-wide drop-shadow">
          ChatterHub 💬 – {username || "…"}
        </h1>
      </header>

      {/* Messages */}
      <section className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
        {messages.map((msg) => {
          const isOwn =
            msg.sender?.username === username || msg.sender === username;
          return (
            <div
              key={msg._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              <div
                className={`px-4 py-2 rounded-2xl shadow-md max-w-xs break-words transition-all relative group ${
                  isOwn
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none"
                    : "bg-gradient-to-r from-yellow-200 to-pink-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text || msg.message}</p>
                <span className="block text-[10px] mt-1 opacity-70 text-right">
                  {msg.sender?.username || msg.sender}
                </span>

                {/* Emoji reaction button */}
                <button
                  onClick={() => reactToMessage(msg._id, "❤️")}
                  className="absolute -bottom-5 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-lg"
                >
                  ❤️
                </button>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </section>

      {/* Typing indicator */}
      {typingUsers.length > 0 && (
        <div className="px-4 py-1 text-sm text-gray-600 animate-pulse">
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing…
        </div>
      )}

      {/* Input */}
      <footer className="p-3 border-t border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center space-x-2 shadow-inner">
        <input
          type="text"
          placeholder="Type a message…"
          className="flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all bg-purple-50 placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyPress}
        />
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full font-medium shadow hover:scale-105 active:scale-95 transition-transform"
          onClick={sendMessage}
        >
          ➤
        </button>
      </footer>
    </div>
  );
};
