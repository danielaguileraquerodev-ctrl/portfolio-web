import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Accessibility,
  AppWindow,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  Code2,
  Crosshair,
  Database,
  GraduationCap,
  Gauge,
  Grid3X3,
  Layers3,
  Lightbulb,
  Rocket,
  Search,
  Send,
  Star,
  UserRound,
  Zap,
} from "lucide-react";
import {
  SiFigma,
  SiGit,
  SiGreensock,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNotion,
  SiPhp,
  SiReact,
  SiTypescript,
  SiWordpress,
} from "react-icons/si";
import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import Header from "../../components/Header/Header";
import daLogoSinCaja from "../../assets/logo/daLogoSinCaja.png";
import { routes } from "../../config/routes";
import "./AboutPage.css";

const filters = [
  { id: "all", es: "TODAS", en: "ALL" },
  { id: "development", es: "DESARROLLO", en: "DEVELOPMENT" },
  { id: "wordpress", es: "WORDPRESS", en: "WORDPRESS" },
  { id: "design", es: "DISEÑO", en: "DESIGN" },
  { id: "ai", es: "IA", en: "AI" },
  { id: "business", es: "EMPRESA", en: "BUSINESS" },
];

const skills = [
  { name: "HTML", category: "development", level: 5, icon: "html", color: "#e34f26", featured: true },
  { name: "CSS", category: "development", level: 5, icon: "css", color: "#1572b6", featured: true },
  { name: "JavaScript", category: "development", level: 4, icon: "javascript", color: "#f7df1e", featured: true },
  { name: "React", category: "development", level: 4, icon: "react", color: "#61dafb", featured: true },
  { name: "WordPress", category: "wordpress", level: 5, icon: "wordpress", color: "#21759b", featured: true },
  { name: "SQL", category: "development", level: 4, icon: "mysql", color: "#4479a1", featured: true },
  { name: "GitHub", category: "development", level: 4, icon: "github", color: "#f1ede5", featured: true },
  { name: "IA aplicada", category: "ai", level: 4, icon: "ai", color: "#d49445", featured: true },
  { name: "TypeScript", category: "development", level: 3, icon: "typescript", color: "#3178c6" },
  { name: "Vite", category: "development", level: 4, icon: "vite", color: "#b688ff" },
  { name: "React Router", category: "development", level: 4, icon: "router", color: "#f44250" },
  { name: "Node.js", category: "development", level: 3, icon: "node", color: "#68a063" },
  { name: "APIs REST", category: "development", level: 4, icon: "api", color: "#d49445" },
  { name: "MySQL", category: "development", level: 4, icon: "mysql", color: "#4479a1" },
  { name: "Git", category: "development", level: 4, icon: "git", color: "#f05032" },
  { name: "Docker", category: "development", level: 2, icon: "docker", color: "#2496ed" },
  { name: "Tailwind CSS", category: "development", level: 3, icon: "tailwind", color: "#38bdf8" },
  { name: "Bootstrap", category: "development", level: 3, icon: "bootstrap", color: "#7952b3" },
  { name: "Python", category: "development", level: 2, icon: "python", color: "#3776ab" },
  { name: "JSON", category: "development", level: 5, icon: "json", color: "#f1ede5" },
  { name: "Elementor", category: "wordpress", level: 5, icon: "elementor", color: "#92003b" },
  { name: "Elementor Pro", category: "wordpress", level: 4, icon: "elementor", color: "#92003b" },
  { name: "WooCommerce", category: "wordpress", level: 3, icon: "woocommerce", color: "#96588a" },
  { name: "Plugins de formularios", category: "wordpress", level: 4, icon: "app", color: "#d49445" },
  { name: "Plugins SEO", category: "wordpress", level: 4, icon: "seo", color: "#7ad66d" },
  { name: "SEO On Page", category: "wordpress", level: 4, icon: "seo", color: "#7ad66d" },
  { name: "Migraciones", category: "wordpress", level: 3, icon: "migration", color: "#d49445" },
  { name: "Hosting", category: "wordpress", level: 3, icon: "hosting", color: "#6aa6ff" },
  { name: "DNS", category: "wordpress", level: 3, icon: "dns", color: "#6aa6ff" },
  { name: "Optimización WordPress", category: "wordpress", level: 4, icon: "gauge", color: "#d49445" },
  { name: "Mantenimiento web", category: "wordpress", level: 4, icon: "maintenance", color: "#d49445" },
  { name: "Resolución de incidencias", category: "wordpress", level: 4, icon: "issue", color: "#d49445" },
  { name: "Figma", category: "design", level: 4, icon: "figma", color: "#f24e1e" },
  { name: "UI Design", category: "design", level: 4, icon: "ui", color: "#d49445" },
  { name: "Jerarquía visual", category: "design", level: 4, icon: "layers", color: "#d49445" },
  { name: "Diseño responsive", category: "design", level: 4, icon: "responsive", color: "#d49445" },
  { name: "Microinteracciones", category: "design", level: 3, icon: "interaction", color: "#d49445" },
  { name: "Prototipado", category: "design", level: 3, icon: "prototype", color: "#d49445" },
  { name: "Prompt Engineering", category: "ai", level: 4, icon: "prompt", color: "#d49445" },
  { name: "Debugging con IA", category: "ai", level: 4, icon: "issue", color: "#d49445" },
  { name: "Documentación con IA", category: "ai", level: 4, icon: "book", color: "#d49445" },
  { name: "Automatización con IA", category: "ai", level: 3, icon: "automation", color: "#d49445" },
  { name: "Generación de assets con IA", category: "ai", level: 3, icon: "asset", color: "#d49445" },
  { name: "ChatGPT", category: "ai", level: 4, icon: "ai", color: "#10a37f" },
  { name: "Claude", category: "ai", level: 3, icon: "ai", color: "#d49445" },
  { name: "Codex", category: "ai", level: 4, icon: "code", color: "#d49445" },
  { name: "Odoo", category: "business", level: 3, icon: "odoo", color: "#875a7b" },
  { name: "XML en Odoo", category: "business", level: 3, icon: "code", color: "#d49445" },
  { name: "Personalización básica en Odoo", category: "business", level: 3, icon: "app", color: "#d49445" },
  { name: "Comprensión de procesos empresariales", category: "business", level: 4, icon: "business", color: "#d49445" },
  { name: "Digitalización de procesos", category: "business", level: 4, icon: "automation", color: "#d49445" },
  { name: "Mantenimiento web", category: "business", level: 4, icon: "maintenance", color: "#d49445" },
  { name: "Resolución de incidencias", category: "business", level: 4, icon: "issue", color: "#d49445" },
  { name: "SEO básico", category: "business", level: 3, icon: "seo", color: "#7ad66d" },
];

const profileIcons = {
  accessibility: Accessibility,
  app: AppWindow,
  award: Award,
  book: BookOpen,
  briefcase: Briefcase,
  check: CheckCircle2,
  brain: Brain,
  code: Code2,
  crosshair: Crosshair,
  database: Database,
  graduation: GraduationCap,
  gauge: Gauge,
  grid: Grid3X3,
  layers: Layers3,
  lightbulb: Lightbulb,
  rocket: Rocket,
  search: Search,
  send: Send,
  star: Star,
  user: UserRound,
  zap: Zap,
};

const skillIcons = {
  ai: Brain,
  api: Zap,
  app: AppWindow,
  asset: AppWindow,
  automation: Zap,
  bootstrap: SiCss,
  book: BookOpen,
  business: Briefcase,
  code: Code2,
  css: SiCss,
  dns: Database,
  docker: Layers3,
  elementor: AppWindow,
  figma: SiFigma,
  git: SiGit,
  github: SiGit,
  gsap: SiGreensock,
  gauge: Gauge,
  hosting: Database,
  html: SiHtml5,
  interaction: Zap,
  javascript: SiJavascript,
  json: Code2,
  layers: Layers3,
  maintenance: Gauge,
  migration: Send,
  mysql: SiMysql,
  node: Code2,
  notion: SiNotion,
  odoo: Briefcase,
  php: SiPhp,
  prompt: Lightbulb,
  prototype: AppWindow,
  python: Code2,
  react: SiReact,
  responsive: AppWindow,
  router: AppWindow,
  seo: Gauge,
  tailwind: SiCss,
  typescript: SiTypescript,
  ui: AppWindow,
  vite: Code2,
  wordpress: SiWordpress,
  woocommerce: AppWindow,
};

