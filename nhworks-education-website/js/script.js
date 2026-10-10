/* ==========================================================
   NHworks – interactions (vanilla JavaScript, no dependencies)
   ========================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- Catalog data (real high-resolution imagery) ---------- */
  var COURSES = [
    { id: 'react', title: 'React.js Development', category: 'Web Development', level: 'Beginner', hours: 12, lessons: 48, price: 4999, badge: 'Bestseller', image: 'assets/images/course-react-development.jpg',
      desc: 'Build modern, interactive web applications with React.',
      about: 'Learn how to structure user interfaces as reusable components and manage data flow in real projects.',
      learn: ['Create components with props and state', 'Handle events and forms', 'Fetch and display data from an API', 'Organise a small multi-page app'] },
    { id: 'node', title: 'Node.js Backend Development', category: 'Programming', level: 'Intermediate', hours: 10, lessons: 40, price: 3999, badge: 'New', image: 'assets/images/course-node-backend.jpg',
      desc: 'Learn to build scalable backend APIs with Node.js and Express.',
      about: 'Move from simple scripts to structured server applications that other apps can talk to.',
      learn: ['Set up an Express server', 'Design REST API routes', 'Validate and handle errors', 'Connect an application to a database'] },
    { id: 'python', title: 'Python Programming', category: 'Programming', level: 'Beginner', hours: 14, lessons: 56, price: 4499, badge: 'Popular', image: 'assets/images/course-python-programming.jpg',
      desc: 'Master Python from the basics to real-world projects.',
      about: 'A friendly start to programming with one of the most readable languages in use today.',
      learn: ['Write clear functions and loops', 'Work with lists, dictionaries and files', 'Use modules and packages', 'Finish with a practical mini project'] },
    { id: 'uiux', title: 'UI/UX Design', category: 'Design', level: 'Intermediate', hours: 11, lessons: 36, price: 3999, badge: 'Trending', image: 'assets/images/course-uiux-design.jpg',
      desc: 'Design beautiful, user-friendly experiences for web and mobile.',
      about: 'Learn the design process from research and wireframes through to polished, testable prototypes.',
      learn: ['Plan user journeys and wireframes', 'Choose type, colour and spacing', 'Build reusable design components', 'Test a prototype with real users'] },
    { id: 'webdev', title: 'Modern Web Development', category: 'Web Development', level: 'Beginner', hours: 16, lessons: 64, price: 4299, badge: '', image: 'assets/images/course-modern-webdev.jpg',
      desc: 'Start from scratch with HTML, CSS and JavaScript.',
      about: 'Build your first responsive websites and understand how the web works from the ground up.',
      learn: ['Structure pages with semantic HTML', 'Style responsive layouts with CSS', 'Add interactivity with JavaScript', 'Publish a finished site'] },
    { id: 'data', title: 'Data Science Fundamentals', category: 'Data Science', level: 'Intermediate', hours: 15, lessons: 52, price: 5499, badge: 'High Demand', image: 'assets/images/course-data-science.jpg',
      desc: 'Turn raw data into clear insights with Python.',
      about: 'Learn how to clean, explore and visualise data and communicate what it tells you.',
      learn: ['Clean and prepare datasets', 'Summarise data with statistics', 'Create clear charts', 'Present findings to others'] },
    { id: 'marketing', title: 'Digital Marketing Essentials', category: 'Digital Marketing', level: 'Beginner', hours: 9, lessons: 30, price: 3499, badge: '', image: 'assets/images/course-digital-marketing.jpg',
      desc: 'Grow a brand online with practical marketing skills.',
      about: 'Understand how audiences find and trust a brand, and how to plan campaigns that reach them.',
      learn: ['Define audiences and goals', 'Plan content and social campaigns', 'Understand search and email basics', 'Measure what is working'] },
    { id: 'business', title: 'Business Analysis Basics', category: 'Business', level: 'Beginner', hours: 8, lessons: 28, price: 3299, badge: '', image: 'assets/images/course-business-analysis.jpg',
      desc: 'Learn to understand business needs and turn them into plans.',
      about: 'A practical introduction to gathering requirements, mapping processes and working with teams.',
      learn: ['Gather and document requirements', 'Map business processes', 'Write clear user stories', 'Communicate with stakeholders'] },
    { id: 'advancedjs', title: 'Advanced JavaScript', category: 'Web Development', level: 'Advanced', hours: 13, lessons: 44, price: 4799, badge: 'Advanced', image: 'assets/images/course-advanced-javascript.jpg',
      desc: 'Go deeper into asynchronous code, modules and performance.',
      about: 'For learners who know the basics and want to write cleaner, faster and more maintainable code.',
      learn: ['Understand closures and scope', 'Use promises and async/await', 'Organise code with modules', 'Profile and improve performance'] }
  ];
  var CATEGORIES = ['Web Development', 'Programming', 'Data Science', 'Design', 'Business', 'Digital Marketing'];
  var PREVIEW_COUNT = 6;

  /* ---------- Helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function formatPrice(n) { return 'PKR ' + n.toLocaleString('en-US'); }
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var state = { category: 'All', query: '', showAll: false };

  /* ---------- Image fallback (inline SVG so it never breaks) ---------- */
  function fallbackSrc(label) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#091428"/><stop offset="1" stop-color="#059669"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><text x="320" y="190" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="700" fill="#fff">' + esc(label || 'NHworks') + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG' || img.dataset.fallback) return;
    img.dataset.fallback = '1';
    img.src = fallbackSrc(img.getAttribute('data-label') || img.alt || 'NHworks');
  }, true);

  /* ---------- Course filtering & rendering ---------- */
  function matches(c) {
    if (state.category !== 'All' && c.category !== state.category) return false;
    var q = state.query.trim().toLowerCase();
    if (!q) return true;
    var hay = [c.title, c.category, c.level, c.desc, c.about, c.learn.join(' ')].join(' ').toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  function courseCard(c) {
    var badgeClass = c.badge === 'New' ? ' badge-new' : (c.badge === 'Bestseller' ? ' badge-best' : '');
    var badge = c.badge ? '<span class="course-badge' + badgeClass + '">' + esc(c.badge) + '</span>' : '';
    return '<article class="course-card" data-id="' + c.id + '">' +
      '<div class="course-media">' +
        badge +
        '<span class="course-category-tag">' + esc(c.category) + '</span>' +
        '<img src="' + c.image + '" alt="' + esc(c.title + ' course thumbnail') + '" data-label="' + esc(c.title) + '" width="640" height="360" loading="lazy">' +
      '</div>' +
      '<div class="course-body">' +
        '<div class="course-header-row">' +
          '<span class="level-pill level-' + esc(c.level.toLowerCase()) + '">' + esc(c.level) + '</span>' +
          '<span class="duration-pill"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' + c.hours + ' hrs</span>' +
        '</div>' +
        '<h3 class="course-title-wrap"><button class="course-title" type="button" data-course="' + c.id + '" aria-haspopup="dialog">' + esc(c.title) + '</button></h3>' +
        '<p class="course-desc">' + esc(c.desc) + '</p>' +
        '<div class="course-meta">' +
          '<span title="' + c.lessons + ' practical lessons"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' + c.lessons + ' lessons</span>' +
          '<span title="Self-paced online format"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>Online</span>' +
        '</div>' +
        '<div class="course-foot">' +
          '<div class="course-price-wrap">' +
            '<span class="price-label">Fee</span>' +
            '<strong class="price">' + formatPrice(c.price) + '</strong>' +
          '</div>' +
          '<button class="course-action-btn" type="button" data-course="' + c.id + '">Details <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
        '</div>' +
      '</div></article>';
  }

  function renderFilters() {
    var bar = $('#filterBar');
    if (!bar) return;
    var items = ['All'].concat(CATEGORIES);
    bar.innerHTML = items.map(function (name) {
      return '<button class="chip" type="button" data-filter="' + esc(name) + '" aria-pressed="' + (state.category === name) + '">' + esc(name) + '</button>';
    }).join('');
    $all('.category-card').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-category') === state.category);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-category') === state.category ? 'true' : 'false');
    });
  }

  function renderCourses() {
    var grid = $('#courseGrid'), empty = $('#emptyState'), status = $('#resultStatus'), toggle = $('#toggleCourses');
    if (!grid) return;
    var filtered = COURSES.filter(matches);
    var isFiltering = state.category !== 'All' || state.query.trim() !== '';
    var visible = (isFiltering || state.showAll) ? filtered : filtered.slice(0, PREVIEW_COUNT);

    grid.innerHTML = visible.map(courseCard).join('');
    empty.hidden = filtered.length !== 0;
    grid.hidden = filtered.length === 0;

    var parts = [];
    if (state.category !== 'All') parts.push('in ' + state.category);
    if (state.query.trim()) parts.push('matching “' + state.query.trim() + '”');
    status.textContent = isFiltering
      ? filtered.length + (filtered.length === 1 ? ' course ' : ' courses ') + parts.join(' ')
      : 'Showing ' + visible.length + ' of ' + COURSES.length + ' courses';

    var expanded = state.showAll && !isFiltering;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.firstChild.nodeValue = expanded ? 'Show Fewer Courses ' : 'View All Courses ';
    renderFilters();
  }

  function setFilter(name) {
    state.category = name;
    renderCourses();
  }
  function clearFilters() {
    state.category = 'All';
    state.query = '';
    $all('.js-search-input').forEach(function (i) { i.value = ''; });
    renderCourses();
  }
  function scrollToCourses() {
    var el = $('#courses');
    if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- Modal manager (focus trap, Escape, restore focus) ---------- */
  var activeModal = null, lastFocus = null;
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openModal(modal, trigger) {
    if (!modal) return;
    if (activeModal) closeModal(true);
    lastFocus = trigger || document.activeElement;
    modal.hidden = false;
    activeModal = modal;
    document.body.classList.add('no-scroll');
    var first = $('.modal-panel', modal);
    var target = $all('input:not([type=hidden]), select, textarea', modal).filter(function (n) { return !n.closest('[hidden]'); })[0];
    var focusEl = target || $('.modal-close', modal);
    if (first) first.scrollTop = 0;
    (focusEl || first).focus({ preventScroll: true });
  }
  function closeModal(skipRestore) {
    if (!activeModal) return;
    activeModal.hidden = true;
    activeModal = null;
    document.body.classList.remove('no-scroll');
    if (!skipRestore && lastFocus && document.contains(lastFocus) && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('keydown', function (e) {
    if (!activeModal) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
    if (e.key === 'Tab') {
      var nodes = $all(FOCUSABLE, activeModal).filter(function (n) { return !n.closest('[hidden]') && n.getAttribute('aria-hidden') !== 'true'; });
      if (!nodes.length) return;
      var first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!activeModal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });
  $all('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });
  });

  /* ---------- Course detail modal ---------- */
  var currentCourse = null;
  function openCourse(id, trigger) {
    var c = COURSES.filter(function (x) { return x.id === id; })[0];
    if (!c) return;
    currentCourse = c;
    var img = $('#cmImage');
    delete img.dataset.fallback;
    img.src = c.image; img.alt = c.title + ' course thumbnail'; img.setAttribute('data-label', c.title);
    $('#cmCategory').textContent = c.category;
    $('#cmTitle').textContent = c.title;
    $('#cmDesc').textContent = c.about;
    $('#cmMeta').innerHTML =
      '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' + c.hours + ' Hours</li>' +
      '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' + c.lessons + ' Lessons</li>' +
      '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' + esc(c.level) + '</li>' +
      '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>Certificate of Completion</li>' +
      '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>Self-Paced Learning</li>';
    $('#cmLearn').innerHTML = c.learn.map(function (l) {
      return '<li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span>' + esc(l) + '</span></li>';
    }).join('');
    $('#cmPrice').textContent = formatPrice(c.price);
    openModal($('#courseModal'), trigger);
  }

  /* ---------- Form validation ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setError(input, msg) {
    var field = input.closest('.field');
    var out = field && $('.error', field);
    if (out) out.textContent = msg || '';
    if (field) field.classList.toggle('invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  function validateInput(input) {
    var v = input.value.trim(), msg = '';
    if (input.closest('[hidden]') || input.closest('.field[hidden]')) { setError(input, ''); return true; }
    if (input.required && !v) msg = 'This field is required.';
    else if (input.type === 'email' && v && !EMAIL_RE.test(v)) msg = 'Enter a valid email address.';
    else if (input.minLength > 0 && v && v.length < input.minLength) msg = 'Use at least ' + input.minLength + ' characters.';
    setError(input, msg);
    return !msg;
  }
  function validateForm(form) {
    var ok = true, firstBad = null;
    $all('input, textarea, select', form).forEach(function (i) {
      if (!validateInput(i)) { ok = false; if (!firstBad) firstBad = i; }
    });
    if (firstBad) firstBad.focus();
    return ok;
  }
  function liveValidate(form) {
    $all('input, textarea', form).forEach(function (i) {
      i.addEventListener('blur', function () { if (i.value || i.getAttribute('aria-invalid') === 'true') validateInput(i); });
      i.addEventListener('input', function () { if (i.getAttribute('aria-invalid') === 'true') validateInput(i); });
    });
  }

  /* ---------- Contact form ---------- */
  var contactForm = $('#contactForm');
  if (contactForm) {
    liveValidate(contactForm);
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = $('.form-status', contactForm);
      status.textContent = '';
      if (!validateForm(contactForm)) return;
      status.textContent = 'Your details look good. This demo form is not connected to a server, so nothing was sent yet.';
      contactForm.reset();
    });
  }

  /* ---------- Auth modal (Login / Get Started) ---------- */
  var authForm = $('#authForm'), authMode = 'login';
  function populateInterests() {
    var sel = $('#aInterest');
    if (!sel || sel.options.length > 1) return;
    CATEGORIES.forEach(function (c) { var o = document.createElement('option'); o.value = c; o.textContent = c; sel.appendChild(o); });
  }
  function setAuthMode(mode) {
    authMode = mode;
    var signup = mode === 'signup';
    $('#tabLogin').setAttribute('aria-selected', String(!signup));
    $('#tabSignup').setAttribute('aria-selected', String(signup));
    $('#authTitle').textContent = signup ? 'Start learning with NHworks' : 'Welcome back';
    $('#authLead').textContent = signup ? 'Create your learner profile to get started.' : 'Enter your details to log in.';
    $('#authSubmit').textContent = signup ? 'Get started' : 'Log in';
    $('#aPass').setAttribute('autocomplete', signup ? 'new-password' : 'current-password');
    $all('[data-for="signup"]', authForm).forEach(function (f) { f.hidden = !signup; });
    $all('.error', authForm).forEach(function (e) { e.textContent = ''; });
    $all('.field', authForm).forEach(function (f) { f.classList.remove('invalid'); });
    $all('input', authForm).forEach(function (i) { i.removeAttribute('aria-invalid'); });
    $('.form-status', authForm).textContent = '';
  }
  function openAuth(mode, trigger, interest) {
    populateInterests();
    setAuthMode(mode);
    if (interest) $('#aInterest').value = interest;
    openModal($('#authModal'), trigger);
  }
  if (authForm) {
    liveValidate(authForm);
    $('#aName').required = false;
    $all('.auth-tabs button').forEach(function (b) { b.addEventListener('click', function () { setAuthMode(b.getAttribute('data-mode')); }); });
    authForm.addEventListener('submit', function (e) {
      e.preventDefault();
      $('#aName').required = authMode === 'signup';
      var status = $('.form-status', authForm);
      status.textContent = '';
      if (!validateForm(authForm)) return;
      status.textContent = 'Your details are valid, but accounts need a backend service that is not connected in this demo. Nothing was sent or saved.';
    });
  }

  /* ---------- Story (video) modal ---------- */
  var storyIndex = 0;
  function showStory(i) {
    var slides = $all('.story-slide');
    storyIndex = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === storyIndex); s.setAttribute('aria-hidden', String(n !== storyIndex)); });
    $('#storyCount').textContent = (storyIndex + 1) + ' / ' + slides.length;
  }
  $('#storyPrev').addEventListener('click', function () { showStory(storyIndex - 1); });
  $('#storyNext').addEventListener('click', function () { showStory(storyIndex + 1); });
  showStory(0);

  /* ---------- Global click handling ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var authBtn = t.closest('[data-open-auth]');
    if (authBtn) { closeMenu(); openAuth(authBtn.getAttribute('data-open-auth'), authBtn); return; }
    var videoBtn = t.closest('[data-open-video]');
    if (videoBtn) { showStory(0); openModal($('#videoModal'), videoBtn); return; }
    var courseBtn = t.closest('[data-course]');
    if (courseBtn) { openCourse(courseBtn.getAttribute('data-course'), courseBtn); return; }
    var card = t.closest('.course-card');
    if (card && !t.closest('button')) { var b = $('[data-course]', card); if (b) openCourse(b.getAttribute('data-course'), b); return; }
    var chip = t.closest('[data-filter]');
    if (chip) { setFilter(chip.getAttribute('data-filter')); return; }
    var cat = t.closest('[data-category]');
    if (cat) { var name = cat.getAttribute('data-category'); setFilter(state.category === name ? 'All' : name); scrollToCourses(); return; }
    var action = t.closest('[data-action]');
    if (action) {
      var a = action.getAttribute('data-action');
      if (a === 'all-categories') { state.category = 'All'; state.showAll = true; renderCourses(); scrollToCourses(); }
      if (a === 'explore') { closeMenu(); }
    }
  });
  $('#cmEnroll').addEventListener('click', function () {
    var interest = currentCourse ? currentCourse.category : '';
    closeModal(true);
    openAuth('signup', $('.course-card[data-id="' + (currentCourse && currentCourse.id) + '"] .course-title') || document.body, interest);
  });
  $('#toggleCourses').addEventListener('click', function () {
    var filtering = state.category !== 'All' || state.query.trim() !== '';
    if (filtering) { clearFilters(); state.showAll = true; }
    else { state.showAll = !state.showAll; }
    renderCourses();
  });
  $('#clearFilters').addEventListener('click', clearFilters);

  /* ---------- Search ---------- */
  var searchTimer;
  $all('.js-search-input').forEach(function (input) {
    input.addEventListener('input', function () {
      var val = input.value;
      $all('.js-search-input').forEach(function (i) { if (i !== input) i.value = val; });
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () { state.query = val; renderCourses(); }, 150);
    });
  });
  $all('.js-search-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearTimeout(searchTimer);
      state.query = $('.js-search-input', form).value;
      renderCourses();
      closeMenu();
      scrollToCourses();
    });
  });

  /* ---------- Mobile menu ---------- */
  var nav = $('#mainNav'), toggle = $('#menuToggle');
  function openMenu() { nav.classList.add('is-open'); toggle.setAttribute('aria-expanded', 'true'); toggle.setAttribute('aria-label', 'Close menu'); }
  function closeMenu() { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
  toggle.addEventListener('click', function () { nav.classList.contains('is-open') ? closeMenu() : openMenu(); });
  $all('.nav-link').forEach(function (l) { l.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', function (e) { if (nav.classList.contains('is-open') && !e.target.closest('#mainNav') && !e.target.closest('#menuToggle')) closeMenu(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1020) closeMenu(); });

  /* ---------- Header state, back-to-top, active nav link ---------- */
  var header = $('#siteHeader'), toTop = $('#toTop');
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    header.classList.toggle('is-scrolled', y > 8);
    toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  var navLinks = $all('.nav-link');
  function setActiveLink(id) {
    navLinks.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + id); });
  }
  var hasIO = 'IntersectionObserver' in window;
  if (hasIO) {
    var sectionIds = ['home', 'courses', 'about', 'resources', 'contact'];
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActiveLink(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sectionIds.forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Reveal on scroll, animated counters, progress ring ---------- */
  function animateCount(el, target, duration) {
    if (reduceMotion || duration === 0) { el.textContent = target; return; }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function setRing() {
    var bar = $('.ring-bar');
    if (bar) bar.style.strokeDashoffset = String(100 - Number(bar.getAttribute('data-value') || 0));
    var num = $('.ring-label [data-count]');
    if (num) animateCount(num, Number(num.getAttribute('data-count')), 1600);
  }
  function startStats() {
    var levels = {};
    COURSES.forEach(function (c) { levels[c.level] = true; });
    var totals = {
      courses: COURSES.length,
      categories: CATEGORIES.length,
      hours: COURSES.reduce(function (s, c) { return s + c.hours; }, 0),
      levels: Object.keys(levels).length
    };
    $all('[data-stat]').forEach(function (el) { animateCount(el, totals[el.getAttribute('data-stat')], 1400); });
  }

  var statsStarted = false;
  var reveals = $all('.reveal');
  if (hasIO) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in-view');
        if (en.target.querySelector && en.target.querySelector('[data-stat]') && !statsStarted) { statsStarted = true; startStats(); }
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in-view'); });
    statsStarted = true; startStats();
  }
  // Hero progress ring after the entrance animation has begun
  setTimeout(setRing, reduceMotion ? 0 : 700);

  /* ---------- Testimonial carousel ---------- */
  var slides = $all('.slide'), dotsWrap = $('#dots'), current = 0, autoTimer = null;
  slides.forEach(function (s, i) {
    var d = document.createElement('button');
    d.type = 'button'; d.className = 'dot';
    d.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
    d.addEventListener('click', function () { goTo(i); restartAuto(); });
    dotsWrap.appendChild(d);
  });
  function goTo(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === current); s.setAttribute('aria-hidden', String(n !== current)); });
    $all('.dot', dotsWrap).forEach(function (d, n) { d.setAttribute('aria-current', String(n === current)); });
  }
  function startAuto() { if (reduceMotion || autoTimer) return; autoTimer = setInterval(function () { goTo(current + 1); }, 7000); }
  function stopAuto() { clearInterval(autoTimer); autoTimer = null; }
  function restartAuto() { stopAuto(); startAuto(); }
  $('#prevSlide').addEventListener('click', function () { goTo(current - 1); restartAuto(); });
  $('#nextSlide').addEventListener('click', function () { goTo(current + 1); restartAuto(); });
  var carousel = $('#carousel');
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);
  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { goTo(current - 1); }
    if (e.key === 'ArrowRight') { goTo(current + 1); }
  });
  document.addEventListener('visibilitychange', function () { document.hidden ? stopAuto() : startAuto(); });
  goTo(0);
  startAuto();

  /* ---------- Init ---------- */
  var year = $('#year'); if (year) year.textContent = new Date().getFullYear();
  renderCourses();
})();
