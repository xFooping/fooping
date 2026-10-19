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