const strengthMetrics = {
  es: [
    {
      icon: "layers",
      title: "Organización y estructura",
      text: "Ordeno información, procesos e interfaces para que cada proyecto tenga una base clara, mantenible y fácil de entender.",
      value: 86,
    },
    {
      icon: "crosshair",
      title: "Atención al detalle",
      text: "Cuido la presentación visual, la coherencia del sistema y los pequeños ajustes que hacen que una web se perciba profesional.",
      value: 84,
    },
    {
      icon: "search",
      title: "Resolución de problemas",
      text: "Analizo errores, busco alternativas y adapto la solución técnica al contexto real del proyecto.",
      value: 82,
    },
    {
      icon: "book",
      title: "Aprendizaje continuo",
      text: "Me mantengo en evolución constante, incorporando nuevas herramientas y mejorando mi forma de trabajar en cada proyecto.",
      value: 88,
    },
    {
      icon: "code",
      title: "Adaptabilidad técnica",
      text: "Trabajo con frontend, WordPress, bases de datos, IA y herramientas empresariales, adaptándome a necesidades distintas.",
      value: 80,
    },
  ],
  en: [
    {
      icon: "layers",
      title: "Organization and structure",
      text: "I organize information, processes and interfaces so each project has a clear and maintainable foundation.",
      value: 86,
    },
    {
      icon: "crosshair",
      title: "Attention to detail",
      text: "I care about visual presentation, system consistency and the small adjustments that make a website feel professional.",
      value: 84,
    },
    {
      icon: "search",
      title: "Problem solving",
      text: "I analyze errors, look for alternatives and adapt the technical solution to the real project context.",
      value: 82,
    },
    {
      icon: "book",
      title: "Continuous learning",
      text: "I keep evolving, adding new tools and improving the way I work on each project.",
      value: 88,
    },
    {
      icon: "code",
      title: "Technical adaptability",
      text: "I work across frontend, WordPress, databases, AI and business tools, adapting to different needs.",
      value: 80,
    },
  ],
};

