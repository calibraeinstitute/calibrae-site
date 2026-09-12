(function () {
  'use strict';
  // Custom CTA/conversion tracking is intentionally disabled for now.
  // The base GA4 tag remains installed directly in each page <head>.
  // These files only load non-analytics site enhancement layers.
  ['/seo-metadata.js', '/internal-links.js', '/local-signals.js'].forEach(function (src) {
    var script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
  });
}());
