interface PaginationDotsProps {
  total: number;
  current: number;
}

export default function PaginationDots({
  total,
  current,
}: PaginationDotsProps) {
  const itemsPerPage = 4;
  const totalPages = Math.ceil(total / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all ${
            current === index ? "bg-indigo-600 w-6" : "bg-gray-300 w-2"
          }`}
        />
      ))}
    </div>
  );
}