const copy = {
  es: {
    eyebrow: "Sobre mí",
    title: (
      <>
        Aprendo, <span>ordeno</span> y cuido cada <span>detalle</span>.
      </>
    ),
    description:
      "Soy Daniel Aguilera Quero, desarrollador web formado en DAW. Mi perfil combina frontend, WordPress, bases de datos y herramientas orientadas a productividad, con una forma de trabajar centrada en la claridad, el orden y el detalle.",
    projectsCta: "Ver proyectos",
    orbitalAria: "Sistema interactivo de secciones sobre Daniel Aguilera",
    panelLabel: "Exploración",
    toolsTitle: "Herramientas / Fortalezas",
    toolsNote:
      "Me mantengo en constante aprendizaje para dominar nuevas tecnologías y elevar la calidad de cada proyecto.",
    hide: "Ocultar",
    show: "Mostrar",
    strengthsTitle: "Mis fortalezas",
    strengthsText:
      "Competencias reales que aplico al desarrollar proyectos web con estructura, claridad y atención al detalle.",
    journeyCta: "Ver recorrido profesional",
    processCta: "Hablemos del proyecto",
    levelLabel: "Nivel",
    educationPanel: {
      timelineTitle: "Mi trayectoria formativa",
      note:
        "La formacion es un viaje continuo. Cada proyecto es una oportunidad para aprender, aplicar y mejorar.",
      timeline: [
        {
          icon: "code",
          date: "2023 - 2025",
          title: "DAW",
          text: "Ciclo formativo superior de desarrollo web, HTML/CSS/JavaScript, bases de datos, aplicaciones web, proyectos y buenas practicas.",
          tag: "Formacion",
        },
        {
          icon: "briefcase",
          date: "2024",
          title: "TEKPYME",
          text: "Primera experiencia en entorno profesional, infraestructuras, herramientas empresariales y adaptacion a contexto real.",
          tag: "Practicas",
        },
        {
          icon: "wordpress",
          date: "2024 - 2025",
          title: "ENOOBY",
          text: "Participación en proyectos de desarrollo web con WordPress, herramientas basadas en IA y soluciones orientadas a productividad empresarial durante FP Dual y FCT.",
          tag: "FP Dual",
        },
        {
          icon: "rocket",
          date: "2025 - Actualidad",
          title: "Webmaster Canarias",
          text: "Desarrollo de webs en WordPress, desarrollo web, SEO y mantenimiento.",
          tag: "Experiencia",
        },
        {
          icon: "star",
          date: "Futuro",
          title: "Proximo hito",
          text: "Continuar ampliando experiencia profesional en desarrollo web, WordPress, frontend y soluciones digitales aplicadas.",
          tag: "Por venir",
        },
      ],
      certificationsTitle: "Certificaciones",
      viewAll: "Ver todas",
      certifications: [
        {
          icon: "graduation",
          title: "CFGS Desarrollo de Aplicaciones Web (DAW)",
          source: "Formacion Profesional",
          meta: "2023 - 2025",
        },
        {
          icon: "check",
          title: "ISE II - Integrated Skills in English (CEFR Level B2)",
          source: "Trinity College London",
          meta: "2024",
        },
      ],
      areasTitle: "Areas de estudio",
      explore: "Explorar temas",
      areas: [
        { icon: "html", label: "HTML", color: "#e34f26" },
        { icon: "css", label: "CSS", color: "#1572b6" },
        { icon: "javascript", label: "JavaScript", color: "#f7df1e" },
        { icon: "typescript", label: "TypeScript", color: "#3178c6" },
        { icon: "react", label: "React", color: "#61dafb" },
        { icon: "wordpress", label: "WordPress", color: "#21759b" },
        { icon: "php", label: "PHP", color: "#777bb4" },
        { icon: "mysql", label: "MySQL", color: "#4479a1" },
        { icon: "git", label: "Git & GitHub", color: "#f05032" },
      ],
      learningTitle: "Aprendizaje continuo",
      learningText: "Comprometido con la actualización constante y la mejora profesional",
      progressLabel: "Progreso anual",
      exploredTitle: "Ultimas areas exploradas:",
      explored: [
        "Next.js y App Router",
        "Diseno de sistemas",
        "Optimizacion Web (Core Web Vitals)",
      ],
      cta: "Ver trayectoria formativa",
    },
    approachPanelOld: {
      title: "CÃ³mo pienso, cÃ³mo resuelvo, quÃ© entrego.",
      text:
        "Mi enfoque combina análisis, estructura y desarrollo web para convertir ideas o necesidades reales en soluciones funcionales, claras y mantenibles.",
      cards: [
        {
          icon: "crosshair",
          title: "Pienso en sistemas",
          text: "Analizo el contexto completo para entender el problema desde mÃºltiples capas y relaciones.",
        },
        {
          icon: "layers",
          title: "Ordeno prioridades",
          text: "Identifico lo esencial, defino lo que genera mayor impacto y elimino lo que no aporta valor real.",
        },
        {
          icon: "app",
          title: "DiseÃ±o con intenciÃ³n",
          text: "Creo experiencias claras, coherentes y centradas en las personas y en los objetivos del proyecto.",
        },
        {
          icon: "code",
          title: "Construyo con criterio",
          text: "Desarrollo soluciones limpias, escalables y mantenibles que soportan crecimiento y cambio.",
        },
      ],
      stackTitle: "Mi enfoque en cada proyecto",
      layers: [
        {
          icon: "lightbulb",
          label: "Idea",
          text: "Exploro el problema, la oportunidad y el contexto real.",
        },
        {
          icon: "grid",
          label: "Estructura",
          text: "Defino objetivos, flujos y arquitectura de la soluciÃ³n.",
        },
        {
          icon: "app",
          label: "Interfaz",
          text: "DiseÃ±o interfaces claras y experiencias que generan conexiÃ³n.",
        },
        {
          icon: "code",
          label: "Desarrollo",
          text: "Construyo con cÃ³digo limpio, componentes reutilizables y buenas prÃ¡cticas.",
        },
        {
          icon: "gauge",
          label: "OptimizaciÃ³n",
          text: "Mido, ajusto y evoluciono para entregar valor continuo y sostenible.",
        },
      ],
      outcomes: [
        {
          icon: "user",
          title: "Usuario",
          text: "Necesidades reales, metas y contexto.",
        },
        {
          icon: "rocket",
          title: "Experiencia",
          text: "Clara, Ãºtil y memorable.",
        },
        {
          icon: "crosshair",
          title: "Impacto",
          text: "Soluciones útiles, claras y sostenibles en el tiempo.",
        },
      ],
    },
    approachPanel: {
      title: "Como pienso, como resuelvo, que entrego.",
      text:
        "Mi enfoque combina pensamiento estrategico, diseno intencional y desarrollo solido para transformar ideas en productos digitales que funcionan, conectan y escalan.",
      cards: [
        {
          icon: "crosshair",
          title: "Pienso en sistemas",
          text: "Analizo el contexto completo para entender el problema desde multiples capas y relaciones.",
        },
        {
          icon: "layers",
          title: "Ordeno prioridades",
          text: "Identifico lo esencial, defino lo que genera mayor impacto y elimino lo que no aporta valor real.",
        },
        {
          icon: "app",
          title: "Diseno con intencion",
          text: "Creo experiencias claras, coherentes y centradas en las personas y en los objetivos del proyecto.",
        },
        {
          icon: "code",
          title: "Construyo con criterio",
          text: "Desarrollo soluciones limpias, escalables y mantenibles que soportan crecimiento y cambio.",
        },
      ],
      stackTitle: "Mi enfoque en cada proyecto",
      layers: [
        {
          icon: "lightbulb",
          label: "Idea",
          text: "Exploro el problema, la oportunidad y el contexto real.",
        },
        {
          icon: "grid",
          label: "Estructura",
          text: "Defino objetivos, flujos y arquitectura de la solucion.",
        },
        {
          icon: "app",
          label: "Interfaz",
          text: "Diseno interfaces claras y experiencias que generan conexion.",
        },
        {
          icon: "code",
          label: "Desarrollo",
          text: "Construyo con codigo limpio, componentes reutilizables y buenas practicas.",
        },
        {
          icon: "gauge",
          label: "Optimizacion",
          text: "Mido, ajusto y evoluciono para entregar valor continuo y sostenible.",
        },
      ],
      outcomes: [
        {
          icon: "user",
          title: "Usuario",
          text: "Necesidades reales, metas y contexto.",
        },
        {
          icon: "rocket",
          title: "Experiencia",
          text: "Clara, util y memorable.",
        },
        {
          icon: "crosshair",
          title: "Impacto",
          text: "Soluciones útiles, claras y sostenibles en el tiempo.",
        },
      ],
    },
    processPanel: {
      title: "Mi proceso",
      steps: [
        {
          icon: "search",
          number: "01",
          title: "Descubrir",
          text: "Entiendo el problema y el contexto del proyecto.",
        },
        {
          icon: "app",
          number: "02",
          title: "Diseñar",
          text: "Estructuro ideas y diseño experiencias claras y funcionales.",
        },
        {
          icon: "code",
          number: "03",
          title: "Desarrollar",
          text: "Construyo soluciones escalables con código limpio y eficiente.",
        },
        {
          icon: "gauge",
          number: "04",
          title: "Optimizar",
          text: "Mejoro rendimiento, accesibilidad y experiencia.",
        },
        {
          icon: "send",
          number: "05",
          title: "Entregar",
          text: "Lanzo productos pulidos, documentados y listos para crecer.",
        },
      ],
      workTitle: "Cómo trabajo",
      workText:
        "Trabajo de forma colaborativa y transparente, integrando estrategia, diseño y desarrollo en cada etapa. Me involucro desde el inicio, comunico con claridad y me enfoco en entregar soluciones claras y sostenibles.",
      workBullets: [
        "Comunicación clara",
        "Código limpio",
        "Enfoque en el usuario",
        "Diseño intencional",
        "Iteración continua",
        "Entrega clara",
      ],
      principlesTitle: "Principios clave",
      principles: [
        {
          icon: "lightbulb",
          title: "Claridad",
          text: "Interfaces simples, mensajes directos y experiencias que comunican sin ruido.",
        },
        {
          icon: "layers",
          title: "Estructura",
          text: "Organización sólida de la información y arquitectura escalable en cada proyecto.",
        },
        {
          icon: "zap",
          title: "Rendimiento",
          text: "Velocidad, eficiencia y buenas prácticas que aseguran productos rápidos y confiables.",
        },
        {
          icon: "grid",
          title: "Atención al detalle",
          text: "Cada microinteracción importa. La calidad está en los detalles.",
        },
        {
          icon: "accessibility",
          title: "Accesibilidad",
          text: "Interfaces pensadas para ser comprensibles, utilizables y adaptables a distintos dispositivos.",
        },
      ],
      projectTitle: "Hablemos de una oportunidad o proyecto web.",
      projectText:
        "Estoy abierto a oportunidades laborales, colaboraciones y proyectos web donde pueda aportar desarrollo, estructura y atención al detalle.",
    },
    profile: {
      title: "Perfil profesional",
      intro:
        "Desarrollador web con base técnica, criterio visual y enfoque funcional.",
      paragraphs: [
        "Me interesa construir proyectos digitales que no solo funcionen, sino que estén bien estructurados, sean claros para el usuario y tengan una presentación cuidada.",
        "Mi perfil combina desarrollo frontend, WordPress, bases de datos y herramientas de productividad empresarial. Busco aportar en equipos o proyectos donde pueda seguir creciendo y construir soluciones reales con orden, criterio y atención al detalle.",
      ],
      tags: [
        { icon: "code", label: "Frontend" },
        { icon: "wordpress", label: "WordPress" },
        { icon: "crosshair", label: "UI" },
        { icon: "layers", label: "Estructura" },
        { icon: "database", label: "Base de datos" },
      ],
      cards: [
        {
          icon: "lightbulb",
          title: "Qué aporto",
          text: "Desarrollo, estructura y criterio visual para crear soluciones web claras, funcionales y mantenibles.",
          extra:
            "Me implico en cada fase del proyecto, aportando organización, criterio y soluciones prácticas.",
        },
        {
          icon: "brain",
          title: "Cómo pienso",
          text: "Trabajo desde la organización: entiendo el problema, ordeno la información y construyo interfaces fáciles de usar.",
          extra:
            "Analizo, simplifico y construyo con visión de usuario y foco en el rendimiento.",
        },
        {
          icon: "crosshair",
          title: "Qué priorizo",
          text: "Claridad, rendimiento, accesibilidad básica y atención al detalle.",
          extra:
            "Escribo código limpio, documentado y escalable, con foco en la calidad y la experiencia.",
        },
        {
          icon: "rocket",
          title: "Objetivo actual",
          text: "Seguir creciendo profesionalmente en desarrollo web, frontend, WordPress y sistemas digitales.",
          extra:
            "Colaborar en proyectos desafiantes que generen impacto y aprendizaje constante.",
        },
      ],
    },
    sections: [
      {
        id: "profile",
        number: "01",
        label: "Perfil",
        title:
          "Desarrollo experiencias digitales con criterio técnico, claridad visual y atención al detalle.",
        text: "Construyo soluciones web sólidas, accesibles y mantenibles, conectando diseño, tecnología y utilidad real.",
      },
      {
        id: "approach",
        number: "02",
        label: "Enfoque",
        title:
          "Combino estructura, claridad visual y desarrollo web para convertir ideas en experiencias funcionales.",
        text: "Mi trabajo se apoya en decisiones conscientes: arquitectura limpia, jerarquía visual precisa y una experiencia que no estorba al usuario.",
      },
      {
        id: "strengths",
        number: "03",
        label: "Fortalezas",
        title: "Trabajo con orden, criterio visual y adaptación técnica.",
        text: "Combino desarrollo web, WordPress, bases de datos e IA aplicada con una forma de trabajar clara y cuidadosa.",
      },
      {
        id: "process",
        number: "04",
        label: "Proceso",
        title: "Un proceso claro evita ruido y acelera las decisiones correctas.",
        text: "Trabajo por etapas: entender, definir, diseñar, desarrollar e iterar. Así cada avance tiene contexto, intención y validación.",
      },
      {
        id: "education",
        number: "05",
        label: "Formación",
        title: "Formación técnica orientada a construir productos web sólidos.",
        text: "Me he formado en desarrollo de aplicaciones web y sigo ampliando criterio técnico, visual y estratégico en cada proyecto.",
      },
    ],
  },
  en: {
    eyebrow: "About me",
    title: (
      <>
        I learn, <span>organize</span> and care for every <span>detail</span>.
      </>
    ),
    description:
      "I build elegant, functional and scalable web solutions, combining clean code with strategic design.",
    projectsCta: "View projects",
    orbitalAria: "Interactive section system about Daniel Aguilera",
    panelLabel: "Exploration",
    toolsTitle: "Tools / Strengths",
    toolsNote:
      "I keep learning continuously to master new technologies and raise the quality of every project.",
    hide: "Hide",
    show: "Show",
    strengthsTitle: "My strengths",
    strengthsText:
      "Real skills I apply when building web projects with structure, clarity and attention to detail.",
    journeyCta: "View professional journey",
    processCta: "Talk about the project",
    levelLabel: "Level",
    educationPanel: {
      timelineTitle: "My training path",
      note:
        "Education is a continuous journey. Every project is an opportunity to learn, apply and improve.",
      timeline: [
        {
          icon: "code",
          date: "2023 - 2025",
          title: "DAW",
          text: "Higher vocational training in web development, HTML/CSS/JavaScript, databases, web apps, projects and good practices.",
          tag: "Training",
        },
        {
          icon: "briefcase",
          date: "2024",
          title: "TEKPYME",
          text: "First experience in a professional environment, infrastructure, business tools and adaptation to a real context.",
          tag: "Internship",
        },
        {
          icon: "wordpress",
          date: "2024 - 2025",
          title: "ENOOBY",
          text: "WordPress, web development and emerging technologies / AI during dual vocational training and FCT.",
          tag: "Dual FP",
        },
        {
          icon: "rocket",
          date: "2025 - Present",
          title: "Webmaster Canarias",
          text: "WordPress website development, web development, SEO and maintenance.",
          tag: "Experience",
        },
        {
          icon: "star",
          date: "Future",
          title: "Next milestone",
          text: "A new chapter is still to be written. Always learning, always building.",
          tag: "Coming",
        },
      ],
      certificationsTitle: "Certifications",
      viewAll: "View all",
      certifications: [
        {
          icon: "graduation",
          title: "CFGS Web Application Development (DAW)",
          source: "Vocational Training",
          meta: "2023 - 2025",
        },
        {
          icon: "check",
          title: "ISE II - Integrated Skills in English (CEFR Level B2)",
          source: "Trinity College London",
          meta: "2024",
        },
      ],
      areasTitle: "Study areas",
      explore: "Explore topics",
      areas: [
        { icon: "html", label: "HTML", color: "#e34f26" },
        { icon: "css", label: "CSS", color: "#1572b6" },
        { icon: "javascript", label: "JavaScript", color: "#f7df1e" },
        { icon: "typescript", label: "TypeScript", color: "#3178c6" },
        { icon: "react", label: "React", color: "#61dafb" },
        { icon: "wordpress", label: "WordPress", color: "#21759b" },
        { icon: "php", label: "PHP", color: "#777bb4" },
        { icon: "mysql", label: "MySQL", color: "#4479a1" },
        { icon: "git", label: "Git & GitHub", color: "#f05032" },
      ],
      learningTitle: "Continuous learning",
      learningText: "Committed to constant improvement and professional updating.",
      progressLabel: "Annual progress",
      exploredTitle: "Latest explored areas:",
      explored: [
        "Next.js and App Router",
        "Design systems",
        "Web optimization (Core Web Vitals)",
      ],
      cta: "View training path",
    },
    approachPanel: {
      title: "How I think, how I solve, what I deliver.",
      text:
        "My approach combines strategic thinking, intentional design and solid development to turn ideas into digital products that work, connect and scale.",
      cards: [
        {
          icon: "crosshair",
          title: "I think in systems",
          text: "I analyze the full context to understand the problem through multiple layers and relationships.",
        },
        {
          icon: "layers",
          title: "I order priorities",
          text: "I identify what matters, define what creates more impact and remove what adds noise.",
        },
        {
          icon: "app",
          title: "I design with intent",
          text: "I create clear, coherent experiences centered on people and project goals.",
        },
        {
          icon: "code",
          title: "I build with judgment",
          text: "I develop clean, scalable and maintainable solutions ready to grow and change.",
        },
      ],
      stackTitle: "My approach in every project",
      layers: [
        {
          icon: "lightbulb",
          label: "Idea",
          text: "I explore the problem, the opportunity and the real context.",
        },
        {
          icon: "grid",
          label: "Structure",
          text: "I define goals, flows and the architecture of the solution.",
        },
        {
          icon: "app",
          label: "Interface",
          text: "I design clear interfaces and experiences that create connection.",
        },
        {
          icon: "code",
          label: "Development",
          text: "I build with clean code, reusable components and good practices.",
        },
        {
          icon: "gauge",
          label: "Optimization",
          text: "I measure, adjust and evolve to deliver continuous, sustainable value.",
        },
      ],
      outcomes: [
        {
          icon: "user",
          title: "User",
          text: "Real needs, goals and context.",
        },
        {
          icon: "rocket",
          title: "Experience",
          text: "Clear, useful and memorable.",
        },
        {
          icon: "crosshair",
          title: "Impact",
          text: "Measurable results and real growth.",
        },
      ],
    },
    processPanel: {
      title: "My process",
      steps: [
        {
          icon: "search",
          number: "01",
          title: "Discover",
          text: "I understand the problem, the context and the people.",
        },
        {
          icon: "app",
          number: "02",
          title: "Design",
          text: "I structure ideas and design clear, functional experiences.",
        },
        {
          icon: "code",
          number: "03",
          title: "Develop",
          text: "I build scalable solutions with clean, efficient code.",
        },
        {
          icon: "gauge",
          number: "04",
          title: "Optimize",
          text: "I improve performance, accessibility and experience.",
        },
        {
          icon: "send",
          number: "05",
          title: "Deliver",
          text: "I launch polished, documented products ready to grow.",
        },
      ],
      workTitle: "How I work",
      workText:
        "I work collaboratively and transparently, integrating strategy, design and development at every stage. I get involved from the start, communicate clearly and focus on delivering measurable value in each iteration.",
      workBullets: [
        "Clear communication",
        "Clean code",
        "User focus",
        "Intentional design",
        "Continuous iteration",
        "Measurable results",
      ],
      principlesTitle: "Key principles",
      principles: [
        {
          icon: "lightbulb",
          title: "Clarity",
          text: "Simple interfaces, direct messages and experiences that communicate without noise.",
        },
        {
          icon: "layers",
          title: "Structure",
          text: "Solid information organization and scalable architecture in every project.",
        },
        {
          icon: "zap",
          title: "Performance",
          text: "Speed, efficiency and good practices that keep products fast and reliable.",
        },
        {
          icon: "grid",
          title: "Attention to detail",
          text: "Every microinteraction matters. Quality lives in the details.",
        },
        {
          icon: "accessibility",
          title: "Accessibility",
          text: "Inclusive experiences that work for all people and devices.",
        },
      ],
      projectTitle: "Have a project in mind?",
      projectText: "Let's talk about how we can make it real.",
    },
    profile: {
      title: "Professional profile",
      intro:
        "Web developer focused on creating digital experiences that combine aesthetics, performance and purpose.",
      paragraphs: [
        "I specialize in building modern, accessible and scalable web solutions, with attention to interface detail and a solid technical foundation.",
        "I enjoy turning ideas into functional digital products, collaborating closely to understand needs and deliver real value at every stage.",
      ],
      tags: [
        { icon: "code", label: "Frontend" },
        { icon: "wordpress", label: "WordPress" },
        { icon: "crosshair", label: "UI" },
        { icon: "layers", label: "Structure" },
        { icon: "database", label: "Database" },
      ],
      cards: [
        {
          icon: "lightbulb",
          title: "What I bring",
          text: "I combine visual design with technical development to create fast, intuitive sites aligned with project goals.",
          extra:
            "I stay involved from start to finish, bringing judgment, proactivity and practical solutions.",
        },
        {
          icon: "brain",
          title: "How I think",
          text: "I think in systems, clear structures and experiences that flow without friction.",
          extra:
            "I analyze, simplify and build with user vision and performance focus.",
        },
        {
          icon: "crosshair",
          title: "What I prioritize",
          text: "Performance, accessibility and visual detail.",
          extra:
            "I write clean, documented and scalable code with focus on quality and experience.",
        },
        {
          icon: "rocket",
          title: "Current goal",
          text: "To keep growing as an independent professional.",
          extra:
            "To collaborate on challenging projects that create impact and constant learning.",
        },
      ],
    },
    sections: [
      {
        id: "profile",
        number: "01",
        label: "Profile",
        title:
          "I develop digital experiences with technical judgment, visual clarity and attention to detail.",
        text: "I build solid, accessible and maintainable web solutions, connecting design, technology and real usefulness.",
      },
      {
        id: "approach",
        number: "02",
        label: "Approach",
        title:
          "I combine structure, visual clarity and web development to turn ideas into functional experiences.",
        text: "My work relies on conscious decisions: clean architecture, precise visual hierarchy and an experience that helps the user move forward.",
      },
      {
        id: "strengths",
        number: "03",
        label: "Strengths",
        title: "I work with order, visual judgment and technical adaptability.",
        text: "I combine web development, WordPress, databases and applied AI with a clear and careful way of working.",
      },
      {
        id: "process",
        number: "04",
        label: "Process",
        title: "A clear process reduces noise and accelerates better decisions.",
        text: "I work through stages: understand, define, design, develop and iterate. Each step has context, intent and validation.",
      },
      {
        id: "education",
        number: "05",
        label: "Education",
        title: "Technical training focused on building solid web products.",
        text: "I trained in web application development and keep expanding technical, visual and strategic judgment through every project.",
      },
    ],
  },
};

