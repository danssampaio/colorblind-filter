import React from "react";
import { TbAlertOctagonFilled } from "react-icons/tb";

interface alertProps {
  bgColor: string;
  description: string;
  type?: string;
}

const Alert = ({ bgColor, description, type }: alertProps) => {
  return (
    <div
      className={`p-4 mb-4 text-gray-800 rounded border-blue-300 ${bgColor}`}
    >
      <div className="flex items-center gap-2 text-sm">
        <TbAlertOctagonFilled />
        {type && `${type}`}
      </div>
      <div className="mt-2 mb-4 text-sm">{description}</div>
    </div>
  );
};

export default Alert;
