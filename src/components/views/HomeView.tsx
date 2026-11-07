"use client";

import React from "react";
import mockData from "@/data/mockData.json";
import { Provider } from "@/lib/storage";
import { CategoryCard } from "../CategoryCard";
import { ProviderCard } from "../ProviderCard";
import { Button } from "../Button";

interface HomeViewProps {
  role: "cliente" | "prestador";
  providers: Provider[];
  onSelectCategory: (categoryId: string) => void;
  onContactProvider: (provider: Provider) => void;
  onOpenCreateService: () => void;
  onNavigateToServices: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  role,
  providers,
  onSelectCategory,
  onContactProvider,
  onOpenCreateService,
  onNavigateToServices,
}) => {
  const featuredProviders = providers.slice(0, 4);

  return (
    <div className="flex flex-col gap-6 pb-20 md:pb-8">
      {/* Hero Banner Empático y Accesible */}
      <section className="bg-gradient-to-br from-[#1764AE] to-[#00112B] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-xs">
            {role === "cliente" ? "🤝 Red Barrial Solidaria" : "👷 Red de Prestadores"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono leading-tight">
            {role === "cliente"
              ? "Encontrá al oficio de confianza en tu barrio"
              : "Mostrá tu trabajo a los vecinos de tu zona"}
          </h2>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            {role === "cliente"
              ? "Sin tarjetas de crédito ni trámites difíciles. Hablás por teléfono o WhatsApp y pagás en mano al terminar."
              : "Recibí llamados directos de vecinos cercanos que necesitan plomería, electricidad, albañilería y más."}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            {role === "cliente" ? (
              <Button
                variant="secondary"
                size="lg"
                onClick={onNavigateToServices}
                className="font-bold text-[#00112B]"
              >
                <span>🔍</span>
                <span>Buscar oficios cercanos</span>
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenCreateService}
                className="font-bold text-[#00112B]"
              >
                <span>➕</span>
                <span>Publicar nuevo oficio</span>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Sección 1: Categorías Populares (Carrusel con última card cortada - Regla Gestalt) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-lg font-bold font-mono text-[#00112B]">
              Servicios más Populares
            </h3>
            <p className="text-xs text-gray-500">
              Deslizá hacia la derecha para ver todos los rubros
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToServices}
            className="text-xs font-bold text-[#1764AE] hover:underline p-1 min-h-[44px] flex items-center"
          >
            Ver todos ➔
          </button>
        </div>

        {/* Contenedor horizontal con overflow y padding que corta la última card */}
        <div className="flex gap-3 overflow-x-auto pb-3 pt-1 -mx-4 px-4 scrollbar-none snap-x">
          {mockData.categories.map((cat) => (
            <div key={cat.id} className="snap-start shrink-0">
              <CategoryCard
                id={cat.id}
                name={cat.name}
                iconName={cat.icon}
                onClick={() => onSelectCategory(cat.name)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Sección 2: Profesionales y Trabajadores Recomendados */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-lg font-bold font-mono text-[#00112B]">
              Vecinos con Mejores Calificaciones
            </h3>
            <p className="text-xs text-gray-500">
              Recomendados por los propios vecinos de la zona
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onContact={onContactProvider}
            />
          ))}
        </div>
      </section>

      {/* Sección 3: Compromiso de Seguridad y Simplicidad */}
      <section className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col gap-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#1764AE] flex items-center gap-2">
          <span>🛡️</span>
          <span>¿Cómo funciona Oficios Vecinos?</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-100 flex flex-col gap-1">
            <span className="font-bold text-[#00112B]">1. Buscás a tu vecino</span>
            <p className="text-gray-600">
              Elegís el oficio que necesitás y filtrás por tu barrio para que llegue rápido.
            </p>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-100 flex flex-col gap-1">
            <span className="font-bold text-[#00112B]">2. Hablás directamente</span>
            <p className="text-gray-600">
              Llamás o mandás mensaje para arreglar día, horario y presupuesto sin intermediarios.
            </p>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-100 flex flex-col gap-1">
            <span className="font-bold text-[#00112B]">3. Pagás en mano y calificás</span>
            <p className="text-gray-600">
              Abonás en efectivo al terminar y le dejás 5 estrellas para ayudar a otros vecinos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
