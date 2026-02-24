export default function RightPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-indigo-600 to-blue-500 text-white p-12">
      <h2 className="text-3xl font-semibold leading-snug">
        Conecte-se com prestadores de serviços perto de você.
      </h2>

      <p className="mt-4 text-indigo-100">
        Encontre o profissional certo para suas necessidades de onde você
        estiver.
      </p>

      {/* IDEIA DE PAINEL */}

      {/* <div className="mt-10 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <div className="bg-white rounded-lg p-4 text-gray-800">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-lg font-bold">$189,374</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Profit</p>
              <p className="text-lg font-bold">$25,684</p>
            </div>
          </div>

          <div className="mt-4 h-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg"></div>
        </div>
      </div> */}
    </div>
  );
}
