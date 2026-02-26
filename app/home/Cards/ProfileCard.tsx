"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { CiStar } from "react-icons/ci";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type DayData = {
  day: string;
  fullDay: string;
  matches: number;
  percentage: number;
};

export default function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);
  const [rating, setRating] = useState(4); // 0-5 stars

  // Dados para todos os dias da semana (segunda a domingo)
  const weekDays: DayData[] = [
    { day: "Seg", fullDay: "Segunda", matches: 42, percentage: 40 },
    { day: "Ter", fullDay: "Terça", matches: 78, percentage: 75 },
    { day: "Qua", fullDay: "Quarta", matches: 73, percentage: 70 },
    { day: "Qui", fullDay: "Quinta", matches: 95, percentage: 90 },
    { day: "Sex", fullDay: "Sexta", matches: 88, percentage: 85 },
    { day: "Sáb", fullDay: "Sábado", matches: 63, percentage: 60 },
    { day: "Dom", fullDay: "Domingo", matches: 47, percentage: 45 },
  ];

  const totalMatches = weekDays.reduce((acc, day) => acc + day.matches, 0);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

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

  if (!user) {
    return <LoadingSpinner fullScreen={false} message="Carregando..." />;
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
    <div className="w-full bg-[#f5f6fa] rounded-3xl p-6 shadow-md flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-600 font-medium text-lg">Resumo</h2>
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="relative w-28 h-28">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-[8px] border-gray-200"></div>

          {/* Progress circle */}
          <div
            className="absolute inset-0 rounded-full border-[8px] border-transparent border-t-indigo-500 border-r-indigo-500 rotate-[45deg]"
            style={{
              clipPath: "circle(50%)",
            }}
          ></div>

          {/* Avatar */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {getInitials(user.name)}
            </span>
          </div>

          {/* Percentage badge */}
          <div className="absolute -top-1 right-1 bg-indigo-500 text-white text-sm px-1.5 py-0.5 rounded-full">
            59%
          </div>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-gray-800">
          Bom dia, {firstName}!
        </h3>
        <p className="text-sm text-gray-500 text-center mt-1">
          Utilize o MyServices para contratar serviços.
        </p>
      </div>

      {/* Chart - Torres de matches */}
      <div className="bg-white rounded-xl p-3 mb-3 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500">Matches na última semana</p>
          <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            Seg - Dom
          </span>
        </div>

        {/* Torres do gráfico */}
        <div className="flex items-end justify-between h-40 gap-2">
          {weekDays.map((item, index) => {
            // Calcular altura baseada no número de matches (máximo 95)
            const barHeight = Math.max(24, (item.matches / 95) * 100);

            return (
              <div
                key={index}
                className="flex flex-col items-center w-full group"
              >
                {/* Valor em cima da torre */}
                <span className="text-[10px] font-bold text-indigo-600 mb-1">
                  {item.matches}
                </span>

                {/* Torre */}
                <div className="relative w-full flex justify-center">
                  <div
                    className="w-6 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-t-md rounded-b-sm shadow-sm"
                    style={{ height: `${barHeight}px` }}
                  >
                    {/* Efeito de brilho no topo */}
                    <div className="w-full h-1 bg-white/30 rounded-t-md"></div>
                  </div>
                </div>

                {/* Dia da semana */}
                <span className="text-[10px] font-medium text-gray-500 mt-1">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Linha de base */}
        <div className="w-full h-px bg-gray-200 mt-2"></div>

        {/* Legenda */}
        <div className="flex justify-end mt-1">
          <span className="text-[8px] text-gray-400">
            * Número de matches por dia
          </span>
        </div>
      </div>

      {/* Stats - Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xl font-bold text-gray-800">+1.3k</p>
          <p className="text-xs text-gray-500 mt-1 leading-tight">
            Matches Realizados <br /> em Abril
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xl font-bold text-gray-800">320</p>
          <p className="text-xs text-gray-500 mt-1 leading-tight">
            Contratações <br /> No Mês
          </p>
        </div>
      </div>

      {/* Total de matches da semana */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-3 mb-3 border border-indigo-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-indigo-700 font-medium">
            Total de matches esta semana:
          </span>
          <span className="text-lg font-bold text-indigo-700">
            {totalMatches} matches
          </span>
        </div>
        <div className="w-full bg-indigo-200 h-1.5 rounded-full mt-2">
          <div
            className="bg-indigo-600 h-1.5 rounded-full"
            style={{ width: `${(totalMatches / 500) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-gray-700 text-sm mb-2">Sua avaliação:</p>

        <div className="bg-white rounded-full px-3 py-2 flex items-center justify-between shadow border border-indigo-600">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <CiStar
                  className={`w-6 h-6 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-medium text-gray-600">{rating}/5</span>
        </div>
      </div>
    </div>
  );
}
