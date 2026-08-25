import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Calendar,
  Cookie,
  Globe2,
  Home,
  Info,
  Mail,
  Settings,
  Shield,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";

import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import Header from "../../components/Header/Header";
import { routes } from "../../config/routes";
import "../Legal/LegalNoticePage.css";

const cookieItems = [
  {
    number: "01",
    icon: Cookie,
    title: "Qué son las cookies",
    summary: "Descripción básica de estas tecnologías.",
    detailTitle: "Resumen",
    detail: [
      "Las cookies son pequeños archivos que se almacenan en el dispositivo del usuario cuando visita determinados sitios web.",
      "Permiten recordar información técnica, preferencias o datos de navegación para mejorar el funcionamiento y la experiencia del sitio.",
      "También pueden existir tecnologías similares con funciones equivalentes, como almacenamiento local o identificadores técnicos.",
    ],
    calloutTitle: "Dato clave",
    callout:
      "Las cookies no esenciales no deben activarse sin consentimiento previo del usuario.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Uso de cookies en este sitio",
    summary: "Finalidad general del uso de cookies.",
    detailTitle: "Uso actual",
    detail: [
      "Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento básico y, si se incorporan en la versión publicada, cookies analíticas para conocer el uso general de la web.",
      "Actualmente, al tratarse de una versión en desarrollo/local, la configuración definitiva de cookies puede cambiar antes de su publicación.",
      "En caso de incorporar herramientas no esenciales, se informará al usuario y se solicitará el consentimiento correspondiente cuando proceda.",
    ],
    calloutTitle: "Estado actual",
    callout:
      "La configuración definitiva dependerá de las herramientas activas en la versión publicada.",
  },
  {
    number: "03",
    icon: Shield,
    title: "Cookies técnicas necesarias",
    summary: "Cookies imprescindibles para el funcionamiento.",
    detailTitle: "Cookies técnicas",
    detail: [
      "Las cookies técnicas son aquellas necesarias para que el sitio funcione correctamente, permitir la navegación o recordar configuraciones esenciales.",
      "Estas cookies no requieren consentimiento cuando son estrictamente necesarias para prestar el servicio solicitado por el usuario.",
      "Su uso se limita a funciones básicas de seguridad, navegación o configuración técnica.",
    ],
  },
  {
    number: "04",
    icon: SlidersHorizontal,
    title: "Cookies analíticas",
    summary: "Medición de uso y estadísticas de navegación.",
    detailTitle: "Analítica",
    detail: [
      "Este sitio podría incorporar herramientas analíticas para conocer, de forma agregada, cómo se utiliza la web y mejorar su contenido, rendimiento y experiencia de usuario.",
      "Estas cookies solo se utilizarán si se implementan herramientas de analítica en la versión publicada.",
      "Cuando no sean estrictamente necesarias, requerirán consentimiento previo del usuario.",
    ],
    calloutTitle: "Analítica",
    callout:
      "Si se activa analítica, deberá indicarse la herramienta utilizada y su finalidad.",
  },
  {
    number: "05",
    icon: Globe2,
    title: "Cookies de terceros",
    summary: "Servicios externos que podrían instalar cookies.",
    detailTitle: "Terceros",
    detail: [
      "Algunos servicios externos enlazados o integrados en la web podrían utilizar sus propias cookies o tecnologías similares.",
      "Esto puede ocurrir, por ejemplo, al enlazar perfiles como LinkedIn, GitHub o al insertar servicios externos en futuras versiones.",
      "Daniel Aguilera Quero no controla directamente las cookies utilizadas por plataformas de terceros.",
    ],
    calloutTitle: "Terceros",
    callout:
      "Se recomienda revisar las políticas de privacidad y cookies de cada servicio externo.",
  },
  {
    number: "06",
    icon: UserRound,
    title: "Consentimiento del usuario",
    summary: "Aceptación, rechazo y configuración.",
    detailTitle: "Consentimiento",
    detail: [
      "Cuando se utilicen cookies no esenciales, el usuario deberá poder aceptar, rechazar o configurar su uso de forma clara.",
      "El consentimiento debe ser libre, informado y específico.",
      "El usuario podrá retirar el consentimiento otorgado en cualquier momento mediante el sistema de configuración habilitado en la web, si este se incorpora.",
    ],
    calloutTitle: "Control",
    callout:
      "Aceptar cookies no esenciales debe ser una decisión voluntaria y reversible.",
  },
  {
    number: "07",
    icon: SlidersHorizontal,
    title: "Cómo cambiar la configuración",
    summary: "Opciones para modificar o eliminar cookies.",
    detailTitle: "Configuración",
    detail: [
      "El usuario puede configurar o eliminar cookies desde las opciones de su navegador.",
      "Cada navegador permite bloquear, eliminar o limitar el uso de cookies desde su panel de privacidad o configuración.",
      "Si el sitio incorpora un panel de gestión de cookies, también podrá usarse para modificar las preferencias previamente seleccionadas.",
    ],
    calloutTitle: "Configuración",
    callout:
      "El rechazo o eliminación de algunas cookies puede afectar a determinadas funcionalidades no esenciales.",
  },
  {
    number: "08",
    icon: Calendar,
    title: "Actualización de la política",
    summary: "Cambios en herramientas o configuración.",
    detailTitle: "Actualización",
    detail: [
      "Esta Política de Cookies podrá actualizarse cuando cambien las herramientas utilizadas, se incorporen servicios de analítica, se modifique el sistema de consentimiento o sea necesario adaptarla a cambios normativos.",
      "La versión vigente será siempre la publicada en esta página.",
      "Última actualización: junio de 2026.",
    ],
    calloutTitle: "Actualización",
    callout:
      "Documento revisable según evolución del sitio y herramientas utilizadas.",
    date: "Junio de 2026",
  },
  {
    number: "09",
    icon: Mail,
    title: "Contacto",
    summary: "Consultas relacionadas con cookies.",
    detailTitle: "Contacto",
    detail: [
      "Para cualquier consulta relacionada con esta Política de Cookies o con el uso de tecnologías similares en este sitio web, puede utilizarse el correo de contacto indicado en esta página.",
      "También puede consultarse la Política de Privacidad para conocer más información sobre el tratamiento de datos personales.",
    ],
    calloutTitle: "Contacto",
    callout: "Email de referencia: hola@danielaguilera.dev",
  },
];

