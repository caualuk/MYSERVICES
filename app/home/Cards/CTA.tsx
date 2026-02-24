import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-3xl p-12 bg-gradient-to-r from-indigo-600 to-indigo-600 text-white">
        {/* Efeito de brilho/estrelas */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-20 w-40 h-40 bg-gray-100 blur-3xl rounded-full" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-gray-100 blur-2xl rounded-full" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 max-w-3xl flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Encontre o Profissional Ideal
          </h1>

          <span className="text-[18px]">Conecte-se com profissionais próximos e contrate seus serviços.</span>

          <div className="mt-4 flex items-center gap-4">
            <button className="flex items-center gap-5 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition">
              Busque Profissionais
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
