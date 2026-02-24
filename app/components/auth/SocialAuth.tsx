import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";

export default function SocialAuth() {
  return (
    <>
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm text-gray-500">Ou entre com</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      <div className="flex gap-4">
        <button className="flex place-items-center justify-center gap-2 cursor-pointer flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
          <FcGoogle />
          Google
        </button>
        <button className="flex place-items-center justify-center gap-2 cursor-pointer flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
          <FaApple />
          Apple
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Ainda não tem conta?{" "}
        <Link href="/register" className="text-indigo-600 hover:underline">
          Registrar
        </Link>
      </p>
    </>
  );
}
