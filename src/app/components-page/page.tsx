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
        <h1 className="text-gray-800">Teste em Componentes</h1>
        <p className="text-gray-700">
          Esta é uma lista de componentes que podem ser integrados em sites
          utilizando a técnologia Tailwind. Foram dispostos diversos deles, das
          mais variadas cores para a realização do teste de recoloração do
          filtro.
        </p>
      </div>
      <div>
        <div>
          <h2 className="text-gray-800">Cards</h2>
          <p className="text-gray-700">
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
          <p className="text-gray-700">
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
              color={card.bgColor}
            />
          ))}
        </div>
      </div>
      <div className="pt-5">
        <div>
          <h2 className="text-gray-800">Alerts</h2>
          <p className="text-gray-700">
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

      <div className="mb-4">
        <h2 className="text-gray-800">Formulários</h2>
        <p className="text-gray-700">
          Cores em formulário também é uma das formas de passar informações ao
          usuário, como por exemplo, indicar se um campo está com o dado correto
          ou errado. Desse modo, o usuário saberá se a informação no campo está
          de acordo com a validação do formulário.
        </p>
      </div>
      <Form />
    </section>
  );
};

export default Page;
