import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import daLogo from "../../assets/logo/logo.png";
import "./ContactPage.css";

const copy = {
  es: {
    heroId: "inicio",
    eyebrow: "Contacto",
    titleLineOne: (
      <>
        Hablemos de una <span>oportunidad</span>
      </>
    ),
    titleLineTwo: (
      <>
        o <span>proyecto web</span>.
      </>
    ),
    description:
      "Estoy abierto a oportunidades laborales, colaboraciones freelance y proyectos web donde pueda aportar desarrollo, estructura y cuidado visual.",
    emailCta: "Escribirme por email",
    linkedinCta: "Ver LinkedIn",
    directLabel: "Contacto directo",
    locationLabel: "Ubicación",
    location: "España",
    response: "Respondo personalmente todos los mensajes.",
    responseTimeLabel: "Tiempo de respuesta habitual:",
    responseTime: "24-48h.",
    profilesLabel: "Perfiles profesionales",
    linkedinText: "Conecta conmigo profesionalmente",
    githubText: "Explora código y proyectos",
    briefingLabel: "Para agilizar el contacto",
    briefingIntro:
      "Para entender mejor tu propuesta y cómo puedo ayudarte, te agradeceré incluir:",
    checklist: [
      "Tipo de oportunidad (colaboración, proyecto o empleo)",
      "Contexto y objetivos principales",
      "Alcance o funcionalidades clave",
      "Plazo estimado o disponibilidad",
    ],
  },
  en: {
    heroId: "home",
    eyebrow: "Contact",
    titleLineOne: (
      <>
        Let us talk about an <span>opportunity</span>
      </>
    ),
    titleLineTwo: (
      <>
        or your next <span>project</span>.
      </>
    ),
    description:
      "I am available for freelance work, collaborations and web development roles. Tell me about your idea, project or position and I will get back to you shortly.",
    emailCta: "Write me by email",
    linkedinCta: "View LinkedIn",
    directLabel: "Direct contact",
    locationLabel: "Location",
    location: "Spain",
    response: "I personally reply to every message.",
    responseTimeLabel: "Usual response time:",
    responseTime: "24-48h.",
    profilesLabel: "Professional profiles",
    linkedinText: "Connect with me professionally",
    githubText: "Explore code and projects",
    briefingLabel: "To make contact easier",
    briefingIntro:
      "To better understand your proposal and how I can help, please include:",
    checklist: [
      "Type of opportunity (collaboration, project or role)",
      "Context and main goals",
      "Scope or key functionality",
      "Estimated timeline or availability",
    ],
  },
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 6.5h16v11H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 21s6-5.4 6-11a6 6 0 0 0-12 0c0 5.6 6 11 6 11z" />
      <path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <span className="contact-hero__button-arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </span>
  );
}

function ArrowUpRightIcon({ className = "contact-hero__button-arrow" }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </svg>
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.93c.46.08.63-.2.63-.44v-1.56c-2.56.56-3.1-1.1-3.1-1.1-.42-1.05-1.02-1.33-1.02-1.33-.83-.57.06-.56.06-.56.92.06 1.4.94 1.4.94.82 1.4 2.14 1 2.66.76.08-.6.32-1 .58-1.23-2.04-.23-4.18-1.02-4.18-4.54 0-1 .36-1.82.94-2.46-.1-.23-.4-1.17.09-2.43 0 0 .77-.25 2.52.94a8.7 8.7 0 0 1 4.6 0c1.75-1.19 2.52-.94 2.52-.94.5 1.26.19 2.2.1 2.43.58.64.93 1.46.93 2.46 0 3.53-2.15 4.3-4.2 4.53.33.28.62.84.62 1.7v2.52c0 .24.17.53.64.44A9.2 9.2 0 0 0 12 2.8z" />
    </svg>
  );
}

