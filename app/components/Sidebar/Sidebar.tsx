"use client";

import Link from "next/link";
import { FaRegHeart, FaCog, FaSignOutAlt, FaLightbulb } from "react-icons/fa";
import {
  MdSpaceDashboard,
  MdPeopleAlt,
  MdOutlineMyLocation,
} from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDesignServices } from "react-icons/md";

interface SidebarProps {
  onOpenRadius: () => void;
}

export default function Sidebar({ onOpenRadius }: SidebarProps) {
  function handleClick(item: any) {
    if (item.action === "open-radius-modal") {
      onOpenRadius();
      return;
    }
  }

  const menuItems = [
    {
      label: "Início",
      icon: MdSpaceDashboard,
      href: "/home",
      category: "OVERVIEW",
    },
    {
      label: "Pagamentos",
      icon: GrTransaction,
      href: "/inbox",
      category: "OVERVIEW",
    },
    {
      label: "Funcionários",
      icon: MdPeopleAlt,
      href: "/employees",
      category: "OVERVIEW",
    },
    {
      label: "Favoritos",
      icon: FaRegHeart,
      href: "/task",
      category: "OVERVIEW",
    },
    {
      label: "Alterar Raio",
      icon: MdOutlineMyLocation,
      action: "open-radius-modal",
      category: "OVERVIEW",
    },
    {
      label: "Serviços",
      icon: MdOutlineDesignServices,
      href: "/services",
      category: "OVERVIEW",
    }
  ];

  // const friends = [
  //   { name: "Bagas Mahpie", status: "Friend", avatar: "BM" },
  //   { name: "Sir Dandy", status: "Old Friend", avatar: "SD" },
  //   { name: "Jhon Tosan", status: "Friend", avatar: "JT" },
  // ];

  const settings = [
    { label: "Setting", icon: FaCog, href: "/settings" },
    { label: "Logout", icon: FaSignOutAlt, href: "/logout", isLogout: true },
  ];

  return (
    <div className="w-64 h-screen rounded-lg bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-lg flex items-center justify-center">
            <FaLightbulb className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold text-indigo-600">MyServices</span>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Visão Geral
          </h3>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              // Se for ação (abrir modal)
              if (item.action) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleClick(item)}
                    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-700 hover:bg-indigo-50 rounded-lg transition group"
                  >
                    <Icon className="text-gray-600 group-hover:text-indigo-600" />
                    <span className="text-sm font-medium group-hover:text-indigo-600">
                      {item.label}
                    </span>
                  </button>
                );
              }

              // Se for navegação normal
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition group"
                >
                  <Icon className="text-gray-600 group-hover:text-indigo-600" />
                  <span className="text-sm font-medium group-hover:text-indigo-600">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Friends Section
        <div className="px-4 py-6 border-t border-gray-200">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Friends
          </h3>

          <div className="space-y-3">
            {friends.map((friend) => (
              <div
                key={friend.name}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-sm text-white">
                  {friend.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {friend.name}
                  </p>
                  <p className="text-xs text-gray-500">{friend.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Profile Section */}
        <div className="px-4 py-6 border-t border-gray-200">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Perfil
          </h3>

          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition group"
          >
            <CgProfile className="text-gray-600 group-hover:text-indigo-600" />
            <span className="text-sm font-medium group-hover:text-indigo-600">
              Meu Perfil
            </span>
          </Link>
        </div>
      </nav>

      {/* Settings Section */}
      <div className="border-t border-gray-200 px-4 py-4 space-y-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Settings
        </h3>

        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                item.isLogout
                  ? "text-orange-600 hover:bg-orange-50"
                  : "text-gray-700 hover:bg-indigo-50"
              }`}
            >
              <Icon />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
