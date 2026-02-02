import React, { useEffect, useRef } from "react";
import ContactForm from "@/features/contact/ContactForm";
import { animateContactBg } from "@/features/contact/contactAnimation";
import "./ContactSection.scss";

/**
 * ContactSection component
 * Renders the contact section with a form and animated background.
 * GSAP animation is initialized on mount and cleaned up automatically.
 */
export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  // --- GSAP BACKGROUND ANIMATION INIT ---
  // Initializes scroll-based background animation for the contact section
  // Cleanup returned from animateContactBg ensures proper lifecycle handling
  useEffect(() => {
    return animateContactBg(sectionRef.current, bgRef.current);
  }, []);

  return (
    <section className="contact-section scroll-section" id="contact" ref={sectionRef}>
      <h1 className="visually-hidden">Contact section</h1>
      <div className="container">
        <ContactForm />
      </div>
      <div className="contact-section__bg" ref={bgRef} />
    </section>
  );
};

export default ContactSection;

