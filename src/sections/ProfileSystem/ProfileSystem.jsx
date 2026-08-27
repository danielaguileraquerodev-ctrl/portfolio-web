import { useEffect, useRef, useState } from "react";
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

// --- Constantes de temporización compartidas por las animaciones ---
//
// Todas se disparan una sola vez por IntersectionObserver y encadenan
// sus efectos internos DESPUÉS de que la máscara de su propia columna
// termine de revelarse (ver el useEffect principal más abajo), para que
// nunca se sientan simultáneas con el barrido de entrada.
const REVEAL_THRESHOLD = 0.25;
const MASK_TRANSITION_MS = 700; // debe coincidir con el 0.7s del CSS
const COLUMN_STAGGER_MS = 150; // 0 / 150 / 300 -> about / middle / process

const STAT_STAGGER_MS = 100;
const STAT_DURATION_MS = 1350;

const PROCESS_STEP_MS = 400; // separación entre cada círculo/segmento
const PROCESS_QUOTE_DELAY_MS = 300; // tras el último círculo, antes de la cita

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// "+6" -> { prefix: "+", number: 6, suffix: "" }; "100%" -> { prefix: "",
// number: 100, suffix: "%" }.
function parseStatValue(value) {
  const match = /^(\D*)(\d+)(\D*)$/.exec(value);
  if (!match) return { prefix: "", number: 0, suffix: value };
  const [, prefix, digits, suffix] = match;
  return { prefix, number: Number(digits), suffix };
}

