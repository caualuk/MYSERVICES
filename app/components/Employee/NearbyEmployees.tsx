// components/Employee/NearbyEmployees.tsx
"use client";

import { useState, useEffect } from "react";
import EmployeeCard from "../Employee/EmployeeCard";
import LoadingSpinner from "../Loading/LoadingSpinner";

interface NearbyEmployeesProps {
  radius: number | null;
}

export default function NearbyEmployees({ radius }: NearbyEmployeesProps) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (radius === null) {
      setEmployees([]);
      return;
    }

    async function fetchEmployees() {
      setLoading(true);

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:8000/users/nearby-employees?raio=${radius}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          console.error("Resposta inválida do backend");
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setEmployees(data.funcionarios || []);
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }

      setLoading(false);
    }

    fetchEmployees();
  }, [radius]);

  if (loading) {
    return <LoadingSpinner fullScreen={false} message="Carregando..." />;
  }

  if (!employees.length) {
    return (
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg font-medium">Nenhum funcionário disponível</p>
        <p className="text-sm text-gray-500 mt-2">
          {radius === null
            ? "Clique em 'Alterar Raio' no menu para começar a busca"
            : "Altere o raio para encontrar novos funcionários"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      {" "}
      {/* Adicionado padding lateral */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">
          Funcionários Disponíveis
          {radius !== null && (
            <span className="text-sm text-gray-500 ml-2">
              (raio de {radius} km)
            </span>
          )}
        </h2>
        <span className="text-sm text-gray-500">
          {employees.length} funcionário{employees.length !== 1 ? "s" : ""}{" "}
          encontrado{employees.length !== 1 ? "s" : ""}
        </span>
      </div>
      {/* Grid com 4 colunas em telas grandes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            name={employee.name}
            profession={employee.profession}
            phone={employee.phone}
            tags={[]}
            profileColor={employee.profile_color || "#4F46E5"}
            city={employee.city}
          />
        ))}
      </div>
    </div>
  );
}
