import React from "react";
import { useTranslation } from "react-i18next";
import profileImgFooter from "@/assets/images/profile-img-2.webp";
import sprite from "@/assets/images/sprite.svg";
import "./Footer.scss";

/**
 * Footer component
 * Renders personal branding, contact information, and social links.
 * Uses i18next for text translation and accessible SVG icons for socials.
 */
const Footer: React.FC = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="footer">
      <h1 className="visually-hidden">Footer</h1>

      <div className="container">
        <div className="footer__content">
          {/* --- SECTION TITLE TRANSLATED --- */}
          <h2 className="footer__heading">{t("title")}</h2>

          {/* --- PROFILE IMAGE: LAZY LOADING FOR PERFORMANCE --- */}
          <img
            src={profileImgFooter}
            alt="A woman with brown hair tied back, wearing a white shirt, looks softly towards the camera. The image has a circular, colorful light overlay."
            className="footer__photo"
            width={180}
            height={180}
            loading="lazy"
          />

          {/* --- CONTACT NAME --- */}
          <span className="footer__contacts-name">Alyona Kruchkova</span>

          {/* --- CONTACT INFORMATION --- */}
          <div className="footer__contacts">
            <span className="footer__contacts-text">
              alyona.k.frontend.dev@gmail.com
            </span>
            <span className="footer__contacts-text">+7 926 843 02 08</span>
          </div>

          {/* --- SOCIAL LINKS WITH SVG ICONS AND TOOLTIP FOR ACCESSIBILITY --- */}
          <div className="footer__socials">
            <a
              className="footer__link"
              href="http://www.linkedin.com/in/alyona-frontend-dev"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              data-tooltip={t("socialTooltips.linkedin")}
            >
              <svg className="footer__link-icon" width={30} height={30}>
                <use xlinkHref={`${sprite}#linkedin-icon`} />
              </svg>
            </a>
            <a
              className="footer__link"
              href="https://github.com/Alyona-K"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              data-tooltip={t("socialTooltips.github")}
            >
              <svg className="footer__link-icon" width={30} height={30}>
                <use xlinkHref={`${sprite}#github-icon`} />
              </svg>
            </a>
            <a
              className="footer__link"
              href="https://t.me/alyona_kruchkova"
              aria-label="Telegram"
              target="_blank"
              rel="noreferrer"
              data-tooltip={t("socialTooltips.telegram")}
            >
              <svg
                className="footer__link-icon"
                width="30"
                height="30"
                viewBox="0 0 32 32"
                role="img"
                aria-label="Telegram"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="tgGradient"
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="30"
                  >
                    <stop stopColor="#37BBFE" />
                    <stop offset="1" stopColor="#007DBB" />
                  </linearGradient>
                </defs>

                <circle cx="16" cy="16" r="14" fill="url(#tgGradient)" />

                <path
                  d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z"
                  fill="white"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
