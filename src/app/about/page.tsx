import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# Sobre o Projeto

Bem-vindo ao nosso site! Este projeto foi desenvolvido como parte do Trabalho de Conclusão de Curso (TCC) e tem como objetivo ajudar pessoas com daltonismo a perceberem as cores de forma mais precisa através de filtros de correção de cores.

Depois de muitas pesquisas e desenvolvimento, criamos uma solução que oferece diferentes tipos de filtros para corrigir a percepção de cores de acordo com o nível de daltonismo de cada usuário. Nosso site é uma ferramenta acessível e fácil de usar que permite às pessoas com daltonismo ver o mundo com mais clareza.

Obrigado por visitar o nosso site,

Equipe do Projeto de Correção de Cores`;

export async function generateMetadata() {
  return {
    title: "Sobre o Projeto",
    description: "Saiba mais sobre nosso projeto de correção de cores para daltonismo, desenvolvido como parte de um TCC",
    openGraph: {
      title: "Sobre o Projeto",
      description: "Saiba mais sobre nosso projeto de correção de cores para daltonismo, desenvolvido como parte de um TCC",
      images: [
        signOgImageUrl({
          title: "Correção de Cores",
          label: "Sobre o Projeto",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
