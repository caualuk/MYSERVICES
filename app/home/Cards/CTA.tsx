"use client"

import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

export default function CTA() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-3xl p-12 bg-gradient-to-r from-indigo-600 to-indigo-600 text-white">
        
        <div className="relative z-10 max-w-3xl flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Encontre o Profissional Ideal
          </h1>

          <span className="text-[18px]">
            Conecte-se com profissionais próximos e contrate seus serviços.
          </span>

          <div className="mt-4 flex items-center gap-4">
            <Link
              href="/employees"
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition"
            >
              Busque Profissionais
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}