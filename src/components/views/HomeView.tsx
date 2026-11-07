"use client";

import React from "react";
import { Provider } from "@/lib/storage";
import { TradeCard } from "../TradeCard";

interface HomeViewProps {
  role: "cliente" | "prestador";
  providers: Provider[];
  onSelectCategory: (categoryName: string) => void;
  onContactProvider: (provider: Provider) => void;
  onSelectProvider: (provider: Provider) => void;
  onOpenCreateService: () => void;
  onNavigateToServices: () => void;
  onNavigateToTab: (tab: "inicio" | "servicios" | "chat" | "perfil") => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  role,
  providers,
  onSelectCategory,
  onContactProvider,
  onSelectProvider,
  onOpenCreateService,
  onNavigateToServices,
  onNavigateToTab,
}) => {
  const featuredProviders = providers.slice(0, 4);

  // VISTA PARA ROL PRESTADOR (Stitch Wireframe: home_prestador)
  if (role === "prestador") {
    return (
      <div className="flex flex-col gap-6 pb-20 md:pb-8 animate-fadeIn max-w-xl mx-auto w-full">
        {/* Módulo Central: 'Gestión' */}
        <section className="bg-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-inner border border-slate-300/70">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00112B] tracking-tight mb-6">
            Gestión de Oficios
          </h2>

          <div className="w-full space-y-3.5">
            {/* Botón: Ofrecer un nuevo servicio */}
            <button
              type="button"
              onClick={onOpenCreateService}
              className="w-full min-h-[56px] bg-[#54595E] hover:bg-[#40454A] active:scale-98 text-white py-4 px-6 rounded-2xl shadow-sm flex items-center justify-center gap-3 text-center transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2"
            >
              <svg className="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base font-bold tracking-wide">
                Ofrecer un nuevo servicio
              </span>
            </button>

            {/* Botón: Mis servicios publicados */}
            <button
              type="button"
              onClick={onNavigateToServices}
              className="w-full min-h-[56px] bg-[#54595E] hover:bg-[#40454A] active:scale-98 text-white py-4 px-6 rounded-2xl shadow-sm flex items-center justify-center gap-3 text-center transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2"
            >
              <svg className="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
              <span className="text-base font-bold tracking-wide">
                Mis servicios y solicitudes
              </span>
            </button>
          </div>
        </section>

        {/* Accesos Rápidos Inferiores (Píldoras de Navegación Stitch) */}
        <div className="flex flex-col space-y-3">
          <button
            type="button"
            onClick={() => onNavigateToTab("perfil")}
            className="w-full min-h-[48px] bg-[#DADBDD] hover:bg-[#CFD1D4] active:scale-98 text-slate-800 py-3.5 px-6 rounded-full shadow-xs flex items-center justify-center gap-2 text-base font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>Ir al Perfil</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateToTab("chat")}
            className="w-full min-h-[48px] bg-[#DADBDD] hover:bg-[#CFD1D4] active:scale-98 text-slate-800 py-3.5 px-6 rounded-full shadow-xs flex items-center justify-center gap-2 text-base font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span>Mensajes y Presupuestos</span>
          </button>
        </div>
      </div>
    );
  }

  // VISTA PARA ROL CLIENTE (Stitch Wireframe: home_cliente)
  return (
    <div className="flex flex-col gap-6 pb-20 md:pb-8 animate-fadeIn">
      {/* Hero Banner Section con Badges de Confianza */}
      <section className="bg-gradient-to-br from-[#CBD5E1] via-[#B9C4D0] to-[#00112B] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Overlays decorativos */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00112B]/90 via-[#00112B]/50 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-xl flex flex-col gap-3">
          {/* Floating Badges Stitch */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1764AE] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              Red Barrial Verificada
            </span>
            <span className="inline-flex items-center gap-1 bg-[#00112B]/75 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white/95">
              <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              +1.200 vecinos conformes
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
            Soluciones de confianza para tu hogar.
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Conectá de forma directa y segura con plomeros, electricistas, gasistas y carpinteros recomendados por vecinos de tu misma zona.
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-white/20 text-xs text-white/90 font-medium">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Sin intermediarios caros
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Presupuestos ágiles
            </span>
          </div>
        </div>
      </section>

      {/* Contenedor Stitch: Servicios más Populares */}
      <section className="bg-[#DADDE2] rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-300">
        <button
          type="button"
          onClick={onNavigateToServices}
          className="w-full bg-[#6C727D] hover:bg-[#5E646E] text-white py-4 px-6 rounded-2xl shadow-md transition-all active:scale-[0.98] flex flex-col items-center justify-center text-center group focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2"
        >
          <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-slate-100 flex items-center gap-2">
            Servicios más populares
            <svg className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
          <span className="text-xs text-slate-200 font-medium mt-0.5">
            Plomería • Electricidad • Pintura • Cerrajería • Gas
          </span>
        </button>

        {/* Quick Badges de Acceso Directo por Oficio */}
        <div className="w-full grid grid-cols-4 gap-2 mt-3 pt-1">
          <button
            type="button"
            onClick={() => onSelectCategory("Plomería")}
            className="flex flex-col items-center text-center group active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#1764AE] shadow-xs group-hover:bg-blue-50 transition-colors">
              <span className="text-xl">🔧</span>
            </div>
            <span className="text-xs font-bold text-slate-800 mt-1">Plomería</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory("Electricidad")}
            className="flex flex-col items-center text-center group active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-amber-600 shadow-xs group-hover:bg-amber-50 transition-colors">
              <span className="text-xl">⚡</span>
            </div>
            <span className="text-xs font-bold text-slate-800 mt-1">Luz</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory("Pintura")}
            className="flex flex-col items-center text-center group active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-xs group-hover:bg-emerald-50 transition-colors">
              <span className="text-xl">🎨</span>
            </div>
            <span className="text-xs font-bold text-slate-800 mt-1">Pintura</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory("Carpintería")}
            className="flex flex-col items-center text-center group active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-stone-700 shadow-xs group-hover:bg-stone-50 transition-colors">
              <span className="text-xl">🪚</span>
            </div>
            <span className="text-xs font-bold text-slate-800 mt-1">Madera</span>
          </button>
        </div>
      </section>

      {/* Carrusel Horizontal de Prestadores (Leyes Gestalt: Continuidad con tarjeta cortada) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-bold text-[#00112B]">
              Profesionales Recomendados Cerca
            </h2>
            <p className="text-xs text-slate-500">
              Deslizá horizontalmente para ver más vecinos verificados
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToServices}
            className="text-xs font-bold text-[#1764AE] hover:underline min-h-[44px] flex items-center"
          >
            Ver todos ➔
          </button>
        </div>

        <div
          className="flex gap-3.5 overflow-x-auto pb-3 pt-1 -mx-4 px-4 no-scrollbar focus:outline-none"
          tabIndex={0}
          aria-label="Carrusel de profesionales de confianza"
          role="region"
        >
          {providers.map((provider) => (
            <TradeCard
              key={provider.id}
              provider={provider}
              variant="compact"
              onSelect={onSelectProvider}
              onContact={onContactProvider}
            />
          ))}
        </div>
      </section>

      {/* Grid de Vecinos con Mejores Calificaciones */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-bold text-[#00112B]">
              Vecinos con Mejores Opiniones
            </h2>
            <p className="text-xs text-slate-500">
              Evaluados con 5 estrellas por clientes reales del barrio
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProviders.map((provider) => (
            <TradeCard
              key={provider.id}
              provider={provider}
              variant="full"
              onSelect={onSelectProvider}
              onContact={onContactProvider}
            />
          ))}
        </div>
      </section>

      {/* Banner de Garantía Barrial y Confianza */}
      <section className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center gap-2 text-center text-slate-500 text-xs">
        <svg className="w-4 h-4 text-[#10B981] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path clipRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" fillRule="evenodd" />
        </svg>
        <span>Comunidad barrial protegida • Sin comisiones abusivas ni cargos ocultos</span>
      </section>
    </div>
  );
};
