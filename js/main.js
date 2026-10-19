/* ==========================================================================
   main.js
   --------------------------------------------------------------------------
   Small progressive enhancements. The site is fully readable with JS
   turned off; this file only adds conveniences on top.

   Loaded with `defer` in the HTML, which means:
     - it downloads in parallel with the page
     - it runs only after the HTML is fully parsed
   so we can safely look up elements without waiting for DOMContentLoaded.
   ========================================================================== */


/* ---- 1. Mobile nav toggle -------------------------------------------------
   On small screens the nav links are hidden behind a "Menu" button.
   We flip a data-open attribute and let CSS decide what that looks like
   (see "Header & nav" in main.css). aria-expanded tells screen readers
   whether the menu is open. */
const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");

if (nav && navToggle) {
  const setOpen = (open) => {
    nav.dataset.open = String(open);              // -> data-open="true"/"false"
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.textContent = open ? "Close" : "Menu";
  };

  navToggle.addEventListener("click", () => {
    setOpen(nav.dataset.open !== "true");
  });

  // Close the menu after tapping a link, otherwise it stays open
  // and covers the section you just jumped to.
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // Escape closes it too, and returns focus to the button.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.dataset.open === "true") {
      setOpen(false);
      navToggle.focus();
    }
  });
}


/* ---- 2. Footer year -------------------------------------------------------
   Any element with data-year gets the current year, so the footer
   copyright never goes stale. */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});


/* ---- 3. Roadmap focus -----------------------------------------------------
   Each accomplishments milestone grows as it approaches the vertical
   middle of the screen and shrinks as it moves away.

   How: on scroll, measure how far each item's dot is from the screen's
   middle, turn that into a 0..1 "focus" value, and hand it to CSS as the
   --focus variable. CSS (main.css, "Roadmap focus") does the actual
   scaling/fading, so JS never touches styles directly.

   requestAnimationFrame batches the work to once per frame, no matter how
   many scroll events fire, so scrolling stays smooth. */
const milestones = document.querySelectorAll(".timeline__item");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (milestones.length && !reduceMotion) {
  let ticking = false;

  const updateFocus = () => {
    const middle = window.innerHeight / 2;
    // Beyond this distance (25% of the screen height) an item is fully "far".
    // Bigger number = gentler, wider falloff; smaller = only the centered one pops.
    const range = window.innerHeight * 0.25;

    milestones.forEach((item) => {
      const box = item.getBoundingClientRect();
      // Use the top of the item (where the dot is), not its center,
      // so the dot is what lines up with the middle of the screen.
      const distance = Math.abs(box.top + 12 - middle);
      const t = Math.min(distance / range, 1);   // 0 = centered, 1 = far
      // Smoothstep-style ease: lingers near full size, then drops off.
      const focus = 1 - t * t * (3 - 2 * t);
      item.style.setProperty("--focus", focus.toFixed(3));
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateFocus);
    }
  };

  // passive: tells the browser we never block scrolling, so it can scroll
  // immediately instead of waiting on this function.
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateFocus();
}
