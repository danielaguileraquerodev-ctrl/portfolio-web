import { Link } from "react-router-dom";
import { routes } from "../../config/routes";
import "./FeaturedProjects.css";

const projects = {
  es: [
    {
      number: "01",
      type: "Sistema web personal",
      title: "Archivo Semana Santa",
      description:
        "Sistema web privado en desarrollo para organizar y consultar un archivo digital completo mediante entidades, categorías, piezas, relaciones y datos históricos.",
      tags: ["Arquitectura de información", "Base de datos", "UI compleja"],
      status: "En desarrollo privado",
    },
    {
      number: "02",
      type: "Proyecto académico completo",
      title: "Web Gimnasio / TFG",
      description:
        "Web multipágina desarrollada como Trabajo de Fin de Grado, con secciones informativas, tienda integrada, catálogo, carrito y flujo de pedido simulado.",
      tags: ["E-commerce simulado", "Carrito", "UX"],
      status: "Proyecto académico finalizado",
    },
  ],
  en: [
    {
      number: "01",
      type: "Personal web system",
      title: "Holy Week Archive",
      description:
        "Private web system in development for organising and browsing a complex digital archive through entities, categories, pieces, relationships and historical data.",
      tags: ["Information architecture", "Database", "Complex UI"],
      status: "Private development",
    },
    {
      number: "02",
      type: "Complete academic project",
      title: "Gym Website / Final Project",
      description:
        "Multi-page website developed as a final academic project, with informational sections, an integrated shop, catalogue, cart and simulated order flow.",
      tags: ["Simulated e-commerce", "Cart", "UX"],
      status: "Completed academic project",
    },
  ],
};

const copy = {
  es: {
    id: "proyectos",
    title: "Proyectos destacados",
    all: "Ver todos los proyectos",
    caseStudy: "Ver caso de estudio",
  },
  en: {
    id: "projects",
    title: "Featured projects",
    all: "View all projects",
    caseStudy: "View case study",
  },
};

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
  const projectList = projects[lang] ?? projects.es;

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

        <div className="featured-projects__grid">
          {projectList.map((project) => (
            <article className="featured-project" key={project.number}>
              <div className="featured-project__media" aria-hidden="true">
                <div className="featured-project__media-mark">
                  {project.number}
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
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="featured-project__footer">
                  <span className="featured-project__status">
                    {project.status}
                  </span>

                  <a href="#proyecto" className="featured-project__link">
                    {sectionCopy.caseStudy}
                    <ArrowRightIcon className="button__icon" />
                  </a>
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
