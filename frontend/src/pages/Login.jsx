import React, { useState, useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading, admin } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    if (admin) {
      navigate("/dashboard", { replace: true });
    }
  }, [admin, navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-light text-black mb-8 text-center tracking-wide">
          الدخول الى لوحة التحكم
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-0 py-2 bg-transparent border-b border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-0 py-2 bg-transparent border-b border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-3 bg-black text-white text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جارٍ الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
