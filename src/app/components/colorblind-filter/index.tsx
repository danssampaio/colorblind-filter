"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

type DaltonismType = "Protanopia" | "Deuteranopia" | "Tritanopia" | "Padrao";

interface colorblindFilterProps {
  onChange: (colorblindnessType: DaltonismType) => void;
}

export const ColorblindFilter = ({ onChange }: colorblindFilterProps) => {
  const initialColorblindnessType =
    typeof window !== "undefined"
      ? (localStorage.getItem("colorblindnessType") as DaltonismType | null)
      : null;
  const [colorblindnessType, setColorblindnessType] = useState<DaltonismType>(
    initialColorblindnessType || "Padrao"
  );
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onChange(colorblindnessType);
    if (typeof window !== "undefined") {
      localStorage.setItem("colorblindnessType", colorblindnessType);
    }
  }, [colorblindnessType, onChange]);

  const handleChange = (selectedType: DaltonismType) => {
    setColorblindnessType(selectedType);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-3 right-5 z-[9999]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gray-500 text-white text-sm p-4 rounded-xl shadow-black shadow "
      >
        <Image
          src={"/colorblind-filter.svg"}
          alt="Colorblind Filter"
          width={54}
          height={54}
          unoptimized
        />
      </button>
      {isExpanded && (
        <div className="absolute bottom-[60px] right-0 mt-2 bg-gray-500 text-white shadow-lg rounded-lg">
          <button
            onClick={() => handleChange("Padrao")}
            className="block w-full text-left p-2 hover:bg-gray-700"
          >
            Padrão
          </button>
          <button
            onClick={() => handleChange("Protanopia")}
            className="block w-full text-left p-2 hover:bg-gray-700"
          >
            Protanopia
          </button>
          <button
            onClick={() => handleChange("Deuteranopia")}
            className="block w-full text-left p-2 hover:bg-gray-700"
          >
            Deuteranopia
          </button>
          <button
            onClick={() => handleChange("Tritanopia")}
            className="block w-full text-left p-2 hover:bg-gray-700"
          >
            Tritanopia
          </button>
        </div>
      )}
    </div>
  );
};
