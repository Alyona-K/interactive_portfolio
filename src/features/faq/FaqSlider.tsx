import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { faqData } from "@/entities/faq/faqData";
import { FaqCard } from "@/shared/ui/FaqCard";
import { animateFaq } from "./faqAnimation";
import "./FaqSlider.scss";

/**
 * FaqSlider component
 * Displays a horizontal scrollable list of FAQ cards.
 * Implements drag-to-scroll interaction and GSAP animations.
 * Re-initializes animations when language changes to update content dynamically.
 */
const FaqSlider: React.FC = () => {
  const { t, i18n } = useTranslation("faq");

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // --- DRAG SCROLL STATE ---
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // --- DRAG START ---
  // Stores initial cursor position and scroll offset
  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };

  // --- DRAG END / CANCEL ---
  const handleMouseUp = () => (isDown.current = false);
  const handleMouseLeave = () => (isDown.current = false);

  // --- DRAG MOVE ---
  // Adjusts scrollLeft based on cursor movement with a multiplier for smoother drag
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // multiplier adjusts drag sensitivity
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // --- GSAP ANIMATION INIT ---
  // Initializes scroll-based animations for FAQ cards
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Preserve current scroll position during animation re-initialization
    const savedScroll = slider.scrollLeft;

    const cleanup = animateFaq(sliderRef, sectionRef);

    // Restore scroll position after initialization
    slider.scrollLeft = savedScroll;

    return cleanup;
  }, [i18n.language]); // re-run on language change to update card text

  return (
    <section className="faq-slider scroll-section" ref={sectionRef} id="faq">
      <h1 className="visually-hidden">FAQ section</h1>

      {/* --- SECTION TITLE --- */}
      <h2 className="faq-slider__title">{t("section.sectionTitle")}</h2>

      {/* --- HORIZONTAL SCROLL TRACK --- */}
      <div
        className="faq-slider__track"
        key={i18n.language} // force re-render to update language-specific text
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {faqData.map((item, index) => (
          <FaqCard
            key={item.id}
            index={index}
            {...item}
            currentLang={i18n.language} // ensure cards render correctly for current language
          />
        ))}
      </div>
    </section>
  );
};

export default FaqSlider;


//---------

// import React, { useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { faqData } from "@/entities/faq/faqData";
// import { FaqCard } from "@/shared/ui/FaqCard";
// import { animateFaq } from "./faqAnimation";
// import "./FaqSlider.scss";

// const FaqSlider: React.FC = () => {
//   const { t, i18n } = useTranslation("faq");

//   const sliderRef = useRef<HTMLDivElement | null>(null);
//   const sectionRef = useRef<HTMLElement | null>(null);

//   // ==== DRAG SCROLL ====
//   const isDown = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     isDown.current = true;
//     startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
//     scrollLeft.current = sliderRef.current?.scrollLeft || 0;
//   };
//   const handleMouseUp = () => (isDown.current = false);
//   const handleMouseLeave = () => (isDown.current = false);
//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDown.current || !sliderRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - sliderRef.current.offsetLeft;
//     const walk = (x - startX.current) * 1.2;
//     sliderRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   // ==== GSAP ANIMATION INIT ====

//    useEffect(() => {
//       const slider = sliderRef.current;
//       if (!slider) return;

//       // сохраняем скролл
//       const savedScroll = slider.scrollLeft;

//       // запускаем анимацию
//       const cleanup = animateFaq(sliderRef, sectionRef);

//       // восстанавливаем scrollLeft после ре-рендера
//       slider.scrollLeft = savedScroll;

//       return cleanup;
//     }, [i18n.language]);

//   return (
//     <section className="faq-slider scroll-section" ref={sectionRef} id="faq">
//       <h1 className="visually-hidden">FAQ section</h1>
//       <h2 className="faq-slider__title">{t("section.sectionTitle")}</h2>

//       <div
//         className="faq-slider__track"
//         key={i18n.language}
//         ref={sliderRef}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseLeave}
//         onMouseMove={handleMouseMove}
//       >
//         {faqData.map((item, index) => (
//           <FaqCard
//             key={item.id} 
//             index={index}
//             {...item}
//             currentLang={i18n.language} // <-- чтобы было понятно для эффекта
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FaqSlider;

//------------

// import React, { useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { faqData } from "@/entities/faq/faqData";
// import { FaqCard } from "@/shared/ui/FaqCard";
// import { animateFaq } from "./faqAnimation";
// import "./FaqSlider.scss";

// const FaqSlider: React.FC = () => {
//   const { i18n } = useTranslation();

//   const sliderRef = useRef<HTMLDivElement | null>(null);
//   const sectionRef = useRef<HTMLElement | null>(null);

//   // ==== DRAG SCROLL ====
//   const isDown = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     isDown.current = true;
//     startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
//     scrollLeft.current = sliderRef.current?.scrollLeft || 0;
//   };

//   const handleMouseUp = () => (isDown.current = false);
//   const handleMouseLeave = () => (isDown.current = false);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDown.current || !sliderRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - sliderRef.current.offsetLeft;
//     const walk = (x - startX.current) * 1.2;
//     sliderRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   // ==== GSAP ANIMATION INIT ====
//   useEffect(() => {
//     animateFaq(sliderRef, sectionRef);
//   }, []);

//   return (
//     <section className="faq-slider" ref={sectionRef} id="faq">
//       <h2 className="faq-slider__title">FAQ</h2>

//       <div
//         className="faq-slider__track"
//         ref={sliderRef}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseLeave}
//         onMouseMove={handleMouseMove}
//       >
//         {faqData.map((item, index) => (
//           <FaqCard
//             key={item.id}
//             index={index}
//             {...item}
//             // currentLang={i18n.language}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FaqSlider;
