"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import ProfileLayout from "./_components/ProfileLayout";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileInfoTabs from "./_components/ProfileInfoTabs";
import ProfileForm from "./_components/ProfileForm";
import RadiusModal from "@/app/components/RadiusModal/RadiusModal";

export default function ProfilePage() {
  const [isRadiusOpen, setIsRadiusOpen] = useState(false);

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
      <main className="flex-1">
        <ProfileLayout>
          <ProfileHeader name="Maher Zain" />
          <ProfileInfoTabs />
          <ProfileForm />
        </ProfileLayout>
      </main>
    </div>
  );
}
