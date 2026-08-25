import { Link } from "react-router-dom";
import "./ProfileSystem.css";
import daLogoSinCaja from "../../assets/logo/daLogoSinCaja.png";
import { routes } from "../../config/routes";

function UserIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12.4a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" />
      <path d="M4.8 20.2c.8-3.6 3.5-5.6 7.2-5.6s6.4 2 7.2 5.6" />
    </svg>
  );
}

function CubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" />
      <path d="M12 12.2 20 8" />
      <path d="M12 12.2 4 8" />
      <path d="M12 12.2v8.3" />
    </svg>
  );
}

function NetworkIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M8 6h8" />
      <path d="M7.6 7.5 10.8 16" />
      <path d="M16.4 7.5 13.2 16" />
    </svg>
  );
}

function CapabilitiesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 7.8 5 12l3.5 4.2" />
      <path d="M15.5 7.8 19 12l-3.5 4.2" />
      <path d="M13.6 6 10.4 18" />
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

const content = {
  es: {
    id: "sobre-mi",
    title: "Perfil, capacidades y proceso",
    more: "Más sobre mí",
    aboutLabel: "Sobre mí",
    aboutTitle: (
      <>
        Desarrollador web con base técnica,{" "}
        <span>criterio visual y enfoque funcional.</span>
      </>
    ),
    aboutText: [
      "Soy Daniel Aguilera Quero, desarrollador web formado en Desarrollo de Aplicaciones Web. Me interesa construir proyectos digitales que no solo funcionen, sino que estén bien estructurados, sean claros para el usuario y tengan una presentación cuidada.",
      "Mi perfil combina frontend, WordPress, bases de datos y herramientas orientadas a productividad empresarial. Busco aportar en equipos o proyectos donde pueda seguir creciendo y construir soluciones reales con orden, criterio y atención al detalle.",
    ],
    capabilitiesLabel: "Capacidades",
    servicesLabel: "Servicios",
    processLabel: "Proceso de trabajo",
    capabilities: [
      "Interfaces responsive",
      "WordPress y Elementor",
      "UI/UX cuidada",
      "Bases de datos SQL",
      "Odoo e IA aplicada",
    ],
    services: [
      "Webs corporativas",
      "Landing pages",
      "WordPress y mantenimiento",
      "Maquetación frontend",
      "Mejoras visuales y SEO básico",
    ],
    process: [
      {
        number: "01",
        title: "Análisis",
        text: "Analizo el contexto, los objetivos y las necesidades del proyecto.",
      },
      {
        number: "02",
        title: "Estructura",
        text: "Planifico la arquitectura y el flujo del proyecto.",
      },
      {
        number: "03",
        title: "Desarrollo",
        text: "Creo con código limpio y enfoque en calidad.",
      },
      {
        number: "04",
        title: "Entrega",
        text: "Reviso, ajusto y preparo la entrega con atención al detalle.",
      },
    ],
    stats: [
      {
        value: "+6",
        label: "Años de experiencia",
      },
      {
        value: "30+",
        label: "Proyectos completados",
      },
      {
        value: "10+",
        label: "Clientes satisfechos",
      },
      {
        value: "100%",
        label: "Compromiso y calidad",
      },
    ],
    quote:
      "Metodología clara, comunicación constante y resultados que generan impacto.",
  },
  en: {
    id: "about",
    title: "Profile, capabilities and process",
    more: "More about me",
    aboutLabel: "About me",
    aboutTitle: (
      <>
        Web developer focused on{" "}
        <span>structure, clarity and interfaces.</span>
      </>
    ),
    aboutText: [
      "I build solid, scalable and carefully planned digital solutions, combining clean code, web architecture and interface design with attention to detail.",
      "My work brings together WordPress, modern frontend tools and a practical approach to deliver efficient, accessible projects aligned with real goals.",
    ],
    capabilitiesLabel: "Capabilities",
    servicesLabel: "Services",
    processLabel: "Work process",
    capabilities: [
      "Modern frontend",
      "Advanced WordPress",
      "Careful UI/UX",
      "Databases",
      "Web architecture",
    ],
    services: [
      "Custom websites",
      "Landing pages",
      "Professional WordPress",
      "Web optimization",
      "Digital solutions",
    ],
    process: [
      {
        number: "01",
        title: "Analysis",
        text: "I understand the needs, goals and context.",
      },
      {
        number: "02",
        title: "Structure",
        text: "I plan the architecture and project flow.",
      },
      {
        number: "03",
        title: "Development",
        text: "I build with clean code and a quality-focused approach.",
      },
      {
        number: "04",
        title: "Delivery",
        text: "Testing, review and launch with support.",
      },
    ],
    stats: [
      {
        value: "+6",
        label: "Years of experience",
      },
      {
        value: "30+",
        label: "Completed projects",
      },
      {
        value: "10+",
        label: "Satisfied clients",
      },
      {
        value: "100%",
        label: "Commitment and quality",
      },
    ],
    quote:
      "Clear methodology, consistent communication and results designed to create impact.",
  },
};

