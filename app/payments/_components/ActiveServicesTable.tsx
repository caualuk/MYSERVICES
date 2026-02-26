// components/payments/ActiveServicesTable.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ServiceRecord {
  id: number;
  status: string;
  value: number;
  employee_name?: string;
  profession_name?: string;
  client_name?: string;
  added_as?: string;
  created_at?: string;
}

interface ActiveServicesTableProps {
  role: string | null;
}

export function ActiveServicesTable({ role }: ActiveServicesTableProps) {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token || !role) return;

    // Definir endpoint baseado no role
    let endpoint = "";
    let filterCondition: (s: ServiceRecord) => boolean;

    if (role === "CLIENT") {
      endpoint = "/services/client";
      filterCondition = (s: ServiceRecord) => s.added_as === "CLIENT";
    } else if (role === "EMPLOYEE") {
      endpoint = "/services/client";
      // Para EMPLOYEE, mostrar os gastos que ele teve quando agiu como cliente
      filterCondition = (s: ServiceRecord) => s.added_as === "CLIENT";
    } else {
      return;
    }

    fetch(`http://localhost:8000${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // Filter: only services that user hired (added_as = CLIENT)
        const activeExpenses = data.filter(filterCondition);
        setServices(activeExpenses);
        setPage(0);
      })
      .catch((err) => console.error("Erro ao buscar serviços ativos:", err));
  }, [token, role]);

  if (!role) {
    return null;
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum serviço ativo no momento</p>
      </div>
    );
  }

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const visibleServices = services.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end items-center gap-4 mb-2">
        {services.length > itemsPerPage && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-40"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages - 1}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-40"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
        <button
          onClick={() => router.push("/services")}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Ver todos os serviços →
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              ID
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              FUNCIONÁRIO
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              SERVIÇO
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              STATUS
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              VALOR
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleServices.map((s) => (
            <tr
              key={s.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-sm text-gray-900">#{s.id}</td>
              <td className="py-3 px-4 text-sm text-gray-900">
                {s.employee_name}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {s.profession_name}
              </td>
              <td className="py-3 px-4">
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {s.status.toLowerCase()}
                </span>
              </td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">
                R${" "}
                {s.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
