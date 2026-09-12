(function () {
  'use strict';

  function normalizePath(pathname) {
    var path = (pathname || '/').replace(/\/+$/, '');
    return path || '/';
  }

  function ensureFavicon() {
    var existing = document.querySelector('link[rel~="icon"]');
    if (existing) {
      existing.href = '/favicon.png';
      existing.type = 'image/png';
      existing.setAttribute('sizes', '96x96');
      return;
    }

    var link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.sizes = '96x96';
    link.href = '/favicon.png';
    document.head.appendChild(link);
  }

  function improveConsultationTargets() {
    var path = normalizePath(window.location.pathname);
    var onHomepage = path === '/' || path === '/index.html';

    Array.prototype.forEach.call(document.querySelectorAll('a.btn'), function (link) {
      if (link.textContent.trim() !== 'Request Consultation') return;

      if (onHomepage && link.getAttribute('href') === '#contact-page') {
        link.setAttribute('href', '#contact-request-form');
      } else if (!onHomepage && link.getAttribute('href') === '/#contact-page') {
        link.setAttribute('href', '/#contact-request-form');
      }
    });
  }

  function refreshHomepageImages() {
    var path = normalizePath(window.location.pathname);
    if (path !== '/' && path !== '/index.html') return;

    var startHereCard = Array.prototype.find.call(document.querySelectorAll('#entry-points article.card'), function (card) {
      var heading = card.querySelector('h3');
      return heading && heading.textContent.trim() === 'Start Here';
    });
    if (startHereCard) {
      var startHereImage = startHereCard.querySelector('img.entry-image');
      if (startHereImage) {
        startHereImage.src = '/images/entry-start-here-clinic.png';
        startHereImage.alt = 'Calibrae Institute consultation setting in Winchester, Virginia';
      }
    }

    var skinServicePanel = document.querySelector('#services-home .service-panel.skin');
    if (skinServicePanel) {
      skinServicePanel.style.backgroundImage = "url('/images/entry-skin-luxury.png')";
      skinServicePanel.style.backgroundPosition = 'center 48%';
      skinServicePanel.style.backgroundSize = 'cover';
    }

    var founderPhoto = document.querySelector('#about-home .about-home-photo');
    if (founderPhoto) {
      founderPhoto.style.backgroundImage = "url('/images/start-here-founder2.png')";
      founderPhoto.style.backgroundPosition = 'center 12%';
      founderPhoto.style.backgroundSize = 'cover';
    }
  }

  function correctVisiblePolish() {
    Array.prototype.forEach.call(document.querySelectorAll('.kicker'), function (node) {
      if (node.textContent.trim() === 'REGNERATIVE TREATMENTS') {
        node.textContent = 'REGENERATIVE TREATMENTS';
      }
    });
  }

  function run() {
    ensureFavicon();
    improveConsultationTargets();
    refreshHomepageImages();
    correctVisiblePolish();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}());
