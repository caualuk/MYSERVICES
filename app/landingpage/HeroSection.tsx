export default function HeroSection() {
  return (
    <section className="w-[100%] h-[500px] mt-9 flex flex-col justify-center gap-10 text-center">
      <h1 className="text-6xl font-bold">
        <span className="text-indigo-600">Somos o match perfeito</span>
        <br />
        <span className="text-black">entre clientes e profissionais.</span>
      </h1>

      <div className="break-words text-[22px] font-medium max-w-[750px] mx-auto text-gray-600">
        Conecte-se com pessoas da sua região de forma rápida e inteligente.
        Cadastro simples, busca por cidade, contato direto e contratação sem
        burocracia, <span className="font-bold">tudo em um só lugar.</span>
      </div>

      <div className="flex gap-5 place-items-center justify-center mt-6">
        {/* <button className="cursor-pointer rounded-full bg-indigo-600 px-8 py-3 text-[18px] font-bold border border-indigo-600 text-white transition hover:bg-indigo-700 hover:text-white">
          Quero testar gratuitamente
        </button> */}
        <button className="cursor-pointer rounded-full bg-white px-8 py-3 text-[18px] font-bold border border-indigo-600 text-indigo-600 transition hover:bg-purple-50">
          Como funciona
        </button>
      </div>
    </section>
  );
}
