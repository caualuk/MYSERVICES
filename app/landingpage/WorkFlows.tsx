import FunctionalityCards from "./FunctionalityCards";

export default function WorkFlowsSection() {
  return (
    <section className="w-[100%] h-[550px] flex flex-col justify-center gap-7">
      <div className="flex flex-col text-center justify-center p-10 gap-7">
        <span className="font-bold text-5xl text-indigo-600">
          Como funciona na prática?
        </span>
        <div className="break-words text-[20px] font-medium max-w-[750px] mx-auto text-gray-600">
          Um processo simples, direto e pensado para facilitar o serviço do início ao fim.
        </div>
      </div>
      <FunctionalityCards />
    </section>
  );
}
