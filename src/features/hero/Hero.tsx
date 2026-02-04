import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import sprite from "@/assets/images/sprite.svg";
import { Logo } from "@/shared/ui/Logo";
import { animateHeroIntro, animateHeroScroll } from "./heroAnimation";
import { animateHeaderIntro } from "@/features/header/headerAnimation";
import "./Hero.scss";

interface HeroProps {
  startIntro: boolean; // triggers hero intro animation
  onAnimationComplete?: () => void; // callback after intro animation finishes
}

const Hero: React.FC<HeroProps> = ({ startIntro, onAnimationComplete }) => {
  // --- REF TO ENSURE INTRO PLAYS ONLY ONCE ---
  const hasPlayedIntro = useRef(false);

  useEffect(() => {
    if (!startIntro) return;
    if (hasPlayedIntro.current) return;

    hasPlayedIntro.current = true;

    // --- GSAP CONTEXT: SCOPES ANIMATIONS TO THIS COMPONENT ---
    const ctx = gsap.context(() => {
      animateHeroIntro(() => {
        // --- TRIGGER HEADER ANIMATION AFTER HERO INTRO ---
        animateHeaderIntro();

        // --- ENABLE SCROLL-BASED HERO EFFECTS ---
        animateHeroScroll();

        // --- EXECUTE OPTIONAL CALLBACK ---
        onAnimationComplete?.();
      });
    });

    // --- CLEANUP: REVERT ALL GSAP ANIMATIONS AND CONTEXTS ---
    return () => ctx.revert();
  }, [startIntro]);

  return (
    <section className="hero" id="hero">
      {/* --- ACCESSIBILITY: HIDDEN TITLE FOR SCREEN READERS --- */}
      <h1 className="visually-hidden">Hero section</h1>

      <div className="container">
        <div className="hero__content">
          <Logo className="hero__logo" />

          <div className="hero__author-logo">
            <svg className="hero__name" width={235} height={46}>
              <use xlinkHref={`${sprite}#logo-name`} />
            </svg>

            <svg className="hero__surname" width={364} height={53}>
              <use xlinkHref={`${sprite}#logo-surname`} />
            </svg>
          </div>

          <div className="hero__line" />
          <p className="hero__title">FRONTEND DEVELOPER</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

