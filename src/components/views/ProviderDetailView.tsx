"use client";

import React, { useState } from "react";
import { Provider } from "@/lib/storage";

interface ProviderDetailViewProps {
  provider: Provider;
  onBack: () => void;
  onSelectPro: (provider: Provider) => void;
  onSendQuickMessage: (provider: Provider, message: string) => void;
}

export const ProviderDetailView: React.FC<ProviderDetailViewProps> = ({
  provider,
  onBack,
  onSelectPro,
  onSendQuickMessage,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [quickMessage, setQuickMessage] = useState("");

  const gallery =
    provider.gallery && provider.gallery.length > 0
      ? provider.gallery
      : [
          provider.imageUrl ||
            "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80",
        ];

  const handleQuickMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickMessage.trim()) {
      onSendQuickMessage(provider, quickMessage.trim());
      setQuickMessage("");
    }
  };

  return (
    <div className="flex flex-col w-full pb-36 animate-fadeIn">
      {/* Barra de Navegación Superior con botón Volver */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver al listado"
          className="flex items-center gap-2 text-slate-700 hover:text-[#1764AE] font-bold text-sm px-3 py-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span>Volver</span>
        </button>

        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Ficha del Profesional
        </span>
      </div>

      {/* Galería de Trabajos y Portada */}
      <section className="relative w-full h-64 sm:h-80 bg-slate-800 rounded-3xl overflow-hidden shadow-md">
        <img
          src={gallery[activePhotoIndex]}
          alt={`Trabajo realizado por ${provider.name}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Insignia Oficial de Verificación */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm text-xs font-bold text-slate-800">
          <svg
            className="w-4 h-4 text-[#1764AE] fill-current"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Verificado por Vecinos</span>
        </div>

        {/* Indicador de fotos */}
        <div className="absolute bottom-4 right-4 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
          {activePhotoIndex + 1} / {gallery.length} fotos
        </div>

        {gallery.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {gallery.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                aria-label={`Ver foto ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  activePhotoIndex === idx
                    ? "w-6 bg-[#1764AE]"
                    : "w-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Información Principal del Profesional */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 mt-4">
        {/* Título y Estrellas */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#00112B] tracking-tight">
              {provider.name}
            </h1>
            <p className="text-sm sm:text-base font-bold text-[#1764AE] flex items-center gap-2 mt-1">
              <span>{provider.category}</span>
              {provider.secondaryCategory && (
                <>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                  <span className="text-slate-500 font-medium">
                    {provider.secondaryCategory}
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="flex items-center sm:flex-col sm:items-end gap-2 sm:gap-0.5">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              {provider.rating.toFixed(1)}{" "}
              <span className="text-slate-400 font-normal">
                ({provider.reviewCount} opiniones)
              </span>
            </span>
          </div>
        </div>

        {/* Metadatos Rápidos: Cobertura, Respuesta, Garantía */}
        <div className="grid grid-cols-3 gap-2.5 py-4 border-b border-slate-100 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <svg
              className="w-5 h-5 text-[#1764AE] mx-auto mb-1"
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
            <span className="text-[11px] text-slate-500 block font-medium">Cobertura</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              {provider.distanceKm ? `A ${provider.distanceKm} km` : "En tu barrio"}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <svg
              className="w-5 h-5 text-emerald-600 mx-auto mb-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-[11px] text-slate-500 block font-medium">Responde</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">&lt; 15 min</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <svg
              className="w-5 h-5 text-[#1764AE] mx-auto mb-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <span className="text-[11px] text-slate-500 block font-medium">Garantía</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">100% Barrial</span>
          </div>
        </div>

        {/* Información del Servicio y Descripción */}
        <article className="py-4 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Información del Servicio
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            {provider.description}
          </p>

          <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-emerald-600 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Herramientas propias y repuestos de primera marca</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-emerald-600 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Presupuesto sin cargo a vecinos del barrio</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-emerald-600 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Trato directo y cobro en efectivo / transferencia sin comisiones</span>
            </li>
          </ul>
        </article>

        {/* Servicios Ofrecidos & Tarifas de Referencia */}
        {provider.servicesOffered && provider.servicesOffered.length > 0 && (
          <section className="py-4 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Servicios Destacados
            </h2>
            <div className="space-y-2.5">
              {provider.servicesOffered.map((serv) => (
                <div
                  key={serv.id}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-start justify-between gap-3"
                >
                  <div>
                    <h3 className="text-sm font-bold text-[#00112B]">{serv.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{serv.description}</p>
                  </div>
                  <span className="text-sm font-extrabold text-[#1764AE] whitespace-nowrap">
                    ${serv.basePrice.toLocaleString("es-AR")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tarifa de Diagnóstico Transparente */}
        <section className="pt-4 flex items-baseline justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Tarifa visita / diagnóstico
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              * Descontable si se aprueba el presupuesto en el momento.
            </p>
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#00112B]">
            {provider.priceInfo}
          </span>
        </section>
      </section>

      {/* Barra Inferior Flotante de Interacción (Stitch Wireframe) */}
      <aside className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 pt-3 pb-6 shadow-[0_-6px_24px_rgba(0,17,43,0.08)] z-40 max-w-4xl mx-auto">
        <div className="max-w-xl mx-auto space-y-2.5">
          {/* Consulta Rápida */}
          <form onSubmit={handleQuickMessageSubmit} className="relative flex items-center">
            <input
              type="text"
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              placeholder="Enviar mensaje o consulta rápida..."
              className="w-full h-11 pl-4 pr-12 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:border-[#1764AE] focus:ring-2 focus:ring-[#1764AE]/20 text-slate-800 placeholder-slate-400 transition-all shadow-inner"
            />
            <button
              type="submit"
              aria-label="Enviar consulta rápida"
              className="absolute right-1.5 top-1.5 w-8 h-8 rounded-full bg-[#1764AE] hover:bg-[#00112B] active:scale-95 text-white flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
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
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>

          {/* Botón Seleccionar Profesional */}
          <button
            type="button"
            onClick={() => onSelectPro(provider)}
            className="w-full h-12 bg-[#1764AE] hover:bg-[#00112B] active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#1764AE]/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2"
          >
            <span>Seleccionar profesional</span>
            <svg
              className="w-4 h-4 opacity-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </aside>
    </div>
  );
};
