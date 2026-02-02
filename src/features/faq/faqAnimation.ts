import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes horizontal infinite scroll animation for FAQ cards.
 * Duplicates cards on both sides for seamless looping.
 * Scroll direction and speed are tied to window scroll delta.
 *
 * @param trackRef - Ref to the horizontal track container
 * @param sectionRef - Ref to the parent section for viewport calculations
 * @returns cleanup function to remove scroll listener
 */
export const animateFaq = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  sectionRef: React.RefObject<HTMLElement | null>
) => {
  const track = trackRef.current;
  const section = sectionRef.current;
  if (!track || !section) return;

  const cards = Array.from(track.children);

  // --- DUPLICATE CARDS FOR SEAMLESS LOOP ---
  const leftClones = document.createDocumentFragment();
  cards.forEach((card) => leftClones.appendChild(card.cloneNode(true)));
  track.insertBefore(leftClones, track.firstChild);

  const rightClones = document.createDocumentFragment();
  cards.forEach((card) => rightClones.appendChild(card.cloneNode(true)));
  track.appendChild(rightClones);

  // --- TOTAL WIDTH OF ORIGINAL + CLONES ---
  const totalWidth = track.scrollWidth / 3;

  let prevScroll = window.scrollY;

  // --- SCROLL HANDLER FOR HORIZONTAL MOVEMENT ---
  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const delta = window.scrollY - prevScroll;
    prevScroll = window.scrollY;

    // Section fully above viewport and scrolling down => shift track right
    if (rect.bottom <= 0 && delta > 0) {
      track.scrollLeft -= delta * 0.6;
    }
    // Section visible in viewport => horizontal scroll proportional to delta
    else if (rect.top < window.innerHeight && rect.bottom > 0) {
      track.scrollLeft += delta * 0.6;
    }

    // --- INFINITE LOOP ADJUSTMENT ---
    if (track.scrollLeft >= totalWidth) track.scrollLeft -= totalWidth;
    if (track.scrollLeft < 0) track.scrollLeft += totalWidth;
  };

  window.addEventListener("scroll", onScroll);

  // --- CLEANUP LISTENER ---
  return () => window.removeEventListener("scroll", onScroll);
};


//--------------

// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { gsap } from "gsap";
// gsap.registerPlugin(ScrollTrigger);

// export const animateFaq = (
//   trackRef: React.RefObject<HTMLDivElement | null>,
//   sectionRef: React.RefObject<HTMLElement | null>
// ) => {
//   const track = trackRef.current;
//   const section = sectionRef.current;
//   if (!track || !section) return;

//   const cards = Array.from(track.children);

//   // Копии слева
//   const leftClones = document.createDocumentFragment();
//   cards.forEach((card) => leftClones.appendChild(card.cloneNode(true)));
//   track.insertBefore(leftClones, track.firstChild);

//   // Копии справа
//   const rightClones = document.createDocumentFragment();
//   cards.forEach((card) => rightClones.appendChild(card.cloneNode(true)));
//   track.appendChild(rightClones);

//   const totalWidth = track.scrollWidth / 3; // теперь “оригинал + левая + правая копия”

//   let prevScroll = window.scrollY;

//   const onScroll = () => {
//     const rect = section.getBoundingClientRect();
//     const delta = window.scrollY - prevScroll;
//     prevScroll = window.scrollY;

//     // секция полностью выше окна, скроллим вниз => сдвиг вправо
//     if (rect.bottom <= 0 && delta > 0) {
//       track.scrollLeft -= delta * 0.6; // движение вправо
//     }
//     // секция видна в окне => обычное движение по deltaY
//     else if (rect.top < window.innerHeight && rect.bottom > 0) {
//       track.scrollLeft += delta * 0.6; // движение влево
//     }

//     // бесшовность
//     if (track.scrollLeft >= totalWidth) track.scrollLeft -= totalWidth;
//     if (track.scrollLeft < 0) track.scrollLeft += totalWidth;
//   };

//   window.addEventListener("scroll", onScroll);
//   return () => window.removeEventListener("scroll", onScroll);
// };
