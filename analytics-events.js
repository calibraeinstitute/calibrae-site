(function () {
  'use strict';
  // Custom CTA/conversion tracking is intentionally disabled for now.
  // The base GA4 tag remains installed directly in each page <head>.
  // This file only loads the non-analytics internal-link enhancement layer.
  var internalLinksScript = document.createElement('script');
  internalLinksScript.src = '/internal-links.js';
  internalLinksScript.async = false;
  document.head.appendChild(internalLinksScript);
}());
