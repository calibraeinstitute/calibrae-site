(function () {
  'use strict';

  var BOOKING_URL = 'https://web2.myaestheticspro.com/BN/index.cfm?3B99CD1D946B564730D08902C37429094CFC2165279C2B6FC9B29ADF9D0A6FBB';

  function isHomepage() {
    var path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    return path === '/' || path === '/index.html';
  }

  function addStyles() {
    if (document.getElementById('calibrae-hero-booking-fix-styles')) return;

    var style = document.createElement('style');
    style.id = 'calibrae-hero-booking-fix-styles';
    style.textContent = [
      '.ux-hero-actions-stack{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:14px!important;}',
      '.ux-hero-actions-stack .btn{min-width:224px;}',
      '.ux-hero-book-online{background:#f7f7f5!important;color:#1d1d1d!important;border-color:#f7f7f5!important;font-weight:700!important;box-shadow:0 10px 24px rgba(0,0,0,.16)!important;}',
      '.ux-hero-book-online:hover{background:#ffffff!important;border-color:#ffffff!important;color:#111!important;transform:translateY(-2px);}',
      '.ux-hero-consultation{background:rgba(255,255,255,.025)!important;color:var(--text,#f7f7f5)!important;border-color:rgba(255,255,255,.28)!important;}',
      '@media(max-width:720px){.ux-hero-actions-stack{align-items:stretch!important;}.ux-hero-actions-stack .btn{width:100%!important;min-width:0;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function isBookingLink(link) {
    if (!link) return false;
    var href = link.getAttribute('href') || '';
    var label = (link.textContent || '').trim().toLowerCase();
    return href.indexOf('myaestheticspro.com/BN/index.cfm') !== -1 || label === 'book online' || label === 'book now';
  }

  function findPrimaryConsultationButton() {
    return Array.prototype.find.call(document.querySelectorAll('a.btn'), function (link) {
      return (link.textContent || '').trim() === 'Request Consultation';
    }) || null;
  }

  function ensureHeroBookOnline() {
    if (!isHomepage()) return;

    var consultation = findPrimaryConsultationButton();
    if (!consultation) return;

    var actions = consultation.closest('.btn-row') || consultation.parentElement;
    if (!actions) return;

    actions.classList.add('ux-hero-actions-stack');

    var booking = Array.prototype.find.call(actions.querySelectorAll('a'), isBookingLink) || null;
    if (!booking) {
      booking = document.createElement('a');
      booking.textContent = 'Book Online';
      booking.className = 'btn ux-hero-book-online';
    }

    booking.href = BOOKING_URL;
    booking.target = '_blank';
    booking.rel = 'noopener';
    booking.setAttribute('aria-label', 'Book an appointment online with Calibrae Institute');
    booking.classList.add('btn', 'ux-hero-book-online');

    if (booking.parentElement !== actions || booking.nextElementSibling !== consultation) {
      actions.insertBefore(booking, consultation);
    }

    consultation.classList.remove('primary');
    consultation.classList.add('secondary', 'ux-hero-consultation');
  }

  function run() {
    addStyles();
    ensureHeroBookOnline();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}());