const cookieFacts = [
  {
    icon: UserRound,
    label: "Responsable",
    value: "Daniel Aguilera Quero",
  },
  {
    icon: Globe2,
    label: "Sitio web",
    value: "danielaguilera.dev",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hola@danielaguilera.dev",
    href: "mailto:hola@danielaguilera.dev",
  },
  {
    icon: Settings,
    label: "Estado",
    value: "Configuración pendiente",
  },
];

const cookieItemsEn = [
  {
    number: "01",
    icon: Cookie,
    title: "What cookies are",
    summary: "Basic description of these technologies.",
    detailTitle: "Summary",
    detail: [
      "Cookies are small files stored on the user's device when visiting certain websites.",
      "They can remember technical information, preferences or browsing data to improve website operation and experience.",
      "Similar technologies with equivalent functions may also exist, such as local storage or technical identifiers.",
    ],
    calloutTitle: "Key note",
    callout: "Non-essential cookies should not be activated without prior user consent.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Use of cookies on this site",
    summary: "General purpose of cookie use.",
    detailTitle: "Current use",
    detail: [
      "This site may use technical cookies required for basic operation and, if included in the published version, analytics cookies to understand general website usage.",
      "As this is currently a development/local version, the final cookie configuration may change before publication.",
      "If non-essential tools are added, users will be informed and consent will be requested when appropriate.",
    ],
    calloutTitle: "Current status",
    callout: "The final configuration will depend on the tools active in the published version.",
  },
  {
    number: "03",
    icon: Shield,
    title: "Necessary technical cookies",
    summary: "Cookies required for the website to work.",
    detailTitle: "Technical cookies",
    detail: [
      "Technical cookies are those required for the site to work correctly, allow browsing or remember essential settings.",
      "These cookies do not require consent when they are strictly necessary to provide the service requested by the user.",
      "Their use is limited to basic security, browsing or technical configuration functions.",
    ],
  },
  {
    number: "04",
    icon: SlidersHorizontal,
    title: "Analytics cookies",
    summary: "Usage measurement and browsing statistics.",
    detailTitle: "Analytics",
    detail: [
      "This site may include analytics tools to understand, in aggregate form, how the website is used and to improve content, performance and user experience.",
      "These cookies will only be used if analytics tools are implemented in the published version.",
      "When they are not strictly necessary, prior user consent will be required.",
    ],
    calloutTitle: "Analytics",
    callout: "If analytics is enabled, the tool used and its purpose must be indicated.",
  },
  {
    number: "05",
    icon: Globe2,
    title: "Third-party cookies",
    summary: "External services that may install cookies.",
    detailTitle: "Third parties",
    detail: [
      "Some external services linked or integrated into the website may use their own cookies or similar technologies.",
      "This may happen, for example, when linking to profiles such as LinkedIn or GitHub, or when embedding external services in future versions.",
      "Daniel Aguilera Quero does not directly control cookies used by third-party platforms.",
    ],
    calloutTitle: "Third parties",
    callout: "Users are encouraged to review each external service's privacy and cookie policies.",
  },
  {
    number: "06",
    icon: UserRound,
    title: "User consent",
    summary: "Acceptance, rejection and configuration.",
    detailTitle: "Consent",
    detail: [
      "When non-essential cookies are used, users must be able to accept, reject or configure their use clearly.",
      "Consent must be freely given, informed and specific.",
      "Users may withdraw consent at any time through the cookie settings system enabled on the website, if included.",
    ],
    calloutTitle: "Control",
    callout: "Accepting non-essential cookies must be a voluntary and reversible decision.",
  },
  {
    number: "07",
    icon: SlidersHorizontal,
    title: "How to change settings",
    summary: "Options to modify or delete cookies.",
    detailTitle: "Settings",
    detail: [
      "Users can configure or delete cookies from their browser options.",
      "Each browser allows cookies to be blocked, deleted or limited from its privacy or settings panel.",
      "If the site includes a cookie management panel, it may also be used to modify previously selected preferences.",
    ],
    calloutTitle: "Settings",
    callout: "Rejecting or deleting some cookies may affect certain non-essential features.",
  },
  {
    number: "08",
    icon: Calendar,
    title: "Policy updates",
    summary: "Changes in tools or configuration.",
    detailTitle: "Update",
    detail: [
      "This Cookie Policy may be updated when tools change, analytics services are added, the consent system changes or legal adaptation is required.",
      "The current version will always be the one published on this page.",
      "Last update: June 2026.",
    ],
    calloutTitle: "Update",
    callout: "Document subject to review as the website and tools evolve.",
    date: "June 2026",
  },
  {
    number: "09",
    icon: Mail,
    title: "Contact",
    summary: "Questions related to cookies.",
    detailTitle: "Contact",
    detail: [
      "For any question related to this Cookie Policy or the use of similar technologies on this website, the contact email shown on this page may be used.",
      "The Privacy Policy may also be consulted for more information about personal data processing.",
    ],
    calloutTitle: "Contact",
    callout: "Reference email: hola@danielaguilera.dev",
  },
];

