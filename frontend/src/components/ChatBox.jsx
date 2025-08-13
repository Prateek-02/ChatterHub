import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { fetchHistory } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export const ChatBox = ({ selectedContact }) => {
  const { socket } = useContext(SocketContext);
  const { user } = useAuth(); // ✅ Use the same useAuth hook as Home.jsx
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const endRef = useRef(null);
  const typingTimeouts = useRef({});

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
    if (!socket || !selectedContact || !socket.userId || !user?.username) return;

    const messageHandler = (msg) => {
      if (
        (msg.sender._id === selectedContact._id && msg.receiverId === socket.userId) ||
        (msg.sender._id === socket.userId && msg.receiverId === selectedContact._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const typingHandler = (user) => {
      if (user === user?.username) return;

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
  }, [socket, user?.username, selectedContact]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socket || !socket.userId || !selectedContact || !user?.username) return;

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
          sender: { _id: socket.userId, username: user.username }, // ✅ Use user.username from useAuth
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
      socket?.emit("typing", user?.username); // ✅ Use user.username from useAuth
    }
  };

  if (!socket || !socket.userId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Connecting to chat...</p>
        </div>
      </div>
    );
  }

  if (!selectedContact) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">Select a contact to chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm">
      {/* Messages Container */}
      <div className="flex-1 overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Messages */}
        <div className="h-full overflow-y-auto px-6 py-4 space-y-4 relative z-10 scroll-smooth">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">👋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Start your conversation</h3>
              <p className="text-gray-500">Say hello to {selectedContact.username}!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwn = msg.sender._id === socket.userId;
              return (
                <div
                  key={msg._id}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"} animate-fadeIn`}
                >
                  <div className={`flex ${isOwn ? "flex-row-reverse" : "flex-row"} items-end space-x-2 max-w-xs lg:max-w-md`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                      isOwn 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 ml-2" 
                        : "bg-gradient-to-r from-green-500 to-teal-600 mr-2"
                    }`}>
                      {/* ✅ Use user.username for own messages, selectedContact.username for others */}
                      {(isOwn ? user?.username : selectedContact.username)?.[0]?.toUpperCase()}
                    </div>
                    
                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-md max-w-full break-words transition-all duration-200 hover:shadow-lg ${
                        isOwn
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className="px-6 py-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {selectedContact.username?.[0]?.toUpperCase()}
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">
                {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing
              </span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={`Message ${selectedContact.username}...`}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 text-gray-800 placeholder-gray-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyPress}
              autoComplete="off"
            />
            {input.trim() && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          <button
            className={`p-3 rounded-2xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
              input.trim()
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            onClick={sendMessage}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};