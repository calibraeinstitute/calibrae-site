(function () {
  'use strict';

  var BOOKING_URL = 'https://web2.myaestheticspro.com/BN/index.cfm?3B99CD1D946B564730D08902C37429094CFC2165279C2B6FC9B29ADF9D0A6FBB';
  var SHOP_URL = 'https://calibrae-skin.myshopify.com';
  var SHOP_IMAGE = 'https://calibrae-skin.myshopify.com/cdn/shop/files/30.jpg?v=1782330305&width=1200';

  function isHomepage() {
    var path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    return path === '/' || path === '/index.html';
  }

  function addStyles() {
    if (document.getElementById('calibrae-final-polish-styles')) return;
    var style = document.createElement('style');
    style.id = 'calibrae-final-polish-styles';
    style.textContent = [
      '#entry-points .skin-entry-image{object-position:center 48%!important;}',
      '#treatments-layer-method-home .ux-treatment-visual img{width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important;object-position:center center!important;background:#f2efea!important;}',
      '#treatments-layer-method-home .ux-treatment-visual{min-height:0!important;}',
      '.ux-shop-products-image{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;object-position:center 58%;border-radius:20px;border:1px solid rgba(255,255,255,.14);margin:10px 0 20px;box-shadow:0 16px 34px rgba(0,0,0,.16);}',
      '.ux-shop-products-card{background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.035))!important;}',
      '.ux-shop-products-card .btn.primary{box-shadow:0 10px 24px rgba(0,0,0,.15);}',
      '@media(max-width:720px){#entry-points .skin-entry-image{object-position:center 46%!important;}.ux-shop-products-image{aspect-ratio:1.15/1;object-position:center 60%;border-radius:18px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function restoreEntryPointImages() {
    if (!isHomepage()) return;

    var cards = document.querySelectorAll('#entry-points article.card');
    Array.prototype.forEach.call(cards, function (card) {
      var heading = card.querySelector('h3');
      var image = card.querySelector('img.entry-image');
      if (!heading || !image) return;

      if (heading.textContent.trim() === 'Skin') {
        image.src = '/images/skin-card-serum.jpg.png';
        image.classList.add('skin-entry-image');
        image.alt = 'Calibrae skin-focused visual with the message skin is an organ';
      }

      if (heading.textContent.trim() === 'Injectables') {
        image.src = '/images/entry-injectables-luxury.png';
        image.removeAttribute('style');
      }

      if (heading.textContent.trim() === 'Start Here') {
        image.src = '/images/start-here-founder.jpg.png';
        image.classList.remove('ux-start-here-image');
        image.removeAttribute('style');
        image.alt = 'Consultation-focused founder guidance';
      }
    });
  }

  function replaceLayerMethodGraphic() {
    if (!isHomepage()) return;
    var image = document.querySelector('#treatments-layer-method-home .ux-treatment-visual img');
    if (!image) return;
    image.src = '/images/Calibrae-layer-method-artwork.png';
    image.alt = 'The Layer Method anatomical graphic showing skin surface, epidermis, dermis, subcutaneous fat, fascia, muscle, bone and corresponding treatment layers';
    image.loading = 'lazy';
    image.decoding = 'async';
  }

  function addLayerMethodBooking() {
    if (!isHomepage()) return;
    var row = document.querySelector('.layer-method-actions');
    if (!row) return;

    var existing = Array.prototype.find.call(row.querySelectorAll('a'), function (link) {
      return (link.textContent || '').trim().toLowerCase() === 'book online';
    });
    if (existing) {
      existing.href = BOOKING_URL;
      existing.target = '_blank';
      existing.rel = 'noopener';
      return;
    }

    var booking = document.createElement('a');
    booking.href = BOOKING_URL;
    booking.target = '_blank';
    booking.rel = 'noopener';
    booking.className = 'btn secondary ux-booking-confirmed';
    booking.textContent = 'Book Online';
    booking.setAttribute('aria-label', 'Book an appointment online with Calibrae Institute');
    row.appendChild(booking);
  }

  function refreshShopProductsCard() {
    if (!isHomepage()) return;

    var section = Array.prototype.find.call(document.querySelectorAll('#skin-page .skin-page-section'), function (node) {
      var heading = node.querySelector('.skin-page-section-head h3');
      return heading && heading.textContent.trim() === 'Start with the path that fits you best.';
    });
    if (!section) return;

    var intro = section.querySelector('.skin-page-section-head');
    if (intro) {
      var paragraphs = intro.querySelectorAll('p');
      Array.prototype.forEach.call(paragraphs, function (paragraph) {
        if (paragraph.classList.contains('skin-page-subtitle')) return;
        if (paragraph.textContent.indexOf('Whether you want provider-guided direction') === 0) {
          paragraph.textContent = 'Whether you want provider-guided direction or prefer to explore on your own, Calibrae offers a clear way to begin. Start with the guided skin quiz for a more personalized recommendation, or explore Calibrae skincare online and shop the collection at your own pace.';
        }
      });
    }

    var card = Array.prototype.find.call(section.querySelectorAll('.skin-page-entry-card'), function (node) {
      var heading = node.querySelector('h4');
      return heading && heading.textContent.trim() === 'Shop Products';
    });
    if (!card) return;
    card.classList.add('ux-shop-products-card');

    var heading = card.querySelector('h4');
    var image = card.querySelector('.ux-shop-products-image');
    if (!image) {
      image = document.createElement('img');
      image.className = 'ux-shop-products-image';
      image.src = SHOP_IMAGE;
      image.alt = 'Calibrae Skin clinical skincare collection';
      image.loading = 'lazy';
      image.decoding = 'async';
      if (heading) heading.insertAdjacentElement('afterend', image);
      else card.insertBefore(image, card.firstChild);
    }

    var copy = Array.prototype.find.call(card.querySelectorAll('p'), function (paragraph) {
      return paragraph.textContent.indexOf('If you already know what you need') === 0 || paragraph.textContent.indexOf('Explore Calibrae skincare online') === 0;
    });
    if (copy) {
      copy.textContent = 'Explore Calibrae skincare online and browse products designed to cleanse, hydrate, protect, and renew. Shop the collection and find the essentials that support your skin goals.';
    }

    var button = Array.prototype.find.call(card.querySelectorAll('a'), function (link) {
      return (link.textContent || '').trim() === 'Shop Products';
    });
    if (button) {
      button.href = SHOP_URL;
      button.target = '_blank';
      button.rel = 'noopener';
      button.classList.remove('secondary');
      button.classList.add('primary');
    }
  }

  function run() {
    addStyles();
    restoreEntryPointImages();
    replaceLayerMethodGraphic();
    addLayerMethodBooking();
    refreshShopProductsCard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}());
