import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  return (
    <section className="container mx-auto px-24 mb-10 lg:prose-lg dark:prose-invert mt-20">
      <div className="flex flex-col items-center text-center">
        <div className="flex justify-center">
          <Image
            src={"/colorblind-filter.svg"}
            alt="Filtro de cor para daltonismo"
            width={500}
            height={400}
            className="object-cover"
            priority
          />
        </div>
        <p>
          Este é um site teste para um filtro de correção de cores para pessoas
          com condição de daltonismo. Ele realiza a recoloração de componentes e
          imagens do site para que pessoas essa condição consigam diferenciar as
          cores corretamente.
        </p>
      </div>
      <hr />
      <div>
        <h2 className="text-2xl font-semibold mt-6">O Propósito do Site</h2>
        <p>
          O objetivo deste projeto é realizar testes recolorindo componentes e
          imagens, tornando-os mais acessíveis para pessoas com diferentes tipos
          de daltonismo. Muitas interfaces digitais utilizam cores como
          principal meio de comunicação, o que pode dificultar a experiência de
          usuários daltônicos ao interpretar certas informações visuais.
        </p>
        <p>
          Para isso, nosso projeto segue dois passos fundamentais. Primeiro, é
          essencial compreender o que é o daltonismo, como ele afeta a percepção
          das cores e quais são seus principais tipos, como protanopia,
          deuteranopia e tritanopia. Em seguida, utilizamos ferramentas que
          simulam a visão daltônica para testar e ajustar as cores dos
          componentes e imagens, garantindo que sejam facilmente distinguíveis
          independentemente da condição visual do usuário.
        </p>
      </div>

      <hr />

      <div>
        <h2 className="text-2xl font-semibold mt-6">O que é o Daltonismo?</h2>
        <p>
          O daltonismo é uma condição visual majoritariamente hereditária que
          afeta a capacidade de distinguir certas cores, principalmente o
          vermelho, verde, azul e amarelo, sendo amarelo e azul os casos com
          menos frequência. Também pode ser adquirida mediante traumas nos olhos
          ou lesões cerebrais, por exemplo, mas de modo atípico. O pior dos
          casos é a total isenção da percepção de cor, enxergando somente tons
          de cinza, sendo o caso mais raro de daltonismo
        </p>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6 lg:gap-3">
          <div className="flex items-center text-justify">
            <p>
              A percepção das cores pelo olho humano é um processo detalhado e
              complexo que envolve desde a entrada de luz nos nossos olhos, a
              passagem pela retina até a interpretação pelo nosso cérebro. No
              entanto, o foco principal para enxergarmos as cores é na retina,
              envolvendo, sobretudo, dois tipos de células fotorreceptoras
              chamadas de bastonetes e cones, que utilizam da luz para vermos
              diferentes tipos de cores.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={"/images/retina-section.png"}
              alt="Seção da retina"
              width={400}
              height={300}
            />
            <a
              className="container text-sm text-blue-500"
              rel="stylesheet"
              href="#drauzio"
            >
              Representação esquemática da seção da retina mostrando cones e
              bastonetes (Color 2011)
            </a>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6 lg:gap-3 mt-5">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={"/images/cones-bastonetes.png"}
              alt="cones e bastonetes"
              width={600}
              height={400}
            />
            <a
              className="container text-sm text-blue-500"
              rel="stylesheet"
              href="#vlc"
            >
              Representação esquemática demonstrando como é um cone e bastonete
              e suas regiões (Ciência 2023)
            </a>
          </div>
          <div className="flex flex-col justify-items-center">
            <p>
              Os bastonetes são responsáveis pela visão em condições de pouca
              luz (visão escotópica), sendo extremamente sensíveis à luz e
              permitindo a visão em tons de cinza em ambientes com pouca
              iluminação. Eles são mais numerosos na periferia da retina.
            </p>
            <p>
              Já os cones, são responsáveis pela visão em condições de alta
              luminosidade (visão fotópica), como principais agentes na
              percepção das cores. Existem três tipos de cones, cada um contendo
              pigmentos seletivos que reagem a diferentes comprimentos de onda
              de luz: vermelho, verde e azul. Os cones estão concentrados
              principalmente na fóvea, a região central da retina.
            </p>
          </div>
        </div>
        <p>
          A interação entre os três tipos de cones, cada qual com sensibilidade
          para diferentes comprimentos de onda de luz, permite que o olho humano
          veja e discrimine uma grande variedade de cores, que vão desde as mais
          simples e discretas até as mais intensas. Diminuição das células
          fotorreceptoras cones ou a ausência total delas, dificulta o enxergar
          de cores em determinado espectro.
        </p>
      </div>

      <hr />

      <div>
        <h2 className="text-2xl font-semibold mt-6">
          Quais são os tipos de daltonismo?
        </h2>
        <p>
          Existem variados tipos de daltonismo, onde o foco deste projeto são os
          três principais, sendo eles:
        </p>
        <ul className="list-disc ml-6 flex flex-col lg:grid lg:grid-cols-3 gap-6">
          <li>
            <strong>Protanopia</strong>: Dificuldade em perceber tons presentes
            no espectro vermelho.
            <div className="flex flex-col items-center justify-center text-center text-wrap">
              <Image
                src={"/images/protanopia-color-spectrum.jpg"}
                alt="cones e bastonetes"
                width={250}
                height={200}
              />
              <a
                className="text-sm text-blue-500"
                rel="stylesheet"
                href="#colblindor"
              >
                Espectro de cores normal da protanopia (Colblindor 2006)
              </a>
            </div>
          </li>
          <li>
            <strong>Deuteranopia</strong>: Dificuldade em distinguir tons de
            verde.
            <div className="flex flex-col items-center justify-center text-center text-wrap">
              <Image
                src={"/images/deuteranopia-color-spectrum.jpg"}
                alt="cones e bastonetes"
                width={250}
                height={200}
              />
              <a
                className="text-sm text-blue-500"
                rel="stylesheet"
                href="#colblindor"
              >
                Espectro de cores normal e da deuteranopia (Colblindor 2006)
              </a>
            </div>
          </li>
          <li>
            <strong>Tritanopia</strong>: Dificuldade em perceber tons de azul e
            amarelo.
            <div className="flex flex-col items-center justify-center text-center text-wrap">
              <Image
                src={"/images/tritanopia-color-spectrum.jpg"}
                alt="cones e bastonetes"
                width={250}
                height={200}
              />
              <a
                className="text-sm text-blue-500"
                rel="stylesheet"
                href="#colblindor"
              >
                Espectro de cores normal e da tritanopia (Colblindor 2006)
              </a>
            </div>
          </li>
        </ul>
      </div>

      <hr />
      
      <div>
        <h2 className="text-2xl font-semibold mt-6">Como Funciona o Filtro?</h2>
        <p>
          O filtro do site aplica algoritmos de correção de cores para modificar
          os tons exibidos na tela, tornando-os mais distinguíveis para pessoas
          com daltonismo. Para usá-lo, basta selecionar a opção do tipo de
          daltonismo e ele irá percorrer a página, buscando as cores que o tipo
          selecionado tem dificuldade em diferenciar, e realiza a troca para
          outro espectro.
        </p>
        <p>
          Para pessoas que não possuem essa condição, caso queira visualizar
          como é enxergar no espectro de um daltônico, recomendo utilizar alguma
          ferramenta de simulação, como por exemplo a extensão{" "}
          <Link
            className="text-blue-600 hover:text-blue-900"
            href={"https://github.com/oftheheadland/Colorblindly"}
            target="_blank"
          >
            Colorblindy
          </Link>
          .
        </p>
      </div>
      <div className="pt-16">
        <h2>Referências</h2>
        <ul className="list-disc ml-6">
          <li id="drauzio">
            <Link
              className="text-blue-600 hover:text-blue-900"
              href={
                "https://drauziovarella.uol.com.br/doencas-e-sintomas/daltonismo/"
              }
              target="_blank"
            >
              Daltonismo
            </Link>
            - DRAUZIO, 2021
          </li>
          <li id="deltacolor">
            <Link
              className="text-blue-600 hover:text-blue-900"
              href={
                "https://www.deltacolorbrasil.com/espectrofotometroXcolorimetro.html"
              }
              target="_blank"
            >
              Espectrofotômetro X Colorímetro
            </Link>
            - Delta Color, 2011
          </li>
          <li id="vlc">
            <Link
              className="text-blue-600 hover:text-blue-900"
              href={
                "https://vemlerciencia.com.br/2023/04/20/quer-ver-uma-estrela-nao-olhe-para-ela/"
              }
              target="_blank"
            >
              Quer ver uma estrela? Não olhe para ela!
            </Link>
            - Vem Ler Ciência, 2023
          </li>
          <li id="colorblindor">
            <Link
              className="text-blue-600 hover:text-blue-900"
              href={"https://www.color-blindness.com/"}
              target="_blank"
            >
              Colorblindor
            </Link>
            - Colorblindor, 2006
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
