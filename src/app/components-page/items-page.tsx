type CardProps = {
  type: string;
  description: string;
  bgColor: string;
};

type alertProps = {
  type: string;
  description: string;
  bgColor: string;
};

export const cards: CardProps[] = [
  {
    type: "Política",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod fugiat a eveniet id iusto saepe, voluptatem minima. Sed enim blanditiis possimus impedit corrupti consequatur ut atque exercitationem perspiciatis ad. Deleniti animi facere, perferendis nesciunt harum laboriosam, a autem odit ea doloremque quae quidem quaerat id quia aliquam suscipit rerum ad.",
    bgColor: "bg-[#ff6161]",
  },
  {
    type: "Esportes",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod fugiat a eveniet id iusto saepe, voluptatem minima. Sed enim blanditiis possimus impedit corrupti consequatur ut atque exercitationem perspiciatis ad. Deleniti animi facere, perferendis nesciunt harum laboriosam, a autem odit ea doloremque quae quidem quaerat id quia aliquam suscipit rerum ad.",
    bgColor: "bg-[#7bff7b]",
  },
  {
    type: "Cultura",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod fugiat a eveniet id iusto saepe, voluptatem minima. Sed enim blanditiis possimus impedit corrupti consequatur ut atque exercitationem perspiciatis ad. Deleniti animi facere, perferendis nesciunt harum laboriosam, a autem odit ea doloremque quae quidem quaerat id quia aliquam suscipit rerum ad.",
    bgColor: "bg-[#ffff73]",
  },
];

export const alerts: alertProps[] = [
  {
    bgColor: "bg-[#ff6161]",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, laudantium.",
    type: "Erro!",
  },
  {
    bgColor: "bg-[#7bff7b]",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, laudantium.",
    type: "Sucesso!",
  },
  {
    bgColor: "bg-[#ffff73]",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, laudantium.",
    type: "Atenção!",
  },
]