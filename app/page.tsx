import Image from "next/image";

const whatsapp =
  "https://wa.me/5519988509636?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Filmo%20Company%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";

const projects = [
  {
    title: "Retrato de noiva",
    category: "Casamento",
    image: "/images/project-wedding.jpg",
  },
  {
    title: "Ensaio pré-wedding",
    category: "Casais",
    image: "/images/project-couple.jpg",
  },
  {
    title: "Casamento civil",
    category: "Casamento",
    image: "/images/project-civil.jpg",
  },
  {
    title: "Retrato corporativo",
    category: "Marcas",
    image: "/images/project-food.jpg",
  },
  {
    title: "Fotografia gastronômica",
    category: "Gastronomia",
    image: "/images/project-corporate.jpg",
  },
];

const services = [
  {
    number: "01",
    title: "Marcas",
    text: "Filmes institucionais, campanhas e histórias de marca que traduzem estratégia em imagem, ritmo e emoção.",
  },
  {
    number: "02",
    title: "Eventos",
    text: "Casamentos, celebrações e encontros corporativos registrados com presença, sensibilidade e olhar documental.",
  },
  {
    number: "03",
    title: "Conteúdo digital",
    text: "Vídeos e fotografias pensados para redes sociais, com linguagem atual e consistência para sua marca aparecer melhor.",
  },
];

