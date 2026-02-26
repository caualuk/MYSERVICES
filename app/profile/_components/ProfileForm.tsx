"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function ProfileForm() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [profileColor, setProfileColor] = useState("#4F46E5");
  const [role, setRole] = useState("CLIENT");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
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
          setName(data.name);
          setRole(data.role || "CLIENT");
          setProfileColor(data.profile_color || "#4F46E5");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage({ type: "error", text: "Token não encontrado" });
        setSaving(false);
        return;
      }

      const res = await fetch("http://localhost:8000/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          profileColor,
          role,
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });

        // Recarregar os dados do usuário após salvar
        const userRes = await fetch("http://localhost:8000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userRes.ok) {
          const data = await userRes.json();
          setUser(data);
          setName(data.name);
          setRole(data.role || "CLIENT");
          setProfileColor(data.profile_color || "#4F46E5");
        }
      } else {
        const errorData = await res.json();
        setMessage({
          type: "error",
          text: errorData.error || "Erro ao atualizar perfil",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setMessage({ type: "error", text: "Erro ao salvar alterações" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen={false} message="Carregando..." />;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar Perfil</h2>

        {/* Mensagem de Sucesso/Erro */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Mudar Cor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mudar Cor do Perfil
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={profileColor}
              onChange={(e) => setProfileColor(e.target.value)}
              className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
            <span className="text-gray-600 font-medium">{profileColor}</span>
          </div>
        </div>

        {/* Alterar Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alterar Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="CLIENT">Cliente</option>
            <option value="EMPLOYEE">Funcionário</option>
          </select>
        </div>

        {/* Botão Salvar */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition text-white py-3 rounded-lg font-medium"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}
