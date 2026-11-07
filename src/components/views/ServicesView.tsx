"use client";

import React, { useState, useMemo } from "react";
import mockData from "@/data/mockData.json";
import { Provider } from "@/lib/storage";
import { ProviderCard } from "../ProviderCard";
import { Input } from "../Input";
import { Button } from "../Button";

interface ServicesViewProps {
  providers: Provider[];
  initialCategory?: string;
  onContactProvider: (provider: Provider) => void;
  onOpenCreateService: () => void;
  role: "cliente" | "prestador";
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  providers,
  initialCategory = "",
  onContactProvider,
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

  const handleCategoryChange = (catName: string) => {
    setIsLoading(true);
    setSelectedCategory(catName === selectedCategory ? "" : catName);
    setTimeout(() => setIsLoading(false), 150);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedNeighborhood("Todos los barrios");
  };

  return (
    <div className="flex flex-col gap-5 pb-20 md:pb-8">
      {/* Encabezado de Búsqueda */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#00112B]">
              Búsqueda de Oficios Barriales
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Encontrá al profesional más cercano a tu domicilio
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
          label="¿Qué servicio o persona estás buscando?"
          placeholder="Ej: plomero, destapar caño, Carlos, electricista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Selector de Barrio / Zona */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="barrio-select"
            className="text-sm font-semibold text-[#00112B] flex items-center gap-1"
          >
            <span>📍</span>
            <span>Filtrar por Barrio</span>
          </label>
          <select
            id="barrio-select"
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
          >
            <option value="Todos los barrios">Todos los barrios de la ciudad</option>
            {mockData.neighborhoods.map((barrio) => (
              <option key={barrio} value={barrio}>
                {barrio}
              </option>
            ))}
          </select>
        </div>

        {/* Chips de Categorías */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
            Rubros de Oficio:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange("")}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1764AE] ${
                !selectedCategory
                  ? "bg-[#1764AE] text-white border-[#1764AE] shadow-sm"
                  : "bg-gray-100 text-[#00112B] border-gray-200 hover:bg-gray-200"
              }`}
            >
              Todos los rubros
            </button>
            {mockData.categories.map((cat) => {
              const active = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1764AE] ${
                    active
                      ? "bg-[#1764AE] text-white border-[#1764AE] shadow-sm"
                      : "bg-gray-100 text-[#00112B] border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Listado de Resultados */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-semibold text-gray-700">
            {filteredProviders.length}{" "}
            {filteredProviders.length === 1
              ? "prestador encontrado"
              : "prestadores encontrados"}
          </span>
          {(searchTerm || selectedCategory || selectedNeighborhood !== "Todos los barrios") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#1764AE] hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* 4 Estados UI de la pantalla */}
        {isLoading ? (
          // ⏳ Loading State (Skeleton)
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-5 border border-gray-200 animate-pulse flex flex-col gap-3 min-h-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-10 bg-gray-200 rounded-xl mt-auto"></div>
              </div>
            ))}
          </div>
        ) : filteredProviders.length === 0 ? (
          // 📭 Empty State Empático (Regla de UX Writing)
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center gap-3 my-4">
            <span className="text-5xl">🏘️</span>
            <h3 className="text-lg font-bold text-[#00112B]">
              Todavía no hay profesionales registrados con ese criterio
            </h3>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
              {selectedCategory
                ? `Todavía no hay profesionales de ${selectedCategory} en ${selectedNeighborhood}. ¡Contale a tu técnico de confianza para que se sume a la red!`
                : "No encontramos resultados para tu búsqueda. Probá buscando por otro barrio o quitando los filtros."}
            </p>
            <Button
              variant="secondary"
              size="md"
              onClick={handleResetFilters}
              className="mt-2"
            >
              Ver todos los prestadores disponibles
            </Button>
          </div>
        ) : (
          // ✅ Success State: Despliegue completo de prestadores
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onContact={onContactProvider}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
