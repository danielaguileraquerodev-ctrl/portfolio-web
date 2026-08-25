import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Calendar,
  Cookie,
  Database,
  FileText,
  Globe2,
  Home,
  Info,
  KeyRound,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Scale,
  Shield,
  UserRound,
} from "lucide-react";

import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import Header from "../../components/Header/Header";
import { routes } from "../../config/routes";
import "../Legal/LegalNoticePage.css";

const privacyItems = [
  {
    number: "01",
    icon: UserRound,
    title: "Responsable del tratamiento",
    summary: "Identificación del responsable de los datos personales.",
    detailTitle: "Resumen legal",
    detail: [
      "El responsable del tratamiento de los datos personales recopilados a través de este sitio web es Daniel Aguilera Quero, bajo la marca profesional Daniel Aguilera.",
      "Este sitio funciona como portfolio personal y profesional, orientado a mostrar proyectos, trayectoria, capacidades técnicas y vías de contacto.",
      "Para cualquier cuestión relacionada con privacidad o tratamiento de datos, puede utilizarse el correo de contacto indicado en esta página.",
    ],
    calloutTitle: "Dato clave",
    callout:
      "El sitio se utiliza como portfolio profesional y no como plataforma de registro de usuarios.",
  },
  {
    number: "02",
    icon: Database,
    title: "Datos personales recopilados",
    summary: "Información que puede facilitar el usuario al contactar.",
    detailTitle: "Datos tratados",
    detail: [
      "Este sitio puede recopilar datos personales facilitados voluntariamente por el usuario mediante correo electrónico, enlaces de contacto o futuros formularios.",
      "Los datos pueden incluir nombre, dirección de correo electrónico, contenido del mensaje y cualquier información adicional que el usuario decida comunicar.",
      "No se solicitan datos especialmente protegidos ni información innecesaria para responder consultas profesionales.",
    ],
    calloutTitle: "Datos mínimos",
    callout:
      "Solo se tratarán los datos necesarios para atender la comunicación recibida.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Finalidad del tratamiento",
    summary: "Motivos por los que se utilizan los datos personales.",
    detailTitle: "Finalidad",
    detail: [
      "Los datos personales se utilizarán para responder consultas, gestionar comunicaciones profesionales y atender posibles oportunidades laborales, colaboraciones o proyectos web.",
      "También podrán utilizarse para mantener una conversación iniciada voluntariamente por el usuario a través de los medios de contacto disponibles.",
      "No se utilizarán los datos para finalidades incompatibles con las descritas en esta política.",
    ],
    calloutTitle: "Finalidad",
    callout:
      "Los datos se usan unicamente para responder comunicaciones y gestionar contacto profesional.",
  },
  {
    number: "04",
    icon: Scale,
    title: "Base legal",
    summary: "Fundamento jurídico que permite el tratamiento.",
    detailTitle: "Base jurídica",
    detail: [
      "La base legal para el tratamiento de los datos es el consentimiento del usuario, otorgado al contactar voluntariamente a través del correo electrónico, enlaces de contacto o formularios disponibles.",
      "En determinados casos, el tratamiento también podrá basarse en la aplicación de medidas precontractuales cuando la comunicación esté relacionada con una oportunidad profesional, colaboración o proyecto.",
      "El usuario puede retirar su consentimiento en cualquier momento.",
    ],
  },
  {
    number: "05",
    icon: Calendar,
    title: "Conservación de los datos",
    summary: "Tiempo durante el que pueden mantenerse los datos.",
    detailTitle: "Conservación",
    detail: [
      "Los datos personales se conservarán durante el tiempo necesario para atender la consulta, mantener la comunicación profesional o gestionar la relación iniciada por el usuario.",
      "Una vez cumplida la finalidad, podrán eliminarse salvo que exista una obligación legal de conservación o un interés legítimo para mantener la información durante un plazo razonable.",
      "No se conservarán datos personales más tiempo del necesario.",
    ],
    calloutTitle: "Conservación",
    callout:
      "Los datos se mantienen solo mientras sean útiles para la finalidad por la que fueron facilitados.",
  },
  {
    number: "06",
    icon: Globe2,
    title: "Destinatarios y cesiones",
    summary: "Información sobre comunicación de datos a terceros.",
    detailTitle: "Terceros",
    detail: [
      "Con carácter general, los datos personales no serán cedidos a terceros.",
      "Podrán comunicarse únicamente cuando exista obligación legal o cuando sea necesario para el funcionamiento técnico del sitio mediante proveedores de servicios esenciales.",
      "En caso de utilizar herramientas externas como hosting, email, analítica o formularios, estas podrán tratar datos conforme a sus propias condiciones y políticas de privacidad.",
    ],
    calloutTitle: "Terceros",
    callout: "No se venden ni se comparten datos personales con fines comerciales.",
  },
  {
    number: "07",
    icon: KeyRound,
    title: "Derechos del usuario",
    summary: "Derechos reconocidos por la normativa de protección de datos.",
    detailTitle: "Derechos",
    detail: [
      "El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos, en los casos previstos por la normativa aplicable.",
      "También puede retirar el consentimiento otorgado o solicitar información sobre el tratamiento de sus datos personales.",
      "Para ejercer estos derechos, puede enviar una solicitud al correo de contacto indicado en esta página.",
    ],
    calloutTitle: "Derechos",
    callout:
      "Puedes solicitar acceso, correccion o eliminacion de tus datos escribiendo al email de contacto.",
  },
  {
    number: "08",
    icon: Cookie,
    title: "Cookies y analítica",
    summary: "Uso de cookies o herramientas de medición.",
    detailTitle: "Cookies",
    detail: [
      "Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento y, en caso de implementarse, herramientas de analítica para conocer el uso general de la web.",
      "Si se incorporan cookies no esenciales o servicios analíticos, se informará al usuario mediante la política de cookies correspondiente y, cuando proceda, se solicitará consentimiento.",
      "La configuración definitiva dependerá de las herramientas activas en la versión publicada del sitio.",
    ],
    calloutTitle: "Cookies",
    callout:
      "Si se activa analitica o cookies no esenciales, debera existir una Politica de Cookies especifica.",
  },
  {
    number: "09",
    icon: LockKeyhole,
    title: "Seguridad de la información",
    summary: "Medidas razonables de protección de datos.",
    detailTitle: "Seguridad",
    detail: [
      "Se aplicarán medidas razonables para proteger los datos personales frente a accesos no autorizados, pérdida, alteración o uso indebido.",
      "No obstante, ningún sistema conectado a internet puede garantizar una seguridad absoluta.",
      "El usuario debe evitar enviar información sensible o innecesaria a través de los medios de contacto disponibles.",
    ],
    calloutTitle: "Seguridad",
    callout: "No envies informacion sensible si no es necesaria para la consulta.",
  },
  {
    number: "10",
    icon: FileText,
    title: "Actualizaciones de esta política",
    summary: "Revisión y cambios en la política de privacidad.",
    detailTitle: "Actualización",
    detail: [
      "Esta Política de Privacidad podrá modificarse para adaptarse a cambios normativos, mejoras del sitio web, incorporación de formularios, nuevas herramientas de analítica o cambios en la forma de contacto.",
      "La versión vigente será la publicada en esta página.",
      "Última actualización: junio de 2026.",
    ],
    calloutTitle: "Actualización",
    callout: "Documento revisable según evolución del sitio y herramientas utilizadas.",
    date: "Junio de 2026",
  },
];

