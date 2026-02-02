import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import profileDesktop from "@/assets/images/about/profile-img.webp";
import profileDesktop2x from "@/assets/images/about/profile-img@2x.webp";
import profileTablet from "@/assets/images/about/profile-img--tablet.webp";
import profileTablet2x from "@/assets/images/about/profile-img--tablet@2x.webp";
import profileMobile from "@/assets/images/about/profile-img--mobile.webp";
import profileMobile2x from "@/assets/images/about/profile-img--mobile@2x.webp";
import { animateAbout } from "./aboutAnimation";
import DownloadDropdown from "@/shared/ui/DownloadDropdown";
import "./About.scss";

const About: React.FC = () => {
  const { t, i18n } = useTranslation("about");
  const { t: tCommon } = useTranslation("common");
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // --- INITIALIZE SCROLL ANIMATIONS ---
  // Animates About section on mount and re-applies when language changes
  // Cleanup function returned to remove GSAP matchMedia and ScrollTrigger effects
  useEffect(() => {
    const cleanup = animateAbout(sectionRef.current);
    return cleanup;
  }, [i18n.language]);

  return (
    <section className="about scroll-section" id="about" ref={sectionRef}>
      <h1 className="visually-hidden">About section</h1>
      <div className="container">
        <div className="about__inner">
          <div className="about__profile">
            <picture>
              {/* RESPONSIVE PROFILE IMAGES */}
              {/* Mobile */}
              <source
                media="(max-width: 767px)"
                srcSet={`
                  ${profileMobile} 1x,
                  ${profileMobile2x} 2x
                `}
              />

              {/* Tablet */}
              <source
                media="(max-width: 1279px)"
                srcSet={`
                  ${profileTablet} 1x,
                  ${profileTablet2x} 2x
                `}
              />

              {/* Desktop */}
              <img
                src={profileDesktop}
                srcSet={`${profileDesktop2x} 2x`}
                alt={t("photoAlt")}
                className="about__photo"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="about__description">
            <h2 className="about__title">{t("title")}</h2>
            <div className="about__text-content">
              <p className="about__text">{t("text.p1")}</p>
              <p className="about__text">{t("text.p2")}</p>
              <p className="about__text">{t("text.p3")}</p>
              <p className="about__text">{t("text.p4")}</p>
            </div>
          </div>

          {/* CV DOWNLOAD DROPDOWN */}
          {/* Provides language-specific CV download options */}
          <DownloadDropdown
            className="about__btn"
            label={tCommon("buttons.downloadCV")}
            options={[
              {
                label: tCommon("lang.en"),
                href: "/docs/cv-alyona-kruchkova-frontend-react-ts-en.pdf",
              },
              {
                label: tCommon("lang.es"),
                href: "/docs/cv-alyona-kruchkova-frontend-react-ts-es.pdf",
              },
                            {
                label: tCommon("lang.ru"),
                href: "/docs/cv-alyona-kruchkova-frontend-react-ts-ru.pdf",
              },
            ]}
          />
        </div>
      </div>

      {/* Background element for GSAP animations */}
      <div className="about__bg" />
    </section>
  );
};

export default About;


//------------

// import React, { useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import profileDesktop from "@/assets/images/about/profile-img.webp";
// import profileDesktop2x from "@/assets/images/about/profile-img@2x.webp";

// import profileTablet from "@/assets/images/about/profile-img--tablet.webp";
// import profileTablet2x from "@/assets/images/about/profile-img--tablet@2x.webp";

// import profileMobile from "@/assets/images/about/profile-img--mobile.webp";
// import profileMobile2x from "@/assets/images/about/profile-img--mobile@2x.webp";
// import { animateAbout } from "./aboutAnimation";
// import DownloadDropdown from "@/shared/ui/DownloadDropdown";
// import "./About.scss";

// const About: React.FC = () => {
//   const { t, i18n } = useTranslation("about");
//   const { t: tCommon } = useTranslation("common");
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const cleanup = animateAbout(sectionRef.current);
//     return cleanup;
//   }, [i18n.language]);

//   return (
//     <section className="about scroll-section" id="about" ref={sectionRef}>
//       <h1 className="visually-hidden">About section</h1>
//       <div className="container">
//         <div className="about__inner">
//           <div className="about__profile">
//             <picture>
//               {/* MOBILE */}
//               <source
//                 media="(max-width: 767px)"
//                 srcSet={`
//         ${profileMobile} 1x,
//         ${profileMobile2x} 2x
//       `}
//               />

//               {/* TABLET */}
//               <source
//                 media="(max-width: 1279px)"
//                 srcSet={`
//         ${profileTablet} 1x,
//         ${profileTablet2x} 2x
//       `}
//               />

//               {/* DESKTOP */}
//               <img
//                 src={profileDesktop}
//                 srcSet={`${profileDesktop2x} 2x`}
//                 alt={t("photoAlt")}
//                 className="about__photo"
//                 loading="lazy"
//                 decoding="async"
//               />
//             </picture>
//           </div>
//           <div className="about__description">
//             <h2 className="about__title">{t("title")}</h2>
//             <div className="about__text-content">
//               <p className="about__text">{t("text.p1")}</p>
//               <p className="about__text">{t("text.p2")}</p>
//               <p className="about__text">{t("text.p3")}</p>
//               <p className="about__text">{t("text.p4")}</p>
//             </div>
//           </div>
//           <DownloadDropdown
//             className="about__btn"
//             label={tCommon("buttons.downloadCV")}
//             options={[
//               {
//                 label: tCommon("lang.en"),
//                 href: "/docs/cv-alyona-kruchkova-frontend-react-ts-en.pdf",
//               },
//               {
//                 label: tCommon("lang.es"),
//                 href: "/docs/cv-alyona-kruchkova-frontend-react-ts-es.pdf",
//               },
//             ]}
//           />
//         </div>
//       </div>
//       <div className="about__bg" />
//     </section>
//   );
// };

// export default About;
