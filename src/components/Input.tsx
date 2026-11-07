"use client";

import React, { useId } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  className = "",
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const borderClass = error
    ? "border-[#B30018] text-[#B30018] focus:ring-[#B30018] bg-red-50/40"
    : "border-gray-300 text-[#00112B] focus:ring-[#1764AE] hover:border-gray-400 bg-white";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-[#00112B] flex items-center justify-between"
      >
        <span>{label}</span>
      </label>
      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border transition-all duration-150 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-[#E2E2E3] disabled:text-gray-500 disabled:cursor-not-allowed ${borderClass} ${className}`}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          className="text-xs font-semibold text-[#B30018] flex items-center gap-1 mt-0.5"
          role="alert"
        >
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className="text-xs text-gray-500 mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
};
