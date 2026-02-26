import { FaRegHeart } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

interface EmployeeCardProps {
  name: string;
  profession: string;
  phone: string;
  tags: string[];
  profileColor?: string;
  city?: string;
}

export default function EmployeeCard({
  name,
  profession,
  phone,
  tags,
  profileColor = "#4F46E5",
  city,
}: EmployeeCardProps) {
  function getInitials(name: string) {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  // Função para calcular a luminância da cor e definir contraste
  function getContrastColor(hexColor: string): string {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calcular luminância usando a fórmula padrão
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Se a cor é clara, usar texto escuro; caso contrário, usar texto claro
    return luminance > 0.5 ? "#1F2937" : "#FFFFFF";
  }

  const textColor = getContrastColor(profileColor);
  const firstName = name.split(" ")[0];

  const handleConnect = (phone?: string, name?: string) => {
    if (!phone) {
      alert("Telefone não disponível para este funcionário.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");

    const message = encodeURIComponent(
      `Olá ${name ?? ""}, vim pelo MyServices! Tudo bem?`,
    );

    window.open(`https://wa.me/55${cleanPhone}?text=${message}`, "_blank");
  };

  return (
    <div
      className="min-w-full rounded-3xl transform transition-all duration-500 text-white p-6 shadow-xl relative overflow-hidden"
      style={{ backgroundColor: profileColor }}
    >
      <div
        className="absolute -top-20 -right-20 w-48 h-48 opacity-30 rounded-full blur-3xl"
        style={{ backgroundColor: profileColor, opacity: 0.3 }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-48 h-48 opacity-30 rounded-full blur-3xl"
        style={{ backgroundColor: profileColor, opacity: 0.3 }}
      />

      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold border border-white/30">
            {getInitials(name)}
          </div>

          <div>
            <h3 className="font-semibold text-lg">{firstName}</h3>
            <p className="text-indigo-200 text-sm">{profession}</p>
            {city && <p className="text-indigo-200 text-xs">{city}</p>}
          </div>
        </div>

        <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
          <FaRegHeart size={18} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 relative z-10">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 bg-white/20 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        className="mt-6 w-full py-3 rounded-full cursor-pointer bg-white/40 hover:bg-white/60 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition relative z-10"
        style={{ color: textColor }}
        onClick={() => handleConnect(phone, name)}
      >
        Conectar
        <IoSend size={16} />
      </button>
    </div>
  );
}
