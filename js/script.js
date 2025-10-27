/* script.js - Dulce Obsesion (colocar en /js/script.js) */

/* Loader: oculta cuando la página haya cargado o después de 2.5s 
(function () {
  var loader = document.getElementById('siteLoader');
  function hideLoader(){
    if(!loader) return;
    loader.style.opacity = '0';
    setTimeout(function(){ loader.style.display = 'none'; }, 350);
  }
  // hide on window load or after 2.5s whichever first
  window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 2500);
})();*/

/* PRODUCT MODAL: renderiza data-product JSON */
(function(){
  var productModal = document.getElementById('productModal');
  if(productModal){
    productModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget;
      var data = button ? button.getAttribute('data-product') : null;
      try{ data = JSON.parse(data); }catch(e){ data = null; }
      if(data){
        document.getElementById('productModalTitle').textContent = data.title || '';
        document.getElementById('productModalPrice').textContent = data.price || '';
        document.getElementById('productModalDesc').textContent = data.desc || '';
        document.getElementById('productModalImg').src = data.img || '';
        var whatsappText = encodeURIComponent('Hola! Quiero pedir: ' + (data.title||'') + ' - Precio: ' + (data.price||''));
        document.getElementById('modalPedirBtn').href = 'https://wa.me/573000000000?text=' + whatsappText;
      }
    });
  }
})();

/* CONTACT FORM (demo): muestra feedback y limpia */
(function(){
  var contactForm = document.getElementById('contactForm');
  if(!contactForm) return;
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('name').value || '';
    // En demo mostramos alert; aquí se puede conectar un servicio real
    alert('Gracias, ' + name + '! Tu mensaje fue enviado (simulado).');
    contactForm.reset();
  });
})();

/* PEDIDO FORM -> abre WhatsApp con mensaje prellenado */
(function(){
  var pedidoForm = document.getElementById('pedidoForm');
  if(!pedidoForm) return;
  pedidoForm.addEventListener('submit', function(e){
    e.preventDefault();
    var nombre = document.getElementById('pedidoNombre').value || '';
    var telefono = document.getElementById('pedidoTelefono').value || '';
    var producto = document.getElementById('pedidoProducto').value || '';
    var detalles = document.getElementById('pedidoDetalles').value || '';
    var text = encodeURIComponent('Hola, soy ' + nombre + ' ('+telefono+'). Me interesa: ' + producto + '. Detalles: ' + detalles);
    window.open('https://wa.me/573102433009?text=' + text, '_blank');
    // cerrar modal
    var pedidoModalEl = document.getElementById('pedidoModal');
    try{
      var modal = bootstrap.Modal.getInstance(pedidoModalEl);
      if(modal) modal.hide();
    }catch(e){ /* ignore */ }
    pedidoForm.reset();
  });
})();

/* Pedir buttons in product cards: abren WhatsApp directamente */
(function(){
  document.querySelectorAll('.btn-pedir').forEach(function(btn){
    btn.addEventListener('click', function(e){
      // si es un boton que abre modal (tiene data-bs-toggle) no interferir
      if(this.getAttribute('data-bs-toggle') === 'modal') return;
      if(this.classList.contains('disabled')) return;
      var name = this.getAttribute('data-product-name') || '';
      var text = encodeURIComponent('Hola, quisiera pedir: ' + name);
      window.open('https://wa.me/573102433009?text=' + text, '_blank');
    });
  });
})();

/* FILTERS: mostrar solo disponibles / todos */
(function(){
  var filterAvailable = document.getElementById('filterAvailable');
  var filterAll = document.getElementById('filterAll');
  if(filterAvailable){
    filterAvailable.addEventListener('click', function(){
      document.querySelectorAll('#productsRow .col-md-4').forEach(function(col){
        var badge = col.querySelector('.badge');
        if(!badge || !badge.classList.contains('badge-available')) col.style.display = 'none'; else col.style.display = '';
      });
    });
  }
  if(filterAll){
    filterAll.addEventListener('click', function(){
      document.querySelectorAll('#productsRow .col-md-4').forEach(function(col){ col.style.display = ''; });
    });
  }
})();

/* Smooth scroll for nav links (fallback for older browsers) */
(function(){
  document.querySelectorAll('a.nav-link').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = this.getAttribute('href');
      // Si es un enlace que abre modal o no es un hash, no interferir
      if(this.getAttribute('data-bs-toggle') === 'modal' || !href || !href.startsWith('#')) return;
      
      e.preventDefault();
      var el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();


document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("footer");
  const btns = [document.getElementById("btnWhatsapp"), document.getElementById("btnCotizar")];

  function checkFooterPosition() {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    btns.forEach(btn => {
      if (!btn) return;

      if (footerRect.top < windowHeight - 100) {
        // Si el footer está visible, detener el botón
        btn.style.position = "absolute";
        btn.style.bottom = `${document.body.scrollHeight - footer.offsetTop + 20}px`;
      } else {
        // Si no se ve el footer, mantenerlo fijo
        btn.style.position = "fixed";
        if (btn.classList.contains("btn-cotizar")) {
          btn.style.bottom = "90px";
        } else {
          btn.style.bottom = "20px";
        }
      }
    });
  }

  window.addEventListener("scroll", checkFooterPosition);
  window.addEventListener("resize", checkFooterPosition);
});
