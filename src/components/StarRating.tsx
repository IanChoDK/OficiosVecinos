"use client";

import React from "react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  interactive = false,
  onRate,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-base gap-0.5",
    md: "text-xl gap-1",
    lg: "text-3xl gap-2",
  }[size];

  return (
    <div
      className={`inline-flex items-center ${sizeClasses}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`Calificación: ${rating} de ${maxStars} estrellas`}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= Math.round(rating);

        if (interactive) {
          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={starValue === rating}
              aria-label={`${starValue} de ${maxStars} estrellas`}
              onClick={() => onRate?.(starValue)}
              className="p-1 min-w-[44px] min-h-[44px] flex items-center justify-center transition-transform hover:scale-125 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1764AE] rounded-lg"
            >
              <span className={isFilled ? "text-amber-500" : "text-gray-300"}>
                ★
              </span>
            </button>
          );
        }

        return (
          <span
            key={starValue}
            className={isFilled ? "text-amber-500" : "text-gray-300"}
            aria-hidden="true"
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
