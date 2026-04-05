/* =============================================
   MERIDIAN NOTARY — main.js
   ============================================= */

(function () {
  "use strict";

  /* ---------- HEADER: scroll state ---------- */
  const header = document.getElementById("header");

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- BURGER MENU ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  function closeMobileNav() {
    burger.classList.remove("active");
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.classList.toggle("active");
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  /* Close nav when a link is clicked */
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  /* Close nav on ESC */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          /* Stagger siblings in the same parent */
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll(
              ".reveal:not(.visible)",
            ),
          );
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 400);

          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- SMOOTH SCROLL for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();

      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ---------- ACTIVE NAV LINK on scroll ---------- */
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  function updateActiveNav() {
    const scrollY = window.scrollY + header.offsetHeight + 60;

    let current = "";
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollY) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("nav__link--active");
      const href = link.getAttribute("href").replace("#", "");
      if (href === current) {
        link.classList.add("nav__link--active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
})();
