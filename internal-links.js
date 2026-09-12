(function () {
  'use strict';

  function normalizePath(pathname) {
    var path = (pathname || '/').replace(/\/+$/, '');
    return path || '/';
  }

  function makeInlineLink(href, text) {
    var link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    link.style.textDecoration = 'underline';
    link.style.textDecorationThickness = '1px';
    link.style.textUnderlineOffset = '3px';
    return link;
  }

  function ensureMenuLink(menu, href, text) {
    if (!menu || menu.querySelector('a[href="' + href + '"]')) return;
    var link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    menu.appendChild(link);
  }

  function homepageLinkPass() {
    var path = normalizePath(window.location.pathname);
    if (path !== '/' && path !== '/index.html') return;

    var skinTrigger = document.querySelector('.dropdown > a[href="#skin-page"]');
    var skinMenu = skinTrigger && skinTrigger.parentElement ? skinTrigger.parentElement.querySelector('.dropdown-menu') : null;
    ensureMenuLink(skinMenu, '/microneedling-winchester-va', 'Microneedling');
    ensureMenuLink(skinMenu, '/hair-restoration-winchester-va', 'Hair Restoration');

    var injectablesTrigger = document.querySelector('.dropdown > a[href="#injectables-page"]');
    var injectablesMenu = injectablesTrigger && injectablesTrigger.parentElement ? injectablesTrigger.parentElement.querySelector('.dropdown-menu') : null;
    if (injectablesMenu) {
      var botoxLink = injectablesMenu.querySelector('a[href="/botox-winchester-va"]');
      if (botoxLink) botoxLink.textContent = 'Botox';

      var facialBalancingLink = Array.prototype.find.call(injectablesMenu.querySelectorAll('a'), function (link) {
        return link.textContent.trim() === 'Facial Balancing';
      });
      if (facialBalancingLink) {
        facialBalancingLink.href = '/dermal-filler-winchester-va';
        facialBalancingLink.textContent = 'Facial Balancing & Dermal Filler';
      }

      ensureMenuLink(injectablesMenu, '/daxxify-winchester-va', 'Daxxify');
      ensureMenuLink(injectablesMenu, '/lip-filler-winchester-va', 'Lip Filler');
    }

    var treatmentLinks = [
      ['Daxxify', '/daxxify-winchester-va', 'Learn more about Daxxify in Winchester, Virginia.'],
      ['Facial Balancing', '/dermal-filler-winchester-va', 'Learn more about dermal filler and facial balancing in Winchester, Virginia.'],
      ['SkinPen Precision Elite', '/microneedling-winchester-va', 'Learn more about microneedling in Winchester, Virginia.']
    ];

    treatmentLinks.forEach(function (item) {
      var heading = Array.prototype.find.call(document.querySelectorAll('.treatment-method-item summary h3'), function (node) {
        return node.textContent.trim().indexOf(item[0]) === 0;
      });
      if (!heading) return;

      var details = heading.closest('details');
      var body = details ? details.querySelector('.treatment-method-detail-body') : null;
      if (!body || body.querySelector('a[href="' + item[1] + '"]')) return;

      var paragraph = document.createElement('p');
      var link = document.createElement('a');
      var strong = document.createElement('strong');
      link.href = item[1];
      strong.textContent = item[2];
      link.appendChild(strong);
      paragraph.appendChild(link);
      body.appendChild(paragraph);
    });

    var movementCard = Array.prototype.find.call(document.querySelectorAll('#injectables-page .injectables-page-point h4'), function (node) {
      return node.textContent.trim() === 'Movement (Neurotoxin)';
    });
    if (movementCard) {
      var movementCopy = movementCard.parentElement.querySelector('p');
      if (movementCopy && !movementCopy.querySelector('a[href="/daxxify-winchester-va"]')) {
        movementCopy.appendChild(document.createTextNode(' '));
        movementCopy.appendChild(makeInlineLink('/daxxify-winchester-va', 'Learn more about Daxxify.'));
      }
    }

    var supportCard = Array.prototype.find.call(document.querySelectorAll('#injectables-page .injectables-page-point h4'), function (node) {
      return node.textContent.trim() === 'Volume / Support (Filler / PRF)';
    });
    if (supportCard) {
      var supportCopy = supportCard.parentElement.querySelector('p');
      if (supportCopy && !supportCopy.querySelector('a[href="/dermal-filler-winchester-va"]')) {
        supportCopy.appendChild(document.createTextNode(' '));
        supportCopy.appendChild(makeInlineLink('/dermal-filler-winchester-va', 'Explore facial balancing.'));
        supportCopy.appendChild(document.createTextNode(' '));
        supportCopy.appendChild(makeInlineLink('/lip-filler-winchester-va', 'Explore lip filler.'));
      }
    }

    var hairCta = document.querySelector('#hair-page .hair-page-cta .btn-row');
    if (hairCta && !hairCta.querySelector('a[href="/hair-restoration-winchester-va"]')) {
      var existingSecondary = hairCta.querySelector('.btn.secondary');
      if (existingSecondary) {
        existingSecondary.href = '/hair-restoration-winchester-va';
        existingSecondary.textContent = 'Explore Hair Restoration';
      } else {
        var hairLink = document.createElement('a');
        hairLink.href = '/hair-restoration-winchester-va';
        hairLink.className = 'btn secondary';
        hairLink.textContent = 'Explore Hair Restoration';
        hairCta.appendChild(hairLink);
      }
    }
  }

  var relatedByPath = {
    '/botox-winchester-va': [
      ['/daxxify-winchester-va', 'Daxxify'],
      ['/dermal-filler-winchester-va', 'Facial balancing'],
      ['/sculptra-winchester-va', 'Sculptra']
    ],
    '/daxxify-winchester-va': [
      ['/botox-winchester-va', 'Botox'],
      ['/dermal-filler-winchester-va', 'Facial balancing'],
      ['/sculptra-winchester-va', 'Sculptra']
    ],
    '/dermal-filler-winchester-va': [
      ['/lip-filler-winchester-va', 'Lip filler'],
      ['/sculptra-winchester-va', 'Sculptra'],
      ['/botox-winchester-va', 'Botox']
    ],
    '/lip-filler-winchester-va': [
      ['/dermal-filler-winchester-va', 'Facial balancing'],
      ['/sculptra-winchester-va', 'Sculptra']
    ],
    '/microneedling-winchester-va': [
      ['/hair-restoration-winchester-va', 'Hair restoration'],
      ['/sculptra-winchester-va', 'Sculptra'],
      ['/dermal-filler-winchester-va', 'Facial balancing']
    ],
    '/hair-restoration-winchester-va': [
      ['/microneedling-winchester-va', 'Microneedling']
    ],
    '/sculptra-winchester-va': [
      ['/dermal-filler-winchester-va', 'Facial balancing'],
      ['/microneedling-winchester-va', 'Microneedling'],
      ['/botox-winchester-va', 'Botox']
    ]
  };

  function servicePageLinkPass() {
    var path = normalizePath(window.location.pathname);
    var related = relatedByPath[path];
    if (!related) return;

    var closingCard = document.querySelector('.closing-card');
    if (!closingCard || closingCard.querySelector('.seo-related-links')) return;

    var paragraph = document.createElement('p');
    paragraph.className = 'seo-related-links';
    paragraph.style.marginTop = '16px';
    paragraph.style.fontSize = '0.92rem';
    paragraph.style.lineHeight = '1.7';
    paragraph.appendChild(document.createTextNode('Related treatment planning: '));

    related.forEach(function (item, index) {
      if (index > 0) paragraph.appendChild(document.createTextNode(' · '));
      paragraph.appendChild(makeInlineLink(item[0], item[1]));
    });

    var buttonRow = closingCard.querySelector('.btn-row');
    if (buttonRow) {
      closingCard.insertBefore(paragraph, buttonRow);
    } else {
      closingCard.appendChild(paragraph);
    }
  }

  function run() {
    homepageLinkPass();
    servicePageLinkPass();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}());
