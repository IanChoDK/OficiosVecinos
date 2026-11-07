"use client";

import React from "react";
import { ServiceQuote } from "@/lib/storage";

interface QuoteWidgetProps {
  quote: ServiceQuote;
  scheduledTime?: string;
  clientAddress?: string;
  onAccept?: () => void;
  onAdjustment?: () => void;
}

export const QuoteWidget: React.FC<QuoteWidgetProps> = ({
  quote,
  scheduledTime = "Mañana entre 08:30 y 10:00 hs",
  clientAddress = "Calle Colombres 312, Río Cuarto",
  onAccept,
  onAdjustment,
}) => {
  const isAccepted = quote.status === "aceptado";
  const isRejected = quote.status === "rechazado";
  const isPending = quote.status === "pendiente";

  return (
    <div className="w-full my-3">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-slate-200/90 overflow-hidden relative">
        {/* Franja superior azul distintiva */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#1764AE]"></div>

        {/* Encabezado del Presupuesto */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1764AE] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  Presupuesto Oficial
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isAccepted
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : isRejected
                      ? "bg-rose-100 text-rose-800 border border-rose-200"
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}
                >
                  {isAccepted ? "Confirmado" : isRejected ? "Rechazado" : "Pendiente"}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#00112B] truncate mt-1">
                {quote.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Desglose de Servicios y Materiales */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mb-3.5 space-y-2.5">
          {quote.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs sm:text-sm text-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1764AE]"></span>
                <span className="font-medium">{item.description}</span>
              </div>
              <span className="font-bold text-[#00112B]">
                ${item.amount.toLocaleString("es-AR")}
              </span>
            </div>
          ))}

          {/* Fila de Total */}
          <div className="pt-2.5 mt-1 border-t border-slate-200 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Monto Total Estimado
              </span>
              <p className="text-[11px] text-slate-500">
                Mano de obra y garantía comunitaria por 30 días
              </p>
            </div>
            <span className="text-xl sm:text-2xl font-black text-[#1764AE]">
              ${quote.total.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* Píldora de Franja Horaria y Dirección */}
        <div className="flex items-center gap-2.5 bg-blue-50/60 border border-blue-100 px-3.5 py-2.5 rounded-xl mb-4 text-slate-800">
          <svg className="w-5 h-5 text-[#1764AE] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex flex-col min-w-0 text-xs">
            <span className="font-bold text-[#00112B]">
              Franja sugerida: {quote.scheduledTime || scheduledTime}
            </span>
            <span className="text-slate-600 truncate">{clientAddress}</span>
          </div>
        </div>

        {/* Estado y Botones de Acción */}
        {isPending && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {onAdjustment && (
              <button
                type="button"
                onClick={onAdjustment}
                className="min-h-[48px] rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-[#00112B] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <span>Solicitar Ajuste</span>
              </button>
            )}

            {onAccept && (
              <button
                type="button"
                onClick={onAccept}
                className="min-h-[48px] rounded-xl bg-[#1764AE] hover:bg-[#00112B] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Aceptar Presupuesto</span>
              </button>
            )}
          </div>
        )}

        {isAccepted && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-950">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-900">
                ¡Presupuesto confirmado con éxito!
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
                Se reservó el turno. El pago se efectúa directamente al vecino de forma presencial (efectivo / transferencia) al finalizar la reparación y constatar tu satisfacción.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
