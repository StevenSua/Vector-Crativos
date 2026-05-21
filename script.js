/* =========================================================
   VECTOR CREATIVOS — Mockup unificado
   Interacciones: menú móvil, scroll, filtros, modal, reveal
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // Cerrar al hacer clic en un enlace del menú
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Sombra del header al hacer scroll ---------- */
  var header = document.getElementById("header");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 10);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Botón volver arriba ---------- */
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Enlace activo en la navegación ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (sec) {
      navObserver.observe(sec);
    });
  }

  /* ---------- Filtros / pills de la tienda ---------- */
  var shopPills = document.getElementById("shopPills");
  if (shopPills) {
    shopPills.addEventListener("click", function (e) {
      var pill = e.target.closest(".pill");
      if (!pill) return;
      shopPills.querySelectorAll(".pill").forEach(function (p) {
        p.classList.remove("is-active");
      });
      pill.classList.add("is-active");
    });
  }

  /* ---------- Modal de cotización ---------- */
  var modal = document.getElementById("quoteModal");
  var quoteForm = document.getElementById("quoteForm");
  var quoteSuccess = document.getElementById("quoteSuccess");
  var lastFocused = null;

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeMenu();
    var firstField = modal.querySelector("input, select, textarea, button");
    if (firstField) firstField.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  // Abrir desde cualquier botón con la clase .js-open-quote
  document.querySelectorAll(".js-open-quote").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Cerrar desde overlay, X o botones .js-close-quote
  document.querySelectorAll(".js-close-quote").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Envío del formulario (demo — sin backend)
  if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!quoteForm.checkValidity()) {
        quoteForm.reportValidity();
        return;
      }
      if (quoteSuccess) quoteSuccess.hidden = false;
      quoteForm.reset();
      setTimeout(function () {
        closeModal();
        if (quoteSuccess) quoteSuccess.hidden = true;
      }, 2600);
    });
  }

  /* ---------- Animación reveal al hacer scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
