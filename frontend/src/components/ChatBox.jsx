import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { fetchHistory } from "../services/api";

export const ChatBox = ({ selectedContact }) => {
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const endRef = useRef(null);
  const typingTimeouts = useRef({});

  // Extract username from JWT on mount
  useEffect(() => {
    const token = localStorage.getItem(import.meta.env.VITE_JWT_KEY);
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const name = payload.username ?? payload.id;
      setUsername(name);
    } catch (e) {
      console.error("Bad token", e);
    }
  }, []);

  // Load chat history when selected contact changes
  useEffect(() => {
    if (!selectedContact) {
      setMessages([]);
      return;
    }
    (async () => {
      try {
        const hist = await fetchHistory(selectedContact._id);
        setMessages(hist);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [selectedContact]);

  // Listen for incoming messages and typing events
  useEffect(() => {
    if (!socket || !selectedContact || !socket.userId) return;

    const messageHandler = (msg) => {
      if (
        (msg.sender._id === selectedContact._id && msg.receiverId === socket.userId) ||
        (msg.sender._id === socket.userId && msg.receiverId === selectedContact._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const typingHandler = (user) => {
      if (user === username) return;

      setTypingUsers((prev) => (prev.includes(user) ? prev : [...prev, user]));

      if (typingTimeouts.current[user]) {
        clearTimeout(typingTimeouts.current[user]);
      }

      typingTimeouts.current[user] = setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== user));
        delete typingTimeouts.current[user];
      }, 2000);
    };

    socket.on("chatMessage", messageHandler);
    socket.on("userTyping", typingHandler);

    return () => {
      socket.off("chatMessage", messageHandler);
      socket.off("userTyping", typingHandler);
      Object.values(typingTimeouts.current).forEach(clearTimeout);
      typingTimeouts.current = {};
    };
  }, [socket, username, selectedContact]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socket || !socket.userId || !selectedContact) return;

    const messageText = input.trim();

    socket.emit(
      "chatMessage",
      {
        receiverId: selectedContact._id,
        text: messageText,
      },
      (ack) => {
        if (ack?.status !== "ok") {
          console.error("Send error:", ack?.message);
          return;
        }
        const newMsg = {
          _id: Date.now().toString(),
          sender: { _id: socket.userId, username },
          recipient: { _id: selectedContact._id, username: selectedContact.username },
          text: messageText,
        };
        setMessages((prev) => [...prev, newMsg]);
      }
    );

    setInput("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    } else {
      socket?.emit("typing", username);
    }
  };

  if (!socket || !socket.userId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 font-semibold italic select-none">
        Connecting to chat...
      </div>
    );
  }

  if (!selectedContact) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 font-semibold italic select-none">
        Select a contact to chat
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border-l border-r border-purple-300 bg-gradient-to-b from-purple-100 via-pink-50 to-yellow-50 shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <header className="sticky top-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white p-5 shadow-md z-20 flex items-center justify-center font-extrabold tracking-wider text-xl select-none">
        {selectedContact.username}
      </header>

      {/* Messages */}
      <section className="flex-1 overflow-y-auto pt-13 px-5 space-y-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100 bg-white/80 rounded-b-lg">
        {messages.map((msg) => {
          const isOwn = msg.sender._id === socket.userId;
          return (
            <div
              key={msg._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              <div
                className={`px-5 py-3 rounded-3xl shadow-lg max-w-xs break-words relative select-text transition-colors duration-300 group ${
                  isOwn
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none hover:brightness-110"
                    : "bg-gradient-to-r from-yellow-300 to-pink-300 text-gray-900 rounded-bl-none hover:brightness-90"
                }`}
              >
                <p className="text-base">{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </section>

      {/* Typing indicator */}
      {typingUsers.length > 0 && (
        <div className="px-6 py-2 text-sm text-gray-600 italic animate-pulse bg-white/70 border-t border-purple-300 select-none">
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing…
        </div>
      )}

      {/* Input */}
      <footer className="p-4 border-t border-purple-300 bg-gradient-to-r from-purple-200 to-pink-200 flex items-center space-x-3 shadow-inner">
        <input
          type="text"
          placeholder="Type a message…"
          className="flex-1 rounded-full px-5 py-3 focus:outline-none focus:ring-4 focus:ring-pink-400 transition-shadow bg-purple-50 placeholder-purple-400 text-purple-900 font-medium"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyPress}
          autoComplete="off"
        />
        <button
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-110 active:scale-95 transition-transform select-none"
          onClick={sendMessage}
          aria-label="Send message"
        >
          ➤
        </button>
      </footer>
    </div>
  );
};
