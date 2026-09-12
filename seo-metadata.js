(function () {
  'use strict';

  var SITE_ORIGIN = 'https://www.calibraeinstitute.com';
  var BUSINESS_ID = SITE_ORIGIN + '/#business';
  var WEBSITE_ID = SITE_ORIGIN + '/#website';
  var PERSON_ID = SITE_ORIGIN + '/danielle-wiley-pa-c#person';

  var ADDRESS = {
    '@type': 'PostalAddress',
    streetAddress: '3343 Valley Pike, Suite 400',
    addressLocality: 'Winchester',
    addressRegion: 'VA',
    postalCode: '22602',
    addressCountry: 'US'
  };

  var WINCHESTER = {
    '@type': 'City',
    name: 'Winchester',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Winchester',
      addressRegion: 'VA',
      addressCountry: 'US'
    }
  };

  var OPENING_HOURS = [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00'
    }
  ];

  var SERVICE_MAP = {
    '/botox-winchester-va': {
      name: 'Botox Treatment',
      serviceType: 'Botulinum toxin type A neuromodulator treatment',
      description: 'Diagnosis-first Botox treatment planning for movement-related facial lines and balance.'
    },
    '/daxxify-winchester-va': {
      name: 'Daxxify Treatment',
      serviceType: 'Neuromodulator treatment',
      description: 'Diagnosis-first Daxxify treatment planning for movement-related facial concerns.'
    },
    '/dermal-filler-winchester-va': {
      name: 'Dermal Filler and Facial Balancing',
      serviceType: 'Hyaluronic acid dermal filler treatment',
      description: 'Diagnosis-first dermal filler and facial balancing for proportion, contour, support, and natural-looking refinement.'
    },
    '/lip-filler-winchester-va': {
      name: 'Lip Filler',
      serviceType: 'Hyaluronic acid lip filler treatment',
      description: 'Diagnosis-first lip filler treatment for framing, proportion, shape, support, and natural-looking enhancement.'
    },
    '/microneedling-winchester-va': {
      name: 'Microneedling Treatment',
      serviceType: 'SkinPen Precision Elite microneedling',
      description: 'Diagnosis-first microneedling treatment planning for skin quality, acne scarring, texture, and collagen remodeling.'
    },
    '/hair-restoration-winchester-va': {
      name: 'Hair Restoration and Scalp Treatment',
      serviceType: 'Hair thinning assessment and scalp treatment',
      description: 'Diagnosis-first hair restoration and scalp treatment planning in Winchester, Virginia.'
    },
    '/sculptra-winchester-va': {
      name: 'Sculptra Treatment',
      serviceType: 'Collagen-stimulating injectable treatment',
      description: 'Diagnosis-first Sculptra treatment planning for collagen support, facial structure, and natural-looking restoration.'
    }
  };

  function normalizePath(pathname) {
    var path = (pathname || '/').replace(/\/+$/, '');
    if (!path || path === '/index.html') return '/';
    return path;
  }

  function currentCanonical() {
    var path = normalizePath(window.location.pathname);
    return path === '/' ? SITE_ORIGIN + '/' : SITE_ORIGIN + path;
  }

  function ensureCanonical() {
    var canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentCanonical();
  }

  function normalizeUrls(value) {
    if (typeof value === 'string') {
      return value.replace(/https:\/\/calibraeinstitute\.com/g, SITE_ORIGIN);
    }
    if (Array.isArray(value)) {
      return value.map(normalizeUrls);
    }
    if (value && typeof value === 'object') {
      Object.keys(value).forEach(function (key) {
        value[key] = normalizeUrls(value[key]);
      });
    }
    return value;
  }

  function hasType(node, type) {
    if (!node || !node['@type']) return false;
    if (Array.isArray(node['@type'])) return node['@type'].indexOf(type) !== -1;
    return node['@type'] === type;
  }

  function findByType(graph, type) {
    for (var i = 0; i < graph.length; i += 1) {
      if (hasType(graph[i], type)) return graph[i];
    }
    return null;
  }

  function findById(graph, id) {
    for (var i = 0; i < graph.length; i += 1) {
      if (graph[i] && graph[i]['@id'] === id) return graph[i];
    }
    return null;
  }

  function clinicNode() {
    return {
      '@type': 'MedicalClinic',
      '@id': BUSINESS_ID,
      name: 'Calibrae Institute of Aesthetic Medicine',
      alternateName: 'Calibrae Institute',
      url: SITE_ORIGIN + '/',
      description: 'Provider-led aesthetic medicine in Winchester, Virginia using diagnosis-first treatment planning through The Layer Method.',
      telephone: '+1-703-593-1948',
      image: SITE_ORIGIN + '/images/sitehero1.jpg',
      address: ADDRESS,
      areaServed: WINCHESTER,
      sameAs: ['https://instagram.com/calibraeinstitute'],
      openingHoursSpecification: OPENING_HOURS,
      founder: { '@id': PERSON_ID }
    };
  }

  function personNode() {
    return {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Danielle Wiley, PA-C',
      alternateName: ['Danielle Chatelain', 'Danielle Chatelain-Wiley'],
      jobTitle: 'Founder and Clinical Provider',
      url: SITE_ORIGIN + '/danielle-wiley-pa-c',
      image: SITE_ORIGIN + '/images/start-here-founder2.png',
      worksFor: { '@id': BUSINESS_ID }
    };
  }

  function websiteNode() {
    return {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_ORIGIN + '/',
      name: 'Calibrae Institute of Aesthetic Medicine',
      publisher: { '@id': BUSINESS_ID }
    };
  }

  function enrichClinic(node) {
    var baseline = clinicNode();
    Object.keys(baseline).forEach(function (key) {
      if (key === '@type' || key === '@id' || typeof node[key] === 'undefined' || node[key] === null || node[key] === '') {
        node[key] = baseline[key];
      }
    });
    node['@id'] = BUSINESS_ID;
    node.url = SITE_ORIGIN + '/';
    node.address = ADDRESS;
    node.areaServed = WINCHESTER;
    node.openingHoursSpecification = OPENING_HOURS;
    node.founder = { '@id': PERSON_ID };
    if (!Array.isArray(node.sameAs) || node.sameAs.indexOf('https://instagram.com/calibraeinstitute') === -1) {
      node.sameAs = ['https://instagram.com/calibraeinstitute'];
    }
  }

  function enrichPerson(node) {
    var baseline = personNode();
    Object.keys(baseline).forEach(function (key) {
      if (key === '@type' || key === '@id' || typeof node[key] === 'undefined' || node[key] === null || node[key] === '') {
        node[key] = baseline[key];
      }
    });
    node['@id'] = PERSON_ID;
    node.url = SITE_ORIGIN + '/danielle-wiley-pa-c';
    node.worksFor = { '@id': BUSINESS_ID };
  }

  function ensurePageNode(graph, path) {
    var canonical = currentCanonical();
    var webpage = findByType(graph, 'WebPage');
    var profile = findByType(graph, 'ProfilePage');

    if (path === '/danielle-wiley-pa-c') {
      if (!profile) {
        profile = {
          '@type': 'ProfilePage',
          '@id': canonical + '#webpage',
          url: canonical,
          name: 'Danielle Wiley, PA-C | Calibrae Institute of Aesthetic Medicine',
          mainEntity: { '@id': PERSON_ID },
          isPartOf: { '@id': WEBSITE_ID }
        };
        graph.push(profile);
      } else {
        profile.url = canonical;
        profile.mainEntity = { '@id': PERSON_ID };
        profile.isPartOf = { '@id': WEBSITE_ID };
      }
      return;
    }

    if (!webpage) {
      webpage = {
        '@type': 'WebPage',
        '@id': canonical + '#webpage',
        url: canonical,
        name: document.title || 'Calibrae Institute of Aesthetic Medicine',
        isPartOf: { '@id': WEBSITE_ID }
      };
      graph.push(webpage);
    } else {
      webpage.url = canonical;
      webpage['@id'] = canonical + '#webpage';
      webpage.isPartOf = { '@id': WEBSITE_ID };
    }

    if (path === '/') {
      webpage.about = { '@id': BUSINESS_ID };
    }
  }

  function ensureServiceNode(graph, path) {
    var serviceConfig = SERVICE_MAP[path];
    if (!serviceConfig) return;

    var canonical = currentCanonical();
    var serviceId = canonical + '#service';
    var service = findById(graph, serviceId) || findByType(graph, 'Service');

    if (!service) {
      service = {
        '@type': 'Service',
        '@id': serviceId
      };
      graph.push(service);
    }

    service['@id'] = serviceId;
    service.name = service.name || serviceConfig.name;
    service.serviceType = service.serviceType || serviceConfig.serviceType;
    service.description = service.description || serviceConfig.description;
    service.url = canonical;
    service.provider = { '@id': BUSINESS_ID };
    service.areaServed = WINCHESTER;

    var webpage = findByType(graph, 'WebPage');
    if (webpage) webpage.about = { '@id': serviceId };
  }

  function toGraph(data) {
    if (data && Array.isArray(data['@graph'])) return data['@graph'];
    if (!data || typeof data !== 'object') return [];
    var node = data;
    if (node['@context']) delete node['@context'];
    return [node];
  }

  function ensureStructuredData() {
    var path = normalizePath(window.location.pathname);
    var scripts = Array.prototype.slice.call(document.querySelectorAll('script[type="application/ld+json"]'));
    var targetScript = null;
    var targetData = null;

    scripts.forEach(function (script) {
      try {
        var parsed = normalizeUrls(JSON.parse(script.textContent));
        script.textContent = JSON.stringify(parsed);
        if (!targetScript) {
          targetScript = script;
          targetData = parsed;
        }
      } catch (error) {
        // Leave any third-party or malformed block untouched rather than risk breaking the page.
      }
    });

    if (!targetScript) {
      targetScript = document.createElement('script');
      targetScript.type = 'application/ld+json';
      document.head.appendChild(targetScript);
      targetData = { '@context': 'https://schema.org', '@graph': [] };
    }

    var graph = toGraph(targetData);
    var clinic = findByType(graph, 'MedicalClinic') || findById(graph, BUSINESS_ID);
    if (!clinic) {
      clinic = clinicNode();
      graph.push(clinic);
    }
    enrichClinic(clinic);

    var person = findByType(graph, 'Person') || findById(graph, PERSON_ID);
    if (!person) {
      person = personNode();
      graph.push(person);
    }
    enrichPerson(person);

    var website = findByType(graph, 'WebSite') || findById(graph, WEBSITE_ID);
    if (!website) {
      website = websiteNode();
      graph.push(website);
    } else {
      website['@id'] = WEBSITE_ID;
      website.url = SITE_ORIGIN + '/';
      website.name = 'Calibrae Institute of Aesthetic Medicine';
      website.publisher = { '@id': BUSINESS_ID };
    }

    ensurePageNode(graph, path);
    ensureServiceNode(graph, path);

    targetScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph
    });
  }

  function run() {
    ensureCanonical();
    ensureStructuredData();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}());