function renderProfileIcon(icon) {
  const Icon = profileIcons[icon];
  return Icon ? <Icon aria-hidden="true" /> : null;
}

function renderTagIcon(icon) {
  const ProfileIcon = profileIcons[icon];
  if (ProfileIcon) return <ProfileIcon aria-hidden="true" />;

  const SkillIcon = skillIcons[icon];
  return SkillIcon ? <SkillIcon aria-hidden="true" /> : null;
}

function renderSkillIcon(skill) {
  const Icon = skillIcons[skill.icon];
  return Icon ? <Icon aria-hidden="true" style={{ color: skill.color }} /> : null;
}

function renderEducationIcon(icon) {
  const SkillIcon = skillIcons[icon];
  if (SkillIcon) return <SkillIcon aria-hidden="true" />;

  return renderProfileIcon(icon);
}

// Relative layout (fraction of container width/height) for the 5 section
// nodes drawn around the center. Order matches pageCopy.sections.
const MESH_NODE_LAYOUT = [
  { hx: 0.2, hy: 0.22 },
  { hx: 0.7, hy: 0.14 },
  { hx: 0.88, hy: 0.55 },
  { hx: 0.55, hy: 0.85 },
  { hx: 0.15, hy: 0.66 },
];

const MESH_DUST_COUNT = 90;
const MESH_CURSOR_RADIUS = 120;
const MESH_LINK_DISTANCE = 42;
const MESH_NODE_HIT_RADIUS = 28;
const MESH_CENTER_HIT_RADIUS = 58;

