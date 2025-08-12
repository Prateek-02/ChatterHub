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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-sm flex flex-col">
        {/* Profile Section */}
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-lg">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">
                {user?.username || "My Profile"}
              </h2>
              <p className="text-xs text-gray-500">Logged in</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">
            Contacts
          </h3>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : contacts.length === 0 ? (
            <p className="text-sm text-gray-400">No other users found</p>
          ) : (
            <ul className="space-y-2">
              {contacts.map((c) => (
                <li
                  key={c._id}
                  onClick={() => setSelectedContact(c)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedContact?._id === c._id
                      ? "bg-primary/10"
                      : "hover:bg-primary/5"
                  }`}
                >
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full text-primary font-semibold">
                    {c.username[0]}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">{c.username}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <div className="px-5 py-3 border-b bg-white shadow-sm flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">
            {selectedContact ? `Chat with ${selectedContact.username}` : "Select a contact"}
          </h2>
        </div>

        <div className="flex-1 overflow-hidden bg-gray-50">
          {selectedContact ? (
            <ChatBox selectedContact={selectedContact} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
