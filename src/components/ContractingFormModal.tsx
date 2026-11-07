"use client";

import React, { useState } from "react";
import { Modal } from "./Modal";
import { Provider, useAppUser, createStoredRequest, UserProfile } from "@/lib/storage";

interface ContractingFormModalProps {
  provider: Provider | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (requestId: string) => void;
}

interface FormContentProps {
  provider: Provider;
  currentUser: UserProfile;
  onClose: () => void;
  onSuccess: (requestId: string) => void;
}

const ContractingFormContent: React.FC<FormContentProps> = ({
  provider,
  currentUser,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [address, setAddress] = useState(currentUser.address);
  const [neighborhood, setNeighborhood] = useState(currentUser.neighborhood);
  const [phone, setPhone] = useState(currentUser.phone);
  const [timeSlot, setTimeSlot] = useState("17:30 - 20:30 hs");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Por favor ingresá tu nombre.");
      return;
    }
    if (!address.trim()) {
      setError("Por favor ingresá la dirección del domicilio.");
      return;
    }

    const newRequest = createStoredRequest({
      providerId: provider.id,
      providerName: provider.name,
      providerCategory: provider.category,
      providerPhone: provider.phone,
      clientName: name.trim(),
      clientNeighborhood: neighborhood,
      clientAddress: address.trim(),
      title: `Solicitud para ${provider.category}`,
      description:
        description.trim() ||
        `Coordinación de visita técnica para ${provider.category}. Franja solicitada: ${timeSlot}. Teléfono de contacto: ${phone}`,
    });

    onSuccess(newRequest.id);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Banner de paso y prestador */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1764AE]">{provider.name}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">{provider.category}</span>
        </div>
        <span className="bg-white px-2 py-0.5 rounded-full text-[11px] font-bold text-[#1764AE] border border-blue-200">
          Paso 2 de 4
        </span>
      </div>

      {error && (
        <div
          className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Campo 1: Nombre */}
      <div>
        <label
          htmlFor="contract-nombre"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
        >
          Nombre completo <span className="text-rose-500">*</span>
        </label>
        <input
          id="contract-nombre"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-11 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1764AE] focus:ring-2 focus:ring-[#1764AE]/20 transition outline-none"
          placeholder="Ej: Marta Fernández"
        />
      </div>

      {/* Campo 2: Dirección y Teléfono */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="contract-direccion"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Dirección <span className="text-rose-500">*</span>
          </label>
          <input
            id="contract-direccion"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-11 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1764AE] focus:ring-2 focus:ring-[#1764AE]/20 transition outline-none"
            placeholder="Ej: Colombres 312"
          />
        </div>

        <div>
          <label
            htmlFor="contract-barrio"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Barrio
          </label>
          <input
            id="contract-barrio"
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full h-11 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-[#1764AE] focus:ring-2 focus:ring-[#1764AE]/20 transition outline-none"
          />
        </div>
      </div>

      {/* Teléfono de Contacto */}
      <div>
        <label
          htmlFor="contract-telefono"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
        >
          Teléfono de contacto o WhatsApp
        </label>
        <input
          id="contract-telefono"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full h-11 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1764AE] focus:ring-2 focus:ring-[#1764AE]/20 transition outline-none"
          placeholder="Ej: +54 9 358 411-2233"
        />
      </div>

      {/* Campo 3: Horario disponible y Chips Rápidos */}
      <div>
        <label
          htmlFor="contract-horario"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
        >
          Horario disponible <span className="text-rose-500">*</span>
        </label>
        <input
          id="contract-horario"
          type="text"
          required
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full h-11 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1764AE] focus:ring-2 focus:ring-[#1764AE]/20 transition outline-none"
          placeholder="Ej: 17:30 - 20:30 hs"
        />

        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={() => setTimeSlot("09:00 - 13:00 hs")}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
              timeSlot === "09:00 - 13:00 hs"
                ? "bg-[#1764AE] text-white border-[#1764AE]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
          >
            Mañana
          </button>
          <button
            type="button"
            onClick={() => setTimeSlot("14:00 - 18:00 hs")}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
              timeSlot === "14:00 - 18:00 hs"
                ? "bg-[#1764AE] text-white border-[#1764AE]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
          >
            Tarde
          </button>
          <button
            type="button"
            onClick={() => setTimeSlot("17:30 - 20:30 hs")}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
              timeSlot === "17:30 - 20:30 hs"
                ? "bg-[#1764AE] text-white border-[#1764AE]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
          >
            Vespertino
          </button>
        </div>
      </div>

      {/* Campo 4: Detalle opcional */}
      <div>
        <label
          htmlFor="contract-detalle"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
        >
          Detalle del trabajo o urgencia <span className="text-slate-400 font-normal lowercase">(opcional)</span>
        </label>
        <textarea
          id="contract-detalle"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#1764AE] focus:ring-2 focus:ring-[#1764AE]/20 transition outline-none resize-none"
          placeholder="Breve descripción del problema o lo que necesitás arreglar..."
        />
      </div>

      {/* Aviso de Confianza y Seguridad */}
      <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs text-slate-600">
        <svg className="w-4 h-4 text-[#1764AE] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="leading-relaxed">
          Sin tarjeta de crédito ni adelantos. El pago se efectúa directamente entre vecinos al concluir el trabajo.
        </p>
      </div>

      {/* Acciones del Modal */}
      <div className="flex items-center justify-end gap-2.5 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="min-h-[44px] px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#1764AE] hover:bg-[#00112B] active:scale-95 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2 flex items-center gap-1.5"
        >
          <span>Confirmar datos</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export const ContractingFormModal: React.FC<ContractingFormModalProps> = ({
  provider,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const currentUser = useAppUser();

  if (!provider) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Datos de contratación">
      {isOpen && (
        <ContractingFormContent
          provider={provider}
          currentUser={currentUser}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </Modal>
  );
};