const process = [
  ["01", "Imersão", "Entendemos a história, o público e o resultado que você quer alcançar."],
  ["02", "Criação", "Transformamos o briefing em conceito, roteiro e uma direção visual clara."],
  ["03", "Produção", "Organizamos equipe, captação e todos os detalhes do dia de filmagem."],
  ["04", "Finalização", "Editamos, refinamos som e cor e entregamos o material pronto para circular."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Filmo Company, início">
          <Image src="/images/logo.png" alt="Filmo Company" width={396} height={154} priority />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#trabalhos">Trabalhos</a>
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>

        <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">
          Iniciar um projeto <span aria-hidden="true">↗</span>
        </a>

        <details className="mobile-menu">
          <summary aria-label="Abrir menu">Menu</summary>
          <nav aria-label="Navegação mobile">
            <a href="#trabalhos">Trabalhos</a>
            <a href="#servicos">Serviços</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="inicio">
        <div className="hero__content shell">
          <div className="hero__copy">
            <p className="eyebrow">Produtora audiovisual · Americana, SP</p>
            <h1>
              Filmes que transformam <em>marcas e momentos</em> em histórias memoráveis.
            </h1>
            <p>
              Da primeira ideia à entrega final, criamos filmes e fotografias que aproximam pessoas e dão forma ao que merece ser lembrado.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#trabalhos">
                Conheça os trabalhos
              </a>
              <a className="button button--ghost" href={whatsapp} target="_blank" rel="noreferrer">
                Solicite um orçamento
              </a>
            </div>
          </div>
          <div className="hero__visual" aria-label="Retratos de projetos para marcas e momentos">
            <figure className="hero__frame hero__frame--main">
              <Image
                src="/images/project-food.jpg"
                alt="Retrato corporativo produzido pela Filmo Company"
                fill
                sizes="(max-width: 760px) 78vw, 40vw"
                priority
              />
              <figcaption>Marcas</figcaption>
            </figure>
            <figure className="hero__frame hero__frame--accent">
              <Image
                src="/images/project-wedding.jpg"
                alt="Retrato de noiva produzido pela Filmo Company"
                fill
                sizes="(max-width: 760px) 42vw, 20vw"
              />
              <figcaption>Momentos</figcaption>
            </figure>
            <span className="hero__visual-mark" aria-hidden="true">FILMO / OLHAR AUTORAL</span>
          </div>
        </div>
        <div className="hero__index" aria-hidden="true">
          <span>FILMO / 2026</span>
          <span>22°44&apos;S · 47°20&apos;W</span>
        </div>
      </section>

      <section className="marquee" aria-label="Especialidades">
        <div>
          <span>Filmes de marca</span><b>✦</b><span>Eventos</span><b>✦</b><span>Conteúdo digital</span><b>✦</b><span>Fotografia</span><b>✦</b><span>Filmes de marca</span>
        </div>
      </section>

      <section className="work section shell" id="trabalhos">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trabalhos selecionados</p>
            <h2>Histórias vistas pelo nosso olhar.</h2>
          </div>
          <p className="section-heading__note">
            Uma seleção de histórias que registramos para casamentos, empresas e marcas.
          </p>
        </div>

        <div className="project-rail" aria-label="Galeria de trabalhos selecionados">
          {projects.map((project, index) => (
            <article className="project" key={project.title}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 760px) 78vw, 31vw"
              />
              <div className="project__overlay" />
              <span className="project__number">0{index + 1}</span>
              <div className="project__caption">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <div className="project-rail__footer" aria-hidden="true">
          <span>Arraste para ver mais</span>
          <span>01 / 05</span>
        </div>
      </section>

      <section className="services section" id="servicos">
        <div className="shell">
          <div className="section-heading section-heading--light">
            <div>
              <p className="eyebrow">O que fazemos</p>
              <h2>Produção feita para conectar.</h2>
            </div>
            <p className="section-heading__note">Três frentes, uma mesma atenção à narrativa, à estética e ao resultado.</p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <article className="service" key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={`Conversar sobre ${service.title}`}>
                  Conversar <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about section shell" id="sobre">
        <div className="about__image-wrap">
          <Image
            className="about__image"
            src="/images/team.jpg"
            alt="Equipe audiovisual em produção"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
          <div className="about__stamp">
            <strong>FILMO</strong>
            <span>AMERICANA · SP</span>
          </div>
        </div>
        <div className="about__copy">
          <p className="eyebrow">Sobre a Filmo</p>
          <h2>Histórias reais. Imagens com intenção.</h2>
          <p className="about__lead">
            A Filmo Company nasceu da vontade de contar histórias através das lentes, com técnica, sensibilidade e proximidade em cada etapa.
          </p>
          <p>
            Criamos produções para empresas, marcas e eventos sociais. Cada projeto começa pela escuta e termina com um material que parece verdadeiro para quem viveu e relevante para quem assiste.
          </p>
          <a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">
            Conte sua ideia <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="process section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Nosso processo</p>
            <h2>Clareza do briefing à entrega.</h2>
          </div>
        </div>
        <div className="process-grid">
          {process.map(([number, title, text]) => (
            <article className="process-step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials section">
        <div className="shell">
          <p className="eyebrow">Quem já viveu essa experiência</p>
          <div className="quote-grid">
            <blockquote>
              <p>“Cada foto transmite perfeitamente a emoção e a essência desses momentos tão especiais.”</p>
              <footer>Fabrício &amp; Andressa <span>· Casamento</span></footer>
            </blockquote>
            <blockquote>
              <p>“Eles entendem o que a marca quer dizer e entregam muito mais do que se espera.”</p>
              <footer>Diego Augusto <span>· Marketing, MKData</span></footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="contact section shell" id="contato">
        <div className="contact__card">
          <p className="eyebrow">Vamos criar juntos?</p>
          <h2>Tem uma história que merece ser vista?</h2>
          <p>Conte brevemente o que você imagina. A gente responde com os próximos passos e um orçamento sob medida.</p>
          <a className="button button--dark" href={whatsapp} target="_blank" rel="noreferrer">
            Falar no WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact__details">
          <div>
            <span>E-mail</span>
            <a href="mailto:filmocompany@gmail.com">filmocompany@gmail.com</a>
          </div>
          <div>
            <span>Telefone</span>
            <a href={whatsapp} target="_blank" rel="noreferrer">+55 19 98850-9636</a>
          </div>
          <div>
            <span>Localização</span>
            <p>Americana, São Paulo</p>
          </div>
          <div>
            <span>Redes</span>
            <a href="https://www.instagram.com/filmocompany/" target="_blank" rel="noreferrer">Instagram ↗</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__inner shell">
          <Image src="/images/logo.png" alt="Filmo Company" width={396} height={154} />
          <p>Produção audiovisual em Americana, SP.</p>
          <p>© 2026 Filmo Company</p>
        </div>
      </footer>
    </main>
  );
}
