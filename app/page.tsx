"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
    title: "Foto & vídeo social",
    text: "Fotos, Reels e Stories criados juntos para manter seu Instagram bonito, coerente e sempre em movimento.",
  },
  {
    number: "02",
    title: "Marcas & profissionais",
    text: "Retratos, produtos e conteúdo para quem precisa comunicar valor com imagem, ritmo e intenção.",
  },
  {
    number: "03",
    title: "Eventos & histórias",
    text: "Momentos reais transformados em vídeos curtos, registros sensíveis e conteúdo pronto para compartilhar.",
  },
];

const process = [
  ["01", "Imersão", "Entendemos a história, o público e o resultado que você quer alcançar."],
  ["02", "Criação", "Transformamos o briefing em conceito, roteiro e uma direção visual clara."],
  ["03", "Produção", "Organizamos equipe, captação e todos os detalhes do dia de filmagem."],
  ["04", "Finalização", "Editamos, refinamos som e cor e entregamos o material pronto para circular."],
];

function HeroVisual({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`hero__visual ${mobile ? "hero__visual--mobile" : "hero__visual--desktop"}`}
      aria-hidden={mobile ? "true" : undefined}
      aria-label={mobile ? undefined : "Fotografias produzidas pela Filmo Company"}
    >
      <figure className="hero__frame hero__frame--primary">
        <Image
          src="/images/project-couple.jpg"
          alt=""
          fill
          sizes={mobile ? "calc(100vw - 32px)" : "38vw"}
          priority
        />
      </figure>
      <div className="hero__format-label">
        <span>01</span>
        <strong>FOTO + VÍDEO</strong>
        <small>CONTEÚDO PARA INSTAGRAM</small>
      </div>
      <span className="hero__visual-mark">FILMO / OLHAR EM MOVIMENTO</span>
    </div>
  );
}

