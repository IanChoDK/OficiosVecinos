"use client";

import React, { useState, useMemo } from "react";
import mockData from "@/data/mockData.json";
import { Provider } from "@/lib/storage";
import { TradeCard } from "../TradeCard";
import { CategoryGrid } from "../CategoryGrid";
import { Input } from "../Input";
import { Button } from "../Button";

interface ServicesViewProps {
  providers: Provider[];
  initialCategory?: string;
  onContactProvider: (provider: Provider) => void;
  onSelectProvider: (provider: Provider) => void;
  onOpenCreateService: () => void;
  role: "cliente" | "prestador";
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  providers,
  initialCategory = "",
  onContactProvider,
  onSelectProvider,
  onOpenCreateService,
  role,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Todos los barrios");
  const [isLoading, setIsLoading] = useState(false);

  // Filtrado reactivo en cliente
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      const matchSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        !selectedCategory ||
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        p.secondaryCategory?.toLowerCase() === selectedCategory.toLowerCase();

      const matchNeighborhood =
        selectedNeighborhood === "Todos los barrios" ||
        p.neighborhood.toLowerCase() === selectedNeighborhood.toLowerCase();

      return matchSearch && matchCategory && matchNeighborhood;
    });
  }, [providers, searchTerm, selectedCategory, selectedNeighborhood]);

  const handleCategorySelect = (catName: string) => {
    setIsLoading(true);
    setSelectedCategory(catName);
    setTimeout(() => setIsLoading(false), 120);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedNeighborhood("Todos los barrios");
  };

  return (
    <div className="flex flex-col gap-5 pb-20 md:pb-8 animate-fadeIn">
      {/* Encabezado y Barra de Búsqueda */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#00112B] tracking-tight">
              Explorar Oficios Vecinales
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Encontrá al profesional más confiable y cercano a tu domicilio
            </p>
          </div>
          {role === "prestador" && (
            <Button
              variant="primary"
              size="md"
              onClick={onOpenCreateService}
              className="shrink-0"
            >
              <span>➕</span>
              <span>Ofrecer nuevo servicio</span>
            </Button>
          )}
        </div>

        {/* Buscador de texto */}
        <Input
          label="¿Qué arreglo o profesional necesitas hoy?"
          placeholder="Ej: plomero, destapar caño, Roberto, electricista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filtro por Barrio */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="barrio-select"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1"
          >
            <span>📍</span>
            <span>Filtrar por Barrio</span>
          </label>
          <select
            id="barrio-select"
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-sm shadow-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
          >
            <option value="Todos los barrios">Todos los barrios de la ciudad</option>
            {mockData.neighborhoods.map((barrio) => (
              <option key={barrio} value={barrio}>
                {barrio}
              </option>
            ))}
          </select>
        </div>

        {/* Carrusel de Categorías con iconos circulares (Stitch CategoryGrid) */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
            Rubros en tu radio barrial:
          </span>
          <CategoryGrid
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            showAllOption={true}
          />
        </div>
      </section>

      {/* Resultados de Búsqueda */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-bold text-slate-700">
            {filteredProviders.length}{" "}
            {filteredProviders.length === 1
              ? "prestador encontrado"
              : "prestadores encontrados"}
          </span>
          {(searchTerm || selectedCategory || selectedNeighborhood !== "Todos los barrios") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#1764AE] hover:underline p-1 min-h-[44px] flex items-center"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* 4 Estados UI de la pantalla */}
        {isLoading ? (
          // ⏳ Loading State (Skeleton)
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-5 border border-slate-200 animate-pulse flex flex-col gap-3 min-h-[220px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-10 bg-slate-200 rounded-xl mt-auto"></div>
              </div>
            ))}
          </div>
        ) : filteredProviders.length === 0 ? (
          // 📭 Empty State Empático
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center gap-3 my-4">
            <span className="text-5xl" aria-hidden="true">
              🏘️
            </span>
            <h2 className="text-lg font-bold text-[#00112B]">
              Todavía no hay profesionales registrados con ese criterio
            </h2>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              {selectedCategory
                ? `Todavía no hay profesionales de ${selectedCategory} en ${selectedNeighborhood}. ¡Contale a tu técnico de confianza para que se sume a la red barrial!`
                : "No encontramos resultados para tu búsqueda. Probá buscando por otro barrio o limpiando los filtros."}
            </p>
            <Button
              variant="secondary"
              size="md"
              onClick={handleResetFilters}
              className="mt-2 font-bold"
            >
              Ver todos los prestadores disponibles
            </Button>
          </div>
        ) : (
          // ✅ Success State: Cards con diseño Stitch
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProviders.map((provider) => (
              <TradeCard
                key={provider.id}
                provider={provider}
                variant="full"
                onSelect={onSelectProvider}
                onContact={onContactProvider}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
