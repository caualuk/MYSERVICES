"use client";

import { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCards";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface EmployeesCarouselProps {
  radius: number | null;
}

const ITEMS_PER_PAGE = 3;

export default function EmployeesCarousel({ radius }: EmployeesCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!radius) return;

    async function fetchEmployees() {
      setLoading(true);
      setCurrentPage(0);

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

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const hasPrevious = currentPage > 0;
  const hasNext = currentPage < totalPages - 1;

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Carregando...</div>;
  }

  if (!employees.length) {
    return (
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg font-medium">Nenhum funcionário disponível</p>
        <p className="text-sm text-gray-500 mt-2">
          Altere o raio para encontrar novos funcionários
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-lg font-semibold text-gray-700">
        Funcionários Disponíveis
        {radius !== null && (
          <span className="text-sm text-gray-500 ml-2">
            (raio de {radius} km)
          </span>
        )}
      </h2>

      <div className="relative w-full overflow-hidden">
        {/* TRACK */}
        <div
          className="flex transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: `${totalPages * 100}%`,
            transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
          }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="w-full flex-shrink-0 px-16"
              style={{ width: `${100 / totalPages}%` }}
            >
              <div className="grid grid-cols-3 gap-8">
                {employees
                  .slice(
                    pageIndex * ITEMS_PER_PAGE,
                    pageIndex * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
                  )
                  .map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      name={employee.name}
                      profession={employee.profession}
                      phone={employee.phone}
                      tags={[]}
                      profileColor={employee.profile_color || "#4F46E5"}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* ARROWS */}
        {totalPages > 1 && (
          <>
            <button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full disabled:opacity-30 transition"
            >
              <MdChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              disabled={!hasNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full disabled:opacity-30 transition"
            >
              <MdChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* DOTS */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentPage === index ? "bg-indigo-600 w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