const cookieFactsEn = [
  { icon: UserRound, label: "Controller", value: "Daniel Aguilera Quero" },
  { icon: Globe2, label: "Website", value: "danielaguilera.dev" },
  {
    icon: Mail,
    label: "Email",
    value: "hola@danielaguilera.dev",
    href: "mailto:hola@danielaguilera.dev",
  },
  { icon: Settings, label: "Status", value: "Configuration pending" },
];

const cookieCopy = {
  es: {
    titleMeta: "Política de cookies — Daniel Aguilera",
    descriptionMeta:
      "Política de cookies del portfolio de Daniel Aguilera. Información sobre uso de cookies, consentimiento, configuración y tecnologías similares.",
    eyebrow: "Legal / Cookies",
    title: "Política de cookies",
    description:
      "Información sobre el uso de cookies, tecnologías similares y opciones de configuración en este sitio web.",
    related: "Documentos relacionados",
    legal: "Aviso legal",
    legalText: "Condiciones generales de uso del sitio.",
    privacy: "Política de privacidad",
    privacyText: "Tratamiento de datos personales.",
    home: "Volver al inicio",
    homeText: "Regresar a la página principal.",
  },
  en: {
    titleMeta: "Cookie policy — Daniel Aguilera",
    descriptionMeta:
      "Cookie policy for Daniel Aguilera's portfolio. Information about cookie use, consent, settings and similar technologies.",
    eyebrow: "Legal / Cookies",
    title: "Cookie policy",
    description:
      "Information about the use of cookies, similar technologies and settings options on this website.",
    related: "Related documents",
    legal: "Legal notice",
    legalText: "General terms of use of the website.",
    privacy: "Privacy policy",
    privacyText: "Personal data processing.",
    home: "Back to home",
    homeText: "Return to the main page.",
  },
};

