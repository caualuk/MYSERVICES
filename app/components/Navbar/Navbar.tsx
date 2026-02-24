import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-indigo-600">
            MyServices
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-12 text-lg text-gray-600">
          {/* 
          <Link href="#" className="hover:text-indigo-600 transition">
            Início
          </Link>
          <Link href="#" className="hover:text-indigo-600 transition">
            Serviços
          </Link>
          <Link href="#" className="hover:text-indigo-600 transition">
            Contato
          </Link> */}
        </div>

        {/* Botões */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="cursor-pointer rounded-full bg-indigo-600 px-6 py-3 text-base font-medium border-1 text-white hover:bg-indigo-900 transition">
              Entrar
            </button>
          </Link>

          <Link href="/register">
            <button className="cursor-pointer rounded-full bg-white px-6 py-3 text-base font-medium border border-indigo-600 text-indigo-600 hover:bg-gray-100 transition">
              Registre-se
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
