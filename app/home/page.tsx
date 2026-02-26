"use client";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "./Header";
import CTA from "./Cards/CTA";
import ProfileCard from "./Cards/ProfileCard";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import EmployeesCarousel from "./EmployeeCards/EmployeesCarousel";

import RadiusModal from "../components/RadiusModal/RadiusModal";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isRadiusOpen, setIsRadiusOpen] = useState(false);
  const [radius, setRadius] = useState<number | null>(null);

  useEffect(() => {
    async function validateUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          console.error(
            "Invalid response type. Expected JSON, got:",
            contentType,
          );
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const user = await response.json();

        setRadius(user.radius);

        if (!user.has_set_radius) {
          setIsRadiusOpen(true);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error validating user:", error);
        localStorage.removeItem("token");
        router.push("/login");
      }
    }

    validateUser();
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen={true} message="Carregando..." />;
  }

  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      {isRadiusOpen && (
        <RadiusModal
          onClose={() => setIsRadiusOpen(false)}
          onSave={async (value) => {
            try {
              const token = localStorage.getItem("token");

              const response = await fetch(
                "http://localhost:8000/users/radius",
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ radius: value }),
                },
              );

              if (!response.ok) {
                console.error("Failed to update radius:", response.status);
                return;
              }

              const contentType = response.headers.get("content-type");
              if (!contentType?.includes("application/json")) {
                console.error(
                  "Invalid response type. Expected JSON, got:",
                  contentType,
                );
                return;
              }

              setRadius(value);
              setIsRadiusOpen(false);
            } catch (error) {
              console.error("Error updating radius:", error);
            }
          }}
        />
      )}
      <Sidebar onOpenRadius={() => setIsRadiusOpen(true)} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 p-8 pb-0 flex gap-6 overflow-hidden">
          <div className="flex flex-1 flex-col gap-10 overflow-hidden">
            <CTA />
            <div className="flex-1 overflow-hidden">
              <EmployeesCarousel radius={radius} />
            </div>
          </div>
          <div className="w-[380px] h-full overflow-hidden pb-4">
            <ProfileCard />
          </div>
        </div>
      </main>
    </div>
  );
}
