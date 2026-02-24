export default function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-indigo-600 to-blue-500 text-white p-12">
      <h2 className="text-3xl font-semibold leading-snug">
        Conecte-se com prestadores de serviços perto de você.
      </h2>

      <p className="mt-4 text-indigo-100">
        Encontre o profissional certo para suas necessidades de onde você
        estiver.
      </p>

      {/* IDEIA DE PAINEL - mantido por compatibilidade com o RightPanel de registro */}
    </div>
  );
}
