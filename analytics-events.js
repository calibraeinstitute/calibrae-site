(function () {
  'use strict';

  function sendEvent(eventName, extraParams) {
    if (typeof window.gtag !== 'function') return;
    var params = Object.assign({
      page_path: window.location.pathname || '/'
    }, extraParams || {});
    window.gtag('event', eventName, params);
  }

  // Count a completed website contact request only after the form provider
  // redirects back to the site's existing success state. No form values are read.
  try {
    var query = new URLSearchParams(window.location.search);
    if (query.get('contact') === 'success') {
      var leadKey = 'calibrae_ga4_generate_lead_' + (window.location.pathname || '/');
      if (!window.sessionStorage.getItem(leadKey)) {
        sendEvent('generate_lead', { lead_source: 'website_contact_form' });
        window.sessionStorage.setItem(leadKey, '1');
      }
    }
  } catch (e) {
    // If session storage is unavailable, do not collect anything extra.
  }

  document.addEventListener('click', function (event) {
    var anchor = event.target && event.target.closest ? event.target.closest('a') : null;
    if (!anchor) return;

    var href = (anchor.getAttribute('href') || '').trim();
    var text = (anchor.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();

    if (/^tel:/i.test(href)) {
      sendEvent('call_click');
      return;
    }

    if (/^sms:/i.test(href)) {
      sendEvent('text_click');
      return;
    }

    if (/myaestheticspro\.com|aespro\.biz/i.test(href) || /\bbook(?: now| appointment)?\b/i.test(text)) {
      sendEvent('book_now_click');
      return;
    }

    if (href.indexOf('#contact-page') !== -1 || text.indexOf('request consultation') !== -1) {
      sendEvent('consultation_cta_click');
    }
  }, true);
}());
