"use client";

import React from "react";

interface CategoryCardProps {
  id: string;
  name: string;
  iconName: string;
  isSelected?: boolean;
  onClick: (id: string) => void;
}

const ICONS: Record<string, string> = {
  wrench: "🔧",
  zap: "⚡",
  flame: "🔥",
  hammer: "🔨",
  paint: "🖌️",
  brick: "🧱",
  key: "🔑",
  leaf: "🌿",
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  iconName,
  isSelected = false,
  onClick,
}) => {
  const selectedClasses = isSelected
    ? "bg-[#1764AE] text-white border-[#1764AE] shadow-lg scale-105"
    : "bg-white text-[#00112B] border-gray-200 hover:border-[#1764AE] hover:bg-blue-50/50 shadow-sm";

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`min-w-[110px] sm:min-w-[130px] p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1764AE] cursor-pointer ${selectedClasses}`}
    >
      <span className="text-3xl" aria-hidden="true">
        {ICONS[iconName] || "🛠️"}
      </span>
      <span className="text-xs sm:text-sm font-bold text-center leading-tight">
        {name}
      </span>
    </button>
  );
};