function ProfileSystem({ lang = "es" }) {
  const copy = content[lang] ?? content.es;

  return (
    <section className="profile-system section" id={copy.id}>
      <div className="container profile-system__inner">
        <div className="profile-system__top">
          <div>
            <h2 className="profile-system__title">{copy.title}</h2>
          </div>

          <Link className="profile-system__more" to={routes.about[lang]}>
            {copy.more}
            <ArrowRightIcon className="button__icon" />
          </Link>
        </div>

        <div className="profile-system__grid">
          <article className="profile-system__card profile-system__card--about">
            <div className="profile-system__card-head">
              <div>
                <span>{copy.aboutLabel}</span>
                <i aria-hidden="true" />
              </div>

              <div className="profile-system__icon-box" aria-hidden="true">
                <UserIcon className="profile-system__icon" />
              </div>
            </div>

            <div className="profile-system__about-layout">
              <div className="profile-system__about-copy">
                <h3>{copy.aboutTitle}</h3>

                {copy.aboutText.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>

              <div className="profile-system__seal" aria-hidden="true">
                <img src={daLogoSinCaja} alt="" />
              </div>
            </div>

            <div className="profile-system__stats">
              {copy.stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </article>

          <div className="profile-system__middle">
            <article className="profile-system__card profile-system__card--list">
              <div className="profile-system__card-head">
                <div>
                  <span>{copy.capabilitiesLabel}</span>
                  <i aria-hidden="true" />
                </div>

                <div className="profile-system__icon-box" aria-hidden="true">
                  <CapabilitiesIcon className="profile-system__icon" />
                </div>
              </div>

              <ul className="profile-system__list">
                {copy.capabilities.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="profile-system__card profile-system__card--list">
              <div className="profile-system__card-head">
                <div>
                  <span>{copy.servicesLabel}</span>
                  <i aria-hidden="true" />
                </div>

                <div className="profile-system__icon-box" aria-hidden="true">
                  <CubeIcon className="profile-system__icon" />
                </div>
              </div>

              <ul className="profile-system__list">
                {copy.services.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article className="profile-system__card profile-system__card--process">
            <div className="profile-system__card-head">
              <div>
                <span>{copy.processLabel}</span>
                <i aria-hidden="true" />
              </div>

              <div className="profile-system__icon-box" aria-hidden="true">
                <NetworkIcon className="profile-system__icon" />
              </div>
            </div>

            <div className="profile-system__process-list">
              {copy.process.map((step) => (
                <div className="profile-system__process-item" key={step.number}>
                  <div className="profile-system__process-number">
                    {step.number}
                  </div>

                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="profile-system__quote">
              <span className="profile-system__quote-mark" aria-hidden="true">
                "
              </span>
              <p>{copy.quote}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ProfileSystem;
