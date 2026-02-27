import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo/Title */}
        <h1 className="text-3xl font-light text-black mb-8 text-center tracking-wide">
          الدخول الى لوحة التحكم
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-0 py-2 bg-transparent border-b border-gray-300 
                     text-black placeholder-gray-400 focus:outline-none 
                     focus:border-black transition-colors"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-0 py-2 bg-transparent border-b border-gray-300 
                     text-black placeholder-gray-400 focus:outline-none 
                     focus:border-black transition-colors"
            required
          />

          <button
            type="submit"
            className="cursor-pointer w-full py-3 bg-black text-white  
                      text-sm tracking-wider"
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
