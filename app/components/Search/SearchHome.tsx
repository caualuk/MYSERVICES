"use client";

import { FaSearch } from "react-icons/fa";

export default function SearchHome() {
  return (
<div className="relative w-[670px]">
      <FaSearch
        size={14}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600"
      />

      <input
        type="text"
        placeholder="Encontre pessoas..."
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
          transition
        "
      />
    </div>
  );
}