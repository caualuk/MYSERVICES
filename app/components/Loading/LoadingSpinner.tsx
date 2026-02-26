"use client";

import { FaSpinner } from "react-icons/fa";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

export default function LoadingSpinner({ fullScreen = true, message = "Carregando..." }: LoadingSpinnerProps) {
  const content = (
    <div className="text-center">
      {/* Logo animada
      <div className="relative mb-8">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto rotate-45 animate-pulse shadow-xl shadow-indigo-200">
          <div className="absolute inset-0 flex items-center justify-center -rotate-45">
            <span className="text-white text-2xl font-bold">M</span>
          </div>
        </div>
      </div> */}

      {/* Spinner e texto */}
      <div className="flex flex-col items-center gap-3">
        <FaSpinner className="text-indigo-600 text-3xl animate-spin" />
        
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {message}
          </h3>
          <p className="text-xs text-gray-500">
            Aguarde um momento...
          </p>
        </div>

        {/* Barra de progresso */}
        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
          <div className="h-full bg-indigo-600 rounded-full animate-loading-bar"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loadingBar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}