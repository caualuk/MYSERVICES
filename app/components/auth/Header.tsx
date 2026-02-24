import Image from "next/image";
import Logo from "@/app/assets/logoteste.png";

export default function Header() {
  return (
    <div className="flex items-center gap-2 mb-10">
      <div className="w-6 h-6 bg-indigo-600 rounded-md"></div>
      <span className="font-semibold text-gray-800 text-lg">My Services</span>
    </div>
  );
}
