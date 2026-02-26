"use client";

import { useEffect, useState } from "react";

export default function CreateServiceModal({ onClose, setServices }: any) {
  const [form, setForm] = useState({
    employee_id: null,
    value: "",
  });

  const [employeeQuery, setEmployeeQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(false);
  const [clientName, setClientName] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  //Buscar cliente logado
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setClientName(data.name);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    fetchUser();
  }, [token]);

  // Buscar funcionários (autocomplete)
  useEffect(() => {
    if (selectedEmployee) return;

    if (employeeQuery.length < 2) {
      setEmployees([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/users/employees/search?q=${employeeQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [employeeQuery, selectedEmployee]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao criar serviço");
        return;
      }

      setServices((prev: any) => [data, ...prev]);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        {/* Header com ícone e título */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
          <h2 className="text-lg font-medium text-gray-800">Novo Serviço</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Cliente bloqueado */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </label>
            <input
              type="text"
              value={clientName}
              disabled
              className="w-full mt-1.5 p-2.5 border border-gray-400 rounded-lg bg-gray-50 text-gray-500 text-sm"
            />
          </div>

          {/* Funcionário autocomplete */}
          <div className="relative">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Funcionário
            </label>

            <input
              type="text"
              value={employeeQuery}
              onChange={(e) => {
                setEmployeeQuery(e.target.value);
                setSelectedEmployee(false);
                setForm({ ...form, employee_id: null });
              }}
              placeholder="Digite o nome do funcionário"
              className="w-full mt-1.5 p-2.5 border border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />

            {employees.length > 0 && (
              <ul className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-52 overflow-y-auto z-50">
                {employees.map((emp: any) => (
                  <li
                    key={emp.id}
                    onClick={() => {
                      setEmployeeQuery(
                        `${emp.id} - ${emp.name} | ${emp.profession} |  ${emp.city} | ${emp.state}`
                      );
                      setEmployees([]);
                      setSelectedEmployee(true);
                      setForm({
                        ...form,
                        employee_id: emp.id,
                      });
                    }}
                    className="px-4 py-2.5 hover:bg-indigo-50 cursor-pointer text-sm border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium text-indigo-600">
                      {emp.id}
                    </span>
                    <span className="text-gray-700"> - {emp.name}</span>
                    <span className="text-gray-500 text-xs ml-2">
                      | {emp.profession} | {emp.city} | {emp.state}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Valor */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor do serviço
            </label>
            <input
              type="number"
              step="0.01"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              placeholder="Ex: 250.00"
              className="w-full mt-1.5 p-2.5 border border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Criar serviço
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}