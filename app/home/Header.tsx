"use client";

import SearchHome from "../components/Search/SearchHome";
import { MdEmail } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import Image from "next/image";

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

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">
            
            <button className="p-2 rounded-full hover:bg-white text-indigo-600 transition cursor-pointer">
              <MdEmail size={24} />
            </button>

            <button className="p-2 rounded-full hover:bg-white text-indigo-600 transition cursor-pointer">
              <FaBell size={24} />
            </button>

            <div className="w-px h-6 bg-gray-300" />

            <div className="flex items-center gap-3">
              <Image
                src="https://media.licdn.com/dms/image/v2/D4E03AQG4xx_BFwDqSw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727653238905?e=1773273600&v=beta&t=kL-pRTv0LWIfRX6qpy1l5D1cyP5n61VuU1qGHKmLBlo"
                alt="User"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">
                Cauã
              </span>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}