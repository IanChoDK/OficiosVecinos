"use client";

import React, { useState } from "react";
import mockData from "@/data/mockData.json";
import {
  UserProfile,
  ServiceRequest,
  updateStoredUser,
  setAccessibleFont,
  useAccessibleFont,
  updateStoredRequestStatus,
} from "@/lib/storage";
import { Button } from "../Button";
import { Input } from "../Input";
import { Badge } from "../Badge";
import { StarRating } from "../StarRating";

interface ProfileViewProps {
  user: UserProfile;
  requests: ServiceRequest[];
  role: "cliente" | "prestador";
  onRateRequest: (request: ServiceRequest) => void;
  onRefreshData: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  requests,
  role,
  onRateRequest,
  onRefreshData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const accessibleFont = useAccessibleFont();

  const handleToggleAccessibleFont = () => {
    setAccessibleFont(!accessibleFont);
  };

  const handleAdvanceStatus = (req: ServiceRequest) => {
    const nextStatus =
      req.status === "pendiente"
        ? "en_curso"
        : req.status === "en_curso"
        ? "finalizado"
        : "finalizado";
    updateStoredRequestStatus(req.id, nextStatus);
    onRefreshData();
  };

  return (
    <div className="flex flex-col gap-6 pb-20 md:pb-8">
      {/* Tarjeta de Perfil Actual */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200 shadow-md flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1764AE] to-[#00112B] text-white flex items-center justify-center text-3xl font-bold shadow-md">
              {role === "cliente" ? "👵" : "👨‍🔧"}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#00112B]">
                {user.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#1764AE] flex items-center gap-1.5">
                <span>{role === "cliente" ? "Vecina de confianza" : "Prestador de oficio"}</span>
                <span>•</span>
                <span>📍 {user.neighborhood}</span>
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsEditing(!isEditing)}
          >
            <span>{isEditing ? "✕ Cancelar" : "✏️ Editar"}</span>
          </Button>
        </div>

        {saveMessage && (
          <div className="p-3 bg-cyan-50 border border-[#00C8FF] text-[#006B8A] rounded-xl text-sm font-semibold flex items-center gap-2">
            <span>✅</span>
            <span>{saveMessage}</span>
          </div>
        )}

        {/* Modo Edición vs Modo Vista */}
        {isEditing ? (
          <EditProfileForm
            user={user}
            onSave={(updated) => {
              updateStoredUser(updated);
              setSaveMessage("¡Perfil actualizado con éxito!");
              setIsEditing(false);
              onRefreshData();
              setTimeout(() => setSaveMessage(""), 3000);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-t border-gray-100 pt-3">
            <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500 font-semibold block">Dirección</span>
              <span className="font-semibold text-[#00112B]">{user.address || "No especificada"}</span>
            </div>
            <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500 font-semibold block">Teléfono / WhatsApp</span>
              <span className="font-semibold text-[#1764AE]">{user.phone || "No especificado"}</span>
            </div>
            {user.notes && (
              <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-100 sm:col-span-2">
                <span className="text-xs text-gray-500 font-semibold block">Preferencias</span>
                <span className="text-gray-700">{user.notes}</span>
              </div>
            )}
          </div>
        )}

        {/* Ajuste de Accesibilidad: Switch de Texto Grande */}
        <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#00112B]">
              Tamaño de texto grande accesible
            </h4>
            <p className="text-xs text-gray-500">
              Aumenta el tamaño de letra en toda la app para facilitar la lectura sin lentes.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={accessibleFont}
            onClick={handleToggleAccessibleFont}
            className={`w-14 h-8 rounded-full transition-colors duration-200 relative p-1 shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1764AE] ${
              accessibleFont ? "bg-[#1764AE]" : "bg-[#E2E2E3]"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                accessibleFont ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </section>

      {/* Listado de Solicitudes y Pedidos de Trabajo */}
      <section className="flex flex-col gap-4">
        <div className="px-1">
          <h3 className="text-lg font-bold font-mono text-[#00112B]">
            {role === "cliente" ? "Mis Solicitudes de Servicio" : "Trabajos Pedidos por Vecinos"}
          </h3>
          <p className="text-xs text-gray-500">
            Seguimiento de pedidos y calificaciones en el barrio
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center flex flex-col items-center gap-2">
            <span className="text-3xl">📭</span>
            <p className="text-sm text-gray-600">
              Todavía no tenés solicitudes registradas.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((req) => (
              <article
                key={req.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500">
                        {req.date}
                      </span>
                      <Badge status={req.status} />
                    </div>
                    <h4 className="text-base font-bold text-[#00112B] mt-1">
                      {req.title}
                    </h4>
                  </div>

                  {/* Acciones según rol */}
                  {role === "cliente" && req.status === "finalizado" && !req.rating && (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => onRateRequest(req)}
                      className="text-xs font-bold shrink-0"
                    >
                      <span>⭐</span>
                      <span>Calificar a {req.providerName.split(" ")[0]}</span>
                    </Button>
                  )}

                  {role === "prestador" && req.status !== "finalizado" && (
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => handleAdvanceStatus(req)}
                      className="text-xs font-bold shrink-0"
                    >
                      <span>{req.status === "pendiente" ? "▶️ Iniciar trabajo" : "✔️ Marcar como terminado"}</span>
                    </Button>
                  )}
                </div>

                <p className="text-sm text-gray-700 bg-[#f8fafc] p-3 rounded-xl border border-gray-100">
                  {req.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                  <span>
                    <strong>Profesional:</strong> {req.providerName} ({req.providerCategory})
                  </span>
                  <span>📍 {req.clientNeighborhood}</span>
                </div>

                {req.rating && (
                  <div className="mt-1 pt-2 border-t border-gray-100 flex items-center justify-between text-xs bg-amber-50/50 p-2.5 rounded-xl">
                    <span className="font-semibold text-amber-900">Tu calificación:</span>
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={req.rating} size="sm" />
                      <span className="font-bold text-[#00112B]">{req.rating}/5</span>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

interface EditProfileFormProps {
  user: UserProfile;
  onSave: (data: Partial<UserProfile>) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [neighborhood, setNeighborhood] = useState(user.neighborhood);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [notes, setNotes] = useState(user.notes || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      neighborhood,
      address,
      phone,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-t border-gray-100 pt-4">
      <Input
        label="Nombre y Apellido"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="profile-barrio"
          className="text-sm font-semibold text-[#00112B]"
        >
          Tu Barrio de residencia
        </label>
        <select
          id="profile-barrio"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
        >
          {mockData.neighborhoods.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Dirección de tu casa"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        helperText="Se autocompleta cuando solicites un servicio barrial."
      />

      <Input
        label="Teléfono o WhatsApp de contacto"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="profile-notes"
          className="text-sm font-semibold text-[#00112B]"
        >
          Indicaciones o notas (opcional)
        </label>
        <textarea
          id="profile-notes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 bg-white text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1764AE]"
        />
      </div>

      <div className="pt-2 flex gap-3">
        <Button type="submit" variant="primary" size="lg" fullWidth>
          <span>💾</span>
          <span>Guardar cambios en mi perfil</span>
        </Button>
      </div>
    </form>
  );
};
