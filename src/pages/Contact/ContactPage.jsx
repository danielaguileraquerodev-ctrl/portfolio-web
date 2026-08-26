import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import "./ContactPage.css";

// Outline of the "DA" monogram, traced from the source PNG (src/assets/logo/
// daLogoSinCaja.png) — no vector (.svg) version of the logo exists in the
// project, so this path is the fallback supplied for the hero animation.
const CONTACT_LOGO_PATH =
  "M 0.97 0.49 L 1.46 1.46 L 8.75 4.38 L 12.64 8.27 L 16.05 17.99 L 16.53 178.44 L 15.07 189.63 L 12.64 195.46 L 8.75 199.84 L 0.97 203.73 L 0.0 205.19 L 86.06 205.67 L 107.94 204.21 L 116.69 202.76 L 119.61 201.3 L 125.45 187.2 L 114.26 191.09 L 102.59 193.52 L 74.39 194.49 L 62.24 193.52 L 50.57 191.09 L 47.16 188.65 L 45.71 184.76 L 45.71 11.67 L 47.16 10.7 L 90.92 10.7 L 106.97 12.64 L 119.61 16.53 L 133.23 23.82 L 146.84 35.98 L 154.13 46.19 L 161.91 62.72 L 165.32 74.88 L 167.75 92.38 L 167.75 105.02 L 166.29 119.12 L 162.4 137.12 L 151.22 164.83 L 107.94 258.18 L 101.13 265.96 L 95.79 268.4 L 95.3 269.85 L 130.79 269.37 L 127.88 267.42 L 125.93 264.51 L 125.93 259.16 L 150.24 206.65 L 152.19 205.19 L 233.87 205.19 L 239.22 216.37 L 255.27 257.21 L 255.27 264.02 L 252.35 267.42 L 249.43 268.4 L 248.95 269.85 L 300.0 269.85 L 299.51 268.4 L 294.65 266.45 L 289.79 262.07 L 283.47 251.38 L 217.83 93.35 L 216.86 93.35 L 209.56 115.72 L 203.73 128.85 L 203.73 131.28 L 226.09 183.79 L 229.01 192.54 L 157.54 192.54 L 189.14 130.79 L 195.46 114.26 L 197.89 101.62 L 197.41 80.23 L 192.06 60.29 L 181.85 41.33 L 169.21 26.74 L 159.97 18.96 L 146.35 10.7 L 131.77 4.86 L 119.12 1.94 L 96.27 0.0 Z";

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
    logoName: "Daniel Aguilera",
    logoTagline: "Respondo personalmente cada mensaje",
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
    logoName: "Daniel Aguilera",
    logoTagline: "Replies personally to every message",
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

// Animated "DA" monogram: draws its outline once, fills solid, then gets a
// periodic shimmer sweep. See ContactPage.css for the keyframes — this
// component only measures the real path length so the stroke-draw animation
// covers it exactly (see contact-circle__logo-stroke).
function ContactLogoMark() {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  useLayoutEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <svg className="contact-circle__logo" viewBox="0 0 300 270" aria-hidden="true">
      <defs>
        <clipPath id="contact-logo-clip">
          <path d={CONTACT_LOGO_PATH} />
        </clipPath>
        <linearGradient id="contact-logo-shimmer-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255, 244, 224, 0)" />
          <stop offset="50%" stopColor="rgba(255, 244, 224, 0.65)" />
          <stop offset="100%" stopColor="rgba(255, 244, 224, 0)" />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        className="contact-circle__logo-stroke"
        d={CONTACT_LOGO_PATH}
        style={pathLength ? { "--logo-path-length": pathLength } : undefined}
      />
      <path className="contact-circle__logo-fill" d={CONTACT_LOGO_PATH} />

      <g clipPath="url(#contact-logo-clip)">
        <rect
          className="contact-circle__logo-shimmer"
          x="-120"
          y="0"
          width="120"
          height="270"
          fill="url(#contact-logo-shimmer-gradient)"
        />
      </g>
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
            <p className="contact-hero__eyebrow hero-reveal hero-reveal--1">{pageCopy.eyebrow}</p>

            <h1 className="contact-hero__title hero-reveal hero-reveal--2">
              <span className="contact-hero__title-line">
                {pageCopy.titleLineOne}
              </span>
              <span className="contact-hero__title-line">
                {pageCopy.titleLineTwo}
              </span>
            </h1>

            <p className="contact-hero__description hero-reveal hero-reveal--3">
              {pageCopy.description}
            </p>

            <div className="contact-hero__actions hero-reveal hero-reveal--4">
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
            <div className="contact-circle">
              <span className="contact-circle__glow" />
              <span className="contact-circle__mark contact-circle__mark--top" />
              <span className="contact-circle__mark contact-circle__mark--bottom" />

              <div className="contact-circle__ring">
                <ContactLogoMark />
              </div>
            </div>

            <div className="contact-circle__caption">
              <p className="contact-circle__name">{pageCopy.logoName}</p>
              <p className="contact-circle__tagline">{pageCopy.logoTagline}</p>
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
