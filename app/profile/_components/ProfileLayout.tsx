"use client";

import { ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <div className="min-h-screen bg-gray-200">{children}</div>;
}
