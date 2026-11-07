"use client";

import React from "react";
import mockData from "@/data/mockData.json";

interface CategoryGridProps {
  selectedCategory?: string;
  onSelectCategory: (categoryName: string) => void;
  showAllOption?: boolean;
}

const getCategorySvg = (id: string) => {
  switch (id) {
    case "plomeria":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
        </svg>
      );
    case "electricidad":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case "gas":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        </svg>
      );
    case "pintura":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      );
    case "carpinteria":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.32l-3.27 3.27a1.5 1.5 0 01-2.122-2.122l3.27-3.27a4.5 4.5 0 00-6.32 4.486c.048.58.024 1.193-.14 1.743" />
        </svg>
      );
    case "cerrajeria":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766" />
        </svg>
      );
  }
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory = "",
  onSelectCategory,
  showAllOption = true,
}) => {
  const categories = mockData.categories;

  return (
    <div className="w-full">
      <div
        className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar focus:outline-none"
        tabIndex={0}
        aria-label="Carrusel de rubros y oficios barriales"
        role="region"
      >
        {showAllOption && (
          <button
            type="button"
            onClick={() => onSelectCategory("")}
            className={`flex flex-col items-center gap-1.5 flex-shrink-0 w-20 py-2 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2 active:scale-95 ${
              selectedCategory === ""
                ? "bg-[#1764AE] text-white shadow-md shadow-[#1764AE]/20 font-bold"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-xs"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                selectedCategory === ""
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-[#1764AE]"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <span className="text-xs truncate w-full text-center px-1">Todos</span>
          </button>
        )}

        {categories.map((cat) => {
          const isSelected =
            selectedCategory.toLowerCase() === cat.name.toLowerCase() ||
            selectedCategory.toLowerCase() === cat.id.toLowerCase();

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className={`flex flex-col items-center gap-1.5 flex-shrink-0 w-20 py-2 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2 active:scale-95 ${
                isSelected
                  ? "bg-[#1764AE] text-white shadow-md shadow-[#1764AE]/20 font-bold"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-xs"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-[#1764AE]"
                }`}
              >
                {getCategorySvg(cat.id)}
              </div>
              <span className="text-xs truncate w-full text-center px-1 font-medium">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