function CookiePolicyPage({ lang = "es" }) {
  const pageLang = lang === "en" ? "en" : "es";
  const content = cookieCopy[pageLang];
  const currentItems = pageLang === "en" ? cookieItemsEn : cookieItems;
  const currentFacts = pageLang === "en" ? cookieFactsEn : cookieFacts;
  const [openItem, setOpenItem] = useState("01");

  useEffect(() => {
    document.title = content.titleMeta;

    let description = document.querySelector('meta[name="description"]');

    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }

    description.setAttribute(
      "content",
      content.descriptionMeta
    );
  }, [content.descriptionMeta, content.titleMeta]);

  const handleToggle = (number) => {
    setOpenItem((current) => (current === number ? null : number));
  };

  return (
    <main className="site legal-page">
      <Header />

      <section className="legal-hero" id="inicio">
        <div className="container">
          <p className="legal-page__eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
      </section>

      <section className="legal-summary">
        <div className="container">
          <div className="legal-summary__panel">
            {currentFacts.map(({ icon: Icon, label, value, href }) => (
              <article className="legal-summary__item" key={label}>
                <Icon className="legal-summary__icon" aria-hidden="true" />
                <div>
                  <span>{label}</span>
                  <p>{href ? <a href={href}>{value}</a> : value}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="legal-list">
        <div className="container">
          <div className="legal-list__items">
            {currentItems.map(
              ({
                number,
                icon: Icon,
                title,
                summary,
                detailTitle,
                detail,
                calloutTitle,
                callout,
                date,
              }) => {
                const isOpen = openItem === number;

                return (
                  <article
                    className={
                      isOpen
                        ? "legal-list__item legal-list__item--open"
                        : "legal-list__item"
                    }
                    key={number}
                  >
                    <button
                      className="legal-list__trigger"
                      type="button"
                      onClick={() => handleToggle(number)}
                      aria-expanded={isOpen}
                      aria-controls={`cookies-detail-${number}`}
                    >
                      <span className="legal-list__number">{number}</span>

                      <span className="legal-list__icon" aria-hidden="true">
                        <Icon />
                      </span>

                      <span className="legal-list__copy">
                        <span className="legal-list__title">{title}</span>
                        <span className="legal-list__summary">{summary}</span>
                      </span>

                      {date ? (
                        <span className="legal-list__date">{date}</span>
                      ) : null}

                      <span className="legal-list__plus" aria-hidden="true">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>

                    <div
                      className={
                        isOpen
                          ? "legal-list__detail legal-list__detail--open"
                          : "legal-list__detail"
                      }
                      id={`cookies-detail-${number}`}
                      aria-hidden={!isOpen}
                    >
                      <div className="legal-list__detail-inner">
                        <div className="legal-list__detail-main">
                          <span>{detailTitle}</span>
                          {detail.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>

                        {callout ? (
                          <aside className="legal-list__callout">
                            <Info aria-hidden="true" />
                            <div>
                              <strong>{calloutTitle}</strong>
                              <p>{callout}</p>
                            </div>
                          </aside>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>
      </section>

      <section className="legal-related">
        <div className="container">
          <div className="legal-related__panel">
            <p className="legal-page__eyebrow">{content.related}</p>

            <div className="legal-related__links">
              <RouterLink to={routes.legal[pageLang]}>
                <Shield aria-hidden="true" />
                <span>
                  <strong>{content.legal}</strong>
                  <small>{content.legalText}</small>
                </span>
                <em aria-hidden="true">-&gt;</em>
              </RouterLink>

              <RouterLink to={routes.privacy[pageLang]}>
                <UserRound aria-hidden="true" />
                <span>
                  <strong>{content.privacy}</strong>
                  <small>{content.privacyText}</small>
                </span>
                <em aria-hidden="true">-&gt;</em>
              </RouterLink>

              <RouterLink to={routes.home[pageLang]}>
                <Home aria-hidden="true" />
                <span>
                  <strong>{content.home}</strong>
                  <small>{content.homeText}</small>
                </span>
                <em aria-hidden="true">-&gt;</em>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <FooterDivider />
      </div>

      <Footer />
    </main>
  );
}

export default CookiePolicyPage;