function ContactPage({ lang = "es" }) {
  const pageCopy = copy[lang] ?? copy.es;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="site contact-page">
      <Header />

      <section className="contact-hero" id={pageCopy.heroId}>
        <div className="container contact-hero__inner">
          <div className="contact-hero__content">
            <p className="contact-hero__eyebrow">{pageCopy.eyebrow}</p>

            <h1 className="contact-hero__title">
              <span className="contact-hero__title-line">
                {pageCopy.titleLineOne}
              </span>
              <span className="contact-hero__title-line">
                {pageCopy.titleLineTwo}
              </span>
            </h1>

            <p className="contact-hero__description">
              {pageCopy.description}
            </p>

            <div className="contact-hero__actions">
              <a
                className="contact-hero__button contact-hero__button--primary"
                href="mailto:hola@danielaguilera.dev"
              >
                <span className="contact-hero__button-content">
                  <span className="contact-hero__button-icon" aria-hidden="true">
                    <MailIcon />
                  </span>
                  <span>{pageCopy.emailCta}</span>
                </span>

                <ArrowRightIcon />
              </a>

              <a
                className="contact-hero__button contact-hero__button--secondary"
                href="https://www.linkedin.com/in/danielaguileraquero/"
                target="_blank"
                rel="noreferrer"
              >
                <span>{pageCopy.linkedinCta}</span>
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>

          <div className="contact-hero__visual" aria-hidden="true">
            <div className="contact-visual__grid contact-visual__grid--main" />
            <div className="contact-visual__grid contact-visual__grid--back" />
            <div className="contact-visual__glow" />
            <div className="contact-visual__line contact-visual__line--guide-top" />
            <div className="contact-visual__line contact-visual__line--guide-bottom" />
            <div className="contact-visual__cross contact-visual__cross--one" />
            <div className="contact-visual__cross contact-visual__cross--two" />
            <div className="contact-visual__cross contact-visual__cross--three" />

            <div className="contact-visual__logo-card">
              <img src={daLogo} alt="" draggable="false" />
            </div>
          </div>
        </div>
      </section>

      <section className="contact-info" id="contacto-directo">
        <div className="container">
          <div className="contact-info__panel">
            <article className="contact-info__column">
              <p className="contact-info__label">{pageCopy.directLabel}</p>

              <div className="contact-info__group">
                <span className="contact-info__icon" aria-hidden="true">
                  <MailIcon />
                </span>

                <div>
                  <h2>Email</h2>
                  <a href="mailto:hola@danielaguilera.dev">
                    hola@danielaguilera.dev
                  </a>
                </div>
              </div>

              <div className="contact-info__group">
                <span className="contact-info__icon" aria-hidden="true">
                  <LocationIcon />
                </span>

                <div>
                  <h2>{pageCopy.locationLabel}</h2>
                  <p>{pageCopy.location}</p>
                </div>
              </div>

              <p className="contact-info__response">
                {pageCopy.response}
                <br />
                {pageCopy.responseTimeLabel}{" "}
                <span>{pageCopy.responseTime}</span>
              </p>
            </article>

            <article className="contact-info__column">
              <p className="contact-info__label">{pageCopy.profilesLabel}</p>

              <a
                className="contact-info__profile-link"
                href="https://www.linkedin.com/in/danielaguileraquero/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-info__profile-icon">in</span>

                <span className="contact-info__profile-copy">
                  <strong>LinkedIn</strong>
                  <span>{pageCopy.linkedinText}</span>
                </span>

                <span className="contact-info__profile-arrow" aria-hidden="true">
                  -&gt;
                </span>
              </a>

              <a
                className="contact-info__profile-link"
                href="https://github.com/danielaguileraquero"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-info__profile-icon">
                  <GitHubIcon />
                </span>

                <span className="contact-info__profile-copy">
                  <strong>GitHub</strong>
                  <span>{pageCopy.githubText}</span>
                </span>

                <span className="contact-info__profile-arrow" aria-hidden="true">
                  -&gt;
                </span>
              </a>
            </article>

            <article className="contact-info__column">
              <p className="contact-info__label">{pageCopy.briefingLabel}</p>

              <p className="contact-info__intro">
                {pageCopy.briefingIntro}
              </p>

              <ul className="contact-info__checklist">
                {pageCopy.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <div className="container">
        <FooterDivider />
      </div>

      <Footer />
    </main>
  );
}

export default ContactPage;
