export default function EmployeesSection() {
  return (
    <section className="w-full py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Texto */}
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-indigo-600 leading-tight">
            Perfis completos para escolher com confiança.
          </h2>

          <p className="mt-4 text-gray-500">
            Veja avaliação, descrição, serviços oferecidos e valores antes mesmo de entrar em contato.
            Transparência total para decidir o melhor.
          </p>

          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:cursor-pointer hover:bg-indigo-700 transition">
            Ver profissionais
          </button>
        </div>

        {/* Card maior */}
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Lista de funcionários
          </h3>

          <div className="space-y-6">
            {[
              {
                name: "Francisco José",
                role: "Pedreiro",
                value: "Caruaru - PE",
              },
              {
                name: "José Carlos",
                role: "Encanador",
                value: "Bezerros - PE",
              },
              {
                name: "João Pedro",
                role: "Eletricista",
                value: "Toritama - PE",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-300 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-100">
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <span className="text-sm text-gray-500">{item.role}</span>
                  </div>
                </div>

                <span className="text-base font-semibold text-gray-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
