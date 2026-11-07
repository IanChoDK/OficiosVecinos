"use client";

import React from "react";

export type BadgeVariant = "pendiente" | "en_curso" | "finalizado" | "cancelado";

interface BadgeProps {
  status: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = "" }) => {
  const config = {
    pendiente: {
      label: "Solicitud Pendiente",
      icon: "⏳",
      styles: "bg-amber-100 text-[#D97706] border-amber-300",
    },
    en_curso: {
      label: "En Curso",
      icon: "🔨",
      styles: "bg-blue-100 text-[#1764AE] border-blue-300",
    },
    finalizado: {
      label: "Finalizado",
      icon: "✅",
      styles: "bg-cyan-100 text-[#006B8A] border-[#00C8FF]",
    },
    cancelado: {
      label: "Cancelado",
      icon: "❌",
      styles: "bg-red-100 text-[#B30018] border-red-300",
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.styles} ${className}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};
