import React from "react";

interface ButtonProps {
  className?: string;
}

const Button = ({ className } : ButtonProps) => {
  return (
    <div>
      <div className="flex items-center gap-x-1">
        <button
          className={`hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block ${className}`}
          type="button"
        >
          <span>Button</span>
        </button>
      </div>
    </div>
  );
};

export default Button;
