import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Database,
  Gamepad2,
  Globe,
  MessageCircle,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import { projects } from "../../data/projects";
import { buildProjectDetailPath, routes } from "../../config/routes";
import "./ProjectDetailPage.css";

const GALLERY_SLIDE_COUNT = 5;
const SLIDE_WIDTH_RATIO = 0.72;
const SLIDE_GAP = 20;
const SLIDE_TRANSITION_MS = 550;

// Maps the `icon` field stored per project (see src/data/projects.js) to the
// actual lucide-react component. Add new icons here as new projects need them.
const ICONS = {
  Database,
  Wrench,
  ShoppingCart,
  Gamepad2,
  Globe,
  MessageCircle,
};

const pageCopy = {
  es: {
    breadcrumb: "Volver a proyectos",
    liveCta: "Ver proyecto en vivo",
    codeCta: "Ver código",
    panel: {
      type: "Tipo",
      role: "Rol",
      status: "Estado",
      stack: "Stack",
      year: "Año",
    },
    previewLabel: "PREVIEW",
    contextLabel: "Contexto del proyecto",
    galleryLabel: "Galería de capturas",
    galleryAria: "Galería de capturas del proyecto",
    prevSlide: "Diapositiva anterior",
    nextSlide: "Siguiente diapositiva",
    goToSlide: (slideNumber) => `Ir a la diapositiva ${slideNumber}`,
    nextProjectLabel: "Siguiente proyecto",
  },
  en: {
    breadcrumb: "Back to projects",
    liveCta: "View live project",
    codeCta: "View code",
    panel: {
      type: "Type",
      role: "Role",
      status: "Status",
      stack: "Stack",
      year: "Year",
    },
    previewLabel: "PREVIEW",
    contextLabel: "Project context",
    galleryLabel: "Screenshot gallery",
    galleryAria: "Project screenshot gallery",
    prevSlide: "Previous slide",
    nextSlide: "Next slide",
    goToSlide: (slideNumber) => `Go to slide ${slideNumber}`,
    nextProjectLabel: "Next project",
  },
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setReduced(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

function PreviewPlaceholder({ label, image, alt = "" }) {
  if (image) {
    return (
      <img
        className="project-detail__preview-content project-detail__preview-content--image"
        src={image}
        alt={alt}
      />
    );
  }

  return (
    <div className="project-detail__preview-content" aria-hidden="true">
      <span className="project-detail__preview-label">{label}</span>
    </div>
  );
}

function HeroAction({ href, icon: Icon, variant, children }) {
  const className = `button button--${variant}`;

  if (!href) {
    return (
      <span
        className={`${className} project-detail__action--disabled`}
        aria-disabled="true"
      >
        <span>{children}</span>
        <Icon className="button__icon" aria-hidden="true" />
      </span>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span>{children}</span>
      <Icon className="button__icon" aria-hidden="true" />
    </a>
  );
}

function ProjectGallery({ copy }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const viewportRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver((entries) => {
      setViewportWidth(entries[0].contentRect.width);
    });

    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const goPrev = () =>
    setActiveIndex(
      (index) => (index - 1 + GALLERY_SLIDE_COUNT) % GALLERY_SLIDE_COUNT
    );
  const goNext = () =>
    setActiveIndex((index) => (index + 1) % GALLERY_SLIDE_COUNT);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const slideWidth = viewportWidth * SLIDE_WIDTH_RATIO;
  const trackOffset =
    viewportWidth / 2 -
    slideWidth / 2 -
    activeIndex * (slideWidth + SLIDE_GAP);

  const trackStyle = {
    transform: `translateX(${trackOffset}px)`,
    transition: prefersReducedMotion
      ? "none"
      : `transform ${SLIDE_TRANSITION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
  };

  return (
    <div className="project-detail__gallery" aria-label={copy.galleryAria}>
      <div
        className="project-detail__gallery-viewport"
        ref={viewportRef}
        tabIndex={0}
        role="group"
        onKeyDown={handleKeyDown}
      >
        <div className="project-detail__gallery-track" style={trackStyle}>
          {Array.from({ length: GALLERY_SLIDE_COUNT }).map((_, index) => (
            <div
              className="project-detail__gallery-slide"
              style={{ width: slideWidth || undefined }}
              key={index}
              aria-hidden={index !== activeIndex}
            >
              <PreviewPlaceholder label={copy.previewLabel} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="project-detail__gallery-arrow project-detail__gallery-arrow--prev"
          onClick={goPrev}
          aria-label={copy.prevSlide}
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          className="project-detail__gallery-arrow project-detail__gallery-arrow--next"
          onClick={goNext}
          aria-label={copy.nextSlide}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="project-detail__gallery-dots">
        {Array.from({ length: GALLERY_SLIDE_COUNT }).map((_, index) => (
          <button
            type="button"
            key={index}
            className={
              index === activeIndex
                ? "project-detail__gallery-dot project-detail__gallery-dot--active"
                : "project-detail__gallery-dot"
            }
            aria-label={copy.goToSlide(index + 1)}
            aria-current={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectDetailPage({ lang = "es" }) {
  const { projectId } = useParams();
  const copy = pageCopy[lang] ?? pageCopy.es;
  const projectList = projects[lang] ?? projects.es;

  const projectIndex = projectList.findIndex((item) => item.id === projectId);
  const project = projectIndex === -1 ? null : projectList[projectIndex];

  const nextProject = useMemo(() => {
    if (!project || projectList.length === 0) return null;
    const nextIndex = (projectIndex + 1) % projectList.length;
    return projectList[nextIndex];
  }, [project, projectIndex, projectList]);

  if (!project) {
    return <Navigate to={routes.notFound[lang]} replace />;
  }

  const NextIcon = ICONS[nextProject.icon] ?? ArrowRight;

  return (
    <main className="site project-detail">
      <Header />

      <div className="container project-detail__breadcrumb-row">
        <Link
          to={routes.projects[lang]}
          className="project-detail__breadcrumb"
        >
          <span aria-hidden="true">&larr;</span>
          {copy.breadcrumb}
        </Link>
      </div>

      <section className="project-detail__hero">
        <div className="container project-detail__hero-inner">
          <div className="project-detail__hero-content">
            <p className="project-detail__eyebrow">
              {project.number} / {project.type}
            </p>

            <h1 className="project-detail__title">{project.title}</h1>

            <p className="project-detail__description">
              {project.description}
            </p>

            <div className="project-detail__actions">
              <HeroAction href={project.liveUrl} icon={ArrowRight} variant="primary">
                {copy.liveCta}
              </HeroAction>

              <HeroAction href={project.githubUrl} icon={ArrowUpRight} variant="secondary">
                {copy.codeCta}
              </HeroAction>
            </div>
          </div>

          <aside className="project-detail__panel">
            <div className="project-detail__panel-row">
              <span className="project-detail__panel-label">
                {copy.panel.type}
              </span>
              <span className="project-detail__panel-value">
                {project.type}
              </span>
            </div>

            <div className="project-detail__panel-row">
              <span className="project-detail__panel-label">
                {copy.panel.role}
              </span>
              <span className="project-detail__panel-value">
                {project.role}
              </span>
            </div>

            <div className="project-detail__panel-row">
              <span className="project-detail__panel-label">
                {copy.panel.status}
              </span>
              <span className="project-detail__panel-value">
                {project.status}
              </span>
            </div>

            <div className="project-detail__panel-row">
              <span className="project-detail__panel-label">
                {copy.panel.stack}
              </span>
              <span className="project-detail__panel-value">
                {project.stack.join(" · ")}
              </span>
            </div>

            <div className="project-detail__panel-row">
              <span className="project-detail__panel-label">
                {copy.panel.year}
              </span>
              <span className="project-detail__panel-value">
                {project.year}
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="project-detail__preview-section">
        <div className="container">
          <div className="project-detail__preview">
            <div className="project-detail__preview-topbar">
              <span />
              <span />
              <span />
            </div>

            {/* Placeholder frame: swap PreviewPlaceholder for a real
                screenshot <img> here once one exists — the surrounding
                frame/topbar markup and CSS stay as-is. */}
            <PreviewPlaceholder
              label={copy.previewLabel}
              image={project.previewImage}
              alt={`Preview de ${project.title}`}
            />
          </div>
        </div>
      </section>

      <section className="project-detail__context">
        <div className="container">
          <p className="project-detail__section-label">{copy.contextLabel}</p>
        </div>
      </section>

      <section className="project-detail__gallery-section">
        <div className="container">
          <p className="project-detail__section-label">{copy.galleryLabel}</p>

          <ProjectGallery copy={copy} />
        </div>
      </section>

      <section className="project-detail__next-section">
        <div className="container">
          <Link
            to={buildProjectDetailPath(lang, nextProject.id)}
            className="project-detail__next"
          >
            <span className="project-detail__next-sweep" aria-hidden="true" />

            <NextIcon className="project-detail__next-icon" aria-hidden="true" />

            <span className="project-detail__next-text">
              <span className="project-detail__next-label">
                {copy.nextProjectLabel}
              </span>
              <span className="project-detail__next-title">
                {nextProject.title}
              </span>
              <span className="project-detail__next-description">
                {nextProject.value}
              </span>
            </span>

            <ArrowRight className="project-detail__next-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="container">
        <FooterDivider />
      </div>

      <Footer />
    </main>
  );
}

export default ProjectDetailPage;
