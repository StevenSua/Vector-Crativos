/* Header, footer y modal compartidos — funciona sin servidor */
(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "inicio";

  var navItems = [
    { id: "inicio", href: "index.html", label: "Inicio" },
    { id: "tienda", href: "tienda.html", label: "Tienda" },
    { id: "empresas", href: "empresas.html", label: "Empresas" },
    { id: "proceso", href: "proceso.html", label: "Cómo trabajamos" },
    { id: "nosotros", href: "nosotros.html", label: "Nosotros" },
    { id: "contacto", href: "contacto.html", label: "Contacto" },
  ];

  var navHtml = navItems
    .map(function (item) {
      var active = item.id === page ? " is-active" : "";
      return '<li><a href="' + item.href + '" class="nav__link' + active + '">' + item.label + "</a></li>";
    })
    .join("");

  var headerHtml =
    '<div class="top-strip">' +
    '<div class="container top-strip__inner">' +
    "<span>Producción gráfica integral · Promocionales · Impresión · Exhibición</span>" +
    "<span><strong>WhatsApp:</strong> 316 519 4900</span>" +
    "</div></div>" +
    '<header class="header" id="header">' +
    '<div class="container nav">' +
    '<a href="index.html" class="brand" aria-label="Vector Creativos - Inicio">' +
    '<img src="assets/logo-vector-creativos.png" alt="Vector Creativos" class="brand__logo" width="320" height="64" />' +
    "</a>" +
    '<nav class="nav__menu" id="navMenu" aria-label="Navegación principal">' +
    "<ul>" + navHtml + "</ul></nav>" +
    '<div class="nav__actions">' +
    '<button type="button" class="btn btn-outline js-open-quote">Cotizar</button>' +
    '<a href="https://wa.me/573165194900" class="btn btn-primary" target="_blank" rel="noopener">WhatsApp</a>' +
    '<button type="button" class="nav__toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="navMenu">' +
    "<span></span><span></span><span></span></button></div></div></header>";

  var footerHtml =
    '<footer class="footer">' +
    '<div class="container"><div class="footer__grid">' +
    "<div><div class=\"footer__brand\"><span class=\"footer__mark\" aria-hidden=\"true\"></span><strong>VECTOR CREATIVOS</strong></div>" +
    "<p>Soluciones gráficas, promocionales y corporativas para marcas, eventos y empresas.</p></div>" +
    "<div><h3>Tienda</h3><ul>" +
    '<li><a href="tienda.html">Impresión</a></li>' +
    '<li><a href="tienda.html">Textiles</a></li>' +
    '<li><a href="tienda.html">Tazas y vasos</a></li>' +
    '<li><a href="tienda.html">Oficina y escolar</a></li>' +
    '<li><a href="tienda.html">Edición especial</a></li></ul></div>' +
    "<div><h3>Empresas</h3><ul>" +
    '<li><a href="empresas.html">Exhibición</a></li>' +
    '<li><a href="empresas.html">Promocionales</a></li>' +
    '<li><a href="empresas.html">Diseño e impresión</a></li>' +
    '<li><a href="empresas.html">Kits corporativos</a></li></ul></div>' +
    "<div><h3>Atención</h3><ul>" +
    '<li><a href="contacto.html">Cotizar</a></li>' +
    '<li><a href="https://wa.me/573165194900" target="_blank" rel="noopener">WhatsApp</a></li>' +
    '<li><a href="proceso.html">Cómo trabajamos</a></li>' +
    '<li><a href="nosotros.html">Nosotros</a></li></ul></div>' +
    "<div><h3>Contacto</h3><ul>" +
    "<li>316 519 4900</li><li>contacto@vectorcreativos.com</li><li>Colombia</li><li>Lun a Vie · 8:00 - 6:00</li></ul></div>" +
    "</div><div class=\"footer__bottom\">" +
    '<p>© <span id="year"></span> Vector Creativos. Todos los derechos reservados.</p>' +
    "<p>Política de privacidad · Tratamiento de datos · Términos y condiciones</p></div></div></footer>" +
    '<button type="button" class="to-top" id="toTop" aria-label="Volver arriba">↑</button>';

  var modalHtml =
    '<div class="modal" id="quoteModal" aria-hidden="true">' +
    '<div class="modal__overlay js-close-quote" tabindex="-1"></div>' +
    '<div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="quoteTitle">' +
    '<button type="button" class="modal__close js-close-quote" aria-label="Cerrar">×</button>' +
    '<span class="eyebrow">Solicitar cotización</span>' +
    '<h2 id="quoteTitle">Cuéntanos qué necesitas</h2>' +
    '<p class="modal__intro">Completa los datos y te contactamos con la mejor solución para tu marca.</p>' +
    '<form class="quote-form" id="quoteForm" novalidate>' +
    '<div class="quote-form__row"><label>Nombre<input type="text" name="nombre" placeholder="Tu nombre" required /></label>' +
    '<label>Empresa<input type="text" name="empresa" placeholder="Nombre de la empresa" /></label></div>' +
    '<div class="quote-form__row"><label>Correo<input type="email" name="correo" placeholder="correo@empresa.com" required /></label>' +
    '<label>WhatsApp<input type="tel" name="telefono" placeholder="300 000 0000" required /></label></div>' +
    '<label>Tipo de solución<select name="tipo"><option value="">Selecciona una opción</option>' +
    "<option>Compra rápida (tienda B2C)</option><option>Sistemas de exhibición</option>" +
    "<option>Promocionales corporativos</option><option>Diseño e impresión</option>" +
    "<option>Kits corporativos y eventos</option></select></label>" +
    '<label>Cuéntanos tu proyecto<textarea name="mensaje" rows="3" placeholder="Producto, cantidad, fecha requerida y referencias"></textarea></label>' +
    '<button type="submit" class="btn btn-primary btn-block">Enviar solicitud</button>' +
    '<p class="quote-form__success" id="quoteSuccess" hidden>✓ ¡Solicitud enviada! Te contactaremos pronto. <small>(Demostración — mockup sin envío real)</small></p>' +
    "</form></div></div>";

  var headerEl = document.getElementById("site-header");
  var footerEl = document.getElementById("site-footer");
  var modalEl = document.getElementById("site-modal");

  if (headerEl) headerEl.innerHTML = headerHtml;
  if (footerEl) footerEl.innerHTML = footerHtml;
  if (modalEl) modalEl.innerHTML = modalHtml;
})();
