(function () {
  'use strict';

  var LOCAL_SERVICE_PATHS = {
    '/botox-winchester-va': true,
    '/daxxify-winchester-va': true,
    '/dermal-filler-winchester-va': true,
    '/lip-filler-winchester-va': true,
    '/microneedling-winchester-va': true,
    '/hair-restoration-winchester-va': true,
    '/sculptra-winchester-va': true
  };

  function normalizePath(pathname) {
    var path = (pathname || '/').replace(/\/+$/, '');
    if (!path || path === '/index.html') return '/';
    return path;
  }

  function ensureStyles() {
    if (document.getElementById('calibrae-local-signal-styles')) return;
    var style = document.createElement('style');
    style.id = 'calibrae-local-signal-styles';
    style.textContent = [
      '.calibrae-local-details{max-width:720px;margin:22px auto 0;padding-top:18px;border-top:1px solid rgba(255,255,255,0.10);color:rgba(255,255,255,0.62);font-size:.79rem;line-height:1.72;letter-spacing:.025em;text-align:center;}',
      '.calibrae-local-details strong{color:rgba(255,255,255,0.82);font-weight:600;}',
      '.calibrae-local-hours{margin-top:18px;color:inherit;line-height:1.68;}',
      '@media(max-width:720px){.calibrae-local-details{font-size:.76rem;margin-top:18px;padding-top:16px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function homepagePass() {
    var path = normalizePath(window.location.pathname);
    if (path !== '/') return;

    var contactInfo = document.querySelector('#contact-page .panel.stack .small');
    if (!contactInfo || contactInfo.querySelector('.calibrae-local-hours')) return;

    var hours = document.createElement('div');
    hours.className = 'calibrae-local-hours';
    hours.innerHTML = '<strong>Hours</strong><br />Monday&ndash;Saturday, 9 AM&ndash;6 PM<br />Sunday closed';
    contactInfo.appendChild(hours);
  }

  function servicePagePass() {
    var path = normalizePath(window.location.pathname);
    if (!LOCAL_SERVICE_PATHS[path]) return;

    var closing = document.querySelector('.closing-card');
    if (!closing || closing.querySelector('.calibrae-local-details')) return;

    var details = document.createElement('div');
    details.className = 'calibrae-local-details';
    details.innerHTML = '<strong>Calibrae Institute of Aesthetic Medicine</strong><br />3343 Valley Pike, Suite 400 &middot; Winchester, VA 22602<br />Monday&ndash;Saturday, 9 AM&ndash;6 PM &middot; Sunday closed';
    closing.appendChild(details);
  }

  function run() {
    ensureStyles();
    homepagePass();
    servicePagePass();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}());
