(function () {
  'use strict';

  function applyDetailedLayerGraphic() {
    var path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    if (path !== '/' && path !== '/index.html') return;

    var image = document.querySelector('#treatments-layer-method-home .ux-treatment-visual img');
    if (!image) return;

    image.src = '/images/layer-method-detailed-skin-layers.webp';
    image.alt = 'The Layer Method detailed anatomy graphic showing skin surface, epidermis, dermis, subcutaneous fat, fascia, muscle, bone and corresponding treatment layers';
    image.loading = 'lazy';
    image.decoding = 'async';
    image.style.width = '100%';
    image.style.height = 'auto';
    image.style.maxHeight = 'none';
    image.style.objectFit = 'contain';
    image.style.objectPosition = 'center center';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDetailedLayerGraphic, { once: true });
  } else {
    applyDetailedLayerGraphic();
  }
}());
