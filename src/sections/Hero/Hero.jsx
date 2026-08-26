import { Link } from "react-router-dom";
import { MapPin, GraduationCap, Code2, Database, FileText } from "lucide-react";

import heroBackground from "../../assets/images/heroBackground4.png";
import { routes } from "../../config/routes";
import "./Hero.css";

function GithubIcon({ className }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 5.92c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M6.94 8.9H3.72V20h3.22V8.9ZM5.33 4C4.3 4 3.5 4.78 3.5 5.78c0 .98.78 1.77 1.79 1.77h.02c1.04 0 1.84-.79 1.84-1.77C7.13 4.78 6.35 4 5.33 4ZM20.5 13.63c0-3.36-1.79-4.92-4.17-4.92-1.92 0-2.78 1.06-3.26 1.8V8.9H9.85c.04 1.04 0 11.1 0 11.1h3.22v-6.2c0-.33.02-.66.12-.9.26-.66.86-1.35 1.86-1.35 1.31 0 1.84 1 1.84 2.47V20h3.22v-6.37h.39Z"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M5 12H19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 6L19 12L13 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M7 17L17 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7H17V15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const technologies = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "WordPress",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  },
  {
    name: "MySQL",
    icon: "database",
  },
  {
    name: "GitHub",
    icon: "github",
  },
];

const heroCopy = {
  es: {
    id: "inicio",
    eyebrow: "Desarrollador web",
    title: {
      first: "Desarrollo web",
      second: "con estructura,",
      thirdBase: "claridad y ",
      thirdAccent: "detalle.",
    },
    description:
      "Soy Daniel Aguilera, desarrollador web formado en DAW. Trabajo en proyectos que combinan estructura técnica, experiencia de usuario y una ejecución cuidada para crear soluciones claras y funcionales.",
    actionsAria: "Acciones principales",
    projectsCta: "Ver proyectos",
    contactCta: "Contactar",
    linksAria: "Enlaces rápidos",
    cv: "CV / Descargar",
    infoAria: "Información rápida de perfil",
    status: (
      <>
        Disponible para empleo
        <br />y colaboraciones
      </>
    ),
    location: "España",
    education: "Grado Superior DAW",
    focus: (
      <>
        Frontend · WordPress ·
        <br />
        Desarrollo web
      </>
    ),
    stack: (
      <>
        HTML · CSS · JavaScript ·
        <br />
        React · SQL · WordPress · Odoo
      </>
    ),
    techAria: "Tecnologías principales",
    techKicker: "Tecnologías",
    techTitle: "con las que trabajo",
  },
  en: {
    id: "home",
    eyebrow: "Web developer",
    title: {
      first: "Web development",
      second: "with structure,",
      thirdBase: "clarity and ",
      thirdAccent: "detail.",
    },
    description:
      "I am Daniel Aguilera, a web developer trained in DAW. I build interfaces, websites and digital solutions with a technical foundation, visual judgement and attention to detail.",
    actionsAria: "Primary actions",
    projectsCta: "View projects",
    contactCta: "Contact me",
    linksAria: "Quick links",
    cv: "CV / Download",
    infoAria: "Quick profile information",
    status: (
      <>
        Available for roles
        <br />and collaborations
      </>
    ),
    location: "Spain",
    education: "Higher Degree in Web App Development",
    focus: (
      <>
        Frontend · WordPress ·
        <br />
        Web systems
      </>
    ),
    stack: (
      <>
        HTML · CSS · JavaScript ·
        <br />
        React · SQL · WordPress
      </>
    ),
    techAria: "Main technologies",
    techKicker: "Technologies",
    techTitle: "I work with",
  },
};

