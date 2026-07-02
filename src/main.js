import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Lenis from "lenis";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "lenis/dist/lenis.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.scss";



gsap.registerPlugin(ScrollTrigger);



const header = document.querySelector("[data-header]");

const year = document.querySelector("[data-year]");

const hero = document.querySelector("[data-hero]");

const tiltItems = [...document.querySelectorAll("[data-tilt]")];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");



if (year) {

  year.textContent = new Date().getFullYear();

}



const updateHeader = () => {

  if (!header) return;



  const pastHero = window.scrollY >= window.innerHeight * 0.92;



  header.classList.toggle("site-header--on-hero", !pastHero);

  header.classList.toggle("is-scrolled", pastHero);

};



updateHeader();



const initLenis = () => {

  if (prefersReducedMotion.matches) {

    window.addEventListener("scroll", updateHeader, { passive: true });

    return null;

  }



  const lenis = new Lenis({

    lerp: 0.1,

    wheelMultiplier: 0.9,

    touchMultiplier: 1.15,

  });



  lenis.on("scroll", () => {

    updateHeader();

    ScrollTrigger.update();

  });



  gsap.ticker.add((time) => {

    lenis.raf(time * 1000);

  });



  gsap.ticker.lagSmoothing(0);



  return lenis;

};



const initHeroEntrance = () => {

  if (!hero || prefersReducedMotion.matches) return;



  gsap.from(".hero__copy > *, .hero__link", {

    y: 48,

    opacity: 0,

    duration: 1,

    stagger: 0.14,

    ease: "power3.out",

    delay: 0.15,

  });



  gsap.from(".hero__ticker span", {

    y: 24,

    opacity: 0,

    duration: 0.9,

    stagger: 0.08,

    ease: "power3.out",

    delay: 0.55,

  });

};



const initSectionReveals = () => {

  gsap.utils.toArray("[data-reveal]").forEach((section) => {

    if (prefersReducedMotion.matches) {

      gsap.set(section, { opacity: 1, y: 0 });

      return;

    }



    gsap.fromTo(

      section,

      { y: 56, opacity: 0 },

      {

        y: 0,

        opacity: 1,

        duration: 0.95,

        ease: "power3.out",

        scrollTrigger: {

          trigger: section,

          start: section.classList.contains("section-overlap") ? "top 92%" : "top 82%",

          toggleActions: "play none none none",

        },

      }

    );

  });

};



const initTilt = () => {

  tiltItems.forEach((item) => {

    item.addEventListener("pointermove", (event) => {

      if (prefersReducedMotion.matches) return;



      const rect = item.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;



      item.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);

      item.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);

    });



    item.addEventListener("pointerleave", () => {

      item.style.setProperty("--tilt-x", "0deg");

      item.style.setProperty("--tilt-y", "0deg");

    });

  });

};



const initGrain = () => {
  const grain = document.querySelector("[data-grain]");

  if (!grain || prefersReducedMotion.matches) return;

  let frame = 0;

  gsap.ticker.add(() => {
    frame += 1;

    if (frame % 12 !== 0) return;

    grain.style.transform = `translateX(${-(Math.random() * 15)}%) translateY(${Math.random() * 30}%)`;
  });
};

const initEpisodesSlider = () => {
  const slider = document.querySelector("[data-episodes-slider]");

  if (!slider) return;

  const equalizeSlideHeights = () => {
    const slides = [...slider.querySelectorAll(".swiper-slide")];

    slides.forEach((slide) => {
      slide.style.height = "";
    });

    const maxHeight = slides.reduce(
      (height, slide) => Math.max(height, slide.offsetHeight),
      0
    );

    if (!maxHeight) return;

    slides.forEach((slide) => {
      slide.style.height = `${maxHeight}px`;
    });

    slider.style.height = `${maxHeight}px`;
  };

  const swiper = new Swiper(slider, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 700,
    autoHeight: false,
    navigation: {
      nextEl: "[data-episodes-next]",
      prevEl: "[data-episodes-prev]",
    },
    pagination: {
      el: "[data-episodes-pagination]",
      clickable: true,
    },
    on: {
      init: equalizeSlideHeights,
      resize: equalizeSlideHeights,
    },
  });

  slider.querySelectorAll("img").forEach((image) => {
    if (image.complete) return;
    image.addEventListener("load", equalizeSlideHeights, { once: true });
  });

  window.addEventListener("resize", equalizeSlideHeights);
  window.addEventListener("load", equalizeSlideHeights);

  return swiper;
};



initLenis();

initGrain();

initHeroEntrance();

initSectionReveals();

initTilt();

initEpisodesSlider();



window.addEventListener("load", () => ScrollTrigger.refresh());

