import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * --- ANIMATE SKILLS SECTION ---
 *
 * Handles scroll-based animation for skill accordions.
 * Breakpoint-dependent behavior:
 *   - Mobile (<768px): reset transform, no animation
 *   - Tablet (768–1439px): animate items in two columns
 *   - Desktop (1440px+): animate items as cards centered around the middle
 *
 * Uses GSAP matchMedia to handle responsive scroll animations.
 */
export const animateSkills = () => {
  const container = document.querySelector<HTMLDivElement>(
    ".skills__accordions",
  );
  if (!container) return;

  // --- REGISTER GSAP PLUGIN ---
  gsap.registerPlugin(ScrollTrigger);

  const items = Array.from(container.children) as HTMLElement[];
  const mm = gsap.matchMedia();

  // --- MOBILE: RESET TRANSFORM, NO ANIMATION ---
  mm.add("(max-width: 767px)", () => {
    gsap.set(items, { clearProps: "transform" });
  });

  // --- TABLET: TWO-COLUMN SCROLL ANIMATION ---
  mm.add("(min-width: 768px) and (max-width: 1439px)", () => {
    animateTabletColumns(container, items);
  });

  // --- DESKTOP: CENTERED CARD SCROLL ANIMATION ---
  mm.add("(min-width: 1440px)", () => {
    animateDesktopCards(container, items);
  });

  // --- RETURN CLEANUP FUNCTION FOR UNMOUNT ---
  return () => mm.revert();
};

/**
 * --- TABLET ANIMATION ---
 *
 * Animates items in two columns with offset movement on scroll.
 * Divides scroll into three phases: entry, center, exit.
 */
const animateTabletColumns = (container: HTMLElement, items: HTMLElement[]) => {
  const initialOffset = 60;
  const exitOffset = 60;
  const gap = 0;

  // Set initial X positions based on column (even/odd)
  gsap.set(items, {
    x: (i) => (i % 2 === 0 ? -initialOffset : initialOffset),
  });

  gsap.to(items, {
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      end: "top+=400 top+=200",
      scrub: true,
      // --- UPDATE EACH ITEM ON SCROLL ---
      onUpdate: (self) => {
        const p = self.progress;

        items.forEach((item, i) => {
          const dir = i % 2 === 0 ? -1 : 1;

          const startX = dir * initialOffset;
          const centerX = dir * gap;
          const endX = dir * exitOffset;

          let x: number;

          // Interpolate X based on scroll progress
          if (p <= 0.4) {
            x = gsap.utils.interpolate(startX, centerX, p / 0.4);
          } else if (p <= 0.6) {
            x = centerX;
          } else {
            x = gsap.utils.interpolate(centerX, endX, (p - 0.6) / 0.4);
          }

          gsap.set(item, { x });
        });
      },
    },
  });
};

/**
 * --- DESKTOP ANIMATION ---
 *
 * Animates items as horizontally centered cards on scroll.
 * Uses container width to calculate offsets.
 * Scroll divided into entry, center, exit phases.
 */
const animateDesktopCards = (container: HTMLElement, items: HTMLElement[]) => {
  const containerWidth = container.offsetWidth;
  const centerIndex = (items.length - 1) / 2;

  const initialOffset = containerWidth * 0.06;
  const exitOffset = containerWidth * 0.06;
  const gap = 0;

  // Set initial positions relative to center
  gsap.set(items, {
    x: (i) => (i - centerIndex) * initialOffset,
  });

  gsap.to(items, {
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      end: "top+=500 top+=200",
      scrub: true,
      // --- UPDATE CARD POSITIONS ON SCROLL ---
      onUpdate: (self) => {
        const p = self.progress;

        items.forEach((item, i) => {
          const base = i - centerIndex;

          const startX = base * initialOffset;
          const centerX = base * gap;
          const endX = base * exitOffset;

          let x: number;

          // Interpolate X based on scroll phase
          if (p <= 0.4) {
            x = gsap.utils.interpolate(startX, centerX, p / 0.4);
          } else if (p <= 0.6) {
            x = centerX;
          } else {
            x = gsap.utils.interpolate(centerX, endX, (p - 0.6) / 0.4);
          }

          gsap.set(item, { x });
        });
      },
    },
  });
};
