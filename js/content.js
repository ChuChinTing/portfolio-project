(function () {
  function text(el, value) {
    if (el && value != null) el.textContent = value;
  }

  function html(el, value) {
    if (el && value != null) el.innerHTML = value;
  }

  function setMeta(selector, attr, value) {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function fillFrame(frame, src, alt, placeholderLabel) {
    if (!frame) return;
    if (src) {
      frame.innerHTML = '';
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt || '';
      img.className = 'ph-img';
      frame.appendChild(img);
    } else {
      frame.innerHTML =
        '<div class="ph"><span class="ph-label">' +
        (placeholderLabel || '照片') +
        '</span></div>';
    }
  }

  function renderWorks(works) {
    const grid = document.getElementById('work-grid');
    if (!grid || !Array.isArray(works)) return;
    grid.innerHTML = '';

    works.forEach(function (work) {
      const layout = work.layout || 'single';

      if (layout === 'pair') {
        const pair = document.createElement('div');
        pair.className = 'work-item pair reveal';
        const f1 = document.createElement('div');
        f1.className = 'frame';
        const f2 = document.createElement('div');
        f2.className = 'frame';
        fillFrame(f1, work.image, work.image_alt, '作品照片<br>（直幅 4:5）');
        fillFrame(f2, work.image_2, work.image_2_alt, '作品照片<br>（直幅 4:5）');
        pair.appendChild(f1);
        pair.appendChild(f2);
        grid.appendChild(pair);

        const caption = document.createElement('div');
        caption.className = 'work-caption reveal';
        caption.style.marginTop = '-104px';
        caption.innerHTML =
          '<h3></h3><div class="work-coords"></div>';
        text(caption.querySelector('h3'), work.title);
        html(
          caption.querySelector('.work-coords'),
          (work.coords || '') + '<br>' + (work.place || '')
        );
        grid.appendChild(caption);
        return;
      }

      const item = document.createElement('div');
      item.className =
        'work-item reveal' + (layout === 'wide' ? ' wide' : '');
      const frame = document.createElement('div');
      frame.className = 'frame';
      fillFrame(
        frame,
        work.image,
        work.image_alt,
        layout === 'wide'
          ? '作品照片<br>（寬幅 21:9）'
          : '作品照片<br>（橫幅 16:9）'
      );
      const caption = document.createElement('div');
      caption.className = 'work-caption';
      caption.innerHTML = '<h3></h3><div class="work-coords"></div>';
      text(caption.querySelector('h3'), work.title);
      html(
        caption.querySelector('.work-coords'),
        (work.coords || '') + '<br>' + (work.place || '')
      );
      item.appendChild(frame);
      item.appendChild(caption);
      grid.appendChild(item);
    });
  }

  function renderList(containerId, items, mapFn) {
    const el = document.getElementById(containerId);
    if (!el || !Array.isArray(items)) return;
    el.innerHTML = items.map(mapFn).join('');
  }

  function applyContent(data) {
    document.title = data.seo_title || document.title;
    setMeta('meta[name="description"]', 'content', data.seo_description);
    setMeta('meta[name="author"]', 'content', data.photographer_name);
    setMeta('meta[property="og:title"]', 'content', data.site_name);
    setMeta(
      'meta[property="og:description"]',
      'content',
      (data.photographer_name || '') + ' — ' + (data.seo_description || '')
    );
    setMeta('meta[property="og:image"]', 'content', data.og_image);
    setMeta('meta[name="twitter:title"]', 'content', data.site_name);
    setMeta(
      'meta[name="twitter:description"]',
      'content',
      (data.photographer_name || '') + ' — ' + (data.seo_description || '')
    );
    setMeta('meta[name="twitter:image"]', 'content', data.og_image);

    text(document.querySelector('[data-field="site_name"]'), data.site_name);
    text(document.querySelector('[data-field="site_tagline"]'), data.site_tagline);

    const hero = data.hero || {};
    text(document.querySelector('[data-field="hero.eyebrow"]'), hero.eyebrow);
    html(
      document.querySelector('[data-field="hero.coords"]'),
      (hero.coords || '') + '<br>' + (hero.base || '')
    );
    html(
      document.querySelector('[data-field="hero.title"]'),
      (hero.title_before || '') +
        '<br><em>' +
        (hero.title_em || '') +
        '</em>' +
        (hero.title_after || '')
    );
    text(
      document.querySelector('[data-field="hero.subtitle"]'),
      (data.photographer_name || '') +
        (hero.subtitle ? '，' + hero.subtitle : '')
    );
    text(document.querySelector('[data-field="hero.scroll_cue"] .label'), hero.scroll_cue);
    text(
      document.querySelector('[data-field="hero.established"]'),
      'EST. ' + (hero.established || '')
    );

    const about = data.about || {};
    fillFrame(
      document.getElementById('about-portrait'),
      about.portrait,
      about.portrait_alt,
      '攝影師肖像照<br>PORTRAIT.JPG'
    );
    text(document.querySelector('[data-field="about.lead"]'), about.lead);
    text(document.querySelector('[data-field="about.body_1"]'), about.body_1);
    text(document.querySelector('[data-field="about.body_2"]'), about.body_2);
    text(document.querySelector('[data-field="about.stat_1_value"]'), about.stat_1_value);
    text(document.querySelector('[data-field="about.stat_1_label"]'), about.stat_1_label);
    text(document.querySelector('[data-field="about.stat_2_value"]'), about.stat_2_value);
    text(document.querySelector('[data-field="about.stat_2_label"]'), about.stat_2_label);
    text(document.querySelector('[data-field="about.stat_3_value"]'), about.stat_3_value);
    text(document.querySelector('[data-field="about.stat_3_label"]'), about.stat_3_label);

    const workSection = data.work_section || {};
    text(document.querySelector('[data-field="work_section.title"]'), workSection.title);
    text(document.querySelector('[data-field="work_section.intro"]'), workSection.intro);
    renderWorks(data.works);

    const servicesSection = data.services_section || {};
    text(
      document.querySelector('[data-field="services_section.title"]'),
      servicesSection.title
    );
    text(
      document.querySelector('[data-field="services_section.intro"]'),
      servicesSection.intro
    );
    renderList('service-list', data.services, function (s) {
      return (
        '<div class="service">' +
        '<span class="num">' +
        (s.num || '') +
        '</span>' +
        '<h3>' +
        (s.title || '') +
        '</h3>' +
        '<p>' +
        (s.description || '') +
        '</p>' +
        '<span class="tag">' +
        (s.tag || '') +
        '</span>' +
        '</div>'
      );
    });

    const processSection = data.process_section || {};
    text(
      document.querySelector('[data-field="process_section.title"]'),
      processSection.title
    );
    renderList('process-list', data.process, function (p) {
      return (
        '<div class="process-step">' +
        '<span class="num">' +
        (p.num || '') +
        '</span>' +
        '<h3>' +
        (p.title || '') +
        '</h3>' +
        '<p>' +
        (p.description || '') +
        '</p>' +
        '</div>'
      );
    });

    const contact = data.contact || {};
    text(document.querySelector('[data-field="contact.eyebrow"]'), contact.eyebrow);
    html(
      document.querySelector('[data-field="contact.title"]'),
      (contact.title_line1 || '') + '<br>' + (contact.title_line2 || '')
    );

    const emailLink = document.querySelector('[data-field="email"]');
    if (emailLink && data.email) {
      emailLink.textContent = data.email;
      emailLink.setAttribute('href', 'mailto:' + data.email);
    }

    const ig = document.querySelector('[data-field="instagram"]');
    if (ig && data.instagram) {
      ig.textContent = 'Instagram — @' + data.instagram;
      ig.setAttribute('href', 'https://instagram.com/' + data.instagram);
    }

    const portfolio = document.querySelector('[data-field="portfolio"]');
    if (portfolio) {
      portfolio.textContent = data.portfolio_label || '作品平台';
      if (data.portfolio_url) portfolio.setAttribute('href', data.portfolio_url);
    }

    text(document.querySelector('[data-field="location"]'), data.location);

    const form = document.querySelector('.contact-form');
    if (form && data.formspree_id) {
      form.setAttribute(
        'action',
        'https://formspree.io/f/' + data.formspree_id
      );
    }

    text(
      document.querySelector('[data-field="copyright"]'),
      '© ' +
        (contact.copyright_year || '') +
        ' ' +
        (data.photographer_name || '') +
        '. All rights reserved.'
    );

    // Re-bind reveal after dynamic HTML
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  }

  fetch('content/site.json', { cache: 'no-store' })
    .then(function (res) {
      if (!res.ok) throw new Error('無法載入內容');
      return res.json();
    })
    .then(applyContent)
    .catch(function (err) {
      console.error(err);
    });
})();
