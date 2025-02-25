import Image from "next/image";
import { dalleImages, ishiharaImages, imageProps } from "./images-page";

const ImagesPage = async () => {
  const isActive: boolean = true;

  return (
    <section className="container mx-auto px-24 mb-10 lg:prose-lg dark:prose-invert mt-20">
      <div className="flex flex-col">
        <h1>Imagens para Teste de Recoloração</h1>
        <p>
          Diversas imagens utilizadas para o teste de recoloração, dentre elas,
          imagens utilizadas no teste de Ishihara e também imagens geradas pela
          IA DALL-E 3
        </p>
      </div>
      <div>
        <div>
          <h2>Teste de Ishihara</h2>
          <p>
            O teste de Ishihara é um exame oftalmológico simples que mede a
            capacidade de uma pessoa diferenciar cores. Desenvolvido em 1917
            pelo Dr. Shinobu Ishihara, o teste é composto por 38 placas
            coloridas que contêm padrões de pontos multicoloridos com números ou
            símbolos. Pessoas que não possuem daltonismo podem facilmente
            identificar esses padrões, enquanto indivíduos com essa condição
            possuem dificuldade em distinguir as cores. A seguir temos algumas
            imagens das placas utilizadas nos testes.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-3 lg:flex-row justify-items-center">
          {ishiharaImages.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              className="h-auto object-cover p-5"
            />
          ))}
        </div>
      </div>
      <div>
        <div>
          <h2>DALL-E 3</h2>
          <p>
            O DALL-E 3 é um modelo de inteligência artificial (IA) desenvolvido
            pela OpenAI, que permite transformar descrições textuais em imagens
            coerentes, detalhadas e frequentemente surpreendentemente criativas.
            Ele é a terceira iteração do modelo DALL-E, lançado pela primeira
            vez em janeiro de 2021, sendo notável por sua compreensão aprimorada
            do contexto e sua capacidade de produzir imagens precisas e
            detalhadas com base em descrições textuais fornecidas pelo usuário.
          </p>
          <p>
            Essa tecnologia é baseada em algoritmos que aprendem a reconhecer e
            gerar imagens a partir de linguagem natural. Ela é integrada ao
            ChatGPT, outro modelo de IA generativa da OpenAI, permitindo que os
            usuários trabalhem em conjunto para refinar e ajustar as imagens
            geradas.
          </p>
          <p>
            O DALL-E 3 tem várias aplicações práticas, incluindo a geração de
            infográficos, a criação de arte e design, e a produção de imagens
            para fins comerciais. Além disso, ela pode ser usada para projetar
            imagens que são precisas e cativantes, reduzindo o tempo e os
            recursos necessários para a criação de conteúdo visual.
          </p>
          <p>A seguir temos algumas imagens geradas pelo DALL-E 3.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-3 lg:flex-row justify-items-center">
          {dalleImages.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              className="h-auto object-cover p-5"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImagesPage;
