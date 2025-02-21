import { Footer } from "../components/footer";
import { Header } from "../components/header";
import Markdown from "react-markdown";
import Navbar from "@/app/components/componentsTest/Navbar";
import Button from "@/app/components/componentsTest/Button";
import Card from "@/app/components/componentsTest/Card";

const content = `# Lista de Componentes

Esta é uma lista de componentes que podem ser integrados em sites utilizando a técnologia Tailwind. Foram dispostos diversos deles, das mais variadas cores 
para a realização do teste de recoloração do filtro`;

const Page = async () => {
  return (
    <div>
      <Header />
      <div className="lg:prose-lg dark:prose-invert container mt-20 mb-10">
        <Markdown>{content}</Markdown>
        <div className="p-4">
          <h2 className="text-xl mb-4">Cards</h2>
          <div className="flex flex-wrap gap-4">
            <Card className="text-[#31F533]" />

            <Card className="text-[#FFFF00]" />

            <Card className="text-[#D51A24]" />

            <Card className="text-[#31ADF5]" />
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
        <div className="p-4">
          <h2 className="text-xl mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#31F533]" />

            <Button className="bg-[#FFFF00]" />

            <Button className="bg-[#D51A24]" />

            <Button className="bg-[#31ADF5]" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
