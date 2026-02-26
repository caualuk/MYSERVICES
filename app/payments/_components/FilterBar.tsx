// components/payments/FilterBar.tsx
import { LuSlidersHorizontal } from "react-icons/lu";

export function FilterBar() {
  return (
    <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <LuSlidersHorizontal size={16} />
      <span>Sort</span>
    </button>
  );
}