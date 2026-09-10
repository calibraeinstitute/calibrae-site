(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-YCFMR28HW1';

  function sendEvent(eventName, extraParams, callback) {
    if (typeof window.gtag !== 'function') {
      if (typeof callback === 'function') callback();
      return;
    }

    var params = Object.assign({
      page_path: window.location.pathname || '/',
      send_to: MEASUREMENT_ID
    }, extraParams || {});

    if (typeof callback === 'function') {
      var finished = false;
      var finish = function () {
        if (finished) return;
        finished = true;
        callback();
      };

      params.event_callback = finish;
      params.event_timeout = 1200;
      window.gtag('event', eventName, params);
      window.setTimeout(finish, 1300);
      return;
    }

    window.gtag('event', eventName, params);
  }

  function sendThenFollow(anchor, eventName) {
    var rawHref = (anchor.getAttribute('href') || '').trim();
    if (!rawHref) {
      sendEvent(eventName);
      return;
    }

    var destination = anchor.href || rawHref;
    var target = (anchor.getAttribute('target') || '').toLowerCase();
    var openedWindow = null;

    if (target === '_blank') {
      openedWindow = window.open('about:blank', '_blank');
      if (openedWindow) openedWindow.opener = null;
    }

    sendEvent(eventName, null, function () {
      if (openedWindow && !openedWindow.closed) {
        openedWindow.location.href = destination;
      } else if (target === '_blank') {
        window.open(destination, '_blank', 'noopener');
      } else {
        window.location.href = destination;
      }
    });
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
    var eventName = null;

    if (/^tel:/i.test(href)) {
      eventName = 'call_click';
    } else if (/^sms:/i.test(href)) {
      eventName = 'text_click';
    } else if (/myaestheticspro\.com|aespro\.biz/i.test(href) || /\bbook(?: now| appointment)?\b/i.test(text)) {
      eventName = 'book_now_click';
    } else if (href.indexOf('#contact-page') !== -1 || text.indexOf('request consultation') !== -1) {
      eventName = 'consultation_cta_click';
    }

    if (!eventName) return;

    // Hash-only links do not unload the page, so they can be sent immediately.
    if (href.charAt(0) === '#' && href.indexOf('/') !== 0) {
      sendEvent(eventName);
      return;
    }

    // For links that leave the current page or open another app, briefly hold
    // navigation so GA4 can transmit the event. A timeout guarantees the CTA
    // still works even if Analytics is slow or blocked.
    event.preventDefault();
    sendThenFollow(anchor, eventName);
  }, true);
}());
