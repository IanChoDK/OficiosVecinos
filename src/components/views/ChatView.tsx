"use client";

import React, { useState } from "react";
import {
  Provider,
  ServiceRequest,
  useAppChats,
  sendChatMessage,
  respondToQuote,
  useAppRole,
} from "@/lib/storage";
import { ChatBubble } from "@/components/ChatBubble";
import { QuoteWidget } from "@/components/QuoteWidget";

interface ChatViewProps {
  provider: Provider;
  request?: ServiceRequest | null;
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  provider,
  request,
  onBack,
}) => {
  const role = useAppRole();
  const chats = useAppChats();
  const [inputText, setInputText] = useState("");
  const [showTrustDrawer, setShowTrustDrawer] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const requestId = request ? request.id : "req-101";

  // Buscar conversación correspondiente
  const currentChat = chats.find(
    (c) => c.requestId === requestId || c.providerId === provider.id
  ) || {
    id: `chat-${requestId}`,
    requestId,
    providerId: provider.id,
    messages: [
      {
        id: "init-1",
        sender: "prestador" as const,
        text: `¡Hola! Soy ${provider.name}. ¿En qué arreglo o consulta puedo ayudarte hoy?`,
        time: "10:00 AM",
      },
    ],
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !selectedPhoto) return;

    sendChatMessage(
      requestId,
      role === "prestador" ? "prestador" : "cliente",
      inputText.trim(),
      selectedPhoto || undefined,
      selectedPhoto ? "foto_evidencia_arreglo.jpg" : undefined
    );

    setInputText("");
    setSelectedPhoto(null);
  };

  const handleQuickChip = (text: string) => {
    setInputText(text);
  };

  const handleAcceptQuote = () => {
    respondToQuote(requestId, "aceptado");
  };

  const handleAdjustmentQuote = () => {
    setInputText(
      `${provider.name.split(" ")[0]}, ¿sería posible ajustar los materiales o desglosar los costos?`
    );
  };

  // Mock photo toggle for simulated upload
  const handleTogglePhoto = () => {
    if (selectedPhoto) {
      setSelectedPhoto(null);
    } else {
      setSelectedPhoto(
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&auto=format&fit=crop&q=80"
      );
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[85vh] bg-[#F9F9FA] pb-32 animate-fadeIn relative">
      {/* Cabecera del Chat */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 py-2.5 flex items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver"
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:text-[#1764AE] hover:bg-slate-100 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base font-bold text-[#00112B] truncate">
              Chat con {provider.name}
            </h1>
            <span className="text-[11px] text-slate-500">{provider.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${provider.phone}`}
            aria-label={`Llamar a ${provider.name}`}
            className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1764AE] flex items-center justify-center active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setShowTrustDrawer(!showTrustDrawer)}
            aria-label="Ver credenciales de confianza"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer desplegable de credenciales de confianza */}
      {showTrustDrawer && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between text-xs text-blue-900 transition-all">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1764AE] fill-current" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Garantía Comunitaria de OficiosVecinos</span>
          </div>
          <span className="font-bold text-[#1764AE]">
            {provider.rating.toFixed(1)} ★ ({provider.reviewCount} trabajos)
          </span>
        </div>
      )}

      {/* Banner de Estado del Prestador */}
      <div className="bg-white px-4 py-3 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#00112B] text-white flex items-center justify-center font-bold text-lg shadow-sm overflow-hidden">
              {provider.avatarUrl ? (
                <img
                  src={provider.avatarUrl}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                provider.name.slice(0, 2).toUpperCase()
              )}
            </div>
            <span
              className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white"
              title="En línea"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-bold text-[#00112B]">
                {provider.name}
              </span>
              <span className="text-[#10B981]" title="Profesional Matriculado">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                En línea
              </span>
              <span>•</span>
              <span className="truncate">{provider.neighborhood}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Línea de Tiempo de Conversación */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Píldora de Fecha / Solicitud */}
        <div className="flex justify-center">
          <span className="px-3.5 py-1 bg-slate-200/80 text-slate-600 text-xs font-semibold rounded-full shadow-2xs">
            Hoy • Solicitud #{requestId.toUpperCase()}
          </span>
        </div>

        {/* Burbujas de Chat */}
        {currentChat.messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            providerName={provider.name}
            providerAvatar={provider.avatarUrl}
          />
        ))}

        {/* Presupuesto Oficial si la solicitud tiene uno */}
        {request?.quote && (
          <QuoteWidget
            quote={request.quote}
            scheduledTime={request.scheduledTime}
            clientAddress={request.clientAddress}
            onAccept={handleAcceptQuote}
            onAdjustment={handleAdjustmentQuote}
          />
        )}
      </div>

      {/* Respuestas Rápidas Sugeridas (Stitch Wireframe Chips) */}
      <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => handleQuickChip("👍 Perfecto, gracias")}
          className="flex-shrink-0 bg-white hover:bg-slate-100 text-slate-800 text-xs font-medium px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs active:bg-[#1764AE] active:text-white transition-all"
        >
          👍 Perfecto, gracias
        </button>
        <button
          type="button"
          onClick={() => handleQuickChip("¿Aceptás Mercado Pago / Transferencia?")}
          className="flex-shrink-0 bg-white hover:bg-slate-100 text-slate-800 text-xs font-medium px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs active:bg-[#1764AE] active:text-white transition-all"
        >
          ¿Aceptás Mercado Pago?
        </button>
        <button
          type="button"
          onClick={() => handleQuickChip("¿Hacés factura o comprobante?")}
          className="flex-shrink-0 bg-white hover:bg-slate-100 text-slate-800 text-xs font-medium px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs active:bg-[#1764AE] active:text-white transition-all"
        >
          ¿Traés factura C?
        </button>
      </div>

      {/* Barra de Entrada Flotante Inferior */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-3 shadow-[0_-4px_16px_rgba(0,17,43,0.08)] z-40 max-w-4xl mx-auto">
        {selectedPhoto && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 mb-2 text-xs text-blue-900">
            <span className="flex items-center gap-1.5 font-medium truncate">
              📷 Foto adjunta para enviar (foto_evidencia.jpg)
            </span>
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="font-bold text-rose-600 hover:text-rose-800 p-1"
            >
              Quitar
            </button>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-xl mx-auto">
          {/* Botón Adjuntar Foto */}
          <button
            type="button"
            onClick={handleTogglePhoto}
            aria-label="Adjuntar foto de evidencia"
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90 ${
              selectedPhoto
                ? "bg-[#1764AE] text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </button>

          {/* Campo de Texto */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe un mensaje al profesional..."
            className="flex-1 h-11 px-4 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:border-[#1764AE] focus:ring-2 focus:ring-[#1764AE]/20 text-slate-800 placeholder-slate-400 shadow-inner"
          />

          {/* Botón Enviar */}
          <button
            type="submit"
            aria-label="Enviar mensaje"
            className="w-11 h-11 rounded-full bg-[#1764AE] hover:bg-[#00112B] text-white flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2"
          >
            <svg className="w-5 h-5 -ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
