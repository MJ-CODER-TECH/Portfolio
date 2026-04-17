import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ===== ENSURE DOM IS READY BEFORE ANIMATING =====
export const waitForDOMReady = () => {
  return new Promise((resolve) => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      resolve();
    } else {
      const onReady = () => {
        document.removeEventListener("DOMContentLoaded", onReady);
        resolve();
      };
      document.addEventListener("DOMContentLoaded", onReady);
    }
  });
};

// ===== REFRESH SCROLL TRIGGER SAFELY =====
export const refreshScrollTrigger = () => {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.refresh();
  });
  ScrollTrigger.refresh();
};

// ===== FADE IN ANIMATION =====
export const fadeInUp = (element, delay = 0) => {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
};

// ===== STAGGER ANIMATION FOR CHILDREN =====
export const staggerFadeInUp = (container, delayBetween = 0.1) => {
  if (!container) return;
  gsap.from(container.children, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: delayBetween,
    ease: "power2.out",
    scrollTrigger: {
      trigger: container,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
};

// ===== TEXT REVEAL (WORD BY WORD) =====
export const revealTextByWords = (element) => {
  if (!element || !element.innerText) return;
  
  const text = element.innerText;
  const words = text.split(" ");
  
  element.innerText = "";
  const spans = words.map((word) => {
    const span = document.createElement("span");
    span.style.display = "inline";
    span.style.marginRight = "0.25em";
    span.innerText = word;
    element.appendChild(span);
    return span;
  });

  gsap.from(spans, {
    opacity: 0,
    y: 10,
    duration: 0.4,
    stagger: 0.05,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
};

// ===== SCALE & FADE ANIMATION =====
export const scaleIn = (element, delay = 0) => {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    scale: 0.9,
    duration: 0.7,
    delay,
    ease: "back.out(1.2)",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
};

// ===== STAGGER SCALE ANIMATION =====
export const staggerScale = (container, delayBetween = 0.1) => {
  if (!container) return;
  gsap.from(container.children, {
    opacity: 0,
    scale: 0.92,
    duration: 0.7,
    stagger: delayBetween,
    ease: "back.out(1.1)",
    scrollTrigger: {
      trigger: container,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
};

// ===== TIMELINE ANIMATION (FOR HERO SECTIONS) =====
export const heroTimeline = (elements = {}, scrollTrigger = true) => {
  const tl = gsap.timeline();
  
  if (elements.badge) {
    tl.from(elements.badge, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: scrollTrigger ? {
        trigger: elements.badge,
        start: "top 80%",
        toggleActions: "play none none none",
      } : undefined,
    });
  }
  
  if (elements.title) {
    tl.from(elements.title, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.3");
  }
  
  if (elements.para) {
    tl.from(elements.para, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power2.out",
    }, "-=0.4");
  }
  
  if (elements.buttons) {
    tl.from(elements.buttons, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.3");
  }
  
  return tl;
};

// ===== SIMPLE SCROLL ANIMATION =====
export const setupScrollAnimation = (element, triggerOptions = {}) => {
  const defaultOptions = {
    start: "top 85%",
    toggleActions: "play none none none",
    ...triggerOptions,
  };

  gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      ...defaultOptions,
    },
  });
};

// ===== SLIDE IN LEFT/RIGHT =====
export const slideInLeft = (element, delay = 0) => {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    x: -60,
    duration: 0.8,
    delay,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
};

export const slideInRight = (element, delay = 0) => {
  if (!element) return;
  gsap.from(element, {
    opacity: 0,
    x: 60,
    duration: 0.8,
    delay,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
};

export { gsap, ScrollTrigger };