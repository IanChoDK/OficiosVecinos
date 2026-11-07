"use client";

import React from "react";
import { Provider } from "@/lib/storage";
import { Button } from "./Button";
import { StarRating } from "./StarRating";

interface ProviderCardProps {
  provider: Provider;
  onContact: (provider: Provider) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onContact,
}) => {
  return (
    <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-3">
        {/* Encabezado: Avatar, Nombre y Zona */}
        <div className="flex items-start gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-3xl shrink-0 shadow-inner">
            {provider.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-[#00112B] truncate">
                {provider.name}
              </h3>
              {provider.featured && (
                <span className="text-[11px] font-semibold bg-amber-100 text-[#D97706] px-2 py-0.5 rounded-full border border-amber-300">
                  Recomendado
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-[#1764AE]">
              {provider.category}
              {provider.secondaryCategory && (
                <span className="text-gray-500 font-normal">
                  {" "}• {provider.secondaryCategory}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <span>📍</span>
              <span>{provider.neighborhood}</span>
            </p>
          </div>
        </div>

        {/* Reseñas y Estrellas */}
        <div className="flex items-center gap-2 bg-[#f8fafc] px-3 py-1.5 rounded-xl border border-gray-100">
          <StarRating rating={provider.rating} size="sm" />
          <span className="text-xs font-bold text-[#00112B]">
            {provider.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">
            ({provider.reviewCount} trabajos en el barrio)
          </span>
        </div>

        {/* Descripción y Disponibilidad */}
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
          {provider.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-2.5">
          <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            ● {provider.availability}
          </span>
          <span className="font-semibold text-[#00112B]">
            {provider.priceInfo}
          </span>
        </div>
      </div>

      {/* Acción Principal */}
      <Button
        variant="primary"
        fullWidth
        onClick={() => onContact(provider)}
        className="mt-1 font-semibold"
      >
        <span>📞</span>
        <span>Contactar a {provider.name.split(" ")[0]}</span>
      </Button>
    </article>
  );
};
