export const routes = {
  home: {
    es: "/",
    en: "/en",
  },
  projects: {
    es: "/proyectos",
    en: "/en/projects",
  },
  about: {
    es: "/sobre-mi",
    en: "/en/about",
  },
  contact: {
    es: "/contacto",
    en: "/en/contact",
  },
  privacy: {
    es: "/politica-de-privacidad",
    en: "/en/privacy-policy",
  },
  legal: {
    es: "/aviso-legal",
    en: "/en/legal-notice",
  },
  cookies: {
    es: "/politica-de-cookies",
    en: "/en/cookie-policy",
  },
  notFound: {
    es: "/404",
    en: "/en/404",
  },
};

export const pageAnchors = {
  top: {
    es: "#inicio",
    en: "#home",
  },
};

export function getLanguageFromPath(pathname) {
  return pathname.startsWith("/en") ? "en" : "es";
}

export function getCurrentSection(pathname) {
  if (pathname === routes.home.es || pathname === routes.home.en) {
    return "home";
  }

  if (pathname === routes.projects.es || pathname === routes.projects.en) {
    return "projects";
  }

  if (pathname === routes.about.es || pathname === routes.about.en) {
    return "about";
  }

  if (pathname === routes.contact.es || pathname === routes.contact.en) {
    return "contact";
  }

  if (pathname === routes.privacy.es || pathname === routes.privacy.en) {
    return "privacy";
  }

  if (pathname === routes.legal.es || pathname === routes.legal.en) {
    return "legal";
  }

  if (pathname === routes.cookies.es || pathname === routes.cookies.en) {
    return "cookies";
  }

  return "notFound";
}
