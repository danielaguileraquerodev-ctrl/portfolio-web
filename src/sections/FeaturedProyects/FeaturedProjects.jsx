import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { routes, buildProjectDetailPath } from "../../config/routes";
import { projects } from "../../data/projects";
import "./FeaturedProjects.css";

// Ids of the two projects shown here, pulled from the shared data source
// (src/data/projects.js) so this section can never drift from ProjectsPage /
// ProjectDetailPage.
const FEATURED_PROJECT_IDS = ["archivo-semana-santa", "web-gimnasio-tfg"];

function getFeaturedProjects(lang) {
  const list = projects[lang] ?? projects.es;
  return FEATURED_PROJECT_IDS.map((id) => list.find((project) => project.id === id)).filter(
    Boolean
  );
}

const copy = {
  es: {
    id: "proyectos",
    title: "Proyectos destacados",
    all: "Ver todos los proyectos",
    caseStudy: "Ver caso de estudio",
    preview: "Preview",
  },
  en: {
    id: "projects",
    title: "Featured projects",
    all: "View all projects",
    caseStudy: "View case study",
    preview: "Preview",
  },
};

// --- Revelado ligado al scroll (continuo, en ambas direcciones) ---
//
// Cada tarjeta tiene un progreso con signo en [-1, 1]:
//   -1  completamente oculta, aún no ha entrado por abajo
//    0  totalmente asentada (opaca, sin desplazamiento)
//   +1  completamente oculta, ya ha salido por arriba
//
// El progreso se deriva directamente de getBoundingClientRect() en cada
// frame de scroll, así que es simétrico: subir o bajar produce exactamente
// el camino inverso, no hay "ya se activó una vez".
const REVEAL_SPAN_FRACTION = 0.5; // fracción de la altura del viewport que dura la transición
const REVEAL_ENTER_OFFSET_PX = 24; // translateY al entrar (por abajo)
const REVEAL_EXIT_OFFSET_PX = -16; // translateY al salir (por arriba)
const REVEAL_STAGGER_PX = 50; // retraso (en "px de scroll virtuales") de la 2ª tarjeta

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function computeCardReveal(rect, viewportHeight, staggerPx) {
  const span = viewportHeight * REVEAL_SPAN_FRACTION;
  const top = rect.top + staggerPx;
  const bottom = rect.bottom + staggerPx;

  // 0 -> 1 según la tarjeta entra desde abajo
  const enterProgress = clamp01((viewportHeight - top) / span);
  // 0 -> 1 según la tarjeta sale por arriba
  const exitProgress = clamp01((span - bottom) / span);
  // Combinado: -1 (oculta abajo) .. 0 (asentada) .. 1 (oculta arriba)
  const progress = exitProgress - (1 - enterProgress);

  if (progress <= 0) {
    const t = 1 + progress; // 0 -> 1
    return { opacity: t, translateY: REVEAL_ENTER_OFFSET_PX * (1 - t) };
  }

  const t = progress; // 0 -> 1
  return { opacity: 1 - t, translateY: REVEAL_EXIT_OFFSET_PX * t };
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

function FeaturedProjects({ lang = "es" }) {
  const sectionCopy = copy[lang] ?? copy.es;
  const projectList = getFeaturedProjects(lang);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  // translateY aplicado a cada tarjeta en el frame anterior: getBoundingClientRect()
  // ya incluye nuestro propio transform, así que hay que restarlo antes de
  // recalcular o el resultado se retroalimentaría frame a frame.
  const prevTranslateYRef = useRef([]);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event) => setReducedMotion(event.matches);
    query.addEventListener("change", handleMotionChange);

    if (reducedMotion) {
      return () => query.removeEventListener("change", handleMotionChange);
    }

    const gridNode = gridRef.current;
    if (!gridNode) {
      return () => query.removeEventListener("change", handleMotionChange);
    }

    let ticking = false;
    let listening = false;

    const applyReveal = () => {
      ticking = false;
      const viewportHeight = window.innerHeight;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        // getBoundingClientRect() ya refleja el translateY que le aplicamos
        // la vez anterior (o el translateY(24px) inicial del JSX) — hay que
        // descontarlo para medir la posición real de layout, no la visual.
        const prevOffset =
          prevTranslateYRef.current[index] ?? REVEAL_ENTER_OFFSET_PX;
        const rawRect = card.getBoundingClientRect();
        const rect = {
          top: rawRect.top - prevOffset,
          bottom: rawRect.bottom - prevOffset,
        };

        const { opacity, translateY } = computeCardReveal(
          rect,
          viewportHeight,
          index * REVEAL_STAGGER_PX
        );
        card.style.opacity = String(opacity);
        card.style.transform = `translateY(${translateY}px)`;
        prevTranslateYRef.current[index] = translateY;
      });
    };

    const requestTick = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyReveal);
    };

    // El observer solo decide si merece la pena escuchar el scroll: cuando
    // la sección está lejos, no hay listener ni cálculo alguno corriendo.
    const observer = new IntersectionObserver(
      (entries) => {
        const isNear = entries.some((entry) => entry.isIntersecting);

        if (isNear && !listening) {
          listening = true;
          window.addEventListener("scroll", requestTick, { passive: true });
          window.addEventListener("resize", requestTick);
          requestTick();
        } else if (!isNear && listening) {
          listening = false;
          window.removeEventListener("scroll", requestTick);
          window.removeEventListener("resize", requestTick);
        }
      },
      {
        threshold: [0, 0.15, 0.5, 0.85, 1],
        rootMargin: `${Math.round(window.innerHeight * REVEAL_SPAN_FRACTION)}px 0px`,
      }
    );

    observer.observe(gridNode);
    applyReveal(); // estado correcto desde el primer frame, sin esperar scroll

    return () => {
      query.removeEventListener("change", handleMotionChange);
      observer.disconnect();
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, [reducedMotion]);

  return (
    <section className="featured-projects section" id={sectionCopy.id}>
      <div className="container">
        <div className="featured-projects__header">
          <h2>{sectionCopy.title}</h2>

          <Link className="featured-projects__all" to={routes.projects[lang]}>
            {sectionCopy.all}
            <ArrowRightIcon className="button__icon" />
          </Link>
        </div>

        <div className="featured-projects__grid" ref={gridRef}>
          {projectList.map((project, index) => (
            <article
              className="featured-project"
              key={project.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={
                reducedMotion
                  ? undefined
                  : { opacity: 0, transform: "translateY(24px)" }
              }
            >
              <div className="featured-project__media" aria-hidden="true">
                <div className="featured-project__preview-window">
                  <div className="featured-project__preview-topbar">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="featured-project__preview-content">
                    {project.previewImage ? (
                      <img
                        className="featured-project__preview-image"
                        src={project.previewImage}
                        alt=""
                      />
                    ) : (
                      <span className="featured-project__preview-label">
                        {sectionCopy.preview}
                      </span>
                    )}
                  </div>

                  <span className="featured-project__sweep" aria-hidden="true" />
                </div>
              </div>

              <div className="featured-project__content">
                <p className="featured-project__meta">
                  <span>{project.number}</span>
                  <span>/</span>
                  <span>{project.type}</span>
                </p>

                <h3>{project.title}</h3>

                <p className="featured-project__description">
                  {project.description}
                </p>

                <div className="featured-project__tags">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="featured-project__footer">
                  <span className="featured-project__status">
                    {project.status}
                  </span>

                  <Link
                    to={buildProjectDetailPath(lang, project.id)}
                    className="featured-project__link"
                  >
                    {sectionCopy.caseStudy}
                    <ArrowRightIcon className="button__icon" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
