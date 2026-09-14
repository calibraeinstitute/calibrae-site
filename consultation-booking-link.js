(function () {
  'use strict';

  var CONSULTATION_URL = 'https://web2.myaestheticspro.com/BN/index.cfm?3B99CD1D946B564730D08902C374290951085ADFB80B5D69D7A96AF41177A4F4';

  function routeConsultationButtons() {
    Array.prototype.forEach.call(document.querySelectorAll('a'), function (link) {
      if ((link.textContent || '').trim().toLowerCase() !== 'request consultation') return;

      link.href = CONSULTATION_URL;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', 'Request a consultation with Calibrae Institute');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', routeConsultationButtons, { once: true });
  } else {
    routeConsultationButtons();
  }
}());