function formatStat(prefix, number, suffix) {
  return `${prefix}${number}${suffix}`;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function ProfileSystem({ lang = "es" }) {
  const copy = content[lang] ?? content.es;

  const [reducedMotion] = useState(prefersReducedMotion);

  // Contenedores "columna" — nunca llevan clip-path (ver reveal-mask más
  // abajo): son los observados por IntersectionObserver.
  const aboutColumnRef = useRef(null);
  const middleColumnRef = useRef(null);
  const processColumnRef = useRef(null);

  // Efecto 1: contador de stats
  const statRefs = useRef([]);

  // Efecto 2: línea de proceso + círculos + cita
  const processNumberRefs = useRef([]);
  const processItemRefs = useRef([]);
  const quoteRef = useRef(null);

  // Efecto 4: cascada de capacidades/servicios
  const listRefs = useRef([]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const timeouts = [];
    let cancelled = false;

    const runStatsCounter = () => {
      copy.stats.forEach((stat, index) => {
        const el = statRefs.current[index];
        if (!el) return;
        const { prefix, number, suffix } = parseStatValue(stat.value);

        const id = window.setTimeout(() => {
          const startTime = performance.now();

          const tick = (now) => {
            if (cancelled) return;
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / STAT_DURATION_MS);
            const current = Math.round(easeOutCubic(t) * number);
            el.textContent = formatStat(prefix, current, suffix);

            if (t < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }, index * STAT_STAGGER_MS);

        timeouts.push(id);
      });
    };

    const runListCascade = () => {
      listRefs.current.forEach((list) => {
        if (list) list.classList.add("profile-system__list--revealed");
      });
    };

    const runProcessSequence = () => {
      processNumberRefs.current.forEach((el, index) => {
        if (!el) return;
        const id = window.setTimeout(() => {
          el.classList.add("profile-system__process-number--lit");
        }, index * PROCESS_STEP_MS);
        timeouts.push(id);
      });

      processItemRefs.current.forEach((el, index) => {
        if (!el) return;
        // El segmento que sale de la tarjeta `index` empieza a dibujarse
        // en cuanto su círculo se enciende (no hay segmento tras la última).
        const id = window.setTimeout(() => {
          el.classList.add("profile-system__process-item--line-drawn");
        }, index * PROCESS_STEP_MS);
        timeouts.push(id);
      });

      const lastCircleAt =
        (processNumberRefs.current.length - 1) * PROCESS_STEP_MS;
      const quoteId = window.setTimeout(() => {
        if (quoteRef.current) {
          quoteRef.current.classList.add("profile-system__quote--visible");
        }
      }, lastCircleAt + PROCESS_QUOTE_DELAY_MS);
      timeouts.push(quoteId);
    };

    // Una entrada { ref, columnIndex, onReveal } por columna. columnIndex
    // determina el retraso de su propia máscara (0/150/300ms, igual que en
    // el CSS) para poder calcular cuándo esa máscara habrá terminado y
    // encadenar justo después el efecto interno correspondiente.
    const columns = [
      { ref: aboutColumnRef, columnIndex: 0, onReveal: runStatsCounter },
      { ref: middleColumnRef, columnIndex: 1, onReveal: runListCascade },
      { ref: processColumnRef, columnIndex: 2, onReveal: runProcessSequence },
    ];

    const observers = columns.map(({ ref, columnIndex, onReveal }) => {
      const node = ref.current;
      if (!node) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            node.classList.add("profile-system__column--revealed");

            const chainDelay =
              columnIndex * COLUMN_STAGGER_MS + MASK_TRANSITION_MS;
            const id = window.setTimeout(onReveal, chainDelay);
            timeouts.push(id);
          });
        },
        { threshold: REVEAL_THRESHOLD }
      );

      observer.observe(node);
      return observer;
    });

    return () => {
      cancelled = true;
      observers.forEach((observer) => observer && observer.disconnect());
      timeouts.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

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
          <article
            className="profile-system__card profile-system__card--about"
            ref={aboutColumnRef}
          >
            <div className="profile-system__reveal-mask">
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

                <Link
                  className="profile-system__seal"
                  to={routes.about[lang]}
                  aria-label={copy.aboutLabel}
                >
                  <img src={daLogoSinCaja} alt="" />
                </Link>
              </div>

              <div className="profile-system__stats">
                {copy.stats.map((stat, index) => (
                  <div key={stat.label}>
                    <strong
                      ref={(el) => {
                        statRefs.current[index] = el;
                      }}
                    >
                      {reducedMotion
                        ? stat.value
                        : formatStat(
                            parseStatValue(stat.value).prefix,
                            0,
                            parseStatValue(stat.value).suffix
                          )}
                    </strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="profile-system__middle" ref={middleColumnRef}>
            <div className="profile-system__reveal-mask">
              <article className="profile-system__card profile-system__card--list">
                <div className="profile-system__card-head">
                  <div>
                    <span>{copy.capabilitiesLabel}</span>
                    <i aria-hidden="true" />
                  </div>

                  <div
                    className="profile-system__icon-box"
                    aria-hidden="true"
                  >
                    <CapabilitiesIcon className="profile-system__icon" />
                  </div>
                </div>

                <ul
                  className="profile-system__list"
                  ref={(el) => {
                    listRefs.current[0] = el;
                  }}
                >
                  {copy.capabilities.map((item, index) => (
                    <li key={item} style={{ "--reveal-index": index }}>
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

                  <div
                    className="profile-system__icon-box"
                    aria-hidden="true"
                  >
                    <CubeIcon className="profile-system__icon" />
                  </div>
                </div>

                <ul
                  className="profile-system__list"
                  ref={(el) => {
                    listRefs.current[1] = el;
                  }}
                >
                  {copy.services.map((item, index) => (
                    <li key={item} style={{ "--reveal-index": index }}>
                      <span aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <article
            className="profile-system__card profile-system__card--process"
            ref={processColumnRef}
          >
            <div className="profile-system__reveal-mask">
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
                {copy.process.map((step, index) => (
                  <div
                    className="profile-system__process-item"
                    key={step.number}
                    ref={(el) => {
                      processItemRefs.current[index] = el;
                    }}
                  >
                    <div
                      className="profile-system__process-number"
                      ref={(el) => {
                        processNumberRefs.current[index] = el;
                      }}
                    >
                      {step.number}
                    </div>

                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="profile-system__quote" ref={quoteRef}>
                <span
                  className="profile-system__quote-mark"
                  aria-hidden="true"
                >
                  "
                </span>
                <p>{copy.quote}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ProfileSystem;
