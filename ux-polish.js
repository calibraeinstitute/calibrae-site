(function () {
  'use strict';

  var BOOKING_URL = 'https://web2.myaestheticspro.com/BN/index.cfm?3B99CD1D946B564730D08902C37429094CFC2165279C2B6FC9B29ADF9D0A6FBB';

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
      '.ux-treatment-visual{margin:0 0 30px;border-radius:28px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);background:#f2efea;box-shadow:0 18px 44px rgba(0,0,0,0.14);display:flex;align-items:center;justify-content:center;min-height:300px;}',
      '.ux-treatment-visual img{display:block;width:100%;height:420px;object-fit:contain;object-position:center center;background:#f2efea;}',
      '.ux-start-here-image{width:100%!important;height:320px!important;object-fit:cover!important;object-position:50% 30%!important;}',
      '.hero-image img{transition:transform .35s ease,filter .35s ease;}',
      '.hero-image:hover img{transform:scale(1.015);}',
      '#contact-page .ux-phone-actions{display:inline-flex;gap:12px;flex-wrap:wrap;margin-top:4px;}',
      '#contact-page .ux-phone-actions a{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;}',
      '.ux-booking-confirmed{box-shadow:0 10px 24px rgba(0,0,0,0.12);}',
      '.ux-booking-nav{display:inline-flex!important;align-items:center;justify-content:center;min-height:40px;padding:0 17px!important;border-radius:999px!important;border:1px solid #f7f7f5!important;background:#f7f7f5!important;background-image:none!important;color:#1d1d1d!important;font-weight:700!important;white-space:nowrap;}',
      '.ux-booking-nav:hover{background:#fff!important;border-color:#fff!important;color:#111!important;transform:translateY(-1px);}',
      '.ux-booking-cta{background:#f7f7f5!important;color:#1d1d1d!important;border-color:#f7f7f5!important;font-weight:700!important;}',
      '.ux-booking-cta:hover{background:#fff!important;border-color:#fff!important;color:#111!important;}',
      '.ux-mobile-booking{display:none;}',
      '@media(max-width:720px){.ux-treatment-visual{margin-bottom:22px;border-radius:22px;min-height:220px;}.ux-treatment-visual img{height:280px;object-fit:contain;}.ux-start-here-image{height:280px!important;object-position:50% 28%!important;}.hero-image:hover img{transform:none;}.calibrae-service-page .nav-inner{flex-wrap:wrap;padding:10px 0;}.calibrae-service-page .nav .links{width:100%;flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;gap:18px;padding:2px 0 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch;}.calibrae-service-page .nav .links::-webkit-scrollbar{display:none;}.calibrae-service-page .nav .links a{white-space:nowrap;flex:0 0 auto;}.ux-booking-nav{min-height:44px;}.ux-mobile-booking{display:flex;position:fixed;left:14px;right:14px;bottom:14px;z-index:9999;align-items:center;justify-content:center;min-height:54px;border-radius:999px;background:#f7f7f5;color:#171717!important;border:1px solid rgba(0,0,0,.08);box-shadow:0 14px 36px rgba(0,0,0,.28);font-weight:700;letter-spacing:.02em;}.ux-has-mobile-booking{padding-bottom:82px;}}',
      '@media(prefers-reduced-motion:reduce){.hero-image img{transition:none!important;transform:none!important;}.ux-booking-nav{transition:none!important;}}'
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

  function isBookingLink(link) {
    if (!link) return false;
    var href = link.getAttribute('href') || '';
    var label = (link.textContent || '').trim().toLowerCase();
    return href.indexOf('myaestheticspro.com/BN/index.cfm') !== -1 || label === 'book online' || label === 'book now';
  }

  function findBookingLink(container) {
    if (!container) return null;
    return Array.prototype.find.call(container.querySelectorAll('a'), isBookingLink) || null;
  }

  function makeBookingLink(className) {
    var link = document.createElement('a');
    link.href = BOOKING_URL;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Book Online';
    link.setAttribute('aria-label', 'Book an appointment online with Calibrae Institute');
    link.className = className || '';
    return link;
  }

  function ensureBookingInContainer(container, className, insertFirst) {
    if (!container) return null;

    var existing = findBookingLink(container);
    if (existing) {
      if (className) {
        className.split(' ').forEach(function (name) {
          if (name) existing.classList.add(name);
        });
      }
      return existing;
    }

    var link = makeBookingLink(className);
    if (insertFirst && container.firstElementChild) {
      container.insertBefore(link, container.firstElementChild);
    } else {
      container.appendChild(link);
    }
    return link;
  }

  function ensureVisibleBookingCTAs() {
    var nav = document.querySelector('header.nav nav.links');
    if (nav) {
      var existingNavBooking = findBookingLink(nav);
      if (existingNavBooking) {
        existingNavBooking.classList.add('ux-booking-nav');
      } else {
        var navBooking = makeBookingLink('nav-item ux-booking-nav');
        var contactLink = nav.querySelector('a[href="#contact-page"], a[href="/#contact-page"]');
        if (contactLink) nav.insertBefore(navBooking, contactLink);
        else nav.appendChild(navBooking);
      }
    }

    if (isHomepage()) {
      ensureBookingInContainer(document.querySelector('.hero .btn-row'), 'btn ux-booking-cta', false);

      var startHereCard = Array.prototype.find.call(document.querySelectorAll('#entry-points article.card'), function (card) {
        var heading = card.querySelector('h3');
        return heading && heading.textContent.trim() === 'Start Here';
      });
      if (startHereCard) {
        ensureBookingInContainer(startHereCard.querySelector('.entry-actions'), 'btn ux-booking-cta', false);
      }

      ensureBookingInContainer(document.querySelector('#contact-page .panel.stack .btn-row'), 'btn ux-booking-cta', false);
      ensureBookingInContainer(document.querySelector('#final-cta .final-cta-actions, #final-cta .btn-row'), 'btn ux-booking-cta', false);

      var footerLinks = document.querySelector('.footer .mini-links');
      if (footerLinks) ensureBookingInContainer(footerLinks, 'ux-booking-confirmed', true);
    } else {
      ensureBookingInContainer(document.querySelector('.hero .btn-row'), 'btn ux-booking-cta', false);
      ensureBookingInContainer(document.querySelector('.closing-card .btn-row'), 'btn ux-booking-cta', false);
    }

    if (!document.querySelector('.ux-mobile-booking')) {
      var mobileBooking = makeBookingLink('ux-mobile-booking');
      document.body.appendChild(mobileBooking);
      document.body.classList.add('ux-has-mobile-booking');
    }
  }

  function verifyBookingActions() {
    Array.prototype.forEach.call(document.querySelectorAll('a'), function (link) {
      if (!isBookingLink(link)) return;

      link.href = BOOKING_URL;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', 'Book an appointment online with Calibrae Institute');
      link.classList.add('ux-booking-confirmed');
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
        startHereImage.src = '/images/start-here-founder.jpg.png';
        startHereImage.alt = 'Provider-led consultation and treatment planning at Calibrae Institute in Winchester, Virginia';
        startHereImage.classList.add('ux-start-here-image');
        startHereImage.loading = 'lazy';
        startHereImage.decoding = 'async';
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
    if (treatmentSection && treatmentIntro) {
      var treatmentVisual = treatmentSection.querySelector('.ux-treatment-visual');
      if (!treatmentVisual) {
        treatmentVisual = document.createElement('div');
        treatmentVisual.className = 'ux-treatment-visual reveal-image is-visible';

        var treatmentImage = document.createElement('img');
        treatmentImage.src = '/images/layer-method-principles.png.png';
        treatmentImage.alt = 'Calibrae Layer Method principles for diagnosis-first treatment planning';
        treatmentImage.loading = 'lazy';
        treatmentImage.decoding = 'async';

        treatmentVisual.appendChild(treatmentImage);
        treatmentIntro.insertAdjacentElement('afterend', treatmentVisual);
      } else {
        var existingTreatmentImage = treatmentVisual.querySelector('img');
        if (existingTreatmentImage) {
          existingTreatmentImage.style.objectFit = 'contain';
          existingTreatmentImage.style.objectPosition = 'center center';
        }
      }
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
    ensureVisibleBookingCTAs();
    improveExternalActionLabels();
    verifyBookingActions();
    correctVisiblePolish();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}());
