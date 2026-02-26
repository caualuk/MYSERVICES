// app/services/_components/FilterDropdown.tsx
"use client";

import { useState } from "react";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaCalendarAlt,
  FaDollarSign,
  FaChevronDown,
} from "react-icons/fa";

interface FilterDropdownProps {
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

export default function FilterDropdown({
  onFilterChange,
  currentFilter,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filters = [
    // Ordenação
    {
      value: "recent",
      label: "Mais recentes",
      icon: <FaCalendarAlt className="text-indigo-600" />,
    },
    {
      value: "oldest",
      label: "Mais antigas",
      icon: <FaCalendarAlt className="text-indigo-600" />,
    },
    {
      value: "highest",
      label: "Maior valor",
      icon: <FaSortAmountUp className="text-indigo-600" />,
    },
    {
      value: "lowest",
      label: "Menor valor",
      icon: <FaSortAmountDown className="text-indigo-600" />,
    },
    // Divisor visual
    { value: "divider", label: "", icon: null, disabled: true },
    // Filtro por tipo
    {
      value: "gastos",
      label: "Apenas Gastos",
      icon: <FaDollarSign className="text-red-600" />,
    },
    {
      value: "ganhos",
      label: "Apenas Ganhos",
      icon: <FaDollarSign className="text-green-600" />,
    },
  ];

  const getCurrentLabel = () => {
    const current = filters.find((f) => f.value === currentFilter);
    return current ? current.label : "Mais recentes";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <FaSortAmountDown className="text-indigo-600" />
        <span>{getCurrentLabel()}</span>
        <FaChevronDown
          className={`text-gray-400 text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
            {filters.map((filter) => {
              // Renderizar divisor
              if (filter.value === "divider") {
                return (
                  <div key="divider" className="border-t border-gray-200" />
                );
              }

              return (
                <button
                  key={filter.value}
                  onClick={() => {
                    onFilterChange(filter.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-indigo-50
                    ${currentFilter === filter.value ? "bg-indigo-50 text-indigo-700" : "text-gray-700"}`}
                >
                  <span className="text-indigo-600">{filter.icon}</span>
                  <span className="flex-1 text-left">{filter.label}</span>
                  {currentFilter === filter.value && (
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
