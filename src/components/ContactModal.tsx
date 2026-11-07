"use client";

import React, { useState } from "react";
import { Provider, createStoredRequest, getStoredUser } from "@/lib/storage";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";

interface ContactModalProps {
  provider: Provider | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  provider,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const currentUser = getStoredUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState(currentUser.address || "");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!provider) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Por favor contanos brevemente qué arreglo necesitás hacer.");
      return;
    }

    createStoredRequest({
      providerId: provider.id,
      providerName: provider.name,
      providerCategory: provider.category,
      providerPhone: provider.phone,
      clientName: currentUser.name,
      clientNeighborhood: currentUser.neighborhood,
      clientAddress: address || currentUser.address,
      title: title.trim() || `Pedido de ${provider.category}`,
      description: description.trim(),
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setTitle("");
      setDescription("");
      onSuccess();
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Contactar a ${provider.name}`}
    >
      {isSubmitted ? (
        <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
          <span className="text-5xl">✅</span>
          <h3 className="text-xl font-bold text-[#00112B]">
            ¡Solicitud enviada a {provider.name}!
          </h3>
          <p className="text-sm text-gray-600 max-w-xs">
            Carlos se comunicará a tu teléfono para confirmar el horario.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Ficha rápida de contacto directo */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-600 font-semibold uppercase">
                Llamada directa barrial
              </p>
              <p className="text-base font-bold text-[#1764AE]">
                {provider.phone}
              </p>
            </div>
            <a
              href={`tel:${provider.phone.replace(/[^0-9]/g, "")}`}
              className="min-h-[44px] px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 active:scale-95 focus:ring-2 focus:ring-emerald-500 flex items-center gap-1.5 transition-all"
            >
              <span>📞</span>
              <span>Llamar ya</span>
            </a>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink mx-3 text-xs uppercase text-gray-400 font-semibold">
              O pedí que venga a domicilio
            </span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          {/* Formulario simple */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <Input
              label="¿Qué problema tenés? (Ej: gotea la canilla)"
              placeholder="Ej: Se rompió un caño bajo la mesada"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="desc-field"
                className="text-sm font-semibold text-[#00112B]"
              >
                Contanos un poco más del trabajo
              </label>
              <textarea
                id="desc-field"
                rows={3}
                placeholder="Explicá lo que pasa para que el profesional traiga las herramientas adecuadas..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (error) setError("");
                }}
                className={`w-full p-3 rounded-xl border text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1764AE] ${
                  error
                    ? "border-[#B30018] bg-red-50/40"
                    : "border-gray-300 bg-white"
                }`}
              />
              {error && (
                <p className="text-xs font-semibold text-[#B30018] flex items-center gap-1">
                  <span>⚠️</span>
                  <span>{error}</span>
                </p>
              )}
            </div>

            <Input
              label="Dirección donde se realiza el arreglo"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              helperText="Precargamos tu dirección guardada para que no tengas que escribirla otra vez."
            />

            <div className="pt-2 flex flex-col gap-2">
              <Button type="submit" variant="primary" fullWidth size="lg">
                <span>📩</span>
                <span>Enviar pedido de trabajo a {provider.name.split(" ")[0]}</span>
              </Button>
              <p className="text-xs text-center text-gray-500">
                💵 El pago se acuerda y se realiza directamente en efectivo al finalizar el trabajo.
              </p>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};
