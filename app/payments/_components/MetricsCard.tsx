// components/payments/MetricsCard.tsx
interface MetricsCardProps {
  title: string;
  value: string;
  percentage?: number;
  trend?: "up" | "down";
  subtext?: string;
}

export function MetricsCard({
  title,
  value,
  percentage = 0,
  trend = "up",
  subtext,
}: MetricsCardProps) {
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";
  const trendIcon = trend === "up" ? "↑" : "↓";

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className={`text-sm font-medium ${trendColor}`}>
          {trendIcon} {percentage}%
        </span>
      </div>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
    </div>
  );
}