function Hero({ lang = "es" }) {
  const copy = heroCopy[lang] ?? heroCopy.es;
  const heroDescription =
    lang === "es"
      ? "Soy Daniel Aguilera, desarrollador web formado en DAW. Trabajo en proyectos que combinan estructura técnica, experiencia de usuario y una ejecución cuidada para crear soluciones claras y funcionales."
      : copy.description;
  const heroFocus =
    lang === "es" ? (
      <>
        Frontend · WordPress ·
        <br />
        Desarrollo web
      </>
    ) : (
      copy.focus
    );
  const heroStack =
    lang === "es" ? (
      <>
        HTML · CSS · JavaScript ·
        <br />
        React · SQL · WordPress · Odoo
      </>
    ) : (
      copy.stack
    );

  return (
    <section className="hero section" id={copy.id}>
      <div
        className="hero__visual"
        style={{ "--hero-bg-image": `url(${heroBackground})` }}
      >
        <div className="container hero__grid">
          <div className="hero__content">
            <p className="hero__eyebrow hero-reveal hero-reveal--1">{copy.eyebrow}</p>

            <h1 className="hero__title hero-reveal hero-reveal--2">
              {copy.title.first}
              <br />
              <span>{copy.title.second}</span>
              <br />
              {copy.title.thirdBase}
              <span>{copy.title.thirdAccent}</span>
            </h1>

            <p className="hero__description hero-reveal hero-reveal--3">{heroDescription}</p>

            <div className="hero__actions hero-reveal hero-reveal--4" aria-label={copy.actionsAria}>
              <Link className="button button--primary" to={routes.projects[lang]}>
                <span>{copy.projectsCta}</span>
                <ArrowRightIcon className="button__icon" />
              </Link>

              <Link className="button button--secondary" to={routes.contact[lang]}>
                <span>{copy.contactCta}</span>
                <ArrowUpRightIcon className="button__icon" />
              </Link>
            </div>

            <div className="hero__links" aria-label={copy.linksAria}>
              <a
                href="https://github.com/danielaguileraquero"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon className="hero__brand-icon" />
                <span>GitHub</span>
                <ArrowUpRightIcon className="hero__link-arrow" />
              </a>

              <a
                href="https://www.linkedin.com/in/danielaguileraquero/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon className="hero__brand-icon" />
                <span>LinkedIn</span>
                <ArrowUpRightIcon className="hero__link-arrow" />
              </a>

              <a href="/cv-daniel-aguilera.pdf" download>
                <FileText className="hero__link-icon" aria-hidden="true" />
                <span>{copy.cv}</span>
                <ArrowUpRightIcon className="hero__link-arrow" />
              </a>
            </div>
          </div>

          <div className="hero__portrait" aria-hidden="true" />

          <aside className="hero__info" aria-label={copy.infoAria}>
            <div className="hero__status">
              <span className="hero__status-dot" aria-hidden="true" />
              <span>{copy.status}</span>
            </div>

            <div className="hero__info-list">
              <div className="hero__info-item">
                <MapPin className="hero__info-icon" aria-hidden="true" />
                <span>{copy.location}</span>
              </div>

              <div className="hero__info-item">
                <GraduationCap className="hero__info-icon" aria-hidden="true" />
                <span>{copy.education}</span>
              </div>

              <div className="hero__info-item">
                <Code2 className="hero__info-icon" aria-hidden="true" />
                <span>{heroFocus}</span>
              </div>

              <div className="hero__info-item">
                <Database className="hero__info-icon" aria-hidden="true" />
                <span>{heroStack}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="hero__techbar" aria-label={copy.techAria}>
        <div className="container hero__techbar-inner">
          <div className="hero__techbar-heading">
            <span>{copy.techKicker}</span>
            <strong>{copy.techTitle}</strong>
          </div>

          <div className="hero__tech-list">
            {technologies.map((tech) => (
              <div className="hero__tech-item" key={tech.name}>
                {tech.icon === "database" ? (
                  <Database
                    className="hero__tech-icon hero__tech-icon--stroke"
                    aria-hidden="true"
                  />
                ) : tech.icon === "github" ? (
                  <GithubIcon
                    className="hero__tech-icon hero__tech-icon--stroke"
                    aria-hidden="true"
                  />
                ) : (
                  <img
                    className="hero__tech-icon"
                    src={tech.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                )}

                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
