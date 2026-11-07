export const phone = "+55 19 98850-9636";
export const email = "filmocompany@gmail.com";
export const instagram = "https://www.instagram.com/filmocompany/";

export function whatsappLink(message: string) {
  return `https://wa.me/5519988509636?text=${encodeURIComponent(message)}`;
}

export const whatsapp = whatsappLink(
  "Olá! Vim pelo site da Filmo Company e gostaria de conversar sobre um projeto.",
);

export const projects = [
  { title: "Retrato de noiva", category: "Casamento", image: "/images/project-wedding.jpg" },
  { title: "Ensaio pré-wedding", category: "Casais", image: "/images/project-couple.jpg" },
  { title: "Casamento civil", category: "Casamento", image: "/images/project-civil.jpg" },
  { title: "Retrato corporativo", category: "Marcas", image: "/images/project-portrait.jpg" },
  { title: "Fotografia gastronômica", category: "Gastronomia", image: "/images/project-food.jpg" },
];

/**
 * Vídeos verticais (9:16). Enquanto a lista estiver vazia, a seção "Reels"
 * e o link dela no menu não aparecem no site.
 *
 * Para publicar: coloque os arquivos em public/reels/ e adicione aqui, por exemplo:
 *   { title: "Casamento Fabrício & Andressa", src: "/reels/casamento.mp4", poster: "/reels/casamento.jpg" }
 */
export type Reel = { title: string; src: string; poster: string };
export const reels: Reel[] = [];

export type Service = {
  number: string;
  title: string;
  text: string;
  message: string;
  /** Preço inicial, ex.: "R$ 600". Se ficar vazio, a linha de preço não aparece. */
  from?: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Foto & vídeo social",
    text: "Fotos, Reels e Stories criados juntos para manter seu Instagram bonito, coerente e sempre em movimento.",
    message: "Olá! Vim pelo site da Filmo Company e quero conversar sobre Foto & vídeo social.",
  },
  {
    number: "02",
    title: "Marcas & profissionais",
    text: "Retratos, produtos e conteúdo para quem precisa comunicar valor com imagem, ritmo e intenção.",
    message: "Olá! Vim pelo site da Filmo Company e quero conversar sobre conteúdo para Marcas & profissionais.",
  },
  {
    number: "03",
    title: "Eventos & histórias",
    text: "Momentos reais transformados em vídeos curtos, registros sensíveis e conteúdo pronto para compartilhar.",
    message: "Olá! Vim pelo site da Filmo Company e quero conversar sobre Eventos & histórias.",
  },
];

export const processSteps = [
  { number: "01", title: "Imersão", text: "Entendemos a história, o público e o resultado que você quer alcançar." },
  { number: "02", title: "Criação", text: "Transformamos o briefing em conceito, roteiro e uma direção visual clara." },
  { number: "03", title: "Produção", text: "Organizamos equipe, captação e todos os detalhes do dia de filmagem." },
  { number: "04", title: "Finalização", text: "Editamos, refinamos som e cor e entregamos o material pronto para circular." },
];

export const testimonials = [
  {
    quote: "Cada foto transmite perfeitamente a emoção e a essência desses momentos tão especiais.",
    author: "Fabrício & Andressa",
    role: "Casamento",
  },
  {
    quote: "Eles entendem o que a marca quer dizer e entregam muito mais do que se espera.",
    author: "Diego Augusto",
    role: "Marketing, MKData",
  },
];

/**
 * Perguntas frequentes. Ainda faltam respostas para (adicione aqui quando tiver):
 *  - Quais cidades vocês atendem? Existe taxa de deslocamento?
 *  - Em quanto tempo recebo o material? (prazo de fotos e vídeos)
 *  - Posso usar as fotos e vídeos em anúncios? (direitos de uso)
 */
export const faq = [
  {
    question: "Vocês atendem durante a semana?",
    answer:
      "Nossas produções acontecem exclusivamente aos sábados e domingos. Mande no WhatsApp a data que você tem em mente para conferirmos a agenda.",
  },
  {
    question: "Como funciona o orçamento?",
    answer:
      "Conte brevemente o que você imagina. A gente responde com os próximos passos e um orçamento sob medida.",
  },
];
