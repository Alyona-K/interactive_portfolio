import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// --- LOCALE RESOURCES IMPORT ---
// Organized per language and feature namespace for modular translations
import headerEN from "./locales/en/header.json";
import headerES from "./locales/es/header.json";
import headerRU from "./locales/ru/header.json";

import aboutEN from "./locales/en/about.json";
import aboutES from "./locales/es/about.json";
import aboutRU from "./locales/ru/about.json";

import skillsEN from "./locales/en/skills.json";
import skillsES from "./locales/es/skills.json";
import skillsRU from "./locales/ru/skills.json";

import projectsEN from "./locales/en/projects.json";
import projectsES from "./locales/es/projects.json";
import projectsRU from "./locales/ru/projects.json";

import faqEN from "./locales/en/faq.json";
import faqES from "./locales/es/faq.json";
import faqRU from "./locales/ru/faq.json";

import footerEN from "./locales/en/footer.json";
import footerES from "./locales/es/footer.json";
import footerRU from "./locales/ru/footer.json";

import commonEN from "./locales/en/common.json";
import commonES from "./locales/es/common.json";
import commonRU from "./locales/ru/common.json";

// --- I18NEXT INITIALIZATION ---
// Uses language detector to auto-detect language from localStorage or browser settings
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // --- FALLBACK LANGUAGE --- 
    fallbackLng: "en",

    // --- NAMESPACES --- 
    ns: ["common", "header", "about", "skills", "projects", "faq", "footer"],
    defaultNS: "common",

    // --- RESOURCE MAPPING PER LANGUAGE AND NAMESPACE ---
    resources: {
      en: {
        common: commonEN,
        header: headerEN,
        about: aboutEN,
        skills: skillsEN,
        projects: projectsEN,
        faq: faqEN,
        footer: footerEN,
      },
      es: {
        common: commonES,
        header: headerES,
        about: aboutES,
        skills: skillsES,
        projects: projectsES,
        faq: faqES,
        footer: footerES,
      },
      ru: {
        common: commonRU,
        header: headerRU,
        about: aboutRU,
        skills: skillsRU,
        projects: projectsRU,
        faq: faqRU,
        footer: footerRU,
      },
    },

    // --- LANGUAGE DETECTION CONFIGURATION ---
    detection: {
      // First check localStorage, then browser navigator
      order: ["localStorage", "navigator"],
      caches: ["localStorage"], // persist user choice in localStorage
    },

    // --- INTERPOLATION SETTINGS ---
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

// --- EXPORT I18NEXT INSTANCE FOR APPLICATION USE ---
export default i18n;
