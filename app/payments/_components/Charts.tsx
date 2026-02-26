"use client";

import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend,
} from "recharts";

export function LineChart({ data, role }: { data: any[]; role?: string }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Sem dados disponíveis
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLine data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" stroke="#888888" fontSize={12} />
        <YAxis stroke="#888888" fontSize={12} />
        <Tooltip
          formatter={(value) =>
            `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          }
        />
        <Legend />
        {role === "CLIENT" ? (
          <Line
            type="monotone"
            dataKey="gastos"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ fill: "#EF4444", strokeWidth: 2 }}
            name="Gastos"
          />
        ) : role === "EMPLOYEE" ? (
          <>
            <Line
              type="monotone"
              dataKey="ganhos"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: "#10B981", strokeWidth: 2 }}
              name="Ganhos"
            />
            <Line
              type="monotone"
              dataKey="gastos"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: "#EF4444", strokeWidth: 2 }}
              name="Gastos"
            />
          </>
        ) : null}
      </RechartsLine>
    </ResponsiveContainer>
  );
}

export function PieChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Sem dados disponíveis
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsPie>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label={{ position: "outside", fontSize: 12 }}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} serviço(s)`} />
      </RechartsPie>
    </ResponsiveContainer>
  );
}
