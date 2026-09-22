(function () {
  'use strict';
  // General CTA tracking remains disabled.
  // The base GA4 tag remains installed directly in each page <head>.
  // Google Ads is configured as an additional destination on the existing Google tag.
  // The completed-booking conversion itself is isolated to booking-confirmed.html.
  ['/seo-metadata.js', '/internal-links.js', '/local-signals.js', '/ux-polish.js', '/booking-hero-fix.js', '/website-final-polish.js', '/layer-method-detailed-graphic.js', '/consultation-booking-link.js'].forEach(function (src) {
    var script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
  });
}());
