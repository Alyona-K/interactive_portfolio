Available in: [Spanish](README.es.md)

# Interactive Portfolio — Technical Documentation

---

## I. Project Overview

**Interactive Portfolio** is a modern, animated, React-based single-page application designed to showcase my frontend engineering approach, architectural decisions, and attention to UI/UX detail.

This project is not just a personal landing page, but a fully crafted demonstration project. Its primary goal is to present how I structure frontend applications, work with complex animations, organize content, and build interactive, accessible user interfaces using modern tools and best practices.

The portfolio focuses on:

- component-driven development
- scalable and maintainable project architecture
- expressive yet controlled animations
- clean separation between content, configuration, and UI logic
- multilingual support and accessibility considerations

The application is intentionally frontend-focused to highlight UI architecture, animations, and interaction patterns rather than data processing.

---

## II. Project Goals

The main objectives of this project are:

- **Demonstrate frontend architectural thinking**  
  Showcase a scalable, modular project structure inspired by Feature-Sliced Design, with clear separation between application initialization, pages, features, entities, and shared layers.

- **Show proficiency with modern React and TypeScript**  
  Build a fully typed React application using functional components, hooks, strict TypeScript configuration, and predictable data flow.

- **Highlight advanced UI and animation techniques**  
  Implement smooth, scroll-driven and state-driven animations using GSAP and Framer Motion, with adaptive behavior across different screen sizes.

- **Present reusable and maintainable UI components**  
  Design and implement a reusable UI layer (buttons, inputs, modals, accordions, cards) with consistent styling, accessibility considerations, and test coverage.

- **Demonstrate multilingual support and content scalability**  
  Implement internationalization (i18n) with namespace-based translations, HTML `lang` synchronization, and font handling for different writing systems (including Cyrillic).

- **Focus on frontend-only interaction patterns**  
  Show how common application features (modals, forms, validation, animations, tooltips) can be implemented cleanly without a backend, using static data and client-side logic.

- **Ensure reliability through testing**  
  Cover the project with unit, integration, and end-to-end tests (Jest, React Testing Library, Playwright) to verify UI behavior, animations, and user flows.

- **Create a production-ready portfolio project**  
  Deliver a polished, responsive, and deployable SPA suitable for real-world presentation to recruiters and engineering teams.

---

## III. Key Features

### 1. Interactive Portfolio Presentation

- Fully interactive project cards with hover effects and click-to-view modals.
- Scroll-driven animations for section entry and project card appearance using GSAP.
- Modals block background scrolling and provide detailed project overviews, challenges, solutions, and tech stack.

### 2. Component-Driven Architecture

- Modular and reusable UI blocks: buttons, accordions, cards, modals, layout components.
- Feature-Sliced Design-inspired structure for scalable development and clear separation of concerns.
- Strictly typed components with TypeScript, ensuring predictable data flow and maintainable code.

### 3. Multilingual Support

- Internationalization (i18n) with separate namespaces per feature.
- HTML `lang` synchronization and custom font handling for Cyrillic.
- Resume download and contact form fully localized.

### 4. Animated and Interactive UI

- State- and scroll-driven animations using GSAP for intro and section animations.
- Framer Motion for interactive modal transitions and tooltips.
- Tooltips follow cursor for project cards for a polished, responsive UX.

### 5. Contact Form Without Backend

- EmailJS integration for sending messages directly from the frontend.
- Client-side form validation using Zod.
- Submission feedback via modal and disabled submit button during sending.
- Fully multilingual and responsive.

### 6. Responsive Layout

- Fully responsive design across mobile, tablet, and desktop.
- Adaptive animations and layout adjustments for different screen sizes.

### 7. Accessibility and UX

- Semantic HTML with ARIA attributes.
- Focus management in modals and dropdowns.
- Keyboard navigation and screen-reader friendly elements.

### 8. Testing Coverage

- Unit tests for components, hooks, and utilities using Jest and React Testing Library.
- Integration tests for feature interactions.
- End-to-end tests (Playwright) for complete user flows and scroll/animation behaviors.

