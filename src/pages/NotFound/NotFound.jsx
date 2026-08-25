import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import Header from "../../components/Header/Header";
import notFoundImage from "../../assets/images/404.png";
import { getLanguageFromPath, routes } from "../../config/routes";
import "./NotFound.css";

const copy = {
  es: {
    label: "PAGINA NO ENCONTRADA",
    title: "No he encontrado esta ruta.",
    text: [
      "Parece que la pagina que buscas no existe o ha cambiado de ubicacion.",
      "Puedes volver al inicio o explorar algunos de mis proyectos.",
    ],
    home: "Volver al inicio",
    projects: "Ver proyectos",
    imageAlt: "Composicion visual premium para pagina no encontrada",
  },
  en: {
    label: "PAGE NOT FOUND",
    title: "I could not find this route.",
    text: [
      "It looks like the page you are looking for does not exist or has moved.",
      "You can return home or explore some of my projects.",
    ],
    home: "Back to home",
    projects: "View projects",
    imageAlt: "Premium visual composition for a page not found",
  },
};

function NotFound() {
  const location = useLocation();
  const lang = getLanguageFromPath(location.pathname);
  const pageCopy = copy[lang];

  return (
    <main className="site not-found-page">
      <Header />

      <section
        className="not-found"
        aria-labelledby="not-found-title"
        style={{ "--not-found-image": `url(${notFoundImage})` }}
      >
        <div className="not-found__background" aria-hidden="true" />
        <div className="not-found__overlay" aria-hidden="true" />

        <div className="container not-found__inner">
          <div className="not-found__content">
            <p className="not-found__eyebrow">{pageCopy.label}</p>
            <h1 className="not-found__code" id="not-found-title">
              404
            </h1>
            <h2 className="not-found__title">{pageCopy.title}</h2>
            <div className="not-found__text">
              {pageCopy.text.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="not-found__actions" aria-label={pageCopy.label}>
              <Link className="not-found__button not-found__button--primary" to={routes.home[lang]}>
                <span>{pageCopy.home}</span>
                <ArrowRight className="not-found__button-icon" aria-hidden="true" />
              </Link>

              <Link className="not-found__button not-found__button--secondary" to={routes.projects[lang]}>
                <span>{pageCopy.projects}</span>
                <ArrowUpRight className="not-found__button-icon" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container not-found__divider">
        <FooterDivider />
      </div>

      <Footer />
    </main>
  );
}

export default NotFound;
