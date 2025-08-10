export const fetchHistory = async (limit = 50) => {
  const token = localStorage.getItem(import.meta.env.VITE_JWT_KEY);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/messages?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to load messages");
  }

  return res.json(); // array of messages
};