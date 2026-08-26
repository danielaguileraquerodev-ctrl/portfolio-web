import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  buildProjectDetailPath,
  getCurrentSection,
  getLanguageFromPath,
  routes,
} from "../../config/routes";
import daLogo from "../../assets/logo/logo.png";
import "./Header.css";

const labels = {
  es: {
    brandAria: "Daniel Aguilera - Inicio",
    claim: "Desarrollo web con estructura, claridad y detalle.",
    navAria: "Navegación principal",
    langAria: "Selector de idioma",
    home: "Inicio",
    projects: "Proyectos",
    about: "Sobre mí",
    contact: "Contacto",
  },
  en: {
    brandAria: "Daniel Aguilera - Home",
    claim: "Web development with structure, clarity and detail.",
    navAria: "Main navigation",
    langAria: "Language selector",
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
};

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const lang = getLanguageFromPath(location.pathname);
  const section = getCurrentSection(location.pathname);

  const goHomeTop = (event) => {
    event.preventDefault();

    navigate(routes.home[lang]);

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 80);
  };

  const switchLanguage = (targetLang) => {
    if (targetLang === lang) return;

    if (section === "projectDetail") {
      const projectId = location.pathname.split("/").pop();
      navigate(buildProjectDetailPath(targetLang, projectId));
    } else {
      navigate(routes[section][targetLang]);
    }

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 80);
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link
          to={routes.home[lang]}
          className="site-header__brand"
          aria-label={labels[lang].brandAria}
          onClick={goHomeTop}
        >
          <span className="site-header__mark" aria-hidden="true">
            <img className="site-header__logo" src={daLogo} alt="" />
          </span>

          <span className="site-header__brand-text">
            <span className="site-header__name">Daniel Aguilera</span>
            <span className="site-header__claim">{labels[lang].claim}</span>
          </span>
        </Link>

        <nav className="site-header__nav" aria-label={labels[lang].navAria}>
          <NavLink
            to={routes.home[lang]}
            end
            className={({ isActive }) =>
              isActive
                ? "site-header__link site-header__link--active"
                : "site-header__link"
            }
            onClick={goHomeTop}
          >
            {labels[lang].home}
          </NavLink>

          <NavLink
            to={routes.projects[lang]}
            className={({ isActive }) =>
              isActive
                ? "site-header__link site-header__link--active"
                : "site-header__link"
            }
          >
            {labels[lang].projects}
          </NavLink>

          <NavLink
            to={routes.about[lang]}
            className={({ isActive }) =>
              isActive
                ? "site-header__link site-header__link--active"
                : "site-header__link"
            }
          >
            {labels[lang].about}
          </NavLink>

          <NavLink
            to={routes.contact[lang]}
            className={({ isActive }) =>
              isActive
                ? "site-header__link site-header__link--active"
                : "site-header__link"
            }
          >
            {labels[lang].contact}
          </NavLink>
        </nav>

        <div className="site-header__lang" aria-label={labels[lang].langAria}>
          <button
            className={
              lang === "es"
                ? "site-header__lang-button site-header__lang-button--active"
                : "site-header__lang-button"
            }
            type="button"
            onClick={() => switchLanguage("es")}
          >
            ES
          </button>

          <span className="site-header__lang-separator">/</span>

          <button
            className={
              lang === "en"
                ? "site-header__lang-button site-header__lang-button--active"
                : "site-header__lang-button"
            }
            type="button"
            onClick={() => switchLanguage("en")}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
