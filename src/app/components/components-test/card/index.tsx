import { cn } from "@/app/utils/utils";
import Image from "next/image";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

type CardProps = {
  title: string;
  description: string;
  color: string;
};

const Card = ({ title, description, color }: CardProps) => {
  return (
    <div className="flex flex-col rounded-xl bg-gray-100 shadow-lg">
      <div className="flex justify-center bg-gray-300 rounded-t-xl">
        <Image
          src={"/images/colorblind-filter.png"}
          width={300}
          height={300}
          alt="logo colorblind filter"
          className="w-auto h-auto object-cover p-5"
        />
      </div>
      <div
        className={cn(`${color} flex flex-col rounded-b-xl gap-3 px-3 py-2`)}
      >
        <p className="mb-4 text-sm text-neutral-700 line-clamp-4">
          {description}
        </p>
        <div className="flex justify-end">
          <button className="flex items-center gap-2 text-sm hover:text-gray-900 text-gray-600">
            Ver Notícia <HiArrowNarrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