const privacyFacts = [
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
    icon: Shield,
    label: "Normativa",
    value: "RGPD / LOPDGDD",
  },
];

const privacyItemsEn = [
  {
    number: "01",
    icon: UserRound,
    title: "Data controller",
    summary: "Identification of the person responsible for personal data.",
    detailTitle: "Legal summary",
    detail: [
      "The controller of personal data collected through this website is Daniel Aguilera Quero, under the Daniel Aguilera professional brand.",
      "This website works as a personal and professional portfolio focused on showing projects, experience, technical skills and contact channels.",
      "For any question related to privacy or data processing, the contact email shown on this page may be used.",
    ],
    calloutTitle: "Key note",
    callout: "This site is a professional portfolio, not a user registration platform.",
  },
  {
    number: "02",
    icon: Database,
    title: "Personal data collected",
    summary: "Information that may be provided when contacting.",
    detailTitle: "Processed data",
    detail: [
      "This website may collect personal data voluntarily provided by users through email, contact links or future forms.",
      "Data may include name, email address, message content and any additional information the user chooses to share.",
      "Special category data or information unnecessary to answer professional enquiries is not requested.",
    ],
    calloutTitle: "Minimum data",
    callout: "Only data needed to handle the received communication will be processed.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Purpose of processing",
    summary: "Reasons why personal data is used.",
    detailTitle: "Purpose",
    detail: [
      "Personal data will be used to answer enquiries, manage professional communications and handle possible job opportunities, collaborations or web projects.",
      "It may also be used to continue a conversation voluntarily started through the available contact channels.",
      "Data will not be used for purposes incompatible with those described in this policy.",
    ],
    calloutTitle: "Purpose",
    callout: "Data is used only to answer communications and manage professional contact.",
  },
  {
    number: "04",
    icon: Scale,
    title: "Legal basis",
    summary: "Legal grounds that allow the processing.",
    detailTitle: "Legal basis",
    detail: [
      "The legal basis for processing is the user's consent, given when contacting voluntarily through email, contact links or available forms.",
      "In certain cases, processing may also be based on pre-contractual measures when the communication relates to a professional opportunity, collaboration or project.",
      "The user may withdraw consent at any time.",
    ],
  },
  {
    number: "05",
    icon: Calendar,
    title: "Data retention",
    summary: "How long data may be stored.",
    detailTitle: "Retention",
    detail: [
      "Personal data will be kept for the time needed to answer the enquiry, maintain professional communication or manage the relationship initiated by the user.",
      "Once the purpose has been fulfilled, data may be deleted unless a legal obligation or legitimate reason requires keeping it for a reasonable period.",
      "Personal data will not be kept longer than necessary.",
    ],
    calloutTitle: "Retention",
    callout: "Data is kept only while useful for the purpose for which it was provided.",
  },
  {
    number: "06",
    icon: Globe2,
    title: "Recipients and transfers",
    summary: "Information about sharing data with third parties.",
    detailTitle: "Third parties",
    detail: [
      "In general, personal data will not be transferred to third parties.",
      "Data may only be communicated when legally required or when necessary for the technical operation of the website through essential service providers.",
      "If external tools such as hosting, email, analytics or forms are used, they may process data according to their own terms and privacy policies.",
    ],
    calloutTitle: "Third parties",
    callout: "Personal data is not sold or shared for commercial purposes.",
  },
  {
    number: "07",
    icon: KeyRound,
    title: "User rights",
    summary: "Rights recognized by data protection regulations.",
    detailTitle: "Rights",
    detail: [
      "Users may exercise their rights of access, rectification, erasure, objection, restriction of processing and data portability where applicable.",
      "They may also withdraw consent or request information about how their personal data is processed.",
      "To exercise these rights, users may send a request to the contact email shown on this page.",
    ],
    calloutTitle: "Rights",
    callout: "You may request access, correction or deletion of your data by email.",
  },
  {
    number: "08",
    icon: Cookie,
    title: "Cookies and analytics",
    summary: "Use of cookies or measurement tools.",
    detailTitle: "Cookies",
    detail: [
      "This website may use technical cookies needed for its operation and, if implemented, analytics tools to understand general website usage.",
      "If non-essential cookies or analytics services are added, users will be informed through the Cookie Policy and consent will be requested when required.",
      "The final configuration will depend on the tools active in the published version of the site.",
    ],
    calloutTitle: "Cookies",
    callout: "If analytics or non-essential cookies are enabled, a specific Cookie Policy must exist.",
  },
  {
    number: "09",
    icon: LockKeyhole,
    title: "Information security",
    summary: "Reasonable data protection measures.",
    detailTitle: "Security",
    detail: [
      "Reasonable measures will be applied to protect personal data against unauthorized access, loss, alteration or misuse.",
      "However, no internet-connected system can guarantee absolute security.",
      "Users should avoid sending sensitive or unnecessary information through the available contact channels.",
    ],
    calloutTitle: "Security",
    callout: "Do not send sensitive information unless it is necessary for the enquiry.",
  },
  {
    number: "10",
    icon: FileText,
    title: "Updates to this policy",
    summary: "Review and changes to the privacy policy.",
    detailTitle: "Update",
    detail: [
      "This Privacy Policy may be updated to reflect legal changes, website improvements, new forms, analytics tools or contact method changes.",
      "The current version will be the one published on this page.",
      "Last update: June 2026.",
    ],
    calloutTitle: "Update",
    callout: "Document subject to review as the website and tools evolve.",
    date: "June 2026",
  },
];

