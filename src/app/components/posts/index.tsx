import Image from "next/image";

const Posts = async () => {
  return (
    <section className="container mx-auto px-24 mb-10 lg:prose-lg dark:prose-invert mt-20">
      <div className="flex flex-col items-center text-center">
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
        <div className="grid grid-cols-2 gap-4 p-4">
          <Image
            src={"/images/ishihara_74.png"}
            alt={"Ishihara 74"}
            width={50}
            height={50}
            className={"w-full h-auto"}
          />
          <Image
            src="/images/ishihara_6.png"
            alt={"Ishihara 6"}
            width={50}
            height={50}
            className={"w-full h-auto"}
          />
          <Image
            src="/images/ishihara_42.png"
            alt={"Ishihara 4"}
            width={50}
            height={50}
            className={"w-full h-auto"}
          />
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
        <div className="grid grid-cols-2 gap-4 p-4">
          <Image
            src={"/images/dalle-5.png"}
            width={100}
            height={100}
            alt={"homens com roupas coloridas"}
            className="w-full h-auto"
          />
          <Image
            src={"/images/dalle-2.png"}
            width={100}
            height={100}
            alt={"crianças com frutas na mão"}
            className="w-full h-auto"
          />
          <Image
            src={"/images/dalle-1.png"}
            width={100}
            height={100}
            alt={"diversas frutas sobre tecido no parque"}
            className="w-full h-auto"
          />
          <Image
            src={"/images/dalle-4.png"}
            width={100}
            height={100}
            alt={"frutas sobre cesta"}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Posts;
