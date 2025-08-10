import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl mb-4 text-center font-semibold">Login</h2>

        <label className="block mb-2">
          Username
          <input
            type="text"
            required
            className="w-full border rounded px-2 py-1 mt-1"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
        </label>

        <label className="block mb-4">
          Password
          <input
            type="password"
            required
            className="w-full border rounded px-2 py-1 mt-1"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </label>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-black py-2"
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <p className="mt-4 text-sm text-center">
          No account?{" "}
          <Link to="/register" className="text-primary underline hover:text-primary/80">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};