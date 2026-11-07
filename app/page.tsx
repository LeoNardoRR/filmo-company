import Image from "next/image";
import CameraViewfinder from "./camera-viewfinder";
import PortraitLab from "./portrait-lab";
import {
  email,
  faq,
  instagram,
  phone,
  processSteps,
  reels,
  services,
  testimonials,
  whatsapp,
  whatsappLink,
} from "./content";
import SiteHeader from "./site-header";

const specialties = ["Fotografia", "Reels", "Vídeos verticais", "Conteúdo para marcas", "Eventos"];

const nav = [
  ...(reels.length ? [{ href: "#reels", label: "Reels" }] : []),
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#sobre", label: "Sobre" },
  { href: "#faq", label: "FAQ" },
];

export default function Home() {
  return (
    <>
      <SiteHeader items={nav} />

      <main>
        <section className="hero" id="inicio">
          <div className="hero__inner shell">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--yellow">Foto + vídeo para Instagram · Americana, SP</p>
              <h1 className="display display--hero">
                Conteúdo que faz sua marca <em>parar o scroll.</em>
              </h1>
              <p className="hero__lead">
                Criamos fotos, Reels e vídeos verticais para marcas, profissionais e eventos que querem aparecer no
                Instagram com intenção.
              </p>
              <div className="hero__actions">
                <a className="button button--yellow button--large" href={whatsapp} target="_blank" rel="noreferrer">
                  Pedir orçamento no WhatsApp <span aria-hidden="true">↗</span>
                </a>
                <a className="button button--ghost button--large" href="#servicos">
                  Ver serviços
                </a>
              </div>
              <ul className="hero__facts">
                <li>Foto + vídeo vertical</li>
                <li>Direção, captação e edição</li>
                <li>Produções aos fins de semana</li>
              </ul>
            </div>

          </div>
        </section>

        <section className="marquee" aria-label="Especialidades">
          <div className="marquee__track">
            {[0, 1, 2, 3].map((copy) => (
              <div className="marquee__group" key={copy} aria-hidden={copy > 0 ? "true" : undefined}>
                {specialties.map((item) => (
                  <span key={item}>
                    {item}
                    <b aria-hidden="true">✦</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <CameraViewfinder />

        <PortraitLab />

        <section className="section section--light" id="portfolio" aria-labelledby="portfolio-title">
          <div className="shell">
            <div className="section-head">
              <div className="section-head__title">
                <p className="eyebrow eyebrow--dot">Portfólio</p>
                <h2 id="portfolio-title" className="display">
                  Nosso trabalho <em>mora no Instagram.</em>
                </h2>
              </div>
              <p className="section-head__note">
                Enquadramento, direção e narrativa em cada post. Acompanhe o que a gente publica toda semana.
              </p>
            </div>
            <a className="insta-card" href={instagram} target="_blank" rel="noreferrer">
              <span className="insta-card__text">
                <span className="insta-card__label">Portfólio ao vivo</span>
                <span className="insta-card__handle">@filmocompany</span>
                <span className="insta-card__note">
                  Reels, ensaios, casamentos e bastidores, sempre atualizados. É lá que você vê nosso trabalho de verdade.
                </span>
              </span>
              <span className="button button--yellow button--large">
                Ver no Instagram <span aria-hidden="true">↗</span>
              </span>
            </a>
          </div>
        </section>

        {reels.length > 0 && (
          <section className="section section--dark" id="reels" aria-labelledby="reels-title">
            <div className="shell">
              <div className="section-head">
                <div className="section-head__title">
                  <p className="eyebrow eyebrow--yellow">Em movimento</p>
                  <h2 id="reels-title" className="display">
                    Reels e vídeos <em>verticais.</em>
                  </h2>
                </div>
                <p className="section-head__note">
                  Vídeos curtos pensados para o feed, com ritmo, som e cor ajustados para a tela do celular.
                </p>
              </div>
              <div className="reel-grid">
                {reels.map((reel) => (
                  <video
                    key={reel.src}
                    className="reel"
                    src={reel.src}
                    poster={reel.poster}
                    controls
                    playsInline
                    preload="none"
                    aria-label={reel.title}
                  />
                ))}
              </div>
              <a className="link-underline link-underline--light" href={instagram} target="_blank" rel="noreferrer">
                Assista mais no @filmocompany <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        )}

        <section className="section section--light" id="servicos" aria-labelledby="servicos-title">
          <div className="shell">
            <div className="section-head">
              <div className="section-head__title">
                <p className="eyebrow eyebrow--dot">O que fazemos</p>
                <h2 id="servicos-title" className="display">
                  Foto e vídeo para o <em>feed real.</em>
                </h2>
              </div>
              <p className="section-head__note">
                Conteúdo curto, estratégico e visualmente forte para marcas, profissionais e momentos.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article className="service" key={service.number}>
                  <span className="service__number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="service__footer">
                    {service.from && <span className="service__price">A partir de {service.from}</span>}
                    <a
                      className="button button--dark button--small"
                      href={whatsappLink(service.message)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Conversar sobre ${service.title}`}
                    >
                      Conversar <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark" id="processo" aria-labelledby="processo-title">
          <div className="shell">
            <p className="eyebrow eyebrow--yellow">Nosso processo</p>
            <h2 id="processo-title" className="display">
              Da ideia <em>ao post.</em>
            </h2>
            <ol className="process-grid">
              {processSteps.map((step) => (
                <li key={step.number}>
                  <span>{step.number} / 04</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section--light" id="sobre" aria-labelledby="sobre-title">
          <div className="shell about">
            <div className="about__copy">
              <p className="eyebrow eyebrow--dot">Sobre a Filmo</p>
              <h2 id="sobre-title" className="display display--medium">
                Imagem com intenção, <em>em foto e vídeo.</em>
              </h2>
              <p className="about__lead">
                A Filmo transforma ideias, negócios e momentos em conteúdo visual feito para comunicar rápido e
                permanecer na memória.
              </p>
              <p>
                Criamos fotos e vídeos para Instagram com direção, captação e edição cuidadosas. Cada projeto começa
                pela escuta e termina pronto para circular no formato certo.
              </p>
              <a className="button button--dark button--large" href={whatsapp} target="_blank" rel="noreferrer">
                Conte sua ideia <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section section--dark" aria-labelledby="depoimentos-title">
          <div className="shell">
            <p className="eyebrow eyebrow--yellow" id="depoimentos-title">
              Quem já viveu essa experiência
            </p>
            <div className="quote-grid">
              {testimonials.map((item) => (
                <figure key={item.author}>
                  <blockquote>
                    <span aria-hidden="true">“</span>
                    {item.quote}
                    <span aria-hidden="true">”</span>
                  </blockquote>
                  <figcaption>
                    {item.author} · {item.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--light" id="faq" aria-labelledby="faq-title">
          <div className="shell faq">
            <div className="faq__intro">
              <p className="eyebrow eyebrow--dot">Perguntas frequentes</p>
              <h2 id="faq-title" className="display display--medium">
                Antes de <em>chamar a gente.</em>
              </h2>
              <p>
                Não achou sua dúvida?{" "}
                <a className="link-underline" href={whatsapp} target="_blank" rel="noreferrer">
                  Pergunte no WhatsApp
                </a>
                .
              </p>
            </div>
            <div className="faq__list">
              {faq.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>
                    {item.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cta" id="contato" aria-labelledby="contato-title">
          <div className="shell cta__inner">
            <p className="eyebrow">Vamos criar juntos?</p>
            <h2 id="contato-title" className="display display--cta">
              Tem uma história que <em>merece ser vista?</em>
            </h2>
            <p className="cta__lead">
              Conte brevemente o que você imagina. A gente responde com os próximos passos e um orçamento sob medida.
            </p>
            <a className="button button--dark button--xl" href={whatsapp} target="_blank" rel="noreferrer">
              Falar no WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <dl className="cta__details">
              <div>
                <dt>E-mail</dt>
                <dd><a href={`mailto:${email}`}>{email}</a></dd>
              </div>
              <div>
                <dt>Telefone</dt>
                <dd><a href="tel:+5519988509636">{phone}</a></dd>
              </div>
              <div>
                <dt>Localização</dt>
                <dd>Americana, São Paulo</dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd><a href={instagram} target="_blank" rel="noreferrer">@filmocompany</a></dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner shell">
          <div className="site-footer__brand">
            <Image src="/images/logo.png" alt="Filmo Company" width={396} height={154} />
            <p>Produção audiovisual em Americana, SP.</p>
          </div>
          <nav className="site-footer__links" aria-label="Contato">
            <a href={instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={`mailto:${email}`}>E-mail</a>
          </nav>
          <p>© 2026 Filmo Company</p>
        </div>
      </footer>
    </>
  );
}