export default function Home() {
  const projectRail = useRef<HTMLDivElement>(null);
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  function scrollProjects(direction: -1 | 1) {
    const rail = projectRail.current;

    if (!rail) return;

    const firstProject = rail.querySelector<HTMLElement>(".project");
    const cardWidth = firstProject?.getBoundingClientRect().width ?? rail.clientWidth * 0.8;
    rail.scrollBy({ left: direction * (cardWidth + 18), behavior: "smooth" });
  }

  function closeMobileMenu() {
    mobileMenu.current?.removeAttribute("open");
  }

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

        <details className="mobile-menu" ref={mobileMenu}>
          <summary aria-label="Abrir menu de navegação">
            <span className="mobile-menu__label">Menu</span>
            <span className="mobile-menu__icon" aria-hidden="true"><i /><i /></span>
          </summary>
          <nav aria-label="Navegação mobile">
            <div className="mobile-menu__top">
              <span>Navegação</span>
              <b>FILMO / 2026</b>
            </div>
            <a href="#trabalhos" onClick={closeMobileMenu}><span>01</span><strong>Trabalhos</strong><i>↘</i></a>
            <a href="#servicos" onClick={closeMobileMenu}><span>02</span><strong>Serviços</strong><i>↘</i></a>
            <a href="#sobre" onClick={closeMobileMenu}><span>03</span><strong>Sobre</strong><i>↘</i></a>
            <a href="#contato" onClick={closeMobileMenu}><span>04</span><strong>Contato</strong><i>↘</i></a>
            <a className="mobile-menu__cta" href={whatsapp} target="_blank" rel="noreferrer" onClick={closeMobileMenu}>
              <span>Tem uma ideia?</span>
              <strong>Solicitar orçamento ↗</strong>
            </a>
          </nav>
        </details>
      </header>

      <section className="hero" id="inicio">
        <div className="hero__content shell">
          <div className="hero__copy">
            <p className="eyebrow">Foto + vídeo para Instagram · Americana, SP</p>
            <h1>
              Conteúdo que faz sua marca <em>parar o scroll.</em>
            </h1>
            <HeroVisual mobile />
            <p>
              Criamos fotos, Reels e vídeos verticais para marcas, profissionais e eventos que querem aparecer no Instagram com intenção.
            </p>
            <div className="weekend-note">
              <span aria-hidden="true">●</span>
              Atuamos exclusivamente aos finais de semana
            </div>
            <div className="hero__actions">
              <a className="button button--primary" href="#trabalhos">
                Veja nosso olhar
              </a>
              <a className="button button--ghost" href={whatsapp} target="_blank" rel="noreferrer">
                Solicite um orçamento
              </a>
            </div>
          </div>
          <HeroVisual />
        </div>
        <div className="hero__index" aria-hidden="true">
          <span>FILMO / 2026</span>
          <span>22°44&apos;S · 47°20&apos;W</span>
        </div>
      </section>

      <section className="marquee" aria-label="Especialidades">
        <div>
          <span>Fotografia</span><b>✦</b><span>Reels</span><b>✦</b><span>Vídeos verticais</span><b>✦</b><span>Conteúdo para marcas</span><b>✦</b><span>Eventos</span><b>✦</b><span>Fotografia</span>
        </div>
      </section>

      <section className="work section shell" id="trabalhos">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Trabalhos selecionados</p>
            <h2>Fotos que mostram nosso olhar.</h2>
          </div>
          <p className="section-heading__note">
            Uma seleção de imagens que traduz nosso cuidado com enquadramento, direção e narrativa.
          </p>
        </div>

        <div className="project-rail" ref={projectRail} aria-label="Galeria de trabalhos selecionados">
          {projects.map((project, index) => (
            <article className="project" key={project.title} data-reveal>
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
        <div className="project-rail__footer">
          <span>Use as setas para ver mais</span>
          <div className="project-rail__controls" aria-label="Controles da galeria">
            <button type="button" onClick={() => scrollProjects(-1)} aria-label="Ver trabalho anterior">
              ←
            </button>
            <button type="button" onClick={() => scrollProjects(1)} aria-label="Ver próximo trabalho">
              →
            </button>
          </div>
        </div>
      </section>

      <section className="services section" id="servicos">
        <div className="shell">
          <div className="section-heading section-heading--light" data-reveal>
            <div>
              <p className="eyebrow">O que fazemos</p>
            <h2>Foto e vídeo para o feed real.</h2>
            </div>
            <p className="section-heading__note">Conteúdo curto, estratégico e visualmente forte para marcas, profissionais e momentos.</p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <article className="service" key={service.number} data-reveal>
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
        <div className="about__image-wrap" data-reveal>
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
        <div className="about__copy" data-reveal>
          <p className="eyebrow">Sobre a Filmo</p>
          <h2>Imagem com intenção, em foto e vídeo.</h2>
          <p className="about__lead">
            A Filmo transforma ideias, negócios e momentos em conteúdo visual feito para comunicar rápido e permanecer na memória.
          </p>
          <p>
            Criamos fotos e vídeos para Instagram com direção, captação e edição cuidadosas. Cada projeto começa pela escuta e termina pronto para circular no formato certo.
          </p>
          <a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">
            Conte sua ideia <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="process section shell">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Nosso processo</p>
            <h2>Da ideia ao post.</h2>
          </div>
        </div>
        <div className="process-grid">
          {process.map(([number, title, text]) => (
            <article className="process-step" key={number} data-reveal>
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
            <blockquote data-reveal>
              <p>“Cada foto transmite perfeitamente a emoção e a essência desses momentos tão especiais.”</p>
              <footer>Fabrício &amp; Andressa <span>· Casamento</span></footer>
            </blockquote>
            <blockquote data-reveal>
              <p>“Eles entendem o que a marca quer dizer e entregam muito mais do que se espera.”</p>
              <footer>Diego Augusto <span>· Marketing, MKData</span></footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="contact section shell" id="contato">
        <div className="contact__card" data-reveal>
          <p className="eyebrow">Vamos criar juntos?</p>
          <h2>Tem uma história que merece ser vista?</h2>
          <p>Conte brevemente o que você imagina. A gente responde com os próximos passos e um orçamento sob medida.</p>
          <a className="button button--dark" href={whatsapp} target="_blank" rel="noreferrer">
            Falar no WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact__details" data-reveal>
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
