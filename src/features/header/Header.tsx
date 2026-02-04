import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BurgerMenu from "@/features/header/BurgerMenu";
import "./Header.scss";

// --- NAVIGATION SECTIONS: SOURCE OF TRUTH FOR HEADER LINKS ---
const sections = [
  { id: "about", labelKey: "nav.about" },
  { id: "skills", labelKey: "nav.skills" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "faq", labelKey: "nav.faq" },
  { id: "contact", labelKey: "nav.contact" },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation("header");

  // --- STATE: TRACK SCROLL POSITION FOR STICKY/SCROLLED STYLING ---
  const [scrolled, setScrolled] = useState(false);

  // --- STATE: TRACK BURGER MENU OPEN/CLOSED ---
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  // --- CURRENT LANGUAGE FOR BUTTON ACTIVE STATE ---
  const currentLang = i18n.resolvedLanguage;

  // --- LANGUAGE SWITCHING LOGIC ---
  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // --- EFFECT: ADD/REMOVE SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // --- CLEANUP: REMOVE LISTENER ON UNMOUNT ---
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      {/* --- ACCESSIBILITY: HIDDEN TITLE --- */}
      <h1 className="visually-hidden">Header</h1>

      <div className="container">
        <div className="header__content">
          {/* --- NAVIGATION LINKS --- */}
          <nav className="header__nav">
            <ul className="header__links">
              {sections.map(({ id, labelKey }) => (
                <li key={id} className="header__item">
                  <a
                    href={`#${id}`}
                    className="header__link"
                    aria-hidden="true"
                  >
                    {t(labelKey).toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* --- LANGUAGE SWITCHER --- */}
          <div className="header__lang">
            <button
              className={`header__btn ${currentLang === "en" ? "header__btn--active" : ""}`}
              onClick={() => changeLang("en")}
            >
              EN
            </button>
            <button
              className={`header__btn ${currentLang === "es" ? "header__btn--active" : ""}`}
              onClick={() => changeLang("es")}
            >
              ES
            </button>
            <button
              className={`header__btn ${currentLang === "ru" ? "header__btn--active" : ""}`}
              onClick={() => changeLang("ru")}
            >
              RU
            </button>
          </div>
        </div>

        {/* --- BURGER MENU TOGGLE --- */}
        <div className="header__burger-menu">
          <button
            className={`header__burger-btn ${isBurgerOpen ? "is-open" : ""}`}
            onClick={() => setIsBurgerOpen((prev) => !prev)}
            aria-label={isBurgerOpen ? "Close menu" : "Open menu"}
          >
            <span className="header__burger-icon">
              <i />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* --- BURGER MENU COMPONENT --- */}
      <BurgerMenu
        isOpen={isBurgerOpen}
        onClose={() => setIsBurgerOpen(false)}
      />
    </header>
  );
};

export default Header;
