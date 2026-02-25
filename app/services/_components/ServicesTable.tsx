import ServiceRow from "./ServiceRow";
import { FaSearch } from "react-icons/fa";

export default function ServicesTable({ services, setServices }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/50">
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Funcionário
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Serviço
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceRow
                key={service.id}
                service={service}
                setServices={setServices}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
                    <FaSearch className="text-indigo-400 text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm font-medium mb-1">
                      Nenhum serviço encontrado
                    </p>
                    <p className="text-gray-400 text-xs">
                      Tente buscar por nome do funcionário ou tipo de serviço
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}