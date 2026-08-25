import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Calendar,
  Cookie,
  Copyright,
  FileCheck2,
  Globe2,
  Home,
  Info,
  Link as LinkIcon,
  LockKeyhole,
  Mail,
  MapPin,
  Scale,
  Shield,
  UserRound,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import FooterDivider from "../../components/FooterDivider/FooterDivider";
import Header from "../../components/Header/Header";
import { routes } from "../../config/routes";
import "./LegalNoticePage.css";

const legalItems = [
  {
    number: "01",
    icon: UserRound,
    title: "Identificación del titular",
    summary: "Datos identificativos del responsable de este sitio web.",
    detailTitle: "Resumen legal",
    detail: [
      "El presente sitio web pertenece a Daniel Aguilera Quero y funciona como portfolio profesional bajo la marca personal Daniel Aguilera.",
      "Su finalidad es mostrar proyectos, experiencia, capacidades técnicas y vías de contacto relacionadas con su actividad como desarrollador web.",
      "Para cualquier consulta relacionada con el contenido publicado, puede utilizar los medios de contacto habilitados en esta web.",
    ],
    calloutTitle: "Dato clave",
    callout: "No se incluyen DNI, domicilio completo ni información fiscal privada.",
  },
  {
    number: "02",
    icon: Globe2,
    title: "Objeto del sitio web",
    summary: "Finalidad del sitio y tipo de información ofrecida.",
    detailTitle: "Resumen legal",
    detail: [
      "Este portfolio tiene carácter exclusivamente informativo y profesional.",
      "Su objetivo es presentar proyectos desarrollados, exponer conocimientos y experiencia, facilitar el contacto profesional y mostrar el enfoque de trabajo del titular.",
      "La información publicada puede actualizarse, ampliarse o modificarse para mantener su precisión y utilidad.",
    ],
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Condiciones de uso",
    summary: "Normas básicas de acceso y utilización del sitio.",
    detailTitle: "Uso responsable",
    detail: [
      "La navegación por este sitio implica la aceptación de un uso adecuado y respetuoso de los contenidos publicados.",
      "El usuario se compromete a no utilizar esta web para fines ilícitos ni para realizar acciones que puedan perjudicar su funcionamiento, disponibilidad o seguridad.",
      "Queda prohibida cualquier utilización del contenido que vulnere la legislación vigente o los derechos del titular.",
    ],
    calloutTitle: "Uso responsable",
    callout:
      "El uso de la web debe respetar su finalidad profesional y la integridad de la información publicada.",
  },
  {
    number: "04",
    icon: Copyright,
    title: "Propiedad intelectual",
    summary: "Titularidad de contenidos y restricciones de uso.",
    detailTitle: "Derechos sobre el contenido",
    detail: [
      "Los textos, diseños, elementos gráficos, estructura, código desarrollado específicamente para este portfolio y demás contenidos originales son titularidad de Daniel Aguilera Quero, salvo que se indique lo contrario.",
      "Queda prohibida su reproducción, distribución o modificación sin autorización previa, excepto en los supuestos legalmente permitidos.",
      "Las marcas, logotipos o referencias de terceros pertenecen a sus respectivos propietarios.",
    ],
    calloutTitle: "Derechos",
    callout:
      "La utilización puntual de tecnologías, herramientas o referencias externas no implica cesión de derechos sobre los contenidos propios.",
  },
  {
    number: "05",
    icon: Shield,
    title: "Responsabilidad",
    summary: "Limitación de responsabilidad sobre información y funcionamiento.",
    detailTitle: "Alcance legal",
    detail: [
      "Se realizan esfuerzos razonables para mantener la información actualizada y el correcto funcionamiento del sitio.",
      "No obstante, no se garantiza la ausencia absoluta de errores, interrupciones temporales o incidencias técnicas derivadas de factores ajenos al titular.",
      "El uso de la información publicada será responsabilidad exclusiva del usuario.",
    ],
  },
  {
    number: "06",
    icon: LinkIcon,
    title: "Enlaces externos",
    summary: "Condiciones relativas a enlaces a sitios de terceros.",
    detailTitle: "Referencias externas",
    detail: [
      "Este sitio puede incluir enlaces a plataformas externas como GitHub, LinkedIn u otros recursos complementarios.",
      "El titular no ejerce control sobre dichos sitios ni se responsabiliza de sus contenidos, políticas o condiciones de uso.",
      "La inclusión de estos enlaces tiene una finalidad meramente informativa y de referencia profesional.",
    ],
    calloutTitle: "Enlaces externos",
    callout: "Se recomienda revisar las políticas propias de cada servicio externo visitado.",
  },
  {
    number: "07",
    icon: LockKeyhole,
    title: "Protección de datos",
    summary: "Información sobre tratamiento de datos personales.",
    detailTitle: "Privacidad",
    detail: [
      "El tratamiento de los datos personales obtenidos a través de esta web se realizará conforme a la normativa vigente en materia de protección de datos.",
      "La información detallada sobre recogida, finalidad y ejercicio de derechos puede consultarse en la Política de Privacidad correspondiente.",
      "Solo se solicitarán los datos estrictamente necesarios para atender consultas o comunicaciones voluntarias realizadas por el usuario.",
    ],
    calloutTitle: "Privacidad",
    callout: "La información completa debe estar enlazada desde la Política de Privacidad.",
  },
  {
    number: "08",
    icon: Scale,
    title: "Legislación aplicable",
    summary: "Ley aplicable y jurisdicción competente.",
    detailTitle: "Marco legal",
    detail: [
      "El presente Aviso Legal se rige por la legislación española.",
      "Cualquier controversia derivada del acceso o utilización del sitio web se someterá a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable.",
      "Se procurará resolver cualquier incidencia de forma amistosa antes de acudir a vías judiciales.",
    ],
  },
  {
    number: "09",
    icon: Calendar,
    title: "Última actualización",
    summary: "Fecha de última revisión de este aviso legal.",
    detailTitle: "Actualización",
    detail: [
      "Este Aviso Legal podrá revisarse periódicamente para adaptarlo a cambios normativos, mejoras funcionales del sitio o modificaciones en la actividad profesional desarrollada.",
      "Última actualización: junio de 2026.",
    ],
    calloutTitle: "Actualización",
    callout: "Documento revisable según evolución del sitio y necesidades legales.",
    date: "Junio de 2026",
  },
];

