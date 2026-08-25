import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import daLogo from "../../assets/logo/logo.png";
import "./ProjectsPage.css";

const filters = {
  es: [
    { id: "all", label: "Todos" },
    { id: "web-systems", label: "Sistemas web" },
    { id: "academic", label: "Académicos" },
    { id: "frontend", label: "Frontend" },
    { id: "wordpress", label: "WordPress" },
    { id: "in-progress", label: "En desarrollo" },
  ],
  en: [
    { id: "all", label: "All" },
    { id: "web-systems", label: "Web systems" },
    { id: "academic", label: "Academic" },
    { id: "frontend", label: "Frontend" },
    { id: "wordpress", label: "WordPress" },
    { id: "in-progress", label: "In progress" },
  ],
};

const pageCopy = {
  es: {
    heroId: "inicio",
    listId: "proyectos",
    eyebrow: "Selected work",
    title: "Proyectos",
    description:
      "Una selección de proyectos personales, académicos y trabajos aplicados donde muestro cómo planteo, estructuro y desarrollo soluciones web. Cada proyecto está pensado como un caso de estudio para explicar el contexto, las decisiones y el valor técnico detrás del resultado.",
    filtersAria: "Filtrar proyectos",
    stackAria: "Tecnologias y enfoque",
    preview: "Preview",
    caseStudy: "Ver caso de estudio",
    viewProject: "Ver proyecto",
  },
  en: {
    heroId: "home",
    listId: "projects",
    eyebrow: "Selected work",
    title: "Projects",
    description:
      "A focused selection of personal, academic and applied projects that show my approach, process and attention to detail. Each project is presented as a case study to explain what was built, how it works and why it matters.",
    filtersAria: "Filter projects",
    stackAria: "Technologies and focus",
    preview: "Preview",
    caseStudy: "View case study",
    viewProject: "View project",
  },
};

const featuredByFilter = {
  all: "archivo-semana-santa",
  "web-systems": "archivo-semana-santa",
  academic: "web-gimnasio-tfg",
  frontend: "pokemon-online-tcg",
  wordpress: "wordpress-empresas",
  "in-progress": "archivo-semana-santa",
};

const projects = {
  es: [
    {
      id: "archivo-semana-santa",
      number: "01",
      type: "Sistema web personal",
      title: "Archivo Semana Santa",
      description:
        "Sistema web privado en desarrollo para organizar y consultar un archivo digital complejo mediante entidades, categorías, piezas, relaciones y datos históricos.",
      value: "Arquitectura de información · Base de datos · UI compleja",
      stack: ["React", "SQL", "UI/UX"],
      status: "En desarrollo privado",
      categories: ["web-systems", "in-progress"],
    },
    {
      id: "web-gimnasio-tfg",
      number: "02",
      type: "Proyecto académico completo",
      title: "Web Gimnasio / TFG",
      description:
        "Web multipágina desarrollada como Trabajo de Fin de Grado, con secciones informativas, tienda integrada, catálogo, carrito y flujo de pedido simulado.",
      value: "Estructura multipágina · Ecommerce simulado · Carrito · UX",
      stack: ["HTML", "CSS", "JavaScript", "PHP básico", "SQL"],
      status: "Proyecto académico finalizado",
      categories: ["academic"],
    },
    {
      id: "pokemon-online-tcg",
      number: "03",
      type: "Aplicación interactiva",
      title: "Pokémon Online TCG",
      description:
        "Aplicación interactiva basada en lógica de cartas, estados, componentes e interacción de usuario.",
      value: "Lógica · Estado · Componentes · Interacción",
      stack: ["JavaScript", "React", "UI", "Estado"],
      status: "Preview en preparación",
      categories: ["frontend", "in-progress"],
    },
    {
      id: "wordpress-empresas",
      number: "04",
      type: "Trabajo aplicado",
      title: "WordPress para empresas",
      description:
        "Desarrollo y adaptación de webs corporativas, landings, formularios y soluciones WordPress para necesidades reales.",
      value: "WordPress · Elementor · Formularios · Responsive",
      stack: ["WordPress", "Elementor", "Formularios", "Responsive"],
      status: "Trabajo aplicado",
      categories: ["wordpress"],
    },
    {
      id: "whatsapp-web",
      number: "05",
      type: "Frontend project",
      title: "WhatsApp Web",
      description:
        "Interfaz de mensajería enfocada en layout, componentes, responsive UI y precisión visual.",
      value: "Maquetación · Componentes · Responsive · UI",
      stack: ["HTML", "CSS", "JavaScript", "React"],
      status: "En desarrollo",
      categories: ["frontend", "in-progress"],
    },
  ],
  en: [
    {
      id: "archivo-semana-santa",
      number: "01",
      type: "Personal web system",
      title: "Holy Week Archive",
      description:
        "Private web system in development for organising and browsing a complex digital archive through entities, categories, pieces, relationships and historical data.",
      value: "Information architecture · Database · Complex UI",
      stack: ["React", "SQL", "UI/UX"],
      status: "Private development",
      categories: ["web-systems", "in-progress"],
    },
    {
      id: "web-gimnasio-tfg",
      number: "02",
      type: "Complete academic project",
      title: "Gym Website / Final Project",
      description:
        "Multi-page website developed as a final academic project, with informational sections, an integrated shop, catalogue, cart and simulated order flow.",
      value: "Multi-page structure · Simulated e-commerce · Cart · UX",
      stack: ["HTML", "CSS", "JavaScript", "Basic PHP", "SQL"],
      status: "Completed academic project",
      categories: ["academic"],
    },
    {
      id: "pokemon-online-tcg",
      number: "03",
      type: "Interactive application",
      title: "Pokemon Online TCG",
      description:
        "Interactive application based on card logic, state management, components and user interaction.",
      value: "Logic · State · Components · Interaction",
      stack: ["JavaScript", "React", "UI", "State"],
      status: "Preview in preparation",
      categories: ["frontend", "in-progress"],
    },
    {
      id: "wordpress-empresas",
      number: "04",
      type: "Applied work",
      title: "WordPress for businesses",
      description:
        "Development and adaptation of corporate websites, landing pages, forms and WordPress solutions for real business needs.",
      value: "WordPress · Elementor · Forms · Responsive",
      stack: ["WordPress", "Elementor", "Forms", "Responsive"],
      status: "Applied work",
      categories: ["wordpress"],
    },
    {
      id: "whatsapp-web",
      number: "05",
      type: "Frontend project",
      title: "WhatsApp Web",
      description:
        "Messaging interface focused on layout, components, responsive UI and visual precision.",
      value: "Layout · Components · Responsive · UI",
      stack: ["HTML", "CSS", "JavaScript", "React"],
      status: "In development",
      categories: ["frontend", "in-progress"],
    },
  ],
};

