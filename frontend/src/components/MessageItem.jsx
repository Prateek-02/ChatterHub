export const MessageItem = ({ message, isOwn }) => {
  // `sender` may be an object (populated) or just a string
  const senderName =
    typeof message.sender === "object"
      ? message.sender.username
      : message.sender;

  return (
    <div
      className={`flex flex-col p-3 rounded-lg mb-2 max-w-xs ${
        isOwn
          ? "bg-primary text-white self-end"
          : "bg-secondary text-black self-start"
      }`}
    >
      <span className="font-semibold">{senderName}</span>
      <p className="mt-1 break-words">{message.content}</p>
      <time className="text-xs opacity-70 mt-1 self-end">
        {new Date(message.createdAt).toLocaleTimeString()}
      </time>
    </div>
  );
};