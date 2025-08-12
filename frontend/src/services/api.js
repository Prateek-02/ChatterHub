export const fetchHistory = async (recipientId) => {
  const token = localStorage.getItem(import.meta.env.VITE_JWT_KEY);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/messages/${recipientId}`, // ✅ correct route
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    let errMsg = "Failed to load messages";
    try {
      const err = await res.json();
      errMsg = err.message || errMsg;
    } catch {
      // response was not JSON
    }
    throw new Error(errMsg);
  }

  return res.json(); // ✅ returns array of messages
};
