"use client";

import React from "react";
import {
  setStoredRole,
  setAccessibleFont,
  useAccessibleFont,
} from "@/lib/storage";

export type NavTab = "inicio" | "servicios" | "chat" | "perfil";

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  role: "cliente" | "prestador";
  onRoleChange: (role: "cliente" | "prestador") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  role,
  onRoleChange,
}) => {
  const accessibleFont = useAccessibleFont();

  const handleToggleAccessibleFont = () => {
    setAccessibleFont(!accessibleFont);
  };

  const handleToggleRole = () => {
    const nextRole = role === "cliente" ? "prestador" : "cliente";
    setStoredRole(nextRole);
    onRoleChange(nextRole);
  };

  const navItems = [
    { id: "inicio" as NavTab, label: "Página Principal", icon: "🏠" },
    { id: "servicios" as NavTab, label: "Servicios", icon: "🛠️" },
    { id: "chat" as NavTab, label: "Mensajes", icon: "💬" },
    { id: "perfil" as NavTab, label: "Mi Perfil", icon: "👤" },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo y Eslogan */}
          <div
            onClick={() => onTabChange("inicio")}
            className="flex items-center gap-2 cursor-pointer select-none"
            role="button"
            tabIndex={0}
            aria-label="Ir a Página Principal"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1764AE] text-white flex items-center justify-center text-xl font-bold shadow-md">
              OV
            </div>
            <div>
              <h1 className="text-lg font-bold font-mono text-[#00112B] leading-tight">
                Oficios Vecinos
              </h1>
              <p className="text-[11px] text-[#1764AE] font-semibold">
                Economía y Empleo Barrial
              </p>
            </div>
          </div>

          {/* Acciones de Cabecera: Conmutador de Rol y Accesibilidad */}
          <div className="flex items-center gap-2">
            {/* Botón de Modo Accesible (Texto Grande) */}
            <button
              type="button"
              onClick={handleToggleAccessibleFont}
              aria-pressed={accessibleFont}
              title="Alternar tamaño de texto grande accesible"
              className={`min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1764AE] ${
                accessibleFont
                  ? "bg-[#1764AE] text-white border-[#1764AE] shadow-inner"
                  : "bg-[#E2E2E3] text-[#00112B] border-gray-300 hover:bg-gray-300"
              }`}
            >
              <span className="text-sm">👁️</span>
              <span className="hidden sm:inline">Texto Grande</span>
              <span className="sm:hidden">A+</span>
            </button>

            {/* Botón de Chat con Notificación */}
            <button
              type="button"
              onClick={() => onTabChange("chat")}
              aria-label="Ver mensajes y chats con profesionales"
              className={`min-h-[44px] min-w-[44px] px-2.5 py-1.5 rounded-xl border flex items-center justify-center transition-all relative active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1764AE] ${
                currentTab === "chat"
                  ? "bg-[#1764AE] text-white border-[#1764AE]"
                  : "bg-white text-slate-700 border-gray-300 hover:bg-slate-100"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.974-.94 5.962 5.962 0 011.026-2.502C3.906 16.095 3 14.16 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white" />
            </button>

            {/* Selector de Rol: Cliente vs Prestador */}
            <button
              type="button"
              onClick={handleToggleRole}
              aria-label={`Cambiar rol actual. Ahora en modo ${
                role === "cliente" ? "Vecino que busca" : "Prestador de oficio"
              }`}
              className="min-h-[44px] px-3.5 py-1.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-[#00112B] hover:bg-blue-50/60 transition-all flex items-center gap-1.5 shadow-xs active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
            >
              <span>{role === "cliente" ? "🏡 Modo Vecino" : "🔧 Modo Prestador"}</span>
              <span className="text-[10px] text-gray-500 hidden md:inline">
                (Cambiar)
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation (visible on md+) */}
        <nav
          className="hidden md:flex border-t border-gray-100 bg-[#f8fafc]"
          aria-label="Navegación principal de escritorio"
        >
          <div className="max-w-4xl mx-auto w-full px-4 flex">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`flex-1 py-3 px-4 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1764AE] ${
                    active
                      ? "border-[#1764AE] text-[#1764AE] bg-white"
                      : "border-transparent text-gray-600 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation (visible on mobile only) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-xl flex justify-around py-1 px-2 safe-bottom"
        aria-label="Navegación móvil inferior"
      >
        {navItems.map((item) => {
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex-1 min-h-[52px] py-1 flex flex-col items-center justify-center rounded-xl transition-all select-none active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1764AE] ${
                active
                  ? "text-[#1764AE] font-bold"
                  : "text-gray-500 font-medium hover:text-gray-800"
              }`}
            >
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-[11px] leading-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
