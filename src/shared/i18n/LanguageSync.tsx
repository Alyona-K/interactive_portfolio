import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * --- COMPONENT RESPONSIBILITY ---
 * Synchronizes the HTML <html> `lang` attribute with the current i18next language.
 * Ensures accessibility, SEO, and correct screen reader behavior across language changes.
 */
export const LanguageSync = () => {
  const { i18n } = useTranslation();

  // --- SIDE EFFECT: UPDATE DOCUMENT LANG ATTRIBUTE ON LANGUAGE CHANGE ---
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // --- RENDERLESS COMPONENT: ONLY EFFECTS ---
  return null;
};

