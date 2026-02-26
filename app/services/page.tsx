"use client";

import { useEffect, useState } from "react";
import ServicesTable from "./_components/ServicesTable";
import Sidebar from "../components/Sidebar/Sidebar";
import CreateServiceModal from "./_components/CreateServiceModal";
import RadiusModal from "../components/RadiusModal/RadiusModal"; // Mesmo modal do Home
import FilterDropdown from "./_components/FilterDropDown";
import SearchServices from "../components/Search/SearchServices";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRadiusModalOpen, setIsRadiusModalOpen] = useState(false); // Estado para o modal de raio
  const [currentFilter, setCurrentFilter] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Buscar serviços
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:8000/services/client", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setFilteredServices(data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  // Função de filtro
  const applyFilter = (filterType: string, servicesList: any[]) => {
    const sortedServices = [...servicesList];
    
    switch(filterType) {
      case "recent":
        return sortedServices.sort((a, b) => b.id - a.id);
      
      case "oldest":
        return sortedServices.sort((a, b) => a.id - b.id);
      
      case "highest":
        return sortedServices.sort((a, b) => b.value - a.value);
      
      case "lowest":
        return sortedServices.sort((a, b) => a.value - b.value);
      
      default:
        return sortedServices;
    }
  };

  // Função de busca
  const applySearch = (query: string, servicesList: any[]) => {
    if (!query.trim()) return servicesList;
    
    const searchLower = query.toLowerCase();
    
    return servicesList.filter((service) => {
      const employeeMatch = service.employee_name?.toLowerCase().includes(searchLower);
      const serviceMatch = service.profession_name?.toLowerCase().includes(searchLower);
      const idMatch = service.id?.toString().includes(searchLower);
      
      return employeeMatch || serviceMatch || idMatch;
    });
  };

  // Efeito para aplicar filtro e busca quando mudar
  useEffect(() => {
    let result = [...services];
    
    result = applySearch(searchQuery, result);
    result = applyFilter(currentFilter, result);
    
    setFilteredServices(result);
  }, [currentFilter, services, searchQuery]);

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Função para salvar o raio (EXATAMENTE IGUAL AO HOME)
  const handleSaveRadius = async (value: number) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/users/radius", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ radius: value }),
      });

      if (!response.ok) {
        console.error("Failed to update radius:", response.status);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.error(
          "Invalid response type. Expected JSON, got:",
          contentType,
        );
        return;
      }

      // Fecha o modal após salvar
      setIsRadiusModalOpen(false);
      
      // Opcional: mostrar mensagem de sucesso
      console.log("Raio atualizado com sucesso!");
      
    } catch (error) {
      console.error("Error updating radius:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* Passa a função que abre o modal de raio */}
      <Sidebar onOpenRadius={() => setIsRadiusModalOpen(true)} />

      <main className="flex-1 flex flex-col">
        <div className="p-8">
          <div className="flex-1 flex justify-center mb-8">
            <SearchServices onSearch={handleSearch} />
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Adicionar Serviço
            </button>

            <FilterDropdown 
              onFilterChange={handleFilterChange}
              currentFilter={currentFilter}
            />
          </div>

          <ServicesTable 
            services={filteredServices} 
            setServices={setServices} 
          />

          {/* Modal de Criar Serviço */}
          {isCreateModalOpen && (
            <CreateServiceModal
              onClose={() => setIsCreateModalOpen(false)}
              setServices={setServices}
            />
          )}

          {/* Modal de Alterar Raio - IGUAL AO HOME */}
          {isRadiusModalOpen && (
            <RadiusModal
              onClose={() => setIsRadiusModalOpen(false)}
              onSave={handleSaveRadius} // Mesma função do Home
            />
          )}
        </div>
      </main>
    </div>
  );
}