Disponible en: [Inglés](README.en.md)

# Portafolio Interactivo — Documentación Técnica

---

## I. Descripción del Proyecto

**Portafolio Interactivo** es una aplicación de una sola página (SPA) moderna y animada, construida con React, diseñada para mostrar mi enfoque de ingeniería frontend, decisiones arquitectónicas y atención a los detalles de UI/UX.

Este proyecto no es solo una página personal, sino una demostración completa de cómo estructuro aplicaciones frontend, trabajo con animaciones complejas, organizo contenido y construyo interfaces interactivas y accesibles usando herramientas modernas y buenas prácticas.

El portafolio se centra en:

- Desarrollo basado en componentes
- Arquitectura escalable y mantenible
- Animaciones expresivas pero controladas
- Separación clara entre contenido, configuración y lógica de UI
- Soporte multilingüe y consideraciones de accesibilidad

La aplicación está enfocada en frontend para resaltar arquitectura, animaciones y patrones de interacción más que el procesamiento de datos.

---

## II. Objetivos del Proyecto

Los objetivos principales son:

- **Demostrar pensamiento arquitectónico frontend**  
  Estructura modular y escalable inspirada en Feature-Sliced Design, con separación clara entre inicialización, páginas, features, entidades y capas compartidas.

- **Mostrar dominio de React y TypeScript modernos**  
  Aplicación React totalmente tipada, usando componentes funcionales, hooks y configuración estricta de TypeScript.

- **Destacar técnicas avanzadas de UI y animación**  
  Animaciones suaves basadas en scroll y estado con GSAP y Framer Motion, adaptadas a diferentes tamaños de pantalla.

- **Presentar componentes UI reutilizables y mantenibles**  
  Botones, inputs, modales, acordeones y cards con estilo consistente, accesibilidad y cobertura de tests.

- **Demostrar soporte multilingüe y escalabilidad de contenido**  
  i18n con namespaces por feature, sincronización de HTML `lang` y manejo de fuentes para distintos sistemas de escritura (incluyendo cirílico).

- **Enfocarse en patrones de interacción frontend-only**  
  Implementación limpia de modales, formularios, validaciones, animaciones y tooltips sin backend, usando datos estáticos y lógica del cliente.

- **Garantizar confiabilidad mediante testing**  
  Tests unitarios, de integración y end-to-end (Jest, React Testing Library, Playwright) para verificar UI, animaciones y flujos de usuario.

- **Crear un portafolio listo para producción**  
  SPA pulida, responsive y desplegable, ideal para presentación a reclutadores y equipos de ingeniería.

---

## III. Funcionalidades Clave

### 1. Presentación Interactiva del Portafolio

- Cards de proyectos totalmente interactivas con hover y modales clicables.
- Animaciones basadas en scroll usando GSAP para aparición de secciones y cards.
- Modales bloquean scroll de fondo y muestran detalles, retos, soluciones y tech stack.

### 2. Arquitectura Basada en Componentes

- Bloques UI modulares y reutilizables: botones, acordeones, cards, modales, layouts.
- Estructura inspirada en Feature-Sliced Design para desarrollo escalable y separación de responsabilidades.
- Componentes estrictamente tipados con TypeScript para flujo predecible y código mantenible.

### 3. Soporte Multilingüe

- i18n con namespaces separados por feature.
- Sincronización de HTML `lang` y manejo de fuentes cirílicas.
- Descarga de CV y formulario de contacto totalmente localizados.

### 4. UI Animada e Interactiva

- Animaciones basadas en scroll y estado con GSAP.
- Transiciones de modales y tooltips con Framer Motion.
- Tooltips siguen el cursor en los cards para UX pulida y responsiva.

### 5. Formulario de Contacto Sin Backend

- Integración con EmailJS para envío directo desde frontend.
- Validación de formulario con Zod.
- Feedback mediante modal y botón de envío deshabilitado durante el proceso.
- Multilingüe y responsive.

### 6. Layout Responsivo

- Diseño totalmente responsive en móvil, tablet y desktop.
- Animaciones y layout adaptativos a distintos tamaños de pantalla.

### 7. Accesibilidad y UX

- HTML semántico con atributos ARIA.
- Gestión de foco en modales y dropdowns.
- Navegación por teclado y compatibilidad con lectores de pantalla.

### 8. Cobertura de Tests

- Unit tests para componentes, hooks y utilidades con Jest y React Testing Library.
- Integration tests para interacciones entre features.
- E2E tests con Playwright para flujos completos y animaciones.

---

## IV. Arquitectura y Estructura del Proyecto

El proyecto sigue **Feature-Sliced Design (FSD)**, garantizando modularidad, escalabilidad y separación de responsabilidades.

### Responsabilidad de Capas

