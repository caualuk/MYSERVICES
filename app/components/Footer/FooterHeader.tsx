export default function FooterHeader() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-gray-900 text-white">
      {/* Parte esquerda: Logo e copyright */}
      <div className="flex items-center gap-6">
        <div className="text-xl font-bold">Pexo</div>
        <div className="text-sm text-gray-400">
          © 2025 Pexo Inc.
        </div>
      </div>

      {/* Parte direita: Slogan ou mensagem */}
      <div className="mt-3 md:mt-0 text-center md:text-right text-gray-300">
        &quot;Getting started with Aria is easy — just like our payments.&quot;
      </div>
    </footer>
  );
}