// ============================================================
// Easy Loan Services — Main JavaScript
// ============================================================

(function () {
  'use strict';

  // ---- Scroll Progress Bar ----
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);

  // ---- Inject Floating Buttons if not present ----
  if (!document.querySelector('.floating-buttons')) {
    const fabDiv = document.createElement('div');
    fabDiv.className = 'floating-buttons';
    fabDiv.innerHTML = `
      <div class="fab-wrap fab-top-wrap hidden">
        <button class="fab fab-top" id="backToTop" title="Back to top" aria-label="Back to top">
          <i class="fas fa-arrow-up"></i>
          <span class="fab-label">Back to Top</span>
        </button>
      </div>
      <div class="fab-wrap fab-chat-wrap">
        <button class="fab fab-chat chatbot-fab" id="chatbot-fab" title="Open Loan Assistant" aria-label="Open Loan Assistant">
          <div class="fab-icon"><i class="fas fa-comments"></i></div>
          <div class="fab-badge" id="fab-badge">1</div>
          <span class="fab-label">Loan Assistant</span>
        </button>
      </div>
      <div class="fab-wrap">
        <a href="tel:+918800838765" class="fab fab-call" title="Call Now" aria-label="Call Now">
          <i class="fas fa-phone"></i>
          <span class="fab-label">Call Now</span>
        </a>
      </div>
      <div class="fab-wrap">
        <a href="https://wa.me/918800838765?text=Hi%2C%20I%20need%20help%20with%20a%20loan%20application" target="_blank" rel="noopener" class="fab fab-whatsapp" title="Chat on WhatsApp" aria-label="WhatsApp Chat">
          <i class="fab fa-whatsapp"></i>
          <span class="fab-label">WhatsApp</span>
        </a>
      </div>
    `;
    document.body.appendChild(fabDiv);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / (docHeight || 1)) * 100;
    progressBar.style.width = progress + '%';
  });

  // ---- Sticky Navbar & Header ----
  const siteHeader = document.getElementById('siteHeader');
  const mainNav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 40;
    if (siteHeader) siteHeader.classList.toggle('scrolled', isScrolled);
    if (mainNav) mainNav.classList.toggle('scrolled', isScrolled);
  }, { passive: true });

  // ---- Notice Bar Dismissal ----
  window.dismissNotice = function() {
    const bar = document.getElementById('noticeBar');
    if (bar) {
      bar.style.transition = 'opacity 0.25s ease, max-height 0.3s ease, padding 0.25s ease';
      bar.style.opacity = '0';
      bar.style.maxHeight = '0';
      bar.style.padding = '0';
      bar.style.overflow = 'hidden';
      setTimeout(() => {
        bar.style.display = 'none';
      }, 300);
    }
  };

  // ---- Back to Top Button ----
  const fabTop = document.querySelector('.fab-top');
  const fabTopWrap = document.querySelector('.fab-top-wrap');
  if (fabTop) {
    const checkScroll = () => {
      const isScrolled = window.scrollY > 400;
      fabTop.classList.toggle('visible', isScrolled);
      if (fabTopWrap) {
        fabTopWrap.classList.toggle('hidden', !isScrolled);
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    fabTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- AOS (Animate on Scroll) — lightweight custom impl ----
  function initAOS() {
    const els = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = e.target.getAttribute('data-aos-delay') || 0;
          setTimeout(() => e.target.classList.add('aos-animate'), parseInt(delay));
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }
  initAOS();

  // ---- Animated Counters ----
  function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter'));
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix, 2000);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }
  initCounters();

  // ---- Mobile Menu Close on Nav Link Click ----
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler) toggler.click();
      }
    });
  });

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Document Tabs ----
  const docCategories = document.querySelectorAll('.doc-category');
  const docLists = document.querySelectorAll('.doc-list');
  docCategories.forEach((cat, i) => {
    cat.addEventListener('click', () => {
      docCategories.forEach(c => c.classList.remove('active'));
      docLists.forEach(d => d.classList.add('d-none'));
      cat.classList.add('active');
      if (docLists[i]) docLists[i].classList.remove('d-none');
    });
  });

  // ---- Hero Search Box ----
  const searchBtn = document.getElementById('heroSearchBtn');
  const searchInput = document.getElementById('heroSearchInput');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const q = searchInput.value.trim();
      if (q) {
        alert('Searching for: ' + q + '\n\nPlease call us at +91 98765 43210 or browse our loan categories below.');
      }
    });
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }

  // ---- Toast Notification ----
  function showToast(message, type = 'success') {
    const existing = document.getElementById('els-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'els-toast';
    toast.style.cssText = `
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: ${type === 'success' ? '#059669' : '#ef4444'};
      color: white; padding: 14px 28px; border-radius: 50px;
      font-size: 0.9rem; font-weight: 600; z-index: 99999;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2); opacity: 0;
      transition: opacity 0.3s ease; max-width: 90vw; text-align: center;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 50);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Submit Application';
        this.reset();
        showToast('✅ Application submitted! We will contact you within 24 hours.');
      }, 1800);
    });
  }

  // ---- Hero Quick Apply Form ----
  const heroForm = document.getElementById('heroApplyForm');
  if (heroForm) {
    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Apply Now';
        this.reset();
        showToast('🎉 Application received! Our expert will call you shortly.');
      }, 1500);
    });
  }

  // ---- Newsletter Form ----
  const newsletterForms = document.querySelectorAll('.footer-newsletter form, #newsletterForm');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      this.reset();
      showToast('✅ Subscribed successfully! Thank you.');
    });
  });

  // ---- Image Lazy Loading ----
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window && lazyImgs.length) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          e.target.removeAttribute('data-src');
          imgObserver.unobserve(e.target);
        }
      });
    }, { rootMargin: '200px' });
    lazyImgs.forEach(img => imgObserver.observe(img));
  }

  // ---- Active Nav Link Based on Scroll ----
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`#mainNav a[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ---- Testimonial auto-scroll (carousel) handled by Bootstrap ----

  // ---- Page Load Animation ----
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });

})();
