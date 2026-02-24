"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { IoIosAlert } from "react-icons/io";

interface RadiusModalProps {
  onClose: () => void;
  onSave: (value: number) => void;
}

export default function RadiusModal({ onClose, onSave }: RadiusModalProps) {
  const [value, setValue] = useState<number | "">("");
  const [error, setError] = useState(""); // usado apenas para controlar toast
  const [showError, setShowError] = useState(false);

  function handleSave() {
    if (!value || value <= 0) {
      setError("Defina a distância para pesquisar funcionários!");
      setShowError(true);

      // esconde o toast depois de 3s
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    onSave(value);
    onClose();
  }

  function handleClose() {
    if (!value || value <= 0) {
      setError("Defina a distância para pesquisar funcionários!");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    onClose();
  }

  function handleBackgroundClick() {
    handleClose();
  }

  return (
    <>
      {/* BACKGROUND MODAL */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={handleBackgroundClick}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[420px] rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-[1px] shadow-2xl"
        >
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Alterar Raio
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Defina a distância máxima para encontrar profissionais próximos.
            </p>

            <div className="relative mb-6">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                placeholder="Ex: 15"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition
                  appearance-none
                  [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none
                  [-moz-appearance:textfield]"
              />
              <span className="absolute right-4 top-3 text-gray-400 text-sm">
                km
              </span>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:opacity-90 transition"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TOAST DE ERRO */}
      {/* TOAST DE ERRO */}
      {showError && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-[90vw]">
          <div className="flex items-center gap-2 text-center bg-red-600 text-white px-6 py-3 rounded-xl shadow-xl animate-fade-in-out whitespace-nowrap">
            <IoIosAlert size={20} />{error}
          </div>
        </div>
      )}
    </>
  );
}
