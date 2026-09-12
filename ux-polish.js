(function () {
  'use strict';

  function normalizePath(pathname) {
    var path = (pathname || '/').replace(/\/+$/, '');
    return path || '/';
  }

  function getPath() {
    return normalizePath(window.location.pathname);
  }

  function isHomepage() {
    var path = getPath();
    return path === '/' || path === '/index.html';
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

  function ensurePolishStyles() {
    if (document.getElementById('calibrae-ux-polish-styles')) return;

    var style = document.createElement('style');
    style.id = 'calibrae-ux-polish-styles';
    style.textContent = [
      '.ux-treatment-visual{margin:0 0 30px;border-radius:28px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.025);box-shadow:0 18px 44px rgba(0,0,0,0.14);}',
      '.ux-treatment-visual img{display:block;width:100%;max-height:430px;object-fit:cover;object-position:center;}',
      '.hero-image img{transition:transform .35s ease,filter .35s ease;}',
      '.hero-image:hover img{transform:scale(1.015);}',
      '#contact-page .ux-phone-actions{display:inline-flex;gap:12px;flex-wrap:wrap;margin-top:4px;}',
      '#contact-page .ux-phone-actions a{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;}',
      '@media(max-width:720px){.ux-treatment-visual{margin-bottom:22px;border-radius:22px;}.ux-treatment-visual img{max-height:300px;}.hero-image:hover img{transform:none;}.calibrae-service-page .nav-inner{flex-wrap:wrap;padding:10px 0;}.calibrae-service-page .nav .links{width:100%;flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;gap:18px;padding:2px 0 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch;}.calibrae-service-page .nav .links::-webkit-scrollbar{display:none;}.calibrae-service-page .nav .links a{white-space:nowrap;flex:0 0 auto;}}',
      '@media(prefers-reduced-motion:reduce){.hero-image img{transition:none!important;transform:none!important;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function improveConsultationTargets() {
    var onHomepage = isHomepage();

    Array.prototype.forEach.call(document.querySelectorAll('a.btn'), function (link) {
      if (link.textContent.trim() !== 'Request Consultation') return;

      if (onHomepage && link.getAttribute('href') === '#contact-page') {
        link.setAttribute('href', '#contact-request-form');
      } else if (!onHomepage && link.getAttribute('href') === '/#contact-page') {
        link.setAttribute('href', '/#contact-request-form');
      }
    });
  }

  function improveContactActions() {
    if (!isHomepage()) return;

    var contactInfo = document.querySelector('#contact-page .small');
    if (!contactInfo || contactInfo.querySelector('.ux-phone-actions')) return;

    var phoneBlock = Array.prototype.find.call(contactInfo.children, function (node) {
      return node.textContent && node.textContent.trim().indexOf('Phone') === 0;
    });
    if (!phoneBlock) return;

    phoneBlock.innerHTML = '<strong>Phone</strong><br /><span class="ux-phone-actions"><a href="tel:+17035931948">Call (703) 593-1948</a><a href="sms:+17035931948">Text Calibrae</a></span>';
  }

  function refreshHomepageImages() {
    if (!isHomepage()) return;

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

    var injectablesServicePanel = document.querySelector('#services-home .service-panel.injectables');
    if (injectablesServicePanel) {
      injectablesServicePanel.style.backgroundImage = "url('/images/sculptra-hero-1537.jpg')";
      injectablesServicePanel.style.backgroundPosition = 'center 44%';
      injectablesServicePanel.style.backgroundSize = 'cover';
    }

    var treatmentSection = document.querySelector('#treatments-layer-method-home .wrap');
    var treatmentIntro = treatmentSection ? treatmentSection.querySelector('.treatment-method-intro') : null;
    if (treatmentSection && treatmentIntro && !treatmentSection.querySelector('.ux-treatment-visual')) {
      var treatmentVisual = document.createElement('div');
      treatmentVisual.className = 'ux-treatment-visual reveal-image is-visible';

      var treatmentImage = document.createElement('img');
      treatmentImage.src = '/images/layer-method-principles.png.png';
      treatmentImage.alt = 'Calibrae Layer Method visual showing the relationship between structure, movement, skin quality, and treatment planning';
      treatmentImage.loading = 'lazy';
      treatmentImage.decoding = 'async';

      treatmentVisual.appendChild(treatmentImage);
      treatmentIntro.insertAdjacentElement('afterend', treatmentVisual);
    }

    var founderPhoto = document.querySelector('#about-home .about-home-photo');
    if (founderPhoto) {
      founderPhoto.style.backgroundImage = "url('/images/start-here-founder2.png')";
      founderPhoto.style.backgroundPosition = 'center 12%';
      founderPhoto.style.backgroundSize = 'cover';
      founderPhoto.setAttribute('role', 'img');
      founderPhoto.setAttribute('aria-label', 'Danielle Wiley, PA-C, founder and clinical provider at Calibrae Institute');
    }
  }

  function refreshServiceHeroImages() {
    var path = getPath();
    var map = {
      '/botox-winchester-va': {
        src: '/images/entry-injectables-luxury.png',
        alt: 'Refined clinical injectables setting representing Botox treatment planning at Calibrae Institute'
      },
      '/daxxify-winchester-va': {
        src: '/images/sitehero1.jpg',
        alt: 'Editorial facial image representing movement-focused Daxxify treatment planning at Calibrae Institute'
      },
      '/dermal-filler-winchester-va': {
        src: '/images/start-here-founder.jpg.png',
        alt: 'Danielle Wiley, PA-C representing provider-led facial assessment and facial balancing planning at Calibrae Institute'
      },
      '/lip-filler-winchester-va': {
        src: '/skin-closeup.png',
        alt: 'Close facial detail representing lip proportion, framing, and lower-face treatment planning at Calibrae Institute'
      },
      '/microneedling-winchester-va': {
        src: '/images/entry-skin-luxury.png',
        alt: 'Clinical skin-quality image representing microneedling treatment planning at Calibrae Institute'
      }
    };

    var config = map[path];
    if (!config) return;

    var image = document.querySelector('.hero .hero-image img');
    if (!image) return;

    image.src = config.src;
    image.alt = config.alt;
    image.loading = 'eager';
    image.decoding = 'async';
  }

  function improveExternalActionLabels() {
    Array.prototype.forEach.call(document.querySelectorAll('a[target="_blank"]'), function (link) {
      if (!link.rel || link.rel.indexOf('noopener') === -1) {
        link.rel = (link.rel ? link.rel + ' ' : '') + 'noopener';
      }
    });
  }

  function correctVisiblePolish() {
    Array.prototype.forEach.call(document.querySelectorAll('.kicker'), function (node) {
      if (node.textContent.trim() === 'REGNERATIVE TREATMENTS') {
        node.textContent = 'REGENERATIVE TREATMENTS';
      }
    });
  }

  function run() {
    if (!isHomepage()) document.body.classList.add('calibrae-service-page');
    ensureFavicon();
    ensurePolishStyles();
    improveConsultationTargets();
    improveContactActions();
    refreshHomepageImages();
    refreshServiceHeroImages();
    improveExternalActionLabels();
    correctVisiblePolish();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}());
