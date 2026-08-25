import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import "./ProjectsPage.css";

const CODE_LINE_STAGGER = 200;
const CODE_LINE_DURATION = 500;
const CODE_MESSAGE_DELAY = 300;
const CODE_RESULTS_HOLD = 4000;
const CODE_SCAN_DURATION = 4600;
const CODE_DOT_INTERVAL = 450;

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
    codeWindow: {
      filename: "daniel-aguilera.dev/proyectos.js",
      searching: "Buscando proyectos",
      resultsFound: (count) => `✓ ${count} resultados encontrados`,
      indexed: (count) => `${count} proyectos indexados`,
    },
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
    codeWindow: {
      filename: "daniel-aguilera.dev/projects.js",
      searching: "Searching projects",
      resultsFound: (count) => `✓ ${count} results found`,
      indexed: (count) => `${count} projects indexed`,
    },
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

function buildCodeLines(projectList, lang) {
  const varName = lang === "en" ? "projects" : "proyectos";
  const keyName = lang === "en" ? "name" : "nombre";

  const lines = [
    [
      { type: "keyword", text: "const " },
      { type: "plain", text: varName },
      { type: "punct", text: " = [" },
    ],
  ];

  projectList.forEach((project, index) => {
    const isLast = index === projectList.length - 1;
    lines.push([
      { type: "punct", text: "  { " },
      { type: "keyword", text: `${keyName}: ` },
      { type: "string", text: `"${project.title}"` },
      { type: "punct", text: isLast ? " }" : " }," },
    ]);
  });

  lines.push([{ type: "punct", text: "];" }]);

  return lines;
}

function ProjectCodeWindow({ lang, copy, projectList }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "results"
      : "scanning"
  );
  const [dotCount, setDotCount] = useState(0);

  const codeLines = useMemo(
    () => buildCodeLines(projectList, lang),
    [projectList, lang]
  );

  const count = String(projectList.length).padStart(2, "0");

  useEffect(() => {
    let scanTimer;
    let resultsTimer;
    let dotTimer;

    const revealTime =
      CODE_MESSAGE_DELAY +
      codeLines.length * CODE_LINE_STAGGER +
      CODE_LINE_DURATION;
    const resultsDuration = revealTime + CODE_RESULTS_HOLD;

    const stopDots = () => {
      if (dotTimer) {
        clearInterval(dotTimer);
        dotTimer = undefined;
      }
    };

    const toResults = () => {
      stopDots();
      setPhase("results");
      resultsTimer = setTimeout(toScanning, resultsDuration);
    };

    const toScanning = () => {
      setPhase("scanning");
      dotTimer = setInterval(
        () => setDotCount((value) => (value + 1) % 4),
        CODE_DOT_INTERVAL
      );
      scanTimer = setTimeout(toResults, CODE_SCAN_DURATION);
    };

    // Deferred to a callback (rather than called synchronously here) so the
    // state machine's first transition doesn't set state during the effect.
    const startTimer = setTimeout(() => {
      if (prefersReducedMotion) {
        setPhase("results");
      } else {
        toScanning();
      }
    }, 0);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(scanTimer);
      clearTimeout(resultsTimer);
      stopDots();
    };
  }, [prefersReducedMotion, codeLines.length]);

  return (
    <div className="projects-page__code-wrap" aria-hidden="true">
      <div className="projects-page__code-glow" />
      <div className="projects-page__code-dots" />

      <div
        className={
          prefersReducedMotion
            ? "projects-page__code-window projects-page__code-window--static"
            : "projects-page__code-window"
        }
      >
        <div className="projects-page__code-topbar">
          <span className="projects-page__code-dot projects-page__code-dot--red" />
          <span className="projects-page__code-dot projects-page__code-dot--yellow" />
          <span className="projects-page__code-dot projects-page__code-dot--green" />
          <span className="projects-page__code-filename">
            {copy.codeWindow.filename}
          </span>
        </div>

        <div className="projects-page__code-body">
          {phase === "scanning" ? (
            <div className="projects-page__code-scan">
              <div className="projects-page__code-scan-box">
                <div className="projects-page__code-scan-beam" />
              </div>
              <p className="projects-page__code-scan-text">
                {copy.codeWindow.searching}
                <span className="projects-page__code-scan-dots">
                  {[0, 1, 2].map((dotIndex) => (
                    <span
                      key={dotIndex}
                      className={dotIndex < dotCount ? "is-active" : undefined}
                    >
                      .
                    </span>
                  ))}
                </span>
              </p>
            </div>
          ) : (
            <div className="projects-page__code-results">
              <p className="projects-page__code-check">
                {copy.codeWindow.resultsFound(count)}
              </p>

              <pre className="projects-page__code-snippet">
                {codeLines.map((tokens, lineIndex) => (
                  <span
                    className="projects-page__code-line"
                    style={{
                      animationDelay: `${
                        CODE_MESSAGE_DELAY + lineIndex * CODE_LINE_STAGGER
                      }ms`,
                    }}
                    key={lineIndex}
                  >
                    {tokens.map((token, tokenIndex) => (
                      <span
                        className={`projects-page__code-token projects-page__code-token--${token.type}`}
                        key={tokenIndex}
                      >
                        {token.text}
                      </span>
                    ))}
                    {lineIndex === codeLines.length - 1 && (
                      <span
                        className="projects-page__code-cursor"
                        style={{
                          animationDelay: `${
                            CODE_MESSAGE_DELAY +
                            codeLines.length * CODE_LINE_STAGGER
                          }ms`,
                        }}
                      >
                        ▍
                      </span>
                    )}
                  </span>
                ))}
              </pre>
            </div>
          )}
        </div>

        <div className="projects-page__code-statusbar">
          <span className="projects-page__code-status-dot" />
          <span>{copy.codeWindow.indexed(count)}</span>
        </div>
      </div>
    </div>
  );
}

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

          <ProjectCodeWindow lang={lang} copy={copy} projectList={projectList} />
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

                  <span className="projects-page__card-sweep" aria-hidden="true" />
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

                        <span className="projects-page__card-sweep" aria-hidden="true" />
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