// One-shot "wake up" intro sequence, played once when the mesh mounts:
// 1) nodes pop in one by one, 2) a phantom cursor sweeps the canvas so the
// hover-mesh effect previews itself once, 3) everything settles into real
// rest and starts responding only to the real cursor.
const MESH_INTRO_NODE_DELAY = 320; // ms between each node's pop-in
const MESH_INTRO_NODE_DURATION = 580; // ms for a single node's pop-in
const MESH_INTRO_NODES_END = (MESH_NODE_LAYOUT.length - 1) * MESH_INTRO_NODE_DELAY
  + MESH_INTRO_NODE_DURATION;

const MESH_INTRO_SWEEP_DELAY = MESH_INTRO_NODES_END + 100; // brief pause before the sweep
const MESH_INTRO_SWEEP_DURATION = 1100; // phantom cursor sweep across the canvas

const MESH_INTRO_PULSE_DELAY = MESH_INTRO_SWEEP_DELAY + MESH_INTRO_SWEEP_DURATION + 50;
const MESH_INTRO_PULSE_DURATION = 480; // closing pulse on the center, once the mesh has settled

const MESH_INTRO_TOTAL_MS = MESH_INTRO_PULSE_DELAY + MESH_INTRO_PULSE_DURATION;

// Short curved path (hx/hy fractions of the canvas) the phantom cursor
// travels during the sweep, grazing a few of the section nodes.
const MESH_PHANTOM_PATH = [
  { hx: 0.05, hy: 0.46 },
  { hx: 0.22, hy: 0.16 },
  { hx: 0.74, hy: 0.12 },
  { hx: 0.9, hy: 0.58 },
];

function cubicBezierPoint(points, t) {
  const [p0, p1, p2, p3] = points;
  const u = 1 - t;
  return {
    hx: u * u * u * p0.hx + 3 * u * u * t * p1.hx + 3 * u * t * t * p2.hx + t * t * t * p3.hx,
    hy: u * u * u * p0.hy + 3 * u * u * t * p1.hy + 3 * u * t * t * p2.hy + t * t * t * p3.hy,
  };
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

// Overshoot easing (matches a cubic-bezier(.34,1.56,.64,1)-style pop).
function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const x = t - 1;
  return 1 + c3 * x * x * x + c1 * x * x;
}

