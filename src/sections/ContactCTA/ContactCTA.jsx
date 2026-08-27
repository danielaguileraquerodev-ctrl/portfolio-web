import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import daLogoSinCaja from "../../assets/logo/daLogoSinCaja.png";
import { routes } from "../../config/routes";
import "./ContactCTA.css";

function GithubIcon({ className }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 5.92c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
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

const copy = {
  es: {
    id: "contacto",
    eyebrow: "CONTACTO",
    title: (
      <>
        Hablemos de una <span>oportunidad</span> o proyecto web.
      </>
    ),
    description:
      "Estoy abierto a oportunidades laborales, colaboraciones freelance y proyectos web donde pueda aportar desarrollo, estructura y cuidado visual.",
    button: "Contactar conmigo",
    status: "Disponible para empleo, prácticas profesionales y proyectos web",
    locationLabel: "Ubicación",
    location: "España",
  },
  en: {
    id: "contact",
    eyebrow: "CONTACT",
    title: (
      <>
        Have a <span>project</span> in mind?
      </>
    ),
    description:
      "Let us build a clear, functional and carefully crafted solution.",
    button: "Contact me",
    status: "Available for freelance projects and collaborations",
    locationLabel: "Location",
    location: "Spain",
  },
};

function ContactCTA({ lang = "es" }) {
  const sectionCopy = copy[lang] ?? copy.es;
  const panelRef = useRef(null);
  const [revealed, setRevealed] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Entrada con máscara, disparo único — mismo patrón ya usado en
  // FeaturedProjects/ProfileSystem. El clip-path vive en el
  // .contact-cta__reveal-mask interno, NUNCA en .contact-cta__panel (el
  // elemento observado): un elemento recortado a ancho 0 hace que
  // IntersectionObserver lo reporte como "sin intersección" para siempre,
  // aunque esté dentro del viewport.
  useEffect(() => {
    if (revealed) return undefined;

    const node = panelRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <section className="contact-cta section" id={sectionCopy.id}>
      <div className="container contact-cta__container">
        <div
          className={`contact-cta__panel${
            revealed ? " contact-cta__panel--revealed" : ""
          }`}
          ref={panelRef}
        >
          <div className="contact-cta__reveal-mask">
            <div className="contact-cta__block contact-cta__intro">
              <p className="contact-cta__eyebrow">{sectionCopy.eyebrow}</p>

              <h3 className="contact-cta__title">{sectionCopy.title}</h3>

              <p className="contact-cta__description">
                {sectionCopy.description}
              </p>
            </div>

            <div className="contact-cta__block contact-cta__action">
              <Link
                className="contact-cta__button"
                to={routes.contact[lang]}
              >
                <span>{sectionCopy.button}</span>
                <ArrowRightIcon className="contact-cta__arrow" />
              </Link>

              <p className="contact-cta__status">
                <span aria-hidden="true" />
                {sectionCopy.status}
              </p>
            </div>

            <div className="contact-cta__block contact-cta__info">
              <div className="contact-cta__data">
                <div className="contact-cta__data-item">
                  <Mail className="contact-cta__icon" aria-hidden="true" />
                  <div>
                    <span>Email</span>
                    <a href="mailto:hola@danielaguilera.dev">
                      hola@danielaguilera.dev
                    </a>
                  </div>
                </div>

                <div className="contact-cta__data-item">
                  <MapPin className="contact-cta__icon" aria-hidden="true" />
                  <div>
                    <span>{sectionCopy.locationLabel}</span>
                    <p>{sectionCopy.location}</p>
                  </div>
                </div>
              </div>

              <div className="contact-cta__socials">
                <a
                  href="https://www.linkedin.com/in/danielaguileraquero/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="contact-cta__social-icon" />
                </a>

                <a
                  href="https://github.com/danielaguileraquero"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <GithubIcon className="contact-cta__social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-cta__footer-mark" aria-hidden="true">
          <span className="contact-cta__footer-line" />

          <div className="contact-cta__footer-center">
            <i className="contact-cta__diamond contact-cta__diamond--small" />
            <i className="contact-cta__diamond contact-cta__diamond--large" />
            <i className="contact-cta__diamond contact-cta__diamond--small" />

            <img src={daLogoSinCaja} alt="" />

            <i className="contact-cta__diamond contact-cta__diamond--small" />
            <i className="contact-cta__diamond contact-cta__diamond--large" />
            <i className="contact-cta__diamond contact-cta__diamond--small" />
          </div>

          <span className="contact-cta__footer-line" />
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
