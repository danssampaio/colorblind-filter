import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";
import Navbar from "@/components/componentsTest/Navbar";
import Button from "@/components/componentsTest/Button";
import Card from "@/components/componentsTest/Card";
import Image from "next/image";

const content = `# Lista de Componentes

Esta é uma lista de componentes que podem ser integrados em sites utilizando a técnologia Tailwind. Foram dispostos diversos deles, das mais variadas cores 
para a realização do teste de recoloração do filtro`;

const Page = async () => {
  return (
    <div>
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10">
        <Markdown>{content}</Markdown>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Cards</h2>
          <div className="flex flex-wrap gap-4">
            <Card className="text-[#31F533]" />

            <Card className="text-[#FFFF00]" />

            <Card className="text-[#D5313B]" />

            <Card className="text-[#31ADF5]" />
          </div>
        </div>
        <div>
          <h2>Navbars</h2>
          <div>
            <Navbar className="bg-[#31F533]" />

            <Navbar className="bg-[#FFFF00]" />

            <Navbar className="bg-[#D5313B]" />

            <Navbar className="bg-[#31ADF5]" />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#31F533]" />

            <Button className="bg-[#FFFF00]" />

            <Button className="bg-[#D5313B]" />

            <Button className="bg-[#31ADF5]" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
