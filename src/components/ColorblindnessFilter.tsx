import React from "react";

interface ColorblindnessFilter {
  onChange: (colorblindnessType: string) => void;
}

export const ColorblindnessFilter = () => {
  return (
    <main>
      <div className="p-2 border-black shadow rounded-lg">
        Filtro Daltonico
        <select className="ml-2 rounded bg-transparent">
          <option value="Padrao">Padrão</option>
          <option value="Protanopia">Protanopia</option>
          <option value="Deuteranopia">Deuteranopia</option>
          <option value="Tritanopia">Tritanopia</option>
        </select>
      </div>
    </main>
  );
};
