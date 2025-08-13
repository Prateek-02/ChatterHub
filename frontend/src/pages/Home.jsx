// frontend/src/pages/Home.jsx
import { ChatBox } from "../components/ChatBox";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const { logout, user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem(import.meta.env.VITE_JWT_KEY);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setContacts(res.data.filter((u) => u._id !== user?._id));
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [user?._id]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-indigo-500 to-purple-600 border-r shadow-2xl flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-white/20 flex items-center justify-between bg-gradient-to-r from-pink-500/20 to-orange-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">
                {user?.username || "My Profile"}
              </h2>
              <p className="text-xs text-purple-100">Logged in</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-sm font-bold text-purple-100 uppercase mb-4 tracking-wider">
            Contacts
          </h3>
          {loading ? (
            <p className="text-sm text-purple-200">Loading...</p>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-sm text-purple-200">No other users found</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {contacts.map((c) => (
                <li
                  key={c._id}
                  onClick={() => setSelectedContact(c)}
                  className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                    selectedContact?._id === c._id
                      ? "bg-white/20 shadow-xl border border-white/30"
                      : "hover:bg-white/10 hover:shadow-lg"
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center rounded-full text-white font-bold shadow-md">
                    {c.username[0].toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-white">{c.username}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <div className="px-8 py-4 border-b bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg flex items-center justify-between">
          <h2 className="font-bold text-white text-xl">
            {selectedContact ? `Chat with ${selectedContact.username}` : "Select a contact"}
          </h2>
        </div>

        <div className="flex-1 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          {selectedContact ? (
            <ChatBox selectedContact={selectedContact} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-8 shadow-2xl">
                <span className="text-6xl">💬</span>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Start Chatting!
              </h3>
              <p className="text-gray-600 text-lg">
                Select a contact to start chatting
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};