"use client";

import { useState } from "react";
import { FaCreditCard, FaReceipt, FaFileInvoiceDollar } from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoChatbubbleEllipses } from "react-icons/io5";

const cards = [
  {
    title: "Cadastro com localização",
    description:
      "Informe sua cidade e veja profissionais disponíveis perto de você.",
    icon: FaLocationDot,
  },
  {
    title: "Perfil Completo e Avaliações",
    description: "Visualize experiência, serviços oferecidos e informações.",
    icon: CgProfile,
  },
  {
    title: "Converse Antes de Contratar",
    description:
      "Negocie valores, tire dúvidas e combine detalhes diretamente no Whatsapp.",
    icon: IoChatbubbleEllipses,
  },
];

export default function FunctionalityCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full flex justify-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const isActive = activeIndex === index;

          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`bg-white rounded-2xl p-6 text-center border shadow-sm
                transition-all duration-300 focus:outline-none
                hover:shadow-md hover:cursor-pointer
                ${isActive ? "border-indigo-700" : "border-indigo-200"}`}
            >
              <div
                className={`mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-xl
                  transition-colors duration-300
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
              >
                <Icon size={28} />
              </div>

              <h3
                className={`font-semibold text-lg mb-2 transition-colors
                  ${isActive ? "text-gray-900" : "text-gray-800"}`}
              >
                {card.title}
              </h3>

              <p className="text-sm text-gray-500 max-w-[20rem] mx-auto">
                {card.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
