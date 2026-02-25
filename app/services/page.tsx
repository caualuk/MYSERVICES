"use client";

import { useEffect, useState } from "react";
import ServicesTable from "./_components/ServicesTable";
import Sidebar from "../components/Sidebar/Sidebar";
import CreateServiceModal from "./_components/CreateServiceModal";
import FilterDropdown from "./_components/FilterDropDown";
import SearchServices from "../components/Search/SearchServices";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
      // Busca por nome do funcionário
      const employeeMatch = service.employee_name?.toLowerCase().includes(searchLower);
      
      // Busca por nome do serviço/profissão
      const serviceMatch = service.profession_name?.toLowerCase().includes(searchLower);
      
      // Busca por ID (caso queira buscar por número)
      const idMatch = service.id?.toString().includes(searchLower);
      
      return employeeMatch || serviceMatch || idMatch;
    });
  };

  // Efeito para aplicar filtro e busca quando mudar
  useEffect(() => {
    let result = [...services];
    
    // Aplica a busca primeiro
    result = applySearch(searchQuery, result);
    
    // Depois aplica o filtro de ordenação
    result = applyFilter(currentFilter, result);
    
    setFilteredServices(result);
  }, [currentFilter, services, searchQuery]);

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <Sidebar onOpenRadius={() => setIsOpen(true)} />

      <main className="flex-1 flex flex-col">
        <div className="p-8">
          <div className="flex-1 flex justify-center mb-8">
            <SearchServices onSearch={handleSearch} />
          </div>
          
          {/* Container com botão e filtro lado a lado */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setIsOpen(true)}
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

          {isOpen && (
            <CreateServiceModal
              onClose={() => setIsOpen(false)}
              setServices={setServices}
            />
          )}
        </div>
      </main>
    </div>
  );
}