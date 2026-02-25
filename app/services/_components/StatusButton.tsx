import { useState } from "react";

export default function StatusButton({ service, setServices }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const getStyle = () => {
    if (service.status === "PENDING")
      return "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200";
    if (service.status === "PAID")
      return "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200";
    return "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200";
  };

  const getLabel = () => {
    if (service.status === "PENDING") return "Pendente";
    if (service.status === "PAID") return "Pago";
    return "Em atraso";
  };

  const handleClick = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    
    try {
      const res = await fetch(
        `http://localhost:8000/services/${service.id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, status: data.new_status } : s
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      alert("Erro ao atualizar status. Tente novamente.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isUpdating}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${getStyle()}`}
    >
      {isUpdating ? "..." : getLabel()}
    </button>
  );
}