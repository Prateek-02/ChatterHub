// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  FaUser,
  FaLock,
  FaRobot,
  FaBrain,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Parallax mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-[#1f1c2c] via-[#928DAB] to-[#1f1c2c]">
      {/* Floating Icons with Mouse Parallax */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <FaRobot className="absolute top-10 left-10 text-6xl text-pink-400 animate-geometric-float" />
        <FaBrain className="absolute bottom-16 right-16 text-7xl text-blue-400 animate-geometric-float" />
        <FaLightbulb className="absolute top-1/3 right-20 text-5xl text-yellow-300 animate-geometric-float" />
        <FaRocket className="absolute bottom-1/4 left-1/4 text-5xl text-green-300 animate-geometric-float" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-in-left">
          <div className="relative inline-flex items-center justify-center mb-6 animate-fade-in-delay">
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-lg opacity-60 animate-network-pulse"></div>
            <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center">
              <FaUser className="text-2xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-3 tracking-tight drop-shadow-lg animate-fade-in-delay-2">
            Welcome Back
          </h1>
          <p className="text-purple-100 text-lg animate-fade-in-delay-3">
            Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden animate-slide-in-right">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl"></div>
          <div className="relative space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="animate-fade-in">
                <label className="text-sm font-medium text-white/90 block mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-purple-300" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm placeholder-purple-200/50 text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 group-hover:shadow-lg"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div className="animate-fade-in-delay">
                <label className="text-sm font-medium text-white/90 block mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-purple-300" />
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm placeholder-purple-200/50 text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 group-hover:shadow-lg"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-xl flex items-center space-x-2 backdrop-blur-sm animate-fade-in-delay-2">
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 shadow-lg overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></span>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Register */}
            <p className="text-purple-200/80 text-center mt-6 animate-fade-in-delay-3">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-300 hover:text-white font-medium hover:underline transition-colors duration-200"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
