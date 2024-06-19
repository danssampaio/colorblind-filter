import React from "react";

interface CardProps {
  className?: string;
}

const Card: React.FC<CardProps> = ({ className }) => {
  return (
      <div className="block rounded-lg bg-white p-6 dark:bg-neutral-700 border border-dark shadow-md">
        <h5 className={`mb-2 text-md font-medium leading-tight ${className}`}>
          Card title
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis harum praesentium nostrum, nisi corrupti aliquam dicta quas! Earum, ullam consectetur magni sed corporis ex illo quasi alias eligendi dolore cumque?
        </p>
        <button>
            Saiba Mais
        </button>
      </div>
  );
};

export default Card;
