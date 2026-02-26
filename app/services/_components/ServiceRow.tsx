import StatusButton from "./StatusButton";

export default function ServiceRow({ service, setServices }) {
  // Função para formatar valor como moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm text-indigo-600">
        #{service.id}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800">
        {service.employee_name || '—'}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {service.profession_name || service.profession || '—'}
      </td>
      <td className="px-6 py-4">
        <StatusButton service={service} setServices={setServices} />
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {formatCurrency(service.value)}
      </td>
    </tr>
  );
}