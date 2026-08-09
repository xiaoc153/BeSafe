// BeSafe Landing Page — Interactions

(function () {
  'use strict';

  // ===== Mobile nav toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== Scroll reveal animation =====
  const revealEls = document.querySelectorAll(
    '.feature-card, .step, .step-feature, .highlight-card, .security-card, .tl-item, .t-card, .faq-item'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // ===== Stagger reveal for grid items =====
  document.querySelectorAll('.features-grid, .highlight-grid, .security-grid, .security-timeline, .testimonial-grid')
    .forEach(grid => {
      const items = grid.children;
      for (let i = 0; i < items.length; i++) {
        items[i].style.transitionDelay = (i * 0.08) + 's';
      }
    });

  // ===== Nav background on scroll =====
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }

  // ===== Active nav highlight =====
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  function setActiveNav() {
    const y = window.scrollY + 120;
    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--primary)';
      }
    });
  }
  window.addEventListener('scroll', setActiveNav);

  // ===== Auto-rotate the hero meme (subtle pulse) =====
  const memeBack = document.querySelector('.meme-back');
  if (memeBack) {
    setInterval(() => {
      memeBack.style.transform = 'scale(1.03)';
      setTimeout(() => { memeBack.style.transform = 'scale(1)'; }, 200);
    }, 4000);
  }

})();