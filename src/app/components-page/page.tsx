import Markdown from "react-markdown";
import Navbar from "@/app/components/components-test/navbar";
import Button from "@/app/components/components-test/button";
import Card from "@/app/components/components-test/card";
import Link from "next/link";

const content = `# Lista de Componentes

Esta é uma lista de componentes que podem ser integrados em sites utilizando a técnologia Tailwind. Foram dispostos diversos deles, das mais variadas cores 
para a realização do teste de recoloração do filtro`;

const lorem: string =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod fugiat a eveniet id iusto saepe, voluptatem minima. Sed enim blanditiis possimus impedit corrupti consequatur ut atque exercitationem perspiciatis ad. Deleniti animi facere, perferendis nesciunt harum laboriosam, a autem odit ea doloremque quae quidem quaerat id quia aliquam suscipit rerum ad.";

const Page = async () => {
  return (
    <section className="lg:prose-lg dark:prose-invert container mt-20 mb-10">
      <div>
        <h1 className="text-gray-800">Teste em Componentes</h1>
        <p className="text-gray-700">
          Esta é uma lista de componentes que podem ser integrados em sites
          utilizando a técnologia Tailwind. Foram dispostos diversos deles, das
          mais variadas cores para a realização do teste de recoloração do
          filtro.
        </p>
      </div>
      <div>
        <h2 className="text-gray-800">Cards</h2>
        <p className="text-gray-700">
          Muitos sites de notícias, como o {" "}
          <Link
            className="text-blue-600"
            href="https://globo.com"
            target="_blank"
          >
            globo.com
          </Link>
          , utiliza das cores para indicar o tipo de notícia. Devido a isso,
          pessoas com condição de daltonismo que frequentam esses tipos de site
          perdem informações visuais que são passadas através das cores.
        </p>
        <p className="text-gray-700">
          A seguir temos alguns exemplos de cards de notícias com cores para
          transmitir informações. A partir deles, podemos ter uma noção de como
          pessoas com daltonismo podem confundir as cores.
        </p>
        <div className="flex flex-col gap-4 lg:gap-3 lg:flex-row">
          <Card title="Política" description={lorem} color="bg-[#c4170c]" />
          <Card title="Esportes" description={lorem} color="bg-[#06aa48]" />
          <Card title="Cultura" description={lorem} color="bg-[#Ff6700]" />
        </div>
      </div>
      <div>
        <h2 className="text-xl mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-[#31F533]" />
          <Button className="bg-[#FFFF00]" />
          <Button className="bg-[#D51A24]" />
          <Button className="bg-[#31ADF5]" />
        </div>
      </div>

      <div className="text-xl mb-4">
        <h2>Navbars</h2>
        <div>
          <Navbar className="bg-[#31F533]" />
          <Navbar className="bg-[#FFFF00]" />
          <Navbar className="bg-[#D51A24]" />
          <Navbar className="bg-[#31ADF5]" />
        </div>
      </div>
    </section>
  );
};

export default Page;
