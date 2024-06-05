import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# Sobre o Projeto

![Color Vision Correction](https://imagedelivery.net/lLmNeOP7HXG0OqaG97wimw/clvlugru90000o4g8ahxp069s/db7abbe3-aa5c-433e-a16d-cbf137d1c9e5.png/public)

Bem-vindo ao nosso site! Este projeto foi desenvolvido como parte do Trabalho de Conclusão de Curso (TCC) e tem como objetivo ajudar pessoas com daltonismo a perceberem as cores de forma mais precisa através de filtros de correção de cores.

Depois de muitas pesquisas e desenvolvimento, criamos uma solução que oferece diferentes tipos de filtros para corrigir a percepção de cores de acordo com o nível de daltonismo de cada usuário. Nosso site é uma ferramenta acessível e fácil de usar que permite às pessoas com daltonismo ver o mundo com mais clareza.

![Color Vision Correction](https://imagedelivery.net/lLmNeOP7HXG0OqaG97wimw/clvlugru90000o4g8ahxp069s/6b080e65-2329-4a36-ad5c-0a6af8d9aeb1.png/public)

A ideia por trás deste projeto é proporcionar uma melhor qualidade de vida para aqueles que sofrem de daltonismo, permitindo que eles apreciem as cores de maneira mais fiel à realidade. No site, você encontrará informações detalhadas sobre os diferentes tipos de daltonismo, como nossos filtros funcionam e como você pode aplicá-los no seu dia a dia.

Estamos comprometidos em continuar aprimorando esta ferramenta e adicionando mais funcionalidades baseadas no feedback dos usuários. Esperamos que nosso trabalho ajude muitas pessoas a terem uma experiência visual mais rica e satisfatória.

Junte-se a nós nessa missão e descubra como as cores podem ser vibrantes e cheias de vida!

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
