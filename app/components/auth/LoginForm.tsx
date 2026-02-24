"use client";

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro no login");
        return;
      }

      localStorage.setItem("token", data.token);

      alert("Login realizado!");

      window.location.href = "/home";
      console.log(response);
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label className="text-sm text-gray-600">Email:</label>
        <input
          type="email"
          placeholder="nome@usuario.com.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Senha:</label>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="nome@123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-transparent p-0 outline-none focus:outline-none"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg font-medium"
      >
        Entrar
      </button>
    </form>
  );
}
