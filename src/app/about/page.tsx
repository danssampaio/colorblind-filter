import Markdown from "react-markdown";

const content = `# Sobre o Projeto

Este projeto nasceu do meu Trabalho de Conclusão de Curso (TCC) em Ciência da Computação e tem como foco a **acessibilidade web para pessoas com daltonismo**. A motivação surgiu da necessidade de tornar a internet mais inclusiva, já que boa parte das informações em sites dependem do uso de cores, o que dificulta a navegação de milhões de pessoas daltônicas.

## Contexto
O daltonismo, também chamado de discromatopsia, é uma condição que afeta a percepção de cores — sendo mais comuns as dificuldades em distinguir vermelho, verde e azul. Isso pode impactar a interpretação de gráficos, botões de ação e elementos visuais importantes. Embora existam diretrizes como a WCAG, muitas vezes elas não são suficientes para lidar com os desafios específicos enfrentados por esse público.

## Objetivo
O objetivo principal foi **desenvolver um filtro corretivo de cores** aplicado diretamente em páginas web. Esse filtro permite que usuários selecionem o tipo de daltonismo (protanopia, deuteranopia ou tritanopia) e vejam os elementos recoloridos em tempo real, aumentando a diferenciação entre as cores.

## Como Funciona
O sistema foi implementado em um site de testes, com três páginas principais:
- **Página inicial**: apresenta o projeto e sua motivação.
- **Página de componentes**: permite visualizar botões e elementos de interface com e sem o filtro.
- **Página de imagens**: inclui testes de Ishihara e imagens geradas por IA, mostrando como a recoloração melhora a percepção.

As técnicas utilizadas incluíram **transformações lineares e fuzzyficação**, aplicadas sobre os estilos (CSS) e imagens, de forma a ajustar contraste e cores de acordo com o tipo de daltonismo.

## Resultados
- A aplicação demonstrou **ganhos significativos na distinção de cores**.
- O filtro corrigiu cores em botões e imagens de teste, tornando a navegação mais clara.
- Mesmo sem pesquisa empírica com usuários finais, comparações com projetos anteriores mostraram que o algoritmo é eficaz e promissor.

## Trabalhos Futuros
Entre as melhorias planejadas estão:
- Ampliar o suporte a mais tipos e níveis de daltonismo.
- Melhorar a precisão na correção de imagens.
- Otimizar a performance do algoritmo para sites maiores.
- Exportar o filtro como um **módulo reutilizável**, que possa ser aplicado em qualquer site.
- Realizar pesquisas empíricas com usuários daltônicos para validação prática.

---

Obrigado por visitar o site!

**Dan Souza Sampaio**
`;

export async function generateMetadata() {
  return {
    title: "Sobre o Projeto",
    description:
      "Saiba mais sobre o projeto de filtro corretivo de cores para daltonismo, desenvolvido como parte de um TCC em Ciência da Computação.",
    openGraph: {
      title: "Sobre o Projeto",
      description:
        "Saiba mais sobre o projeto de filtro corretivo de cores para daltonismo, desenvolvido como parte de um TCC em Ciência da Computação.",
    },
  };
}

const Page = async () => {
  return (
    <div>
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content container px-5">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default Page;
