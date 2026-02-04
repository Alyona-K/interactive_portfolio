import React from "react";

interface LazySectionProps {
  Component: React.LazyExoticComponent<React.FC<any>>;
  rootMargin?: string;
  testId?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  Component,
  rootMargin = "200px",
  testId,
}) => {
  // --- LOCAL STATE: TRACK VISIBILITY OF THE SECTION ---
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // --- OBSERVER: LAZY LOAD COMPONENT WHEN SECTION ENTERS VIEWPORT ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // --- STOP OBSERVING AFTER FIRST INTERSECTION ---
        }
      },
      { rootMargin }, // --- OFFSET TO TRIGGER LOAD BEFORE ELEMENT IS IN VIEW ---
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} data-testid={testId}>
      {isVisible && <Component />}
    </div>
  );
};

export default LazySection;
