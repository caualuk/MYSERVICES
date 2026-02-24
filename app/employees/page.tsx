// app/employees/page.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "./_components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import FilterDropdown from "./_components/Filter";
import NearbyEmployees from "../components/Employee/NearbyEmployees";
import RadiusModal from "../components/RadiusModal/RadiusModal";

export default function EmployeesPage() {
  const [isRadiusOpen, setIsRadiusOpen] = useState(false);
  const [radius, setRadius] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUserRadius() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          // IMPORTANTE: não usar if(data.radius)
          setRadius(data.radius ?? null);
        }
      } catch (error) {
        console.error("Erro ao buscar raio do usuário:", error);
      }
    }

    fetchUserRadius();
  }, []);

  const handleRadiusSave = async (newRadius: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8000/users/radius", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ radius: newRadius }),
      });

      if (!res.ok) {
        console.error("Erro ao atualizar raio");
        return;
      }

      setRadius(newRadius); // só atualiza depois de salvar no banco
    } catch (error) {
      console.error("Erro ao salvar raio:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <Sidebar onOpenRadius={() => setIsRadiusOpen(true)} />

      <main className="flex-1 flex flex-col">
        <Header />

        {/* Ajuste no espaçamento do FilterDropdown */}
        <div className="px-6 py-4">
          <FilterDropdown />
        </div>

        {/* Área dos cards com espaçamento adequado */}
        <div className="flex-1">
          <NearbyEmployees radius={radius} />
        </div>
      </main>

      {isRadiusOpen && (
        <RadiusModal
          onClose={() => setIsRadiusOpen(false)}
          onSave={handleRadiusSave}
        />
      )}
    </div>
  );
}
