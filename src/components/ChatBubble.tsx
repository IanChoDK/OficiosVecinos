"use client";

import React from "react";
import { ChatMessage } from "@/lib/storage";

interface ChatBubbleProps {
  message: ChatMessage;
  providerName?: string;
  providerAvatar?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  providerName = "Profesional",
  providerAvatar,
}) => {
  const isClient = message.sender === "cliente";

  if (isClient) {
    return (
      <div className="flex flex-col items-end gap-1 max-w-[85%] self-end">
        {/* Texto del mensaje */}
        {message.text && (
          <div className="bg-[#1764AE] text-white rounded-2xl rounded-tr-sm p-3.5 shadow-sm">
            <p className="text-sm sm:text-base leading-relaxed break-words">{message.text}</p>
          </div>
        )}

        {/* Imagen adjunta si existe */}
        {message.photo && (
          <div className="bg-[#004c8a] p-1 rounded-2xl rounded-tr-sm shadow-sm overflow-hidden">
            <div className="relative rounded-xl overflow-hidden bg-slate-900">
              <img
                src={message.photo}
                alt={message.photoName || "Evidencia fotográfica adjunta"}
                className="w-64 h-48 sm:h-56 object-cover rounded-xl"
              />
              <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1 truncate font-medium">
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                  <span className="truncate">{message.photoName || "foto_evidencia.jpg"}</span>
                </span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                  Foto
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Hora y Visto */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 pr-1">
          <span>{message.time}</span>
          <svg className="w-3.5 h-3.5 text-[#1764AE]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        </div>
      </div>
    );
  }

  // Burbuja de Prestador
  return (
    <div className="flex items-start gap-2 max-w-[88%] self-start">
      <div className="w-8 h-8 rounded-full bg-[#00112B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow-sm">
        {providerAvatar ? (
          <img
            src={providerAvatar}
            alt={providerName}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          providerName.slice(0, 2).toUpperCase()
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="bg-white border border-slate-200/80 text-slate-800 rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
          <span className="text-xs font-bold text-[#1764AE] block mb-1">
            {providerName}
          </span>
          <p className="text-sm sm:text-base leading-relaxed break-words">{message.text}</p>
        </div>
        <span className="text-[11px] text-slate-500 pl-1">{message.time}</span>
      </div>
    </div>
  );
};
