"use client";

import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

interface SearchServicesProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchServices({ onSearch, placeholder = "Buscar serviços" }: SearchServicesProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce para não fazer a busca a cada tecla
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <div className="relative w-full max-w-2xl">
      <FaSearch
        size={16}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600"
      />

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          pl-12
          pr-5
          py-4
          rounded-full
          bg-white
          border
          border-gray-200
          text-sm
          outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:border-transparent
          transition-all
          shadow-sm
          hover:shadow
        "
      />
    </div>
  );
}