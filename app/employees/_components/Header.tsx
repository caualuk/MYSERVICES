import SearchHome from "@/app/components/Search/SearchHome";

export default function Header() {
  return (
    <header className="w-full bg-transparent border-b border-gray-200">
      <div className="h-20 flex items-center px-10">
        {/* CONTAINER CENTRAL */}
        <div className="flex items-center w-full max-w-6xl mx-auto gap-6">
          {/* SEARCH ocupa o máximo possível */}
          <div className="flex-1 flex justify-center">
            <SearchHome />
          </div>
        </div>
      </div>
    </header>
  );
}
