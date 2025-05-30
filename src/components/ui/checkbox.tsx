// components/ui/checkbox.tsx
import React from "react";

export function Checkbox({
  checked,
  onChange,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  checked?: boolean;
  onChange?: () => void;
}) {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
        {...props}
      />
      <div
        className="h-5 w-5 rounded-sm border border-gray-300 bg-white peer-checked:bg-blue-600 
                   peer-checked:border-blue-600 flex items-center justify-center transition-colors"
      >
        <svg
          className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </label>
  );
}
