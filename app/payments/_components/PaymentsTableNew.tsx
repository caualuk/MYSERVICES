"use client";

import { useRouter } from "next/navigation";

interface Payment {
  id: string;
  employee: string;
  service: string;
  status: "pending" | "completed" | "cancelled";
  amount: string;
}

const payments: Payment[] = [
  {
    id: "#1",
    employee: "Tanisa",
    service: "Professor",
    status: "pending",
    amount: "R$ 300,00",
  },
  {
    id: "#2",
    employee: "Fabiano",
    service: "Pedreiro",
    status: "pending",
    amount: "R$ 150,00",
  },
  {
    id: "#3",
    employee: "Pietro",
    service: "Montador de Móveis",
    status: "pending",
    amount: "R$ 450,00",
  },
  {
    id: "#4",
    employee: "Williams",
    service: "Pintor",
    status: "pending",
    amount: "R$ 500,00",
  },
  {
    id: "#5",
    employee: "Lua",
    service: "Encanador",
    status: "pending",
    amount: "R$ 20,00",
  },
];

export function PaymentsTable() {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
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
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-sm text-gray-900">{payment.id}</td>
              <td className="py-3 px-4 text-sm text-gray-900">
                {payment.employee}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {payment.service}
              </td>
              <td className="py-3 px-4">
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  {payment.status}
                </span>
              </td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">
                {payment.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => router.push("/services")}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
        >
          Ver todos os serviços →
        </button>
      </div>
    </div>
  );
}
