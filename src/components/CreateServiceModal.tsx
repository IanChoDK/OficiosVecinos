"use client";

import React, { useState } from "react";
import { addStoredProvider, getStoredUser } from "@/lib/storage";
import mockData from "@/data/mockData.json";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const currentUser = getStoredUser();

  const [category, setCategory] = useState(mockData.categories[0].name);
  const [neighborhood, setNeighborhood] = useState(
    currentUser.neighborhood || mockData.neighborhoods[0]
  );
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [priceInfo, setPriceInfo] = useState("Presupuesto sin cargo en la zona");
  const [availability, setAvailability] = useState("Disponible de lunes a viernes");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Por favor contanos brevemente qué trabajos realizás y tu experiencia.");
      return;
    }

    addStoredProvider({
      name: currentUser.name || "Profesional Barrial",
      category,
      neighborhood,
      address: currentUser.address || "Zona barrial",
      phone: phone || currentUser.phone || "+54 9 358 000-0000",
      priceInfo,
      availability,
      description: description.trim(),
      avatar: "🛠️",
      featured: true,
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setDescription("");
      onSuccess();
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Publicar mi oficio barrial"
    >
      {isSaved ? (
        <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
          <span className="text-5xl">🎉</span>
          <h3 className="text-xl font-bold text-[#00112B]">
            ¡Tu oficio ya está visible en el barrio!
          </h3>
          <p className="text-sm text-gray-600 max-w-xs">
            Los vecinos de tu zona podrán encontrarte y llamarte directamente.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="cat-select"
              className="text-sm font-semibold text-[#00112B]"
            >
              Rubro o Categoría de tu oficio
            </label>
            <select
              id="cat-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
            >
              {mockData.categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="neigh-select"
              className="text-sm font-semibold text-[#00112B]"
            >
              Barrio o Zona principal de atención
            </label>
            <select
              id="neigh-select"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
            >
              {mockData.neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Teléfono de contacto o WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ej: +54 9 358 123-4567"
          />

          <Input
            label="Información de precios o presupuesto"
            value={priceInfo}
            onChange={(e) => setPriceInfo(e.target.value)}
            placeholder="Ej: Presupuesto sin cargo en la zona"
          />

          <Input
            label="Disponibilidad horaria"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="Ej: Lunes a viernes de 8 a 17 hs"
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="service-desc"
              className="text-sm font-semibold text-[#00112B]"
            >
              Breve descripción de tus trabajos
            </label>
            <textarea
              id="service-desc"
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError("");
              }}
              placeholder="Contale a los vecinos qué arreglos hacés, si das garantía y tus años de experiencia..."
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

          <div className="pt-2 flex flex-col gap-2">
            <Button type="submit" variant="primary" size="lg" fullWidth>
              <span>📢</span>
              <span>Guardar y publicar mi oficio</span>
            </Button>
            <Button type="button" variant="secondary" fullWidth onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
