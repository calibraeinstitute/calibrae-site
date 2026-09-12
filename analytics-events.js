(function () {
  'use strict';
  // Custom CTA/conversion tracking is intentionally disabled for now.
  // The base GA4 tag remains installed directly in each page <head>.
  // These files load SEO/local/UX enhancement layers only; no custom analytics events are sent.
  ['/seo-metadata.js', '/internal-links.js', '/local-signals.js', '/ux-polish.js'].forEach(function (src) {
    var script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
  });
}());
