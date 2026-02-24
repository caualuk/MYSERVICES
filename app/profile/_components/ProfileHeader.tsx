"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  profession?: string;
};

interface ProfileHeaderProps {
  name: string;
}

export default function ProfileHeader({ name }: ProfileHeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser({
            id: 0,
            name: name || "User",
            email: "",
            role: "CLIENT",
            profession: "",
          });
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:8000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser({
            id: 0,
            name: name || "User",
            email: "",
            role: "CLIENT",
            profession: "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setUser({
          id: 0,
          name: name || "User",
          email: "",
          role: "CLIENT",
          profession: "",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [name]);

  function getInitials(fullName: string) {
    return fullName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header com foto e info */}
      <div className="flex flex-col items-center text-center mb-8">
        {/* Avatar com iniciais */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center mb-6 shadow-lg border-4 border-white">
          <span className="text-5xl font-bold text-white">
            {getInitials(user.name)}
          </span>
        </div>

        {/* Nome */}
        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>

        {/* Role/Profissão */}
        <p className="text-sm text-gray-600 mt-1">
          {user.role === "CLIENT"
            ? "Cliente"
            : user.profession || "Funcionário"}
        </p>
      </div>
    </div>
  );
}
