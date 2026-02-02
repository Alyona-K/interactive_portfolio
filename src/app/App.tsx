import { lazy, Suspense, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LanguageSync } from "@/shared/i18n/LanguageSync";
import { ROUTES } from "@/shared/config/routes";
import { useLoader } from "@/shared/hooks/useLoader";
import Header from "@/features/header/Header";
import Footer from "@/features/footer/Footer";

// --- LAZY PAGES ---
// Code-splitting to reduce initial bundle size
const LazyProjectPage = lazy(() => import("@/pages/project-page"));
const LazyNotFoundPage = lazy(() => import("@/pages/404"));

// --- SHARED UI ---
import { Loader } from "@/shared/ui/Loader";

/* --------------------------------------------------
   APP COMPONENT
   Handles routing, lazy-loading, and global layout.
   Controls loader and conditional footer rendering.
-------------------------------------------------- */
const App = () => {
  const location = useLocation();
  const isLoaderDone = useLoader(1500); // Custom hook to handle initial loader timing
  const [showFooter, setShowFooter] = useState(false);

  return (
    <div className="app">
      <LanguageSync /> {/* Keep app language in sync with i18n */}
      <Header />
      <main>
        {/* Loader overlay displayed until initial animation/loader completes */}
        {!isLoaderDone && <Loader />}

        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route
              path={ROUTES.PROJECTPAGE}
              element={
                <LazyProjectPage
                  startHeroIntro={isLoaderDone} // Trigger hero animation after loader
                  onHeroEnterComplete={() => setShowFooter(true)} // Show footer after hero animation completes
                />
              }
            />
            <Route path={ROUTES.NOTFOUND} element={<LazyNotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer appears only after hero intro animation finishes */}
      {showFooter && <Footer />}
    </div>
  );
};

export default App;


//------------

// import { lazy, Suspense, useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { LanguageSync } from "@/shared/i18n/LanguageSync";
// import { ROUTES } from "@/shared/config/routes";
// import { useLoader } from "@/shared/hooks/useLoader";
// import Header from "@/features/header/Header";
// import Footer from "@/features/footer/Footer";

// // --- LAZY PAGES ---
// const LazyProjectPage = lazy(() => import("@/pages/project-page"));
// const LazyNotFoundPage = lazy(() => import("@/pages/404"));

// // --- SHARED UI ---
// import { Loader } from "@/shared/ui/Loader";

// const App = () => {
//   const location = useLocation();
//   const isLoaderDone = useLoader(1500);
//   const [showFooter, setShowFooter] = useState(false);

//   return (
//     <div className="app">
//       <LanguageSync />
//       <Header />
//       <main>
//         {/* Loader — поверх всего, пока он не завершился */}
//         {!isLoaderDone && <Loader />}

//         <Suspense fallback={null}>
//           <Routes location={location} key={location.pathname}>
//             <Route
//               path={ROUTES.PROJECTPAGE}
//               element={
//                 <LazyProjectPage
//                   startHeroIntro={isLoaderDone}
//                   onHeroEnterComplete={() => {
//                     setShowFooter(true);
//                   }}
//                 />
//               }
//             />
//             <Route path={ROUTES.NOTFOUND} element={<LazyNotFoundPage />} />
//           </Routes>
//         </Suspense>
//       </main>
//       {showFooter && <Footer />}
//     </div>
//   );
// };

// export default App;

//------------------

// import { lazy, Suspense, useState, useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { ROUTES } from "@/shared/config/routes";
// import Header from "@/features/header/Header";
// import Footer from "@/features/footer/Footer";

// // --- LAZY PAGES ---
// const LazyProjectPage = lazy(() => import("../pages/project-page"));
// const LazyNotFoundPage = lazy(() => import("../pages/404"));

// // --- SHARED UI ---
// import { Loader } from "@/shared/ui/Loader";

// const App = () => {
//   const location = useLocation();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [showFooter, setShowFooter] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className={`app ${isLoaded ? "loaded" : ""}`}>
//       {isLoaded && <Header />}
//       <main>
//         {!isLoaded ? (
//           <Loader />
//         ) : (
//           <Suspense fallback={<Loader />}>
//             <Routes location={location} key={location.pathname}>
//               <Route
//                 path={ROUTES.PROJECTPAGE}
//                 element={
//                   <LazyProjectPage
//                     onHeroEnterComplete={() => setShowFooter(true)}
//                   />
//                 }
//               />
//               <Route path={ROUTES.NOTFOUND} element={<LazyNotFoundPage />} />
//             </Routes>
//           </Suspense>
//         )}
//       </main>
//       {isLoaded && showFooter && <Footer />}
//     </div>
//   );
// };

// export default App;

//--------------

// import { lazy, Suspense, useState, useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { ROUTES } from "@/shared/config/routes";
// import Header from "@/features/header/Header";
// import Footer from "@/features/footer/Footer";

// // --- LAZY PAGES ---
// const LazyProjectPage = lazy(() => import("../pages/project-page"));
// const LazyNotFoundPage = lazy(() => import("../pages/404"));

// // --- SHARED UI ---
// import { Loader } from "@/shared/ui/Loader";

// // --- APP COMPONENT ---
// const App = () => {
//   const location = useLocation();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [showFooter, setShowFooter] = useState(false);

//   useEffect(() => {
//     // Можно имитировать подгрузку ленивого компонента или задержку Loader
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 1500); // например 1.5 секунды

//     return () => clearTimeout(timer);
//   }, []);

// return (
//     <div className={`app ${isLoaded ? "loaded" : ""}`}>
//       {isLoaded && <Header />}
//       <main>
//         {!isLoaded ? (
//           <Loader />
//         ) : (
//           <Suspense fallback={<Loader />}>
//             <Routes location={location} key={location.pathname}>
//               <Route
//                 path={ROUTES.PROJECTPAGE}
//                 element={<LazyProjectPage onHeroEnterComplete={() => setShowFooter(true)} />}
//               />
//               <Route path={ROUTES.NOTFOUND} element={<LazyNotFoundPage />} />
//             </Routes>
//           </Suspense>
//         )}
//       </main>

//       {isLoaded && showFooter && <Footer />}
//     </div>
//   );
// };

// export default App;

//-----------

// import { lazy, Suspense, useState, useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { ROUTES } from "@/shared/config/routes";
// import Header from "@/features/header/Header";
// import Footer from "@/features/footer/Footer";

// // --- LAZY PAGES ---
// const LazyProjectPage = lazy(() => import("../pages/project-page"));
// const LazyNotFoundPage = lazy(() => import("../pages/404"));

// // --- SHARED UI ---
// import { Loader } from "@/shared/ui/Loader";

// // --- APP COMPONENT ---
// const App = () => {
//   const location = useLocation();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // Можно имитировать подгрузку ленивого компонента или задержку Loader
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 1500); // например 1.5 секунды

//     return () => clearTimeout(timer);
//   }, []);

// return (
//     <div className={`app ${isLoaded ? "loaded" : ""}`}>
//       {isLoaded && <Header />}
//       <main>
//         {!isLoaded ? (
//           <Loader />
//         ) : (
// <Suspense fallback={<Loader />}>
//   <Routes location={location} key={location.pathname}>
//     <Route path={ROUTES.PROJECTPAGE} element={<LazyProjectPage />} />
//     <Route path={ROUTES.NOTFOUND} element={<LazyNotFoundPage />} />
//   </Routes>
// </Suspense>
//         )}
//       </main>

//       {isLoaded && <Footer />}
//     </div>
//   );
// };

// export default App;
