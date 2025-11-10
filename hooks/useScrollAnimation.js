import { useEffect, useState } from 'react';

export const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-animate-id');
            if (id) {
              setIsVisible(prev => ({ ...prev, [id]: true }));
              // Once animated, remove observer for performance
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px', // Start animation slightly before element is fully visible
      }
    );

    // Find all elements with data-animate-id
    const animateElements = document.querySelectorAll('[data-animate-id]');
    animateElements.forEach((el) => observer.observe(el));

    return () => {
      animateElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return isVisible;
};

// Hook for individual elements
export const useInView = (elementRef, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          observer.unobserve(currentElement); // Stop observing after first trigger
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
        ...options,
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.unobserve(currentElement);
    };
  }, [elementRef, isInView, options]);

  return isInView;
};