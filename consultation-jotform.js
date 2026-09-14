(function () {
  'use strict';

  var CONSULTATION_FORM_URL = 'https://form.jotform.com/261133688084057';

  function linkConsultationButtons() {
    Array.prototype.forEach.call(document.querySelectorAll('a'), function (link) {
      var label = (link.textContent || '').trim().toLowerCase();
      if (label !== 'request consultation') return;

      link.href = CONSULTATION_FORM_URL;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', 'Request a consultation with Calibrae Institute');
    });
  }

  function run() {
    linkConsultationButtons();

    if (!document.body || typeof MutationObserver === 'undefined') return;
    var observer = new MutationObserver(linkConsultationButtons);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}());