function hexToRgbString(hex) {
  const clean = (hex || "").trim().replace("#", "");
  if (clean.length !== 3 && clean.length !== 6) return "200, 137, 69";
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const value = parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r}, ${g}, ${b}`;
}

// Deterministic pseudo-random generator so the dust field keeps the same
// "home" layout across renders (only recalculated on real resize).
function createDustSeed(count) {
  let seed = 1337;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, () => ({ hx: rand(), hy: rand() }));
}

function AboutOrbitMesh({ sections, activeId, onSelect, ariaLabel, logoSrc }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const dustSeed = useMemo(() => createDustSeed(MESH_DUST_COUNT), []);

  const activeIdRef = useRef(activeId);
  const sectionsRef = useRef(sections);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  // "Interactúa conmigo" hint: shown once the wake-up intro finishes, hidden
  // for good the moment the visitor first touches the canvas.
  const [hintVisible, setHintVisible] = useState(false);
  const hasInteractedRef = useRef(false);

  const stateRef = useRef({
    width: 0,
    height: 0,
    center: { x: 0, y: 0 },
    nodes: [],
    dust: [],
    nodeLinks: [],
    mouse: { x: 0, y: 0, active: false },
    hoverNode: -1,
    hoverCenter: false,
    reducedMotion: false,
    introStart: null,
    phantomActive: false,
    logo: null,
    raf: null,
    palette: {
      accent: "#c88945",
      accentRgb: "200, 137, 69",
      text: "#f1ede5",
      mono: '"Courier New", monospace',
    },
    draw: null,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    const styles = getComputedStyle(wrap);
    const accent = styles.getPropertyValue("--color-accent").trim() || "#c88945";
    state.palette = {
      accent,
      accentRgb: hexToRgbString(accent),
      text: styles.getPropertyValue("--color-text").trim() || "#f1ede5",
      mono: styles.getPropertyValue("--font-mono").trim() || '"Courier New", monospace',
    };

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    state.reducedMotion = reducedMotionQuery.matches;
    state.introStart = state.reducedMotion ? null : performance.now();
    let dustBurstApplied = false;

    if (logoSrc) {
      const logo = new Image();
      logo.onload = () => {
        state.logo = logo;
        draw();
      };
      logo.src = logoSrc;
    }

    function layout() {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = rect.width;
      state.height = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      state.center = { x: rect.width / 2, y: rect.height / 2 };

      state.nodes = MESH_NODE_LAYOUT.map((pos) => ({
        x: pos.hx * rect.width,
        y: pos.hy * rect.height,
      }));

      const applyBurst = !dustBurstApplied && !state.reducedMotion;
      state.dust = dustSeed.map((seed) => {
        const homeX = seed.hx * rect.width;
        const homeY = seed.hy * rect.height;
        if (applyBurst) {
          // Wake-up impulse: start slightly flung off "home" with a random
          // velocity, then let the existing spring (step()) settle it back —
          // same physics as the hover return, just a different starting state.
          const angle = Math.random() * Math.PI * 2;
          const dist = 14 + Math.random() * 46;
          const speed = 0.5 + Math.random() * 1.6;
          return {
            homeX,
            homeY,
            x: homeX + Math.cos(angle) * dist,
            y: homeY + Math.sin(angle) * dist,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
          };
        }
        return { homeX, homeY, x: homeX, y: homeY, vx: 0, vy: 0 };
      });
      dustBurstApplied = true;

      state.nodeLinks = state.nodes.map((node, index) => {
        const distances = state.dust
          .map((d, i) => ({ i, dist: Math.hypot(d.homeX - node.x, d.homeY - node.y) }))
          .sort((a, b) => a.dist - b.dist);
        const count = index % 2 === 0 ? 3 : 2;
        return distances.slice(0, count).map((entry) => entry.i);
      });

      draw();
    }

    function draw() {
      const {
        width, height, dust, nodes, nodeLinks, center, palette, mouse, hoverNode, hoverCenter,
      } = state;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = `rgba(${palette.accentRgb}, 0.32)`;
      dust.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${palette.accentRgb}, 0.1)`;
      nodeLinks.forEach((linkIdxs, i) => {
        const node = nodes[i];
        if (!node) return;
        linkIdxs.forEach((di) => {
          const d = dust[di];
          if (!d) return;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(d.x, d.y);
          ctx.stroke();
        });
      });

      if (!state.reducedMotion && mouse.active) {
        const nearby = [];
        dust.forEach((d, i) => {
          if (Math.hypot(d.x - mouse.x, d.y - mouse.y) < MESH_CURSOR_RADIUS) nearby.push(i);
        });
        for (let a = 0; a < nearby.length; a += 1) {
          for (let b = a + 1; b < nearby.length; b += 1) {
            const p1 = dust[nearby[a]];
            const p2 = dust[nearby[b]];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist < MESH_LINK_DISTANCE) {
              const alpha = 0.5 * (1 - dist / MESH_LINK_DISTANCE);
              ctx.strokeStyle = `rgba(${palette.accentRgb}, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      const activeIndex = sectionsRef.current.findIndex((s) => s.id === activeIdRef.current);
      const activeNode = activeIndex >= 0 ? nodes[activeIndex] : null;
      if (activeNode) {
        const grad = ctx.createLinearGradient(center.x, center.y, activeNode.x, activeNode.y);
        grad.addColorStop(0, `rgba(${palette.accentRgb}, 0.06)`);
        grad.addColorStop(1, `rgba(${palette.accentRgb}, 0.85)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(activeNode.x, activeNode.y);
        ctx.stroke();
      }

      const centerRadius = hoverCenter ? 62 : 58;
      const haloRadius = hoverCenter ? 108 : 92;
      const haloGrad = ctx.createRadialGradient(
        center.x, center.y, 0, center.x, center.y, haloRadius,
      );
      haloGrad.addColorStop(0, `rgba(${palette.accentRgb}, ${hoverCenter ? 0.32 : 0.2})`);
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(center.x, center.y, centerRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(15, 15, 13, 0.55)";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${palette.accentRgb}, ${hoverCenter ? 0.75 : 0.5})`;
      ctx.stroke();

      if (state.logo) {
        const size = centerRadius * 1.05;
        ctx.save();
        ctx.beginPath();
        ctx.arc(center.x, center.y, centerRadius - 6, 0, Math.PI * 2);
        ctx.clip();
        ctx.filter = "sepia(0.4) brightness(1.18)";
        ctx.drawImage(state.logo, center.x - size / 2, center.y - size / 2, size, size);
        ctx.filter = "none";
        ctx.restore();
      } else {
        ctx.fillStyle = palette.text;
        ctx.font = `700 ${Math.round(centerRadius * 0.5)}px ${palette.mono}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("DA", center.x, center.y);
      }

      // Closing pulse of the wake-up intro: a brief outward ring off the
      // center halo, once the nodes have finished popping in.
      if (state.introStart) {
        const pulseElapsed = performance.now() - state.introStart - MESH_INTRO_PULSE_DELAY;
        if (pulseElapsed > 0 && pulseElapsed < MESH_INTRO_PULSE_DURATION) {
          const pulseT = Math.sin((pulseElapsed / MESH_INTRO_PULSE_DURATION) * Math.PI);
          const pulseRadius = haloRadius + pulseT * 46;
          const pulseGrad = ctx.createRadialGradient(
            center.x, center.y, haloRadius * 0.4, center.x, center.y, pulseRadius,
          );
          pulseGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
          pulseGrad.addColorStop(0.6, `rgba(${palette.accentRgb}, ${(pulseT * 0.28).toFixed(3)})`);
          pulseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = pulseGrad;
          ctx.beginPath();
          ctx.arc(center.x, center.y, pulseRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      nodes.forEach((node, i) => {
        const section = sectionsRef.current[i];
        const isActive = section && section.id === activeIdRef.current;
        const isHover = hoverNode === i;
        let introScale = 1;
        if (state.introStart) {
          const elapsed = performance.now() - state.introStart - i * MESH_INTRO_NODE_DELAY;
          if (elapsed <= 0) introScale = 0.6;
          else if (elapsed < MESH_INTRO_NODE_DURATION) {
            introScale = 0.6 + 0.4 * easeOutBack(elapsed / MESH_INTRO_NODE_DURATION);
          }
        }
        const scale = (isActive || isHover ? 1 : 0.86) * introScale;
        const radius = 18 * scale;
        const haloR = (isActive || isHover ? 44 : 28) * scale;
        const haloAlpha = isActive ? 0.34 : isHover ? 0.28 : 0.12;

        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, haloR);
        grad.addColorStop(0, `rgba(${palette.accentRgb}, ${haloAlpha})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? palette.accent : "rgba(15, 15, 13, 0.66)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = isActive ? palette.accent : `rgba(${palette.accentRgb}, 0.7)`;
        ctx.stroke();

        ctx.fillStyle = isActive ? "#17120d" : palette.accent;
        ctx.font = `700 9px ${palette.mono}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(section ? section.number : "", node.x, node.y);

        if (isActive || isHover) {
          ctx.fillStyle = palette.text;
          ctx.font = `700 9px ${palette.mono}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText((section ? section.label : "").toUpperCase(), node.x, node.y + radius + 8);
        }
      });
    }

    function updatePhantomSweep() {
      // Drives state.mouse exactly like a real cursor would, so the existing
      // dust-pull (below) and mesh-line drawing reuse the same code path for
      // this one-shot preview. Bails out permanently the moment the visitor
      // interacts for real.
      if (!state.introStart || hasInteractedRef.current) return;

      const elapsed = performance.now() - state.introStart - MESH_INTRO_SWEEP_DELAY;
      if (elapsed < 0 || elapsed > MESH_INTRO_SWEEP_DURATION) {
        if (state.phantomActive) {
          state.mouse.active = false;
          state.phantomActive = false;
        }
        return;
      }

      const t = smoothstep(Math.min(1, elapsed / MESH_INTRO_SWEEP_DURATION));
      const point = cubicBezierPoint(MESH_PHANTOM_PATH, t);
      state.mouse.x = point.hx * state.width;
      state.mouse.y = point.hy * state.height;
      state.mouse.active = true;
      state.phantomActive = true;
    }

    function step() {
      updatePhantomSweep();
      const { dust, mouse } = state;
      dust.forEach((d) => {
        let targetX = d.homeX;
        let targetY = d.homeY;
        if (mouse.active) {
          const dx = mouse.x - d.homeX;
          const dy = mouse.y - d.homeY;
          const dist = Math.hypot(dx, dy);
          if (dist < MESH_CURSOR_RADIUS) {
            const pull = 1 - dist / MESH_CURSOR_RADIUS;
            targetX = d.homeX + dx * pull * 0.82;
            targetY = d.homeY + dy * pull * 0.82;
          }
        }
        const ax = (targetX - d.x) * 0.06;
        const ay = (targetY - d.y) * 0.06;
        d.vx = (d.vx + ax) * 0.82;
        d.vy = (d.vy + ay) * 0.82;

        if (
          Math.abs(d.vx) < 0.01
          && Math.abs(d.vy) < 0.01
          && Math.hypot(targetX - d.x, targetY - d.y) < 0.05
        ) {
          d.x = targetX;
          d.y = targetY;
          d.vx = 0;
          d.vy = 0;
        } else {
          d.x += d.vx;
          d.y += d.vy;
        }
      });
      draw();
      state.raf = requestAnimationFrame(step);
    }

    function getPos(evt) {
      const rect = canvas.getBoundingClientRect();
      return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    }

    function updateHover(pos) {
      let hoverNode = -1;
      state.nodes.forEach((node, i) => {
        if (Math.hypot(node.x - pos.x, node.y - pos.y) < MESH_NODE_HIT_RADIUS) hoverNode = i;
      });
      const hoverCenter = Math.hypot(state.center.x - pos.x, state.center.y - pos.y)
        < MESH_CENTER_HIT_RADIUS;
      const changed = hoverNode !== state.hoverNode || hoverCenter !== state.hoverCenter;
      state.hoverNode = hoverNode;
      state.hoverCenter = hoverCenter;
      canvas.style.cursor = hoverNode >= 0 || hoverCenter ? "pointer" : "default";
      return changed;
    }

    function markInteracted() {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;
      setHintVisible(false);
    }

    function handleMove(evt) {
      markInteracted();
      const pos = getPos(evt);
      state.mouse.x = pos.x;
      state.mouse.y = pos.y;
      state.mouse.active = true;
      const changed = updateHover(pos);
      if (state.reducedMotion && changed) draw();
    }

    function handleLeave() {
      state.mouse.active = false;
      const changed = state.hoverNode !== -1 || state.hoverCenter;
      state.hoverNode = -1;
      state.hoverCenter = false;
      canvas.style.cursor = "default";
      if (state.reducedMotion && changed) draw();
    }

    function handleClick(evt) {
      const pos = getPos(evt);
      if (Math.hypot(state.center.x - pos.x, state.center.y - pos.y) < MESH_CENTER_HIT_RADIUS) {
        onSelect("profile");
        return;
      }
      state.nodes.forEach((node, i) => {
        if (Math.hypot(node.x - pos.x, node.y - pos.y) < MESH_NODE_HIT_RADIUS) {
          const section = sectionsRef.current[i];
          if (section) onSelect(section.id);
        }
      });
    }

    state.draw = draw;

    const ro = new ResizeObserver(() => layout());
    ro.observe(wrap);
    layout();

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseenter", markInteracted);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("click", handleClick);

    if (!state.reducedMotion) {
      state.raf = requestAnimationFrame(step);
    }

    return () => {
      ro.disconnect();
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseenter", markInteracted);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("click", handleClick);
      if (state.raf) cancelAnimationFrame(state.raf);
    };
  }, [logoSrc, onSelect, dustSeed]);

  useEffect(() => {
    if (stateRef.current.reducedMotion && stateRef.current.draw) {
      stateRef.current.draw();
    }
  }, [activeId]);

  // Reveal the "interactúa conmigo" hint once the wake-up intro has had time
  // to finish, unless the visitor has already interacted by then.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!hasInteractedRef.current) setHintVisible(true);
    }, MESH_INTRO_TOTAL_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // A short, discreet curved line from the hint pill (top-right corner) to
  // whichever node sits closest to it, so the pill reads as pointing at the
  // mesh instead of floating unrelated to it.
  const hintLinePath = useMemo(() => {
    const anchor = { hx: 0.93, hy: 0.085 };
    let nearest = MESH_NODE_LAYOUT[0];
    let nearestDist = Infinity;
    MESH_NODE_LAYOUT.forEach((pos) => {
      const dist = Math.hypot(pos.hx - anchor.hx, pos.hy - anchor.hy);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = pos;
      }
    });
    const midX = (anchor.hx + nearest.hx) * 50;
    const midY = (anchor.hy + nearest.hy) * 50;
    const ctrlX = midX - 6;
    const ctrlY = midY - 5;
    return `M ${anchor.hx * 100} ${anchor.hy * 100} Q ${ctrlX} ${ctrlY} ${nearest.hx * 100} ${nearest.hy * 100}`;
  }, []);

  return (
    <div ref={wrapRef} className="about-mesh">
      <canvas
        ref={canvasRef}
        className="about-mesh__canvas"
        role="img"
        aria-label={ariaLabel}
      />

      <button
        type="button"
        className="about-mesh__hit about-mesh__hit--center"
        style={{ left: "50%", top: "50%" }}
        onClick={() => onSelect("profile")}
        aria-label="Daniel Aguilera"
      />

      {sections.map((section, index) => {
        const pos = MESH_NODE_LAYOUT[index];
        if (!pos) return null;
        return (
          <button
            key={section.id}
            type="button"
            className="about-mesh__hit"
            style={{ left: `${pos.hx * 100}%`, top: `${pos.hy * 100}%` }}
            aria-pressed={activeId === section.id}
            onClick={() => onSelect(section.id)}
          >
            <span className="about-mesh__hit-label">{`${section.number} ${section.label}`}</span>
          </button>
        );
      })}

      <div
        className={
          hintVisible ? "about-mesh__hint about-mesh__hint--visible" : "about-mesh__hint"
        }
        aria-hidden="true"
      >
        <svg
          className="about-mesh__hint-line"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d={hintLinePath} />
        </svg>
        <span className="about-mesh__hint-pill">Interactúa conmigo</span>
      </div>
    </div>
  );
}

