import { Link, useLocation } from "react-router-dom";
import {
  getLanguageFromPath,
  pageAnchors,
  routes,
} from "../../config/routes";
import daLogo from "../../assets/logo/logo.png";
import "./Footer.css";

const copy = {
  es: {
    logoAria: "Volver al inicio",
    claim: "Desarrollo web con estructura, claridad y detalle.",
    copyright:
      "© 2026 Daniel Aguilera Quero. Todos los derechos reservados.",
    legalAria: "Enlaces legales",
    privacy: "Política de privacidad",
    cookies: "Polí­tica de cookies",
    legal: "Aviso legal",
    backTopAria: "Volver arriba",
  },
  en: {
    logoAria: "Back to home",
    claim: "Web development with structure, clarity and detail.",
    copyright: "© 2026 Daniel Aguilera Quero. All rights reserved.",
    legalAria: "Legal links",
    privacy: "Privacy policy",
    cookies: "Cookie policy",
    legal: "Legal notice",
    backTopAria: "Back to top",
  },
};

function Footer() {
  const location = useLocation();
  const lang = getLanguageFromPath(location.pathname);
  const footerCopy = copy[lang];
  const topHref = pageAnchors.top[lang];

  const handleBackTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" id="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a
            className="footer__logo-link"
            href={topHref}
            aria-label={footerCopy.logoAria}
          >
            <img className="footer__logo" src={daLogo} alt="Daniel Aguilera" />
          </a>

          <div>
            <p className="footer__name">Daniel Aguilera</p>
            <p className="footer__claim">{footerCopy.claim}</p>
          </div>
        </div>

        <p className="footer__copyright">{footerCopy.copyright}</p>

        <nav className="footer__legal" aria-label={footerCopy.legalAria}>
          <Link to={routes.privacy[lang]}>{footerCopy.privacy}</Link>
          <Link to={routes.cookies[lang]}>{footerCopy.cookies}</Link>
          <Link to={routes.legal[lang]}>{footerCopy.legal}</Link>

          <a
            className="footer__back-top"
            href={topHref}
            onClick={handleBackTop}
            aria-label={footerCopy.backTopAria}
          >
            ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