function ProjectsPage({ lang = "es" }) {
  const copy = pageCopy[lang] ?? pageCopy.es;
  const filterList = filters[lang] ?? filters.es;
  const projectList = projects[lang] ?? projects.es;
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projectList;
    }

    return projectList.filter((project) =>
      project.categories.includes(activeFilter)
    );
  }, [activeFilter, projectList]);

  const featuredProject = useMemo(() => {
    const featuredId = featuredByFilter[activeFilter];

    return (
      visibleProjects.find((project) => project.id === featuredId) ||
      visibleProjects[0] ||
      null
    );
  }, [activeFilter, visibleProjects]);

  const secondaryProjects = useMemo(() => {
    if (!featuredProject) {
      return visibleProjects;
    }

    return visibleProjects.filter(
      (project) => project.id !== featuredProject.id
    );
  }, [featuredProject, visibleProjects]);

  return (
    <main className="site projects-page">
      <Header />

      <section className="projects-page__hero" id={copy.heroId}>
        <div className="container projects-page__hero-inner">
          <div className="projects-page__hero-content">
            <p className="projects-page__eyebrow">{copy.eyebrow}</p>

            <h1 className="projects-page__title">{copy.title}</h1>

            <p className="projects-page__description">{copy.description}</p>

            <div
              className="projects-page__filters"
              aria-label={copy.filtersAria}
            >
              {filterList.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={
                    activeFilter === filter.id
                      ? "projects-page__filter projects-page__filter--active"
                      : "projects-page__filter"
                  }
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-page__visual" aria-hidden="true">
            <div className="projects-page__visual-grid projects-page__visual-grid--one" />
            <div className="projects-page__visual-grid projects-page__visual-grid--two" />
            <div className="projects-page__visual-glow" />
            <div className="projects-page__visual-line projects-page__visual-line--one" />
            <div className="projects-page__visual-line projects-page__visual-line--two" />
            <div className="projects-page__visual-cross projects-page__visual-cross--one" />
            <div className="projects-page__visual-cross projects-page__visual-cross--two" />

            <div className="projects-page__logo-frame">
              <img src={daLogo} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="projects-page__list" id={copy.listId}>
        <div className="container projects-page__list-inner">
          {featuredProject && (
            <article
              className="projects-page__card projects-page__card--featured"
              key={featuredProject.id}
            >
              <div className="projects-page__card-preview">
                <div className="projects-page__preview-window">
                  <div className="projects-page__preview-topbar">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="projects-page__preview-content">
                    <span className="projects-page__preview-label">
                      {copy.preview}
                    </span>
                  </div>
                </div>
              </div>

              <div className="projects-page__card-body">
                <p className="projects-page__card-eyebrow">
                  {featuredProject.number} / {featuredProject.type}
                </p>

                <h2 className="projects-page__card-title">
                  {featuredProject.title}
                </h2>

                <p className="projects-page__card-description">
                  {featuredProject.description}
                </p>

                <p className="projects-page__card-value">
                  {featuredProject.value}
                </p>

                <div
                  className="projects-page__card-tags"
                  aria-label={copy.stackAria}
                >
                  {featuredProject.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="projects-page__card-footer">
                  <p className="projects-page__card-status">
                    <span aria-hidden="true" />
                    {featuredProject.status}
                  </p>

                  <a href="#" className="projects-page__card-link">
                    {copy.caseStudy}
                    <span aria-hidden="true">-&gt;</span>
                  </a>
                </div>
              </div>
            </article>
          )}

          {secondaryProjects.length > 0 && (
            <div className="projects-page__grid">
              {secondaryProjects.map((project) => (
                <article className="projects-page__card" key={project.id}>
                  <div className="projects-page__card-body">
                    <p className="projects-page__card-eyebrow">
                      {project.number} / {project.type}
                    </p>

                    <h2 className="projects-page__card-title">
                      {project.title}
                    </h2>

                    <p className="projects-page__card-description">
                      {project.description}
                    </p>

                    <div className="projects-page__card-preview projects-page__card-preview--compact">
                      <div className="projects-page__preview-window">
                        <div className="projects-page__preview-topbar">
                          <span />
                          <span />
                          <span />
                        </div>

                        <div className="projects-page__preview-content">
                          <span className="projects-page__preview-label">
                            {copy.preview}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="projects-page__card-value">
                      {project.value}
                    </p>

                    <div
                      className="projects-page__card-tags"
                      aria-label={copy.stackAria}
                    >
                      {project.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="projects-page__card-footer">
                      <a href="#" className="projects-page__card-link">
                        {copy.viewProject}
                        <span aria-hidden="true">-&gt;</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="container">
        <FooterDivider />
      </div>

      <Footer />
    </main>
  );
}

export default ProjectsPage;
