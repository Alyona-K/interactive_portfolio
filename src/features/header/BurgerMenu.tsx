import { useTranslation } from "react-i18next";
import { Logo } from "@/shared/ui/Logo";
import "./BurgerMenu.scss";

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- NAVIGATION SECTIONS: SOURCE OF TRUTH FOR BURGER MENU LINKS ---
const sections = [
  { id: "about", labelKey: "nav.about" },
  { id: "skills", labelKey: "nav.skills" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "faq", labelKey: "nav.faq" },
  { id: "contact", labelKey: "nav.contact" },
];

/**
 * BurgerMenu component
 * Responsible for rendering a slide-in mobile menu with navigation links,
 * language switcher, and logo.
 *
 * Handles language switching via i18next and closes itself on link click.
 */
const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation("header");

  // --- CURRENT LANGUAGE STATE FOR ACTIVE BUTTON HIGHLIGHT ---
  const currentLang = i18n.resolvedLanguage;

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    // --- WRAPPER: ADD OPEN STATE CLASS FOR ANIMATION/STYLING ---
    <div className={`burger ${isOpen ? "burger--open" : ""}`}>
      {/* --- NAVIGATION LINKS: CLOSE MENU ON CLICK --- */}
      <nav className="burger__nav">
        <ul className="burger__links-list">
          {sections.map(({ id, labelKey }) => (
            <li className="burger__links-item" key={id}>
              <a className="burger__link" href={`#${id}`} onClick={onClose}>
                {t(labelKey).toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* --- LANGUAGE SWITCHER: ACTIVE STATE DEPENDS ON CURRENT LANGUAGE --- */}
      <div className="burger__lang">
        <button
          className={`burger__lang-btn ${currentLang === "en" ? "burger__lang-btn--active" : ""}`}
          onClick={() => changeLang("en")}
        >
          EN
        </button>
        <button
          className={`burger__lang-btn ${currentLang === "es" ? "burger__lang-btn--active" : ""}`}
          onClick={() => changeLang("es")}
        >
          ES
        </button>
        <button
          className={`burger__lang-btn ${currentLang === "ru" ? "burger__lang-btn--active" : ""}`}
          onClick={() => changeLang("ru")}
        >
          RU
        </button>
      </div>

      {/* --- LOGO: STATIC BRANDING INSIDE MENU --- */}
      <div className="burger__logo">
        <Logo />
      </div>
    </div>
  );
};

export default BurgerMenu;

//----------

// import { useTranslation } from "react-i18next";
// import { Logo } from "@/shared/ui/Logo";
// import "./BurgerMenu.scss";

// interface BurgerMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const sections = [
//   { id: "about", labelKey: "nav.about" },
//   { id: "skills", labelKey: "nav.skills" },
//   { id: "projects", labelKey: "nav.projects" },
//   { id: "faq", labelKey: "nav.faq" },
//   { id: "contact", labelKey: "nav.contact" },
// ];

// const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
//   const { t, i18n } = useTranslation("header");

//   const currentLang = i18n.resolvedLanguage;

//   const changeLang = (lang: string) => {
//     i18n.changeLanguage(lang);
//   };

//   return (
//     <div className={`burger ${isOpen ? "burger--open" : ""}`}>
//       <nav className="burger__nav">
//         <ul className="burger__links-list">
//           {sections.map(({ id, labelKey }) => (
//             <li className="burger__links-item" key={id}>
//               <a className="burger__link" href={`#${id}`} onClick={onClose}>
//                 {t(labelKey).toUpperCase()}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className="burger__lang">
//         <button
//           className={`burger__lang-btn ${currentLang === "en" ? "burger__lang-btn--active" : ""}`}
//           onClick={() => changeLang("en")}
//         >
//           EN
//         </button>
//         <button
//           className={`burger__lang-btn ${currentLang === "es" ? "burger__lang-btn--active" : ""}`}
//           onClick={() => changeLang("es")}
//         >
//           ES
//         </button>
//         <button
//           className={`burger__lang-btn ${currentLang === "ru" ? "burger__lang-btn--active" : ""}`}
//           onClick={() => changeLang("ru")}
//         >
//           RU
//         </button>
//       </div>

//       <div className="burger__logo">
//         <Logo />
//       </div>
//     </div>
//   );
// };

// export default BurgerMenu;
