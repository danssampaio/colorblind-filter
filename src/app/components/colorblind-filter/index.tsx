'use client'

import React, { useState, useEffect } from "react";

type DaltonismType = "Protanopia" | "Deuteranopia" | "Tritanopia" | "Padrao";

interface colorblindFilterProps {
  onChange: (colorblindnessType: DaltonismType) => void;
}

export const ColorblindFilter = ({
  onChange,
}: colorblindFilterProps) => {
  const initialColorblindnessType =
    typeof window !== "undefined"
      ? (localStorage.getItem("colorblindnessType") as DaltonismType | null)
      : null;
  const [colorblindnessType, setColorblindnessType] = useState<DaltonismType>(
    initialColorblindnessType || "Padrao"
  );

  useEffect(() => {
    onChange(colorblindnessType);
    if (typeof window !== "undefined") {
      localStorage.setItem("colorblindnessType", colorblindnessType);
    }
  }, [colorblindnessType, onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value as DaltonismType;
    setColorblindnessType(selectedType);
  };

  return (
    <main>
      <div className="p-2 border-black shadow rounded-lg">
        Filtro Daltonico
        <select
          className="ml-2 rounded"
          value={colorblindnessType}
          onChange={handleChange}
        >
          <option value="Padrao">Padrão</option>
          <option value="Protanopia">Protanopia</option>
          <option value="Deuteranopia">Deuteranopia</option>
          <option value="Tritanopia">Tritanopia</option>
        </select>
      </div>
    </main>
  );
};
