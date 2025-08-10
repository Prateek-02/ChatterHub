import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.username, form.password);
      navigate("/");
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl mb-4 text-center font-semibold">
          Register
        </h2>

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
          disabled={loading}
          className="w-full bg-primary text-white py-1 rounded hover:bg-primary/90"
        >
          {loading ? "Creating…" : "Register"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};