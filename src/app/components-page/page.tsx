import Form from "@/app/components/components-test/form";
import Alert from "@/app/components/components-test/alerts";
import Card from "@/app/components/components-test/card";
import Link from "next/link";

import { cards } from "./items-page";
import { alerts } from "./items-page";

const Page = async () => {
  return (
    <section className="lg:prose-lg dark:prose-invert container mt-20 mb-10">
      <div>
        <h1>Teste em Componentes</h1>
        <p>
          Esta é uma lista de componentes que podem ser integrados em sites
          utilizando a técnologia Tailwind. Foram dispostos diversos deles, das
          mais variadas cores para a realização do teste de recoloração do
          filtro.
        </p>
        <p>
          É necessário que qualquer aplicação web esteja de acordo com a
          diretrizes da{" "}
          <Link href={"https://www.w3.org/"}>
            World Wide Web Consortium(W3C)
          </Link>
          e{" "}
          <Link href={"https://www.w3.org/TR/WCAG22/"}>
            Web Content Accessibility Guidelines(WCAG)
          </Link>
          , mas sabemos que boa parte das aplicações não seguem essas
          diretrizes. Nos componentes a seguir, iremos ver como seguir essas
          diretrizes é de extrema importância, com alguns deles não seguindo
          algumas regras, para caso sites não possuam ferramentas que auxiliem
          pessoas com daltonismo.
        </p>
      </div>

      <hr />

      <div>
        <div>
          <h2>Cards</h2>
          <p>
            Muitos sites de notícias, como o{" "}
            <Link
              className="text-blue-600"
              href="https://globo.com"
              target="_blank"
            >
              globo.com
            </Link>
            , utiliza das cores para indicar o tipo de notícia. Devido a isso,
            pessoas com condição de daltonismo que frequentam esses tipos de
            site perdem informações visuais que são passadas através das cores.
          </p>
          <p>
            A seguir temos alguns exemplos de cards de notícias com cores para
            transmitir informações. A partir deles, podemos ter uma noção de
            como pessoas com daltonismo podem confundir as cores.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-3 lg:flex-row">
          {cards.map((card) => (
            <Card
              key={card.type}
              type={card.type}
              description={card.description}
              bgColor={card.bgColor}
            />
          ))}
        </div>
      </div>
      
      <hr />

      <div>
        <div>
          <h2>Alerts</h2>
          <p>
            Outra forma muito comum de passar informações através das cores, é
            utilizando alertas em relação a ações realizadas em um site, que
            pode ocasionar o retorno de um status por uma API por exemplo.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-3 lg:flex-row">
          {alerts.map((alert) => (
            <Alert
              key={alert.type}
              description={alert.description}
              bgColor={alert.bgColor}
              type={alert.type}
            />
          ))}
        </div>
      </div>

      <hr />

      <div className="pb-16">
        <h2>Formulários</h2>
        <p>
          Cores em formulários também são uma das formas de passar informações
          ao usuário, como por exemplo, indicar se um campo está com o dado
          correto ou não. Desse modo, o usuário saberá se a informação no campo
          está de acordo com a validação do formulário.
        </p>
        <p>
          O correto seria indicar por cores e textos a informação que queremos
          passar para o usuário segundo a WCAG. Para mostrarmos como isso é
          importante, somente será adicionado cores, e ao enviar o formulário,
          veremos quais campos estão corretos.
        </p>
        <div className="text-center border border-neutral-400 px-5 py-2 rounded-xl">
          <h2>Formulário Teste</h2>
          <Form />
        </div>
        <p>
          Ao enviarmos o formulário com alguns campos em branco ou com erros de
          validação, vemos que somente cores são enviadas como informação para o
          usuário, acarretando em dificuldades para pessoas com daltonismo
          diferenciar o que está errado.
        </p>
      </div>
    </section>
  );
};

export default Page;
