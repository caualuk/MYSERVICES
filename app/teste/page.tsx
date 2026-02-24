"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import RadiusModal from "@/app/components/RadiusModal/RadiusModal";

export default function TestAuth() {
  const [isRadiusOpen, setIsRadiusOpen] = useState(false);

  useEffect(() => {
    async function testAuth() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Sem token");
        return;
      }

      const response = await fetch("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Resposta da API:", data);
    }

    testAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {isRadiusOpen && (
        <RadiusModal
          onClose={() => setIsRadiusOpen(false)}
          onSave={async (value) => {
            setIsRadiusOpen(false);
          }}
        />
      )}
      <Sidebar onOpenRadius={() => setIsRadiusOpen(true)} />
      <main className="flex-1 flex items-center justify-center">
        <div>Testando autenticação... olha o console 👀</div>
      </main>
    </div>
  );
}