const facts = [
  {
    icon: UserRound,
    label: "Titular",
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
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "España",
  },
];

const legalItemsEn = [
  {
    number: "01",
    icon: UserRound,
    title: "Owner identification",
    summary: "Identification details of the person responsible for this website.",
    detailTitle: "Legal summary",
    detail: [
      "This website belongs to Daniel Aguilera Quero and operates as a professional portfolio under the Daniel Aguilera personal brand.",
      "Its purpose is to present projects, experience, technical skills and contact channels related to his activity as a web developer.",
      "For any question related to the published content, the contact channels enabled on this website may be used.",
    ],
    calloutTitle: "Key note",
    callout: "No ID number, full address or private tax information is included.",
  },
  {
    number: "02",
    icon: Globe2,
    title: "Purpose of the website",
    summary: "Purpose of the site and type of information provided.",
    detailTitle: "Legal summary",
    detail: [
      "This portfolio is exclusively informational and professional in nature.",
      "Its purpose is to present completed projects, show knowledge and experience, facilitate professional contact and explain the owner's working approach.",
      "The published information may be updated, expanded or modified to keep it accurate and useful.",
    ],
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Terms of use",
    summary: "Basic rules for accessing and using the website.",
    detailTitle: "Responsible use",
    detail: [
      "Browsing this website implies acceptance of appropriate and respectful use of the published content.",
      "Users agree not to use this website for unlawful purposes or to perform actions that may harm its operation, availability or security.",
      "Any use of the content that infringes applicable law or the owner's rights is prohibited.",
    ],
    calloutTitle: "Responsible use",
    callout:
      "Use of the website must respect its professional purpose and the integrity of the published information.",
  },
  {
    number: "04",
    icon: Copyright,
    title: "Intellectual property",
    summary: "Ownership of content and restrictions on use.",
    detailTitle: "Content rights",
    detail: [
      "Texts, designs, graphic elements, structure, code specifically developed for this portfolio and other original content belong to Daniel Aguilera Quero unless otherwise stated.",
      "Reproduction, distribution or modification without prior authorization is prohibited, except where legally permitted.",
      "Third-party brands, logos or references belong to their respective owners.",
    ],
    calloutTitle: "Rights",
    callout:
      "The occasional use of external technologies, tools or references does not imply any transfer of rights over original content.",
  },
  {
    number: "05",
    icon: Shield,
    title: "Liability",
    summary: "Limitation of liability regarding information and operation.",
    detailTitle: "Legal scope",
    detail: [
      "Reasonable efforts are made to keep the information updated and the website working properly.",
      "However, the absence of errors, temporary interruptions or technical issues caused by external factors cannot be guaranteed.",
      "Use of the published information is the sole responsibility of the user.",
    ],
  },
  {
    number: "06",
    icon: LinkIcon,
    title: "External links",
    summary: "Conditions regarding links to third-party websites.",
    detailTitle: "External references",
    detail: [
      "This website may include links to external platforms such as GitHub, LinkedIn or other complementary resources.",
      "The owner does not control those websites and is not responsible for their content, policies or terms of use.",
      "These links are included for informational and professional reference purposes only.",
    ],
    calloutTitle: "External links",
    callout: "Users are encouraged to review each external service's own policies.",
  },
  {
    number: "07",
    icon: LockKeyhole,
    title: "Data protection",
    summary: "Information about personal data processing.",
    detailTitle: "Privacy",
    detail: [
      "Personal data obtained through this website will be processed in accordance with applicable data protection regulations.",
      "Detailed information about collection, purpose and rights can be found in the corresponding Privacy Policy.",
      "Only data strictly necessary to answer voluntary enquiries or communications will be requested.",
    ],
    calloutTitle: "Privacy",
    callout: "Full information should be linked from the Privacy Policy.",
  },
  {
    number: "08",
    icon: Scale,
    title: "Applicable law",
    summary: "Applicable law and competent jurisdiction.",
    detailTitle: "Legal framework",
    detail: [
      "This Legal Notice is governed by Spanish law.",
      "Any dispute arising from access to or use of the website will be submitted to the courts and tribunals that are competent under applicable regulations.",
      "Any issue will preferably be resolved amicably before resorting to legal proceedings.",
    ],
  },
  {
    number: "09",
    icon: Calendar,
    title: "Last update",
    summary: "Date of the latest review of this legal notice.",
    detailTitle: "Update",
    detail: [
      "This Legal Notice may be reviewed periodically to adapt it to regulatory changes, functional improvements or changes in the professional activity carried out.",
      "Last update: June 2026.",
    ],
    calloutTitle: "Update",
    callout: "Document subject to review as the website and legal needs evolve.",
    date: "June 2026",
  },
];

