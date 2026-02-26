// components/payments/PaymentsDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { LineChart, PieChart } from "./Charts";
import { MetricsCard } from "./MetricsCard";
import { PaymentsTable } from "./PaymentsTable";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import { FilterBar } from "./FilterBar";

export function PaymentsDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [lineData, setLineData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    async function loadData() {
      try {
        const userRes = await fetch("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setRole(userData.role);

        const metricsRes = await fetch(
          "http://localhost:8000/services/metrics",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);

        const lineRes = await fetch(
          "http://localhost:8000/services/chart/line",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const lineChartData = await lineRes.json();
        setLineData(lineChartData.data || []);

        const pieRes = await fetch(
          "http://localhost:8000/services/chart/professions",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const pieChartData = await pieRes.json();
        setPieData(pieChartData || []);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    loadData();
  }, [token]);

  const renderMetrics = () => {
    if (!metrics || !role) return null;

    if (role === "CLIENT") {
      return (
        <>
          <MetricsCard
            title="Total Gasto"
            value={`R$ ${metrics.total_spent?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          />
          <MetricsCard
            title="Serviços Contratados"
            value={metrics.services_count}
          />
        </>
      );
    }

    if (role === "EMPLOYEE") {
      return (
        <>
          <MetricsCard
            title="Total Ganho"
            value={`R$ ${metrics.total_earned?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          />
          <MetricsCard
            title="Total Gasto"
            value={`R$ ${metrics.total_spent?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          />
          <MetricsCard
            title="Saldo Líquido"
            value={`R$ ${metrics.saldo_liquido?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          />
          <MetricsCard
            title="Serviços Realizados"
            value={metrics.services_done}
          />
        </>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onOpenRadius={true} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {renderMetrics()}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Line Chart - Main */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Histórico de {role === "CLIENT" ? "Gastos" : "Receitas"}
                    </h3>
                  </div>
                </div>
                <LineChart data={lineData} role={role || undefined} />
              </div>

              {/* Pie Chart - Side */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Serviços por Profissão
                </h3>
                <PieChart data={pieData} />
                <div className="mt-6 space-y-2 max-h-48 overflow-y-auto">
                  {pieData.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Integrations Table */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Histórico de Serviços
              </h3>
              <PaymentsTable />
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 mt-8">
              © 2024 MyServices, Inc.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
