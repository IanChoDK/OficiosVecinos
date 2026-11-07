"use client";

import React from "react";
import { Provider } from "@/lib/storage";

interface TradeCardProps {
  provider: Provider;
  variant?: "compact" | "full";
  onSelect?: (provider: Provider) => void;
  onContact?: (provider: Provider) => void;
}

export const TradeCard: React.FC<TradeCardProps> = ({
  provider,
  variant = "full",
  onSelect,
  onContact,
}) => {
  const isCompact = variant === "compact";

  return (
    <article
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,17,43,0.05)] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden ${
        isCompact ? "w-72 flex-shrink-0" : "w-full"
      }`}
    >
      <div className="p-4 sm:p-5">
        {/* Encabezado: Avatar, Identificación, Insignia y Distancia */}
        <div className="flex items-start gap-3.5">
          <div className="relative flex-shrink-0">
            {provider.avatarUrl ? (
              <img
                src={provider.avatarUrl}
                alt={`Retrato de ${provider.name}`}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover bg-slate-100 border border-slate-200"
              />
            ) : (
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#00112B] text-white flex items-center justify-center text-2xl font-bold shadow-sm"
                aria-hidden="true"
              >
                {provider.avatar || provider.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            {provider.verifiedBadge && (
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center ring-2 ring-white text-white shadow-xs"
                title="Profesional verificado por vecinos"
                aria-label="Verificado"
              >
                <svg
                  className="w-3 h-3 stroke-white fill-none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-base sm:text-lg font-bold text-[#00112B] truncate tracking-tight">
                {provider.name}
              </h3>
              {provider.distanceKm !== undefined && (
                <span className="flex items-center text-xs font-bold text-[#1764AE] flex-shrink-0 bg-blue-50 px-2 py-0.5 rounded-full">
                  <svg
                    className="w-3 h-3 mr-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {provider.distanceKm < 1
                    ? `a ${Math.round(provider.distanceKm * 1000)}m`
                    : `a ${provider.distanceKm.toFixed(1)} km`}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm font-semibold text-[#1764AE] truncate mt-0.5">
              {provider.category}
              {provider.secondaryCategory && ` • ${provider.secondaryCategory}`}
            </p>

            {/* Reputación / Estrellas */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <div className="flex items-center bg-amber-50 text-amber-900 border border-amber-200/60 font-bold text-xs px-2 py-0.5 rounded-md">
                <svg
                  className="w-3.5 h-3.5 text-amber-500 fill-current mr-1"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {provider.rating.toFixed(1)}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                ({provider.reviewCount} opiniones de vecinos)
              </span>
            </div>
          </div>
        </div>

        {/* Respaldo / Placa Comunitaria */}
        <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-slate-700">
          <svg
            className="w-4 h-4 text-[#1764AE] flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="truncate font-medium">
            {provider.neighborhood} • {provider.availability}
          </span>
        </div>

        {/* Descripción corta */}
        <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {provider.description}
        </p>
      </div>

      {/* Footer de Tarjeta con Tarifa y Botones de Acción */}
      <div className="bg-slate-50/80 border-t border-slate-100 p-3.5 sm:px-5 sm:py-3 flex items-center justify-between gap-2.5">
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Tarifa visita
          </span>
          <span className="text-sm sm:text-base font-extrabold text-[#00112B]">
            {provider.priceInfo.includes("$")
              ? provider.priceInfo.split("/")[0].trim()
              : provider.priceInfo}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onSelect && (
            <button
              type="button"
              onClick={() => onSelect(provider)}
              aria-label={`Ver perfil completo de ${provider.name}`}
              className="min-h-[44px] px-3 sm:px-4 py-2 text-xs font-bold text-[#00112B] bg-white hover:bg-slate-100 active:scale-95 border border-slate-200 rounded-xl transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2"
            >
              Ver perfil
            </button>
          )}

          {onContact && (
            <button
              type="button"
              onClick={() => onContact(provider)}
              aria-label={`Contactar a ${provider.name}`}
              className="min-h-[44px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#1764AE] hover:bg-[#00112B] active:scale-95 rounded-xl transition-all shadow-sm flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.974-.94 5.962 5.962 0 011.026-2.502C3.906 16.095 3 14.16 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
              <span>Contactar</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
