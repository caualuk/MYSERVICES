export default function Stats() {
  return (
    <div className="w-full py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-gradient-to-bl from-gray-100 to-transparent rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-30"></div> */}

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            <div className="text-sm font-medium text-gray-500 tracking-widest uppercase">
              Métricas de performance
            </div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
          </div>

          <h2 className="text-5xl font-bold text-indigo-600 mb-6 tracking-tight">
            O impacto da{" "}
            <span className="relative">
              <span className="relative z-10">eficiência</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-indigo-100 to-transparent -z-10"></span>
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Dados que transformam a maneira como você conecta clientes e
            profissionais
          </p>
        </div>

        {/* Grid Stats Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              value: "2.5k",
              label: "Clientes Ativos",
              description: "Base crescente mensalmente",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ),
            },
            {
              value: "150",
              label: "Profissionais",
              description: "Equipe especializada",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
            },
            {
              value: "1.2k",
              label: "Conexões geradas com sucesso",
              description: "Precisão no encontro",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
            },
            {
              value: "12h",
              label: "Economia Semanal",
              description: "Tempo otimizado",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
            },
          ].map((stat, index) => (
            <div key={index} className="group relative hover:cursor-pointer">
              {/* Animação de borda */}
              <div className="absolute -inset-px bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500">
                {/* Icon com degradê no background */}
                <div className="absolute top-8 right-8">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-200 to-indigo-900 rounded-xl flex items-center justify-center shadow-lg">
                      <div className="text-white">{stat.icon}</div>
                    </div>
                  </div>
                </div>

                {/* Stats value */}
                <div className="mb-16">
                  <div className="text-6xl font-bold text-indigo-600 tracking-tight">
                    {stat.value}
                  </div>
                </div>

                {/* Label e descrição */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {stat.label}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="mt-8 pt-6 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                  <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* METRICAS DE PERFORMANCE
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 border border-gray-100 shadow-[0_20px_60px_rgb(0,0,0,0.04)]">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Performance detalhada
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Métricas que demonstram a eficiência do sistema
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-10">
                            {[
                                { label: "Eficiência Operacional", value: 92, color: "from-gray-900 to-gray-700" },
                                { label: "Satisfação do Cliente", value: 96, color: "from-gray-800 to-gray-600" },
                            ].map((metric, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-900">{metric.label}</span>
                                        <span className="text-2xl font-bold text-gray-900">{metric.value}%</span>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: `${metric.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="space-y-10">
                            {[
                                { label: "Retenção de Clientes", value: 88, color: "from-gray-800 to-gray-600" },
                                { label: "Automação de Processos", value: 95, color: "from-gray-900 to-gray-700" },
                            ].map((metric, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-900">{metric.label}</span>
                                        <span className="text-2xl font-bold text-gray-900">{metric.value}%</span>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: `${metric.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center gap-8 px-8 py-4 bg-white rounded-full border border-gray-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full border-2 border-white"
                  ></div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-bold text-indigo-600">+500 usuários</div>
                <div className="text-sm text-gray-500">
                  já otimizaram seus processos
                </div>
              </div>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white font-semibold rounded-full hover:shadow-xl transform hover:cursor-pointer hover:-translate-y-0.5 transition-all duration-200">
              Quero iniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

