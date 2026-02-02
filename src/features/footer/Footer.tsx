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
              <svg className="footer__link-icon" width={30} height={30}>
                <use xlinkHref={`${sprite}#telegram-icon`} />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



//--------------

// import React from "react";
// import { useTranslation } from "react-i18next";
// import profileImgFooter from "@/assets/images/profile-img-2.webp";
// import sprite from "@/assets/images/sprite.svg";
// import "./Footer.scss";

// const Footer: React.FC = () => {
//    const { t } = useTranslation("footer");
//   return (
//     <footer className="footer">
//       <h1 className="visually-hidden">Footer</h1>
//       <div className="container">
//         <div className="footer__content">
//           <h2 className="footer__heading">{t("title")}</h2>
//           <img
//             src={profileImgFooter}
//             alt="A woman with brown hair tied back, wearing a white shirt, looks softly towards the camera. The image has a circular, colorful light overlay."
//             className="footer__photo"
//             width={180}
//             height={180}
//             loading="lazy"
//           />
//           <span className="footer__contacts-name">Alyona Kruchkova</span>
//           <div className="footer__contacts">
//             <span className="footer__contacts-text">
//               alyona.k.frontend.dev@gmail.com
//             </span> 
//             <span className="footer__contacts-text">+7 926 843 02 08</span>
//           </div>
//           <div className="footer__socials">
//             <a className="footer__link" href="http://www.linkedin.com/in/alyona-frontend-dev" aria-label="LinkedIn" target="_blank" rel="noreferrer" data-tooltip={t("socialTooltips.linkedin")}>
//               <svg className="footer__link-icon" width={30} height={30}>
//                 <use xlinkHref={`${sprite}#linkedin-icon`} />
//               </svg>
//             </a>
//             <a className="footer__link" href="https://github.com/Alyona-K" aria-label="GitHub" target="_blank" rel="noreferrer" data-tooltip={t("socialTooltips.github")}>
//               <svg className="footer__link-icon" width={30} height={30}>
//                 <use xlinkHref={`${sprite}#github-icon`} />
//               </svg>
//             </a>
//             <a className="footer__link" href="https://t.me/alyona_kruchkova" aria-label="Telegram" target="_blank" rel="noreferrer" data-tooltip={t("socialTooltips.telegram")}>
//               <svg className="footer__link-icon" width={30} height={30}>
//                 <use xlinkHref={`${sprite}#telegram-icon`} />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


            {/* <a className="footer__link" href="https://www.instagram.com/dreamerindesign" target="_blank" rel="noreferrer" data-tooltip={t("socialTooltips.instagram")}>
              <svg className="footer__link-icon" width={30} height={30}>
                <use xlinkHref={`${sprite}#instagram-icon`} />
              </svg>
            </a> */}
