import daLogoSinCaja from "../../assets/logo/daLogoSinCaja.png";
import "./FooterDivider.css";

export default function FooterDivider() {
  return (
    <div className="footer-divider" aria-hidden="true">
      <span className="footer-divider__line" />

      <div className="footer-divider__center">
        <span className="footer-divider__diamonds">
          <i className="footer-divider__diamond footer-divider__diamond--small" />
          <i className="footer-divider__diamond footer-divider__diamond--large" />
          <i className="footer-divider__diamond footer-divider__diamond--small" />
        </span>

        <img src={daLogoSinCaja} alt="" />

        <span className="footer-divider__diamonds">
          <i className="footer-divider__diamond footer-divider__diamond--small" />
          <i className="footer-divider__diamond footer-divider__diamond--large" />
          <i className="footer-divider__diamond footer-divider__diamond--small" />
        </span>
      </div>

      <span className="footer-divider__line" />
    </div>
  );
}