const factsEn = [
  { icon: UserRound, label: "Owner", value: "Daniel Aguilera Quero" },
  { icon: Globe2, label: "Website", value: "danielaguilera.dev" },
  { icon: Mail, label: "Email", value: "hola@danielaguilera.dev" },
  { icon: MapPin, label: "Location", value: "Spain" },
];

const legalCopy = {
  es: {
    eyebrow: "Legal / Aviso legal",
    title: "Aviso legal",
    description:
      "InformaciÃ³n sobre el titular, condiciones de uso y responsabilidades asociadas a este sitio web.",
    related: "Documentos relacionados",
    privacy: "PolÃ­tica de privacidad",
    privacyText: "CÃ³mo tratamos tus datos personales.",
    cookies: "PolÃ­tica de cookies",
    cookiesText: "Uso de cookies en este sitio web.",
    home: "Volver al inicio",
    homeText: "Regresar a la pÃ¡gina principal.",
  },
  en: {
    eyebrow: "Legal / Legal notice",
    title: "Legal notice",
    description:
      "Information about the website owner, terms of use and responsibilities associated with this website.",
    related: "Related documents",
    privacy: "Privacy policy",
    privacyText: "How personal data is handled.",
    cookies: "Cookie policy",
    cookiesText: "Use of cookies on this website.",
    home: "Back to home",
    homeText: "Return to the main page.",
  },
};

function LegalNoticePage({ lang = "es" }) {
  const pageLang = lang === "en" ? "en" : "es";
  const content = legalCopy[pageLang];
  const currentItems = pageLang === "en" ? legalItemsEn : legalItems;
  const currentFacts = pageLang === "en" ? factsEn : facts;
  const [openItem, setOpenItem] = useState("01");

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
            {currentFacts.map(({ icon: Icon, label, value }) => (
              <article className="legal-summary__item" key={label}>
                <Icon className="legal-summary__icon" aria-hidden="true" />
                <div>
                  <span>{label}</span>
                  <p>{value}</p>
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
                      aria-controls={`legal-detail-${number}`}
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
                      id={`legal-detail-${number}`}
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
              <RouterLink to={routes.privacy[pageLang]}>
                <Shield aria-hidden="true" />
                <span>
                  <strong>{content.privacy}</strong>
                  <small>{content.privacyText}</small>
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

export default LegalNoticePage;
