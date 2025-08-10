import { ChatBox } from "../components/ChatBox";
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
  const { logout } = useAuth();

  return (
    <>
      <div className="flex justify-end p-2 bg-gray-100">
        <button
          onClick={logout}
          className="text-sm text-primary underline"
        >
          Log out
        </button>
      </div>

      <ChatBox />
    </>
  );
};