const privacyFactsEn = [
  { icon: UserRound, label: "Controller", value: "Daniel Aguilera Quero" },
  { icon: Globe2, label: "Website", value: "danielaguilera.dev" },
  {
    icon: Mail,
    label: "Email",
    value: "hola@danielaguilera.dev",
    href: "mailto:hola@danielaguilera.dev",
  },
  { icon: Shield, label: "Regulation", value: "GDPR / LOPDGDD" },
];

const privacyCopy = {
  es: {
    titleMeta: "Política de privacidad — Daniel Aguilera",
    descriptionMeta:
      "Política de privacidad del portfolio de Daniel Aguilera. Información sobre tratamiento de datos personales, finalidades, derechos y contacto.",
    eyebrow: "Legal / Privacidad",
    title: "Política de privacidad",
    description:
      "Información sobre el tratamiento de datos personales, finalidades de uso y derechos asociados a este sitio web.",
    related: "Documentos relacionados",
    legal: "Aviso legal",
    legalText: "Condiciones generales de uso del sitio.",
    cookies: "Política de cookies",
    cookiesText: "Uso de cookies en este sitio web.",
    home: "Volver al inicio",
    homeText: "Regresar a la página principal.",
  },
  en: {
    titleMeta: "Privacy policy — Daniel Aguilera",
    descriptionMeta:
      "Privacy policy for Daniel Aguilera's portfolio. Information about personal data processing, purposes, rights and contact.",
    eyebrow: "Legal / Privacy",
    title: "Privacy policy",
    description:
      "Information about personal data processing, purposes of use and rights associated with this website.",
    related: "Related documents",
    legal: "Legal notice",
    legalText: "General terms of use of the website.",
    cookies: "Cookie policy",
    cookiesText: "Use of cookies on this website.",
    home: "Back to home",
    homeText: "Return to the main page.",
  },
};

function PrivacyPolicyPage({ lang = "es" }) {
  const pageLang = lang === "en" ? "en" : "es";
  const content = privacyCopy[pageLang];
  const currentItems = pageLang === "en" ? privacyItemsEn : privacyItems;
  const currentFacts = pageLang === "en" ? privacyFactsEn : privacyFacts;
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
                  <p>
                    {href ? <a href={href}>{value}</a> : value}
                  </p>
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
                      aria-controls={`privacy-detail-${number}`}
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
                      id={`privacy-detail-${number}`}
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
                <Scale aria-hidden="true" />
                <span>
                  <strong>{content.legal}</strong>
                  <small>{content.legalText}</small>
                </span>
                <em aria-hidden="true">-&gt;</em>
              </RouterLink>

              <RouterLink to={routes.cookies[pageLang]}>
                <Cookie aria-hidden="true" />
                <span>
                  <strong>{content.cookies}</strong>
                  <small>{content.cookiesText}</small>
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

export default PrivacyPolicyPage;
