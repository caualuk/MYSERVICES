"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
        try {
            const token = localStorage.getItem("token");

            if(!token) return;

            const res = await fetch("http://localhost:8000/api/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    }

    fetchUser();
  }, []);

  if(!user) {
    return <div>Carregando...</div>;
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  const firstName = user.name.split(" ")[0];

  return (
    <div className="w-full max-w-sm bg-[#f5f6fa] rounded-3xl p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-600 font-medium">Resumo</h2>
        <button className="text-gray-400 text-xl">⋮</button>
      </div>

      {/* Avatar + Progress */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-28 h-28">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-[10px] border-gray-200"></div>

          {/* Progress circle */}
          <div
            className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-indigo-500 border-r-indigo-500 rotate-[45deg]"
            style={{
              clipPath: "circle(50%)",
            }}
          ></div>

          {/* Avatar */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {getInitials(user.name)}
            </span>
          </div>

          {/* Percentage badge */}
          <div className="absolute -top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
            59%
          </div>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          Bom dia, {firstName}!
        </h3>
        <p className="text-sm text-gray-500 text-center mt-1">
          Utilize o MyServices para contratar serviços.
        </p>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
        <p className="text-sm text-gray-500 mb-4">Matches na última semana</p>

        <div className="flex items-end justify-between h-28 gap-3">
          {[
            { day: "Seg", value: "40%" },
            { day: "Ter", value: "75%" },
            { day: "Qua", value: "70%" },
            { day: "Qui", value: "90%" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              <div
                className="w-8 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-xl"
                style={{ height: item.value }}
              ></div>
              <span className="text-xs text-gray-400 mt-2">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xl font-bold text-gray-800">+1.3k</p>
          <p className="text-xs text-gray-500 mt-1">
            Matches Realizados <br /> em Abril
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xl font-bold text-gray-800">320</p>
          <p className="text-xs text-gray-500 mt-1">
            Contratações <br /> No Mês
          </p>
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-gray-700 text-sm mb-3">Nos conte sua experiência</p>

        <div className="bg-white rounded-full px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex gap-1 text-yellow-400 text-lg">
            ⭐ ⭐ ⭐ ⭐ ☆
          </div>
        </div>

        <button className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:opacity-90 transition">
          Enviar
        </button>
      </div>
    </div>
  );
}
