import { useEffect, useRef, useState } from "react";
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

// Desplazamiento máximo (px) del parallax de la preview — ver el efecto 2
// más abajo. Nada que ver con el revelado de entrada (efecto 1): son dos
// sistemas independientes sobre partes distintas del DOM.
const PREVIEW_PARALLAX_MAX_PX = 12;

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
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

function FeaturedProjects({ lang = "es" }) {
  const sectionCopy = copy[lang] ?? copy.es;
  const projectList = getFeaturedProjects(lang);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const previewRefs = useRef([]);

  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  // Una entrada por tarjeta; una vez en `true` no vuelve a `false` nunca —
  // no hay ningún camino de vuelta a "oculta" en este componente.
  const [revealed, setRevealed] = useState(() =>
    projectList.map(() => prefersReducedMotion())
  );

  // --- Efecto 1: entrada con máscara, disparo único, por tarjeta ---
  //
  // IntersectionObserver simple: en cuanto una tarjeta cruza el threshold
  // por primera vez, se marca como revelada para siempre y se deja de
  // observar. El propio CSS (.featured-project--revealed) hace la
  // transición de clip-path; aquí no hay scroll listener ni rAF.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event) => {
      setReducedMotion(event.matches);
      if (event.matches) {
        setRevealed((prev) => prev.map(() => true));
      }
    };
    query.addEventListener("change", handleMotionChange);

    if (query.matches) {
      return () => query.removeEventListener("change", handleMotionChange);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          observer.unobserve(entry.target);
          const index = cardRefs.current.indexOf(entry.target);
          if (index === -1) return;

          setRevealed((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      query.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  // --- Efecto 2: parallax continuo, solo en la preview interior ---
  //
  // Independiente del revelado de arriba: nunca toca opacity ni clip-path
  // de la tarjeta, solo un translateY pequeño sobre el contenido de la
  // preview. Se mide siempre sobre la tarjeta (que ya no lleva ningún
  // transform propio), nunca sobre el elemento que se está desplazando.
  useEffect(() => {
    if (reducedMotion) {
      previewRefs.current.forEach((el) => {
        if (el) el.style.transform = "";
      });
      return undefined;
    }

    const gridNode = gridRef.current;
    if (!gridNode) return undefined;

    let ticking = false;
    let listening = false;

    const applyParallax = () => {
      ticking = false;
      const viewportHeight = window.innerHeight;

      cardRefs.current.forEach((card, index) => {
        const previewEl = previewRefs.current[index];
        if (!card || !previewEl) return;

        const rect = card.getBoundingClientRect();
        const totalTravel = viewportHeight + rect.height;
        const progress = clamp01((viewportHeight - rect.top) / totalTravel);
        const offset = (progress - 0.5) * 2 * PREVIEW_PARALLAX_MAX_PX;
        previewEl.style.transform = `translateY(${offset.toFixed(2)}px)`;
      });
    };

    const requestTick = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyParallax);
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
      { threshold: [0, 0.1, 0.5, 0.9, 1] }
    );

    observer.observe(gridNode);

    return () => {
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
              className={`featured-project${
                revealed[index] ? " featured-project--revealed" : ""
              }`}
              key={project.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <Link
                to={buildProjectDetailPath(lang, project.id)}
                className="featured-project__card-link"
                aria-label={`${sectionCopy.caseStudy}: ${project.title}`}
              />

              {/* El clip-path del revelado vive en este wrapper interno, no
                  en el <article> observado arriba: un elemento recortado a
                  ancho 0 (inset 0 100% 0 0) hace que IntersectionObserver
                  lo reporte como "sin intersección" para siempre, aunque
                  esté perfectamente dentro del viewport — así que el
                  <article> tiene que quedarse siempre sin recortar. */}
              <div className="featured-project__reveal-mask">
                <div className="featured-project__media" aria-hidden="true">
                  <div className="featured-project__preview-window">
                    <div className="featured-project__preview-topbar">
                      <span />
                      <span />
                      <span />
                    </div>

                    <div
                      className="featured-project__preview-content"
                      ref={(el) => {
                        previewRefs.current[index] = el;
                      }}
                    >
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

                    <span
                      className="featured-project__sweep"
                      aria-hidden="true"
                    />
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

                    <span className="featured-project__link">
                      {sectionCopy.caseStudy}
                      <ArrowRightIcon className="button__icon" />
                    </span>
                  </div>
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