---

## IV. Architecture & Project Structure

This project follows a **Feature-Sliced Design (FSD)** approach, ensuring modularity, scalability, and clear separation of concerns. Each layer has a distinct responsibility, making it easier to maintain, test, and expand.

### Layer Responsibilities

- **app/** — Initializes the React app, sets up routing, providers, global styles, and error boundaries.
- **pages/** — Container components composing multiple feature blocks for each page.
- **features/** — Functional blocks with UI, logic, animations, and tests; can be reused in different pages.
- **entities/** — Core business entities (projects, skills, FAQ) with types, static data, and domain-specific logic.
- **shared/** — Shared UI components, hooks, utilities, global styles, and i18n setup.
- **assets/** — Images, sprites, and other static resources.
- **e2e/** — Playwright tests covering scroll-driven animations, modals, and user flows.

### Key Principles

- **Modular Isolation:** Features and entities are loosely coupled, allowing independent development.
- **Component Reusability:** UI components in `shared/ui` are fully typed and reusable.
- **Aliases:** `@/shared`, `@/entities`, `@/features`, `@/app`, `@/pages` for clean imports.
- **Testing Layers:** Unit tests for features and shared components, e2e tests for interactive flows.
- **Animation Isolation:** Each feature has its own animation logic and tests for smooth UX.

### Layer Interaction

pages → features → entities → shared

- **Pages** compose features
- **Features** operate on business entities and shared components
- **Entities** hold data, types, and domain logic
- **Shared** is accessible by all layers
- **App** provides global providers and routing

---

## V. Animations & Interactions

The project features rich, responsive animations and interactive elements designed to enhance user experience across all devices. Each section implements scroll-driven or event-driven effects, using GSAP and Framer Motion for smooth, performant transitions.

- **Hero Section:** Responsive intro animations with timeline sequences, logo drawing, and title reveal. Scroll-triggered scaling and fading effects create a dynamic entry point for users.

- **About Section:** Text and image elements animate on scroll, with character- and line-level staggered fades for a polished storytelling effect. Section scaling and fade-out provide smooth transitions between content blocks.

- **Skills Section:** Accordion items animate horizontally on tablet and desktop screens, reacting dynamically to scroll progress. Mobile devices retain simplified interactions for performance and clarity.

- **Projects Gallery:** Cards appear sequentially with scale and opacity transitions, while the section remains pinned during scroll. First and last cards receive special emphasis to guide user focus.

- **FAQ Slider:** Infinite horizontal scroll effect achieved via cloning of cards and scroll position adjustments, creating a seamless, engaging experience.

- **Contact Form:** Background expands and contracts responsively on scroll, with smooth border-radius and width transitions, enhancing the visual flow of the section.

- **Hover & UI Interactions:** Tooltips, hover states, dropdowns, and modals feature subtle animations for feedback and discoverability. Framer Motion ensures smooth entry, exit, and interactive motion effects.

All animations are breakpoint-aware, with clean separation of logic for mobile, tablet, and desktop, and include proper cleanup to prevent memory leaks.

---

## VI. Internationalization (i18n)

This project implements a fully multilingual architecture using **react-i18next**, allowing dynamic runtime language switching without page reloads. Translations are structured by **feature namespaces**, aligned with the Feature-Sliced Design (FSD) approach, ensuring scalability and maintainability.

- **Supported languages:** English (en), Spanish (es), Russian (ru), with fallback to English.
- **Namespace-based structure:** Each section of the app (header, about, skills, projects, FAQ, footer, common) has its own JSON files per language, enabling feature-scoped translations and easy expansion.
- **Dynamic language detection:** Automatic detection using `i18next-browser-languagedetector` with localStorage and browser settings, keeping user preferences persistent across sessions.
- **Lazy-loaded locale bundles:** Only the required translations for the active language and feature are loaded, optimizing performance.
- **Type-safe translation keys:** Ensures compile-time safety and reduces runtime errors.
- **DOM language synchronization:** Document `lang` attribute is dynamically updated to match the current locale, improving accessibility and SEO.
- **Scalable architecture:** Adding new languages or features requires minimal configuration, supporting long-term project growth and global audience reach.

---

## VII. Accessibility & UX Considerations

- **Semantic HTML:** Proper use of headings, landmarks, and ARIA roles to structure content meaningfully for screen readers and assistive technologies.
- **Keyboard navigation:** All interactive elements (accordions, menus, forms, buttons) are fully accessible via keyboard.
- **Focus management:** Dynamic components and route transitions maintain logical focus order for better usability.
- **Responsive design:** Layouts adapt seamlessly to different screen sizes, ensuring a consistent experience on mobile, tablet, and desktop.
- **Contrast and readability:** Color schemes and typography meet accessibility standards, optimizing legibility for users with visual impairments.
- **i18n-aware layouts:** Multilingual content does not break UI structure, keeping interfaces consistent across languages.
- **Microinteractions and feedback:** Clear visual cues for interactive elements, loading states, and validation messages improve user understanding.
- **Performance-conscious UX:** Lazy-loaded components, optimized rendering, and smooth animations enhance perceived responsiveness.

---

## VIII. Data Flow

- Application state is managed locally via React hooks (`useState`, custom hooks).
- Pages act as composition layers and do not contain business logic.
- Feature components consume static, typed data from the `entities` layer.
- Text content is resolved via `react-i18next` using translation keys.
- Data flows top-down via props; child components communicate upward through callbacks.
- Heavy sections are lazy-loaded to optimize initial rendering.

---

## IX. Testing Strategy

The project uses a **multi-level testing approach** focused on behavior and critical user flows.

- **Unit tests** cover pure logic, validation rules, and custom hooks
- **Component & integration tests** verify UI behavior, interactions, and component contracts using React Testing Library
- **Page-level tests** validate routing, lazy loading, and feature composition
- **E2E tests (Playwright)** cover key user scenarios, responsive behavior, and scroll-driven interactions

### Principles

- Tests assert **behavior, not implementation**
- Animations are tested as logic (configuration and triggers), not visuals
- Mocking is used to isolate responsibilities

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
- **Animations:** GSAP, Framer Motion
- **Routing:** React Router (built into App layout)
- **State & Forms:** Local React state, EmailJS (contact form)
- **Multilingual:** i18n, HTML `lang` sync
- **Testing:** Jest, React Testing Library, Playwright
- **Linting/Formatting:** ESLint, Prettier

---

## XII. Deployment / Hosting

- Vercel: SPA fallback (rewrites → /index.html)
- React Router fully compatible with history
- Environment variables: VITE_BASENAME, VITE_API_URL, VITE_APP_NAME
- Demo fully functional on local data

---

## XIII. Design & Visual Assets

- **Design System:** Modular, component-driven UI with consistent spacing, colors, and typography
- **Typography:** Latin fonts and custom Cyrillic font switch automatically by HTML `lang`
- **Colors:** Primary, secondary, accent palette used consistently across components
- **Icons & Graphics:** Custom SVGs, sprite sheets, and project-specific illustrations
- **Images:** Optimized WebP and PNG formats stored in `/src/assets/images`
- **Animations:** GSAP for scroll-driven animations, Framer Motion for interactive modals and dropdowns
- **Accessibility & UX:** Semantic markup, ARIA attributes, and responsive design for all screen sizes
- **External Assets:** All images and icons either custom-made or with proper licensing

---

## XIV. Code Quality & Linting

- **ESLint + TypeScript + React Hooks:** Ensures consistent code style, catches potential errors early, and enforces best practices.
- **Custom rules & overrides:** Warnings for unused variables, strict typing for safer code, and exceptions for test files to allow flexible mocks.
- **Integration with development workflow:** Linting runs during development and CI/CD pipelines, promoting maintainable, readable, and scalable code.