- **app/** — Inicializa la app, routing, providers, estilos globales y boundaries de error.
- **pages/** — Contenedores que componen múltiples features por página.
- **features/** — Bloques funcionales con UI, lógica, animaciones y tests; reutilizables en distintas páginas.
- **entities/** — Entidades de negocio (proyectos, skills, FAQ) con tipos, datos estáticos y lógica de dominio.
- **shared/** — Componentes UI compartidos, hooks, utilidades, estilos globales e i18n.
- **assets/** — Imágenes, sprites y recursos estáticos.
- **e2e/** — Tests de Playwright cubriendo animaciones, modales y flujos de usuario.

### Principios Clave

- **Aislamiento Modular:** Features y entidades desacopladas para desarrollo independiente.
- **Reutilización de Componentes:** UI en `shared/ui` tipada y reutilizable.
- **Aliases:** `@/shared`, `@/entities`, `@/features`, `@/app`, `@/pages` para imports limpios.
- **Testing por Capas:** Unit tests para features y shared, E2E para flujos interactivos.
- **Aislamiento de Animaciones:** Cada feature tiene su propia lógica de animación y tests.

### Interacción de Capas

pages → features → entities → shared

- **Pages** componen features
- **Features** usan entidades y shared components
- **Entities** contienen datos, tipos y lógica de dominio
- **Shared** accesible desde todas las capas
- **App** proporciona providers globales y routing

---

## V. Animaciones e Interacciones

El proyecto cuenta con animaciones ricas, responsivas y elementos interactivos diseñados para mejorar la experiencia de usuario en todos los dispositivos. Cada sección implementa efectos basados en scroll o eventos, utilizando **GSAP** y **Framer Motion** para transiciones suaves y de alto rendimiento.

- **Sección Hero:** Animaciones intro responsivas con secuencias de timeline, dibujo del logo y revelado del título. Efectos de escala y opacidad activados por scroll crean un punto de entrada dinámico para los usuarios.

- **Sección About:** Elementos de texto e imagen animan al hacer scroll, con desvanecimientos escalonados a nivel de caracteres y líneas, logrando un efecto narrativo pulido. La escala y el fade-out de la sección proporcionan transiciones suaves entre bloques de contenido.

- **Sección Skills:** Los ítems del acordeón se animan horizontalmente en tabletas y pantallas de escritorio, reaccionando dinámicamente al progreso del scroll. En móviles, se mantienen interacciones simplificadas para mejorar rendimiento y claridad.

- **Galería de Proyectos:** Las cards aparecen secuencialmente con transiciones de escala y opacidad, mientras la sección permanece fija durante el scroll. La primera y última card reciben énfasis especial para guiar la atención del usuario.

- **Slider de FAQ:** Efecto de scroll horizontal infinito logrado mediante clonación de cards y ajuste de posición de scroll, creando una experiencia fluida y atractiva.

- **Formulario de Contacto:** El fondo se expande y contrae responsivamente al hacer scroll, con transiciones suaves de border-radius y ancho, mejorando el flujo visual de la sección.

- **Interacciones Hover y UI:** Tooltips, estados hover, dropdowns y modales cuentan con animaciones sutiles para retroalimentación y descubrimiento de elementos. **Framer Motion** asegura entradas, salidas y efectos de movimiento interactivo suaves.

Todas las animaciones consideran los breakpoints, con separación clara de la lógica para móvil, tablet y escritorio, e incluyen limpieza adecuada para evitar fugas de memoria.

---

## VI. Internacionalización (i18n)

Este proyecto implementa una arquitectura completamente multilingüe usando **react-i18next**, permitiendo cambiar de idioma en tiempo de ejecución sin recargar la página. Las traducciones están estructuradas por **namespaces de features**, alineadas con el enfoque Feature-Sliced Design (FSD), garantizando escalabilidad y mantenibilidad.

- **Idiomas soportados:** Inglés (en), Español (es), Ruso (ru), con fallback a inglés.  
- **Estructura basada en namespaces:** Cada sección de la app (header, about, skills, projects, FAQ, footer, common) tiene sus propios archivos JSON por idioma, permitiendo traducciones específicas por feature y fácil expansión.  
- **Detección dinámica de idioma:** Uso de `i18next-browser-languagedetector` con localStorage y configuración del navegador, manteniendo persistentes las preferencias del usuario.  
- **Bundles de locales lazy-loaded:** Solo se cargan las traducciones necesarias para el idioma activo y la feature correspondiente, optimizando rendimiento.  
- **Claves type-safe:** Asegura seguridad en tiempo de compilación y reduce errores en tiempo de ejecución.  
- **Sincronización del atributo lang del DOM:** El atributo `lang` del documento se actualiza dinámicamente para coincidir con el locale actual, mejorando accesibilidad y SEO.  
- **Arquitectura escalable:** Añadir nuevos idiomas o features requiere mínima configuración, soportando crecimiento a largo plazo y alcance global.

---

## VII. Accesibilidad y Consideraciones de UX

- **HTML semántico:** Uso correcto de headings, landmarks y roles ARIA para estructurar contenido de manera significativa para lectores de pantalla y tecnologías asistivas.  
- **Navegación por teclado:** Todos los elementos interactivos (acordeones, menús, formularios, botones) son completamente accesibles mediante teclado.  
- **Gestión de foco:** Componentes dinámicos y transiciones de rutas mantienen un orden lógico de foco para mejorar la usabilidad.  
- **Diseño responsivo:** Los layouts se adaptan perfectamente a diferentes tamaños de pantalla, garantizando una experiencia consistente en móvil, tablet y desktop.  
- **Contraste y legibilidad:** Esquemas de color y tipografía cumplen con estándares de accesibilidad, optimizando la legibilidad para usuarios con discapacidades visuales.  
- **Layouts conscientes de i18n:** El contenido multilingüe no rompe la estructura de UI, manteniendo interfaces consistentes.  
- **Microinteracciones y feedback:** Indicadores visuales claros para elementos interactivos, estados de carga y mensajes de validación mejoran la comprensión del usuario.  
- **UX enfocada en performance:** Componentes lazy-loaded, renderizado optimizado y animaciones suaves mejoran la percepción de respuesta de la interfaz.

---

## VIII. Flujo de Datos

- El estado de la aplicación se gestiona localmente mediante hooks de React (`useState`, custom hooks).  
- Las pages actúan como capas de composición y no contienen lógica de negocio.  
- Los componentes de features consumen datos estáticos y tipados desde la capa de `entities`.  
- El contenido textual se resuelve mediante `react-i18next` usando claves de traducción.  
- El flujo de datos es top-down vía props; los componentes hijos se comunican hacia arriba mediante callbacks.  
- Secciones pesadas se cargan lazy-loaded para optimizar el render inicial.

---

## IX. Estrategia de Testing

El proyecto utiliza un **enfoque de testing multinivel** centrado en el comportamiento y flujos críticos del usuario.

- **Unit tests:** cubren lógica pura, reglas de validación y hooks personalizados.  
- **Component & integration tests:** verifican comportamiento de UI, interacciones y contratos de componentes usando React Testing Library.  
- **Page-level tests:** validan routing, lazy loading y composición de features.  
- **E2E tests (Playwright):** cubren escenarios clave de usuario, comportamiento responsivo y animaciones basadas en scroll.

### Principios

- Los tests aseguran **comportamiento, no implementación**.  
- Las animaciones se testean como lógica (configuración y triggers), no como visuales.  
- Se utiliza mocking para aislar responsabilidades.

---

## X. Aliases

| Alias     | Path          |
| --------- | ------------- |
| @         | src/          |
| @app      | src/app/      |
| @pages    | src/pages/    |
| @entities | src/entities/ |
| @features | src/features/ |
| @shared   | src/shared/   |

---

## XI. Tech Stack

- **Frontend:** React 19, TypeScript, Vite, SCSS / CSS Modules
- **Animaciones:** GSAP, Framer Motion
- **Routing:** React Router integrado en App
- **Estado y Formularios:** Hooks locales, EmailJS (contact form)
- **Multilingüe:** i18n, sincronización HTML `lang`
- **Testing:** Jest, React Testing Library, Playwright
- **Linting/Formatting:** ESLint, Prettier

---

## XII. Deployment / Hosting

- Vercel: SPA fallback (rewrites → /index.html)
- React Router totalmente compatible con history
- Variables de entorno: VITE_BASENAME, VITE_API_URL, VITE_APP_NAME
- Demo funcional con datos locales

---

## XIII. Diseño y Recursos Visuales

- **Design System:** UI modular y basada en componentes, con espaciado, colores y tipografía consistentes
- **Tipografía:** Fuentes latinas y fuente cirílica personalizada que cambian automáticamente según HTML `lang`
- **Colores:** Paleta primary, secondary, accent usada consistentemente
- **Íconos y Gráficos:** SVGs personalizados, sprites y ilustraciones específicas
- **Imágenes:** Formatos WebP y PNG optimizados en `/src/assets/images`
- **Animaciones:** GSAP para scroll-driven, Framer Motion para modales y dropdowns interactivos
- **Accesibilidad & UX:** Marcado semántico, ARIA, diseño responsive
- **Recursos Externos:** Todos los assets con licencia o creados por mí

---

## XIV. Calidad de Código y Linting

- **ESLint + TypeScript + React Hooks:** estilo consistente, detección temprana de errores, buenas prácticas
- **Reglas personalizadas:** advertencias por variables no usadas, tipado estricto, excepciones en tests
- **Integración en workflow:** linting durante desarrollo y CI/CD, fomentando código mantenible y escalable
