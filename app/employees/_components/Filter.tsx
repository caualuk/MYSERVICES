// components/FilterDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { IoIosFunnel } from "react-icons/io";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
  category?: string;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
}

interface FilterDropdownProps {
  sections?: FilterSection[];
  onFilterChange?: (selectedFilters: string[]) => void;
  className?: string;
}

const defaultSections: FilterSection[] = [
  {
    title: "Categoria",
    options: [
      { id: "adm", label: "Administração", count: 12 },
      { id: "saude", label: "Saúde", count: 8 },
      { id: "seguranca", label: "Segurança", count: 15 },
      { id: "educacao", label: "Educação", count: 6 },
      { id: "construcao", label: "Construção", count: 10 }
    ]
  },
  {
    title: "Avaliação",
    options: [
      { id: "5stars", label: "5 Estrelas", count: 24 },
      { id: "4stars", label: "4 Estrelas+", count: 42 },
      { id: "3stars", label: "3 Estrelas+", count: 18 }
    ]
  },
  {
    title: "Disponibilidade",
    options: [
      { id: "today", label: "Hoje", count: 15 },
      { id: "tomorrow", label: "Amanhã", count: 23 },
      { id: "week", label: "Esta semana", count: 45 }
    ]
  },
  {
    title: "Raio de Distância",
    options: [
      { id: "5km", label: "Até 5 km", count: 32 },
      { id: "10km", label: "Até 10 km", count: 58 },
      { id: "25km", label: "Até 25 km", count: 89 },
      { id: "50km", label: "Até 50 km", count: 124 }
    ]
  }
];

export default function FilterDropdown({ 
  sections = defaultSections, 
  onFilterChange,
  className = "" 
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.map(s => s.title)
  );
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId];
      
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
      
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    if (onFilterChange) {
      onFilterChange([]);
    }
  };

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const getSelectedCount = () => selectedFilters.length;

  return (
    <div className={`relative ${className}`}>
      {/* Botão de Filtro */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 
          bg-white border border-gray-300 rounded-lg
          hover:bg-gray-50 transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
        `}
      >
        <IoIosFunnel className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700 font-medium">Filtros</span>
        {getSelectedCount() > 0 && (
          <span className="ml-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getSelectedCount()}
          </span>
        )}
        <IoChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown de Filtros */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          style={{ top: '100%' }}
        >
          {/* Header do Dropdown */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Filtros</h3>
            {selectedFilters.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Limpar todos
              </button>
            )}
          </div>

          {/* Lista de Filtros */}
          <div className="max-h-96 overflow-y-auto">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-gray-100 last:border-b-0">
                {/* Título da Seção (clicável) */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{section.title}</span>
                  <IoChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      expandedSections.includes(section.title) ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Opções da Seção */}
                {expandedSections.includes(section.title) && (
                  <div className="px-4 pb-4 space-y-2">
                    {section.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes(option.id)}
                            onChange={() => toggleFilter(option.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-700 group-hover:text-gray-900">
                            {option.label}
                          </span>
                        </div>
                        {option.count !== undefined && (
                          <span className="text-sm text-gray-500">
                            {option.count}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer com Ações */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Aplicar ({getSelectedCount()})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}