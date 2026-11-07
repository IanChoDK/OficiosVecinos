"use client";

import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled,
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2 disabled:cursor-not-allowed disabled:shadow-none";

  const sizeClasses =
    size === "lg"
      ? "min-h-[52px] px-6 py-3 text-lg"
      : "min-h-[46px] px-4 py-2.5 text-base";

  const variantClasses = {
    primary:
      "bg-[#1764AE] text-white shadow-md border border-transparent hover:bg-[#00112B] hover:shadow-lg active:scale-95 active:shadow-inner disabled:bg-[#E2E2E3] disabled:text-gray-500",
    secondary:
      "bg-[#E2E2E3] text-[#00112B] shadow-sm border border-gray-300 hover:bg-gray-300 hover:shadow active:scale-95 active:shadow-inner disabled:bg-gray-200 disabled:text-gray-400",
    danger:
      "bg-[#FF0025] text-white shadow-md border border-transparent hover:bg-[#B30018] hover:shadow-lg active:scale-95 active:shadow-inner disabled:bg-[#E2E2E3] disabled:text-gray-500",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