function AboutPage({ lang = "es" }) {
  const pageCopy = copy[lang] || copy.es;
  const [activeId, setActiveId] = useState("profile");
  const [activeFilter, setActiveFilter] = useState("all");

  const activeSection = useMemo(
    () =>
      pageCopy.sections.find((section) => section.id === activeId) ||
      pageCopy.sections[0],
    [activeId, pageCopy.sections],
  );

  const visibleSkills = useMemo(() => {
    if (activeFilter === "all") return skills.filter((skill) => skill.featured);
    return skills.filter((skill) => skill.category === activeFilter);
  }, [activeFilter]);

  const renderProfilePanel = () => (
    <div className="about-profile-panel">
      <article className="about-profile-card about-profile-card--main">
        <span className="about-profile-card__icon" aria-hidden="true">
          {renderProfileIcon("user")}
        </span>
        <div>
          <p className="about-panel__kicker">{pageCopy.profile.title}</p>
          <h2>{pageCopy.profile.intro}</h2>
          {pageCopy.profile.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="about-profile-tags">
          {pageCopy.profile.tags.map((tag) => (
            <span key={tag.label}>
              <small>{renderTagIcon(tag.icon)}</small>
              {tag.label}
            </span>
          ))}
        </div>
      </article>

      <div className="about-profile-grid">
        {pageCopy.profile.cards.map((card) => (
          <article className="about-profile-card" key={card.title}>
            <span className="about-profile-card__icon" aria-hidden="true">
              {renderProfileIcon(card.icon)}
            </span>
            <div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <p>{card.extra}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderToolsPanel = () => (
    <div className="about-panel__body about-panel__body--dashboard">
      <article className="about-tools-matrix">
        <header className="about-tools-matrix__header">
          <p className="about-panel__kicker">{pageCopy.toolsTitle}</p>
        </header>

        <div className="about-tools-matrix__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={
                activeFilter === filter.id
                  ? "about-tools-matrix__filter about-tools-matrix__filter--active"
                  : "about-tools-matrix__filter"
              }
              type="button"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter[lang]}
            </button>
          ))}
        </div>

        <div className="about-tools-matrix__list">
          {visibleSkills.map((skill) => (
            <article className="about-tool-row" key={skill.name}>
              <span className="about-tool-row__icon">{renderSkillIcon(skill)}</span>
              <strong>{skill.name}</strong>
              <div
                className="about-tool-row__level"
                aria-label={`${pageCopy.levelLabel} ${skill.level} de 5`}
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <span
                    key={index}
                    className={
                      index < skill.level
                        ? "about-tool-row__dot about-tool-row__dot--active"
                        : "about-tool-row__dot"
                    }
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>

      <aside className="about-strengths">
        <p className="about-panel__kicker">{pageCopy.strengthsTitle}</p>
        <h2>{activeSection.title}</h2>
        <p className="about-strengths__intro">{pageCopy.strengthsText}</p>

        <div className="about-strengths__list">
          {strengthMetrics[lang].map((metric) => (
            <article className="about-strength" key={metric.title}>
              <span className="about-strength__icon">{renderProfileIcon(metric.icon)}</span>
              <div className="about-strength__copy">
                <h3>{metric.title}</h3>
                <p>{metric.text}</p>
              </div>
              <div
                className="about-strength__bar"
                aria-label={`${pageCopy.levelLabel} visual de ${metric.title}`}
              >
                <span style={{ width: `${metric.value}%` }} />
              </div>
            </article>
          ))}
        </div>

      </aside>
    </div>
  );

  const renderApproachPanel = () => (
    <div className="about-approach-panel">
      <article className="about-approach-copy">
        <div>
          <h2>{pageCopy.approachPanel.title}</h2>
          <p>{pageCopy.approachPanel.text}</p>
        </div>

        <div className="about-approach-cards">
          {pageCopy.approachPanel.cards.map((card) => (
            <article className="about-approach-card" key={card.title}>
              <span className="about-approach-card__icon" aria-hidden="true">
                {renderProfileIcon(card.icon)}
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

      </article>

      <aside className="about-approach-system">
        <p className="about-panel__kicker">{pageCopy.approachPanel.stackTitle}</p>

        <div className="about-approach-diagram">
          <div className="about-approach-stack">
            {pageCopy.approachPanel.layers.map((layer, index) => (
              <article
                className="about-approach-layer"
                key={layer.label}
                style={{ "--layer-index": index }}
              >
                <span className="about-approach-layer__icon" aria-hidden="true">
                  {renderProfileIcon(layer.icon)}
                </span>
                <strong>{layer.label}</strong>
              </article>
            ))}
          </div>

          <div className="about-approach-layer-copy">
            {pageCopy.approachPanel.layers.map((layer) => (
              <p key={layer.label}>{layer.text}</p>
            ))}
          </div>

          <svg
            className="about-approach-connectors"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="about-arrow"
                markerHeight="6"
                markerWidth="6"
                orient="auto"
                refX="5"
                refY="3"
              >
                <path d="M0 0 L6 3 L0 6" />
              </marker>
            </defs>
            <path className="about-approach-connectors__brace" d="M28 25 H18 Q10 25 10 35 V65 Q10 75 18 75 H28" />
            <path className="about-approach-connectors__line" d="M28 25 H90" markerEnd="url(#about-arrow)" />
            <path className="about-approach-connectors__line" d="M28 50 H90" markerEnd="url(#about-arrow)" />
            <path className="about-approach-connectors__line" d="M28 75 H90" markerEnd="url(#about-arrow)" />
          </svg>

          <div className="about-approach-outcomes">
            {pageCopy.approachPanel.outcomes.map((outcome, index) => (
              <article
                className={
                  index === pageCopy.approachPanel.outcomes.length - 1
                    ? "about-approach-outcome about-approach-outcome--active"
                    : "about-approach-outcome"
                }
                key={outcome.title}
              >
                <span className="about-approach-outcome__icon" aria-hidden="true">
                  {renderProfileIcon(outcome.icon)}
                </span>
                <div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );

  const renderProcessPanel = () => (
    <div className="about-process-panel">
      <article className="about-process-flow">
        <p className="about-panel__kicker">{pageCopy.processPanel.title}</p>

        <div className="about-process-steps">
          {pageCopy.processPanel.steps.map((step) => (
            <article className="about-process-step" key={step.title}>
              <span className="about-process-step__icon" aria-hidden="true">
                {renderProfileIcon(step.icon)}
              </span>
              <strong>{step.number}</strong>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="about-process-work">
          <div>
            <p className="about-panel__kicker">{pageCopy.processPanel.workTitle}</p>
            <p>{pageCopy.processPanel.workText}</p>
          </div>

          <ul>
            {pageCopy.processPanel.workBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </article>

      <aside className="about-process-principles">
        <p className="about-panel__kicker">{pageCopy.processPanel.principlesTitle}</p>

        <div className="about-process-principles__list">
          {pageCopy.processPanel.principles.map((principle) => (
            <article className="about-process-principle" key={principle.title}>
              <span className="about-process-principle__icon" aria-hidden="true">
                {renderProfileIcon(principle.icon)}
              </span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            </article>
          ))}
        </div>

        <Link className="about-process-cta" to={routes.contact[lang]}>
          <span>
            <strong>{pageCopy.processPanel.projectTitle}</strong>
            <small>{pageCopy.processPanel.projectText}</small>
          </span>
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </aside>
    </div>
  );

  const renderEducationPanel = () => (
    <div className="about-education-panel">
      <article className="about-education-timeline">
        <p className="about-panel__kicker">{pageCopy.educationPanel.timelineTitle}</p>

        <div className="about-education-events">
          {pageCopy.educationPanel.timeline.map((item) => (
            <article className="about-education-event" key={`${item.date}-${item.title}`}>
              <span className="about-education-event__icon" aria-hidden="true">
                {renderEducationIcon(item.icon)}
              </span>
              <span className="about-education-event__date">{item.date}</span>
              <div className="about-education-event__body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <small>{item.tag}</small>
            </article>
          ))}
        </div>

        <div className="about-education-note">
          <span aria-hidden="true">✦</span>
          <p>{pageCopy.educationPanel.note}</p>
        </div>
      </article>

      <aside className="about-education-side">
        <section className="about-education-box">
          <header className="about-education-box__header">
            <p className="about-panel__kicker">{pageCopy.educationPanel.certificationsTitle}</p>
            <button type="button">{pageCopy.educationPanel.viewAll}</button>
          </header>

          <div className="about-certifications">
            {pageCopy.educationPanel.certifications.map((certification) => (
              <article className="about-certification" key={certification.title}>
                <span className="about-certification__icon" aria-hidden="true">
                  {renderEducationIcon(certification.icon)}
                </span>
                <div>
                  <h3>{certification.title}</h3>
                  <p>{certification.source}</p>
                  <small>
                    {certification.meta}
                    <CheckCircle2 aria-hidden="true" />
                  </small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-education-box">
          <header className="about-education-box__header">
            <p className="about-panel__kicker">{pageCopy.educationPanel.areasTitle}</p>
            <button type="button" onClick={() => setActiveId("strengths")}>
              {pageCopy.educationPanel.explore}
            </button>
          </header>

          <div className="about-study-areas">
            {pageCopy.educationPanel.areas.map((area) => (
              <span key={area.label} style={{ "--area-color": area.color }}>
                {renderEducationIcon(area.icon)}
                {area.label}
              </span>
            ))}
          </div>
        </section>

        <section className="about-education-box about-learning-box">
          <div className="about-learning-box__left">
            <div className="about-learning-box__main">
              <span className="about-learning-box__icon" aria-hidden="true">
                {renderProfileIcon("book")}
              </span>
              <div>
                <p className="about-panel__kicker">{pageCopy.educationPanel.learningTitle}</p>
                <p>{pageCopy.educationPanel.learningText}</p>
              </div>
              <strong>{pageCopy.educationPanel.progress}</strong>
            </div>

            <div className="about-learning-box__bar" aria-label={pageCopy.educationPanel.progressLabel}>
              <span />
            </div>
          </div>

          <div className="about-learning-box__topics">
            <p>{pageCopy.educationPanel.exploredTitle}</p>
            <ul>
              {pageCopy.educationPanel.explored.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <Link className="about-education-cta" to={routes.contact[lang]}>
          <span>{pageCopy.educationPanel.cta}</span>
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </aside>

      <div className="about-education-footer">
        <div className="about-education-note">
          <span aria-hidden="true">*</span>
          <p>{pageCopy.educationPanel.note}</p>
        </div>

        <Link className="about-education-cta" to={routes.contact[lang]}>
          <span>{pageCopy.educationPanel.cta}</span>
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="about-page">
      <Header />

      <main>
        <section className="about-hero">
          <div className="container about-hero__inner">
            <div className="about-hero__content">
              <p className="about-page__eyebrow hero-reveal hero-reveal--1">{pageCopy.eyebrow}</p>
              <h1 className="about-hero__title hero-reveal hero-reveal--2">{pageCopy.title}</h1>
              <p className="about-hero__description hero-reveal hero-reveal--3">{pageCopy.description}</p>

              <div className="about-hero__actions hero-reveal hero-reveal--4">
                <Link className="about-button about-button--primary" to={routes.projects[lang]}>
                  <span>{pageCopy.projectsCta}</span>
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>

            <AboutOrbitMesh
              sections={pageCopy.sections}
              activeId={activeId}
              onSelect={setActiveId}
              ariaLabel={pageCopy.orbitalAria}
              logoSrc={daLogoSinCaja}
            />
          </div>
        </section>

        <section className="about-panel-section">
          <div className="container">
            <div className="about-panel">
              <div className="about-panel__tabs" aria-label={pageCopy.panelLabel}>
                {pageCopy.sections.map((section) => (
                  <button
                    key={section.id}
                    className={
                      activeId === section.id
                        ? "about-panel__tab about-panel__tab--active"
                        : "about-panel__tab"
                    }
                    type="button"
                    onClick={() => setActiveId(section.id)}
                  >
                    <span>{section.number}</span>
                    {section.label}
                  </button>
                ))}
              </div>

              {activeId === "profile" && renderProfilePanel()}
              {activeId === "approach" && renderApproachPanel()}
              {activeId === "process" && renderProcessPanel()}
              {activeId === "education" && renderEducationPanel()}
              {activeId !== "profile" &&
                activeId !== "approach" &&
                activeId !== "process" &&
                activeId !== "education" &&
                renderToolsPanel()}
            </div>
          </div>
        </section>
      </main>

      <div className="container">
        <FooterDivider />
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